// Requires
const express = require('express');

// Inicializar variables

const router = express.Router();


// Rutas

router.get('/',( req, res, next ) => {
    res.status( 200 ).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});


module.exports = router;