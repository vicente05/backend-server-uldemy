// Requires
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Archivo de configuracion

const SEED = require('../config/config').SEED;

// Inicializar variables

const router = express.Router();

// Importar Esquema

const Usuario = require('../models/usuario');

router.post('/', ( req, res ) => {

    const body = req.body;

    Usuario.findOne({ email: body.email}, ( err, usuarioDB ) => {

        if ( err ) {
            return res.status( 500 ).json({
                ok: false,
                mensaje: 'Error al buscar usuarios',
                errors: err
            });        
        }

        if ( !usuarioDB ){
            return res.status( 400 ).json({
                ok: true,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if ( !bcrypt.compareSync( body.password, usuarioDB.password) ){
            return res.status( 400 ).json({
                ok: true,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        // Crear un token
        usuarioDB.password = ':)';
        const token = jwt.sign({ usuario:usuarioDB },SEED,{ expiresIn: 14400 });

        return res.status( 200 ).json({
            ok: true,
            usuario: usuarioDB,
            token,
            id: usuarioDB._id
        });
    });

});

module.exports = router;