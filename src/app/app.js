import statusController from './http_controllers/status';

const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: 'src/views/layouts/',
    partialsDir: 'src/views/partials/',
}));

app.set('view engine', 'handlebars');
app.set('views', 'app/views');

app.get('/status', statusController);

export default app;
