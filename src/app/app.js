import indexController from './http_controllers/index';
import statusController from './http_controllers/status';

const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: 'src/app/views/_layouts/',
    partialsDir: 'src/app/views/_partials/',
}));

app.set('view engine', 'handlebars');
app.set('views', 'src/app/views');

app.use('/static', express.static('static'));

app.get('/', indexController);
app.get('/status', statusController);

export default app;
