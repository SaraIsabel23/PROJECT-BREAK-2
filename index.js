// index.js: Es el punto de entrada de la aplicación, donde se arranca el servidor y se conecta todo.

const express      = require('express');
const dbConnection = require('./config/db');
const app          = express();
const PORT         = process.env.PORT || 3000;

require('dotenv').config();

app.get('/', (req, res) => {
    res.send("Hola Mundo")
});

dbConnection()

app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
console.log("URI:", process.env.MONGO_URI);
