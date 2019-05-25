// Requires
const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');

// Inicializar variables

const app = express();

// Conexion a la base de datos

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', ( err, res) => {
    if( err ) throw err;
    console.log('Base de datos:', 'online'.green)
});

// Rutas

app.get('/',( req, res, next ) => {
    res.status( 200 ).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente jajaja'
    });
});

// Escuchar peticiones

app.listen(3000,() => console.log('Express server corriendo en el puerto 3000:', 'online'.green ));