//Ruta nueva, con algunos post y get de tasks.js, necesitamos un edit también
const express = require('express');
const router = express.Router();
const Software = require('../models/software');

router.get('/softwares',isAuthenticated, async (req, res) => {
    const software = new Software();
    const softwares = await software.findAll();
    console.log(softwares);
    res.render('softwares', {
        softwares
    });
});

router.post('/softwares/add', isAuthenticated,async (req, res, next) => {
    const software = new Software(req.body);
    await software.insert();
    res.redirect('/softwares');
});

router.get('/softwares/delete/:id', isAuthenticated,async (req, res, next) => {
    const software = new Software();
    let { id } = req.params;
    await software.delete(id);
    res.redirect('/softwares');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/')
}

/*Métodos nuevos*/
// GET para obtener el formulario de actualización de un software
router.get('/softwares/update/:id', isAuthenticated, async (req, res) => {
    try {
        // Obtener el ID del software de la URL
        const { id } = req.params;
        // Buscar el software por su ID en la base de datos
        const software = await Software.findById(id);
        // Renderizar el formulario de actualización con los datos del software
        res.render('update_software', { software });
    } catch (error) {
        console.error('Error al obtener el formulario de actualización de software:', error);
        res.redirect('/softwares'); // Redirigir a la lista de software en caso de error
    }
});
/*Métodos nuevos*/
// POST para procesar la actualización de un software
router.post('/softwares/update/:id', isAuthenticated, async (req, res) => {
    try {
        // Obtener el ID del software de la URL
        const { id } = req.params;
        // Buscar el software por su ID en la base de datos
        const software = await Software.findById(id);
        // Actualizar los campos del software con los nuevos datos del formulario
        software.nombre = req.body.nombre; // Aquí actualizamos el nombre del software
        software.url = req.body.url;
        software.descripcion = req.body.descripcion;
        // Guardar los cambios en la base de datos
        await software.save();
        // Redirigir a la lista de software después de la actualización con un mensaje de éxito
        res.redirect('/softwares');
    } catch (error) {
        console.error('Error al actualizar el software:', error);
        res.redirect('/softwares'); // Redirigir a la lista de software en caso de error
    }
});

module.exports = router;