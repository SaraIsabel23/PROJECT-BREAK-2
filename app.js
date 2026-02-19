require("dotenv").config();

const express        = require('express');
const swaggerUi      = require('swagger-ui-express');
const docs           = require('./docs');
const methodOverride = require('method-override');
const session        = require('express-session');
const routes         = require('./routes');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
app.use(session({
    secret: 'tu_clave_secreta',
    resave: false,
    saveUninitialized: false
}));

app.use("/", routes);

module.exports = app;