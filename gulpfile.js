/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const karma = require('karma');
const eslint = require('gulp-eslint');
const sassLint = require('gulp-sass-lint');
const imagemin = require('gulp-imagemin');
const hotModuleReload = require('browserify-hmr');
const livereload = require('gulp-livereload');
const fs = require('fs');
const path = require('path');

const JS_PATHS = ['src/client/js/**/*.{js,jsx}', 'spec/client/js/**/*.js'];
const SCSS_PATHS = ['src/client/scss/**/*.scss'];
const IMG_PATHS = ['src/client/images/**/*'];

const HMR_HOST = 'localhost';

function getBrowserify(dev) {
    const babelifyPlugins = ['transform-flow-strip-types'];
    const browserifyConfig = {
        cache: {},
        packageCache: {},
        debug: dev,
    };
    browserifyConfig.entries = ['./src/client/js/bootstrap.js'];
    if (dev && !gutil.env.no_hmr) {
        babelifyPlugins.push([
            'react-transform', {
                transforms: [{
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module'],
                }],
            },
        ]);
    }
    return browserify(browserifyConfig)
        .transform(babelify, {
            presets: ['es2015', 'react'],
            plugins: babelifyPlugins,
        });
}

function bundleJs(pipeline, dev) {
    let bundle = pipeline.bundle()
        .on('error', (err) => {
            if (dev) {
                gutil.log(`${err.message}\n${err.codeFrame}`);
            } else {
                throw err;
            }
        })
        .pipe(source('bootstrap.js'))
        .pipe(buffer());

    if (dev) { bundle = bundle.pipe(sourcemaps.init({ loadMaps: true })); }
    if (!dev) { bundle = bundle.pipe(uglify()); }
    if (dev) { bundle = bundle.pipe(sourcemaps.write()); }
    bundle = bundle.pipe(gulp.dest('static/js/'));

    return bundle;
}

function buildJs(dev) {
    return bundleJs(getBrowserify(dev), dev);
}

function watchJs() {
    let pipeline = getBrowserify(true)
        .plugin(watchify, { ignoreWatch: ['**/node_modules/**'] });
    if (!gutil.env.no_hmr) {
        pipeline = pipeline.plugin(
            hotModuleReload, { mode: 'websocket', url: `http://${HMR_HOST}:3123`, hostname: '0.0.0.0' }
        );
        try { fs.mkdirSync('build'); } catch (e) {};
        fs.writeFileSync(
            'build/_livereload.js',
            `window.LiveReloadOptions = {host: '${HMR_HOST}'};require('livereload-js');`
        );
        pipeline = pipeline.add('build/_livereload.js');
    }
    pipeline.on('update', () => {
        bundleJs(pipeline, true);
    });
    pipeline.on('log', gutil.log);
    bundleJs(pipeline, true);
}

function buildScss(dev) {
    let pipeline = gulp.src(SCSS_PATHS)
        .pipe(
            scss({ outputStyle: 'compressed', sourcemap: dev })
                .on('error', (err) => {
                    if (dev) {
                        scss.logError(err);
                    } else {
                        throw err;
                    }
                }))
        .pipe(autoprefixer({ browsers: ['> 5%', 'last 2 versions'] }));

    if (dev) {
        pipeline = pipeline.pipe(sourcemaps.write());
    }

    pipeline = pipeline.pipe(gulp.dest('static/styles/'));

    if (dev) {
        pipeline = pipeline.pipe(livereload());
    }
    return pipeline;
}

function testJs(done) {
    const server = new karma.Server({
        configFile: path.resolve(__dirname, 'spec', 'support', 'karma.conf.js'),
        singleRun: true,
    }, done);
    server.start();
}

function lintJs() {
    return gulp.src(JS_PATHS)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function lintScss() {
    return gulp.src(SCSS_PATHS)
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
}

function compressImages() {
    return gulp.src(IMG_PATHS)
        .pipe(imagemin())
        .pipe(gulp.dest('static/images/'));
}

gulp.task('build-js', () => buildJs(false));
gulp.task('build-js-dev', () => buildJs(true));
gulp.task('test-js', testJs);
gulp.task('eslint', lintJs);

gulp.task('build-scss', () => buildScss(false));
gulp.task('build-scss-dev', () => buildScss(true));
gulp.task('scss-lint', lintScss);

gulp.task('images', compressImages);

gulp.task('default', ['build', 'test']);
gulp.task('build', ['build-js', 'build-scss', 'images']);
gulp.task('build-dev', ['build-js-dev', 'build-scss-dev', 'images']);
gulp.task('test', ['test-js', 'eslint', 'scss-lint']);

gulp.task('watch', ['build-scss-dev'], () => {
    watchJs();
    livereload.listen();
    gulp.watch(JS_PATHS, ['test-js', 'eslint', 'typecheck']);
    gulp.watch(SCSS_PATHS, ['build-scss-dev', 'scss-lint']);
    gulp.watch(IMG_PATHS, ['images']);
});
