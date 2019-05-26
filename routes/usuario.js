// Requires
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Archivo de configuracion

const SEED = require('../config/config').SEED;

// Middlewares

const mdAutenticacion = require('../middlewares/autenticacion').verificaToken;

// Inicializar variables

const router = express.Router();

// Importar Esquema

const Usuario = require('../models/usuario');

// Rutas

//=================================================
// Obtener todos los usuarios
//=================================================

router.get('/',( req, res, next ) => {

    Usuario.find({ },'nombre email img role').exec( ( err, usuarios ) => {
        if ( err ) {
            return res.status( 500 ).json({
                ok: false,
                mensaje: 'Error cargando usuario',
                errors: err
            });        
        }
        return res.status( 200 ).json({
            ok: true,
            usuarios
        }); 
    });
    
});

//=================================================
// Crear un nuevo usuario
//=================================================

router.post('/', mdAutenticacion,( req, res ) => {
    
    const body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        img: body.img,
        role: body.role
    })

    usuario.save( ( err, usuarioGuardado ) => {
        if ( err ) {
            return res.status( 400 ).json({
                ok: false,
                mensaje: 'Error cargando usuario',
                errors: err
            });    
        }
        res.status( 201 ).json({
            ok:true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        });
    });  
});

//=================================================
// Actualizar usuario
//=================================================

router.put('/:id', mdAutenticacion, ( req, res ) => {

    const id = req.params.id;
    const body = req.body;

    Usuario.findById( id, ( err, usuario ) => {
        
        if ( err ) {
            return res.status( 500 ).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            }); 
        }
        if ( !usuario ) {
            return res.status( 400 ).json({
                ok: false,
                mensaje: `El usuario con el id ${ id } no existe.`,
                errors: { message: 'No existe un usuario con ese ID' }
            }); 
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save( ( err, usuarioGuardado ) => {

            if ( err ) {
                return res.status( 400 ).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });  
            }

            usuarioGuardado.password = ':)';

            res.status( 200 ).json({
                ok:true,
                usuario: usuarioGuardado
            }); 
        })
    });
});

//=================================================
// Borrar un usuario por el id
//=================================================

router.delete('/:id', mdAutenticacion, ( req, res ) => {
    const id = req.params.id;

    Usuario.findByIdAndRemove( id, ( err, usuarioBorrado ) => {
        if ( err ) {
            return res.status( 500 ).json({
                ok: false,
                mensaje: 'Error borrar usuario',
                errors: err
            });    
        }

        if ( !usuarioBorrado ) {
            return res.status( 400 ).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: { message: 'No existe un usuario con ese id'}
            });    
        }

        usuarioBorrado.password = ':)';
        
        res.status( 200 ).json({
            ok:true,
            usuario: usuarioBorrado
        });
    });
})


module.exports = router;