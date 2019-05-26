const jwt = require('jsonwebtoken');

// Archivo de configuracion

const SEED = require('../config/config').SEED;


//=================================================
// Verificar token
//=================================================

let verificaToken = function( req, res, next ) {

    const token = req.query.token;
    jwt.verify( token, SEED, ( err, decode ) => {
        if ( err ) {
            return res.status( 401 ).json({
                ok: false,
                mensaje: 'Token no valido',
                errors: err
            }); 
        }

        req.usuario = decode.usuario;

        next();
    });

}

// router.use('/', ( req, res, next ) => {
    
//     const token = req.query.token;
//     jwt.verify( token, SEED, ( err, decode ) => {
//         if ( err ) {
//             return res.status( 401 ).json({
//                 ok: false,
//                 mensaje: 'Token no valido',
//                 errors: err
//             }); 
//         }
//         next();
//     });
    

// });

module.exports = { verificaToken }