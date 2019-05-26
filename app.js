// Requires
const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const bodyParser = require('body-parser');

// Inicializar variables

const app = express();

// Body Parse
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Importar rutas

const usuarioLogin = require('./routes/login');
const usuarioRoutes = require('./routes/usuario');
const appRoutes = require('./routes/app');

// Conexion a la base de datos

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', { useNewUrlParser: true }, ( err, res) => {
    if( err ) throw err;
    console.log('Base de datos:', 'online'.green)
});

// Rutas

app.use('/',appRoutes);
app.use('/usuario',usuarioRoutes);
app.use('/login',usuarioLogin);

// Escuchar peticiones, levantar servidor

app.listen(3000,() => console.log('Express server corriendo en el puerto 3000:', 'online'.green ));