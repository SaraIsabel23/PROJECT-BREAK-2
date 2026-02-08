// index.js: Es el punto de entrada de la aplicación, donde se arranca el servidor y se conecta todo.
require("dotenv").config();

const express = require('express');
const { dbConnection } = require('./config/db');
const routes  = require('./routes');

const app     = express();
const PORT    = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/", routes);


dbConnection();

app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));






/*const express      = require('express');
const dbConnection = require('./config/db');
const app          = express();
require('dotenv').config();
const PORT         = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send("Hola Mundo")
});
// Función principal asíncrona
const startServer = async () => {
    try {
        await dbConnection();
        app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error.message);
    }
};
startServer();*/







/*const express      = require('express');
const dbConnection = require('./config/db');
const app          = express();
const PORT         = process.env.PORT || 3000;

require('dotenv').config();

app.get('/', (req, res) => {
    res.send("Hola Mundo")
});

dbConnection()

app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
console.log("URI:", process.env.MONGO_URI);*/

