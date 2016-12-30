module.exports = (config) => {
    config.set({
        files: [
            { pattern: '../client/**/*[sS]pec.js', included: true },
        ],
        exclude: [],
        plugins: [
            'karma-browserify',
            'karma-phantomjs-launcher',
            'karma-jasmine',
        ],
        frameworks: ['browserify', 'jasmine'],
        reporters: ['progress'],
        preprocessors: {
            '../**/*[sS]pec.js': ['browserify'],
        },
        browsers: ['PhantomJS'],
        browserify: {
            debug: true, // output source maps
            transform: [['babelify', { presets: ['es2015', 'react'] }]],
        },
    });
};
