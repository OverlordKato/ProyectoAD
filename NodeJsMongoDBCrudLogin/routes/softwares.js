//Ruta nueva, con algunos post y get de tasks.js, necesitamos un edit también
const express = require('express');
const router = express.Router();
const Software = require('../models/software');

// Ruta obsoleta
// router.get('/softwares',isAuthenticated, async (req, res) => {
//     const software = new Software();
//     const softwares = await software.findAll();
//     console.log(softwares);
//     res.render('softwares', {
//         softwares
//     });
// });

router.post('/softwares/add/:id', isAuthenticated, async (req, res) => {
    try {
        // Obtener el ID de la tarea desde los parámetros de la URL
        const taskId = req.params.id;

        // Crear una nueva instancia del modelo Software con los datos del formulario
        const newSoftware = new Software({
            nombre: req.body.nombre,
            url: req.body.url,
            descripcion: req.body.descripcion,
            task: taskId
        });

        // Guardar el nuevo software en la base de datos
        await newSoftware.save();

        // Redirigir a la lista de software después de agregar con un mensaje de éxito
        res.redirect(`/tasks/update_task/${taskId}`);
    } catch (error) {
        console.error('Error al agregar el nuevo software:', error);
        res.redirect(`/tasks/update_task/${taskId}`);
    }
});

router.get('/softwares/delete/:id', isAuthenticated,async (req, res, next) => {
    if(req.user.rol=="administrador" || req.user.rol=="profesor"){
    let { id } = req.params;
    const software = await Software.findById(id);
    const taskId = software.task;
    console.log("id del task" + taskId);
    await software.delete(id);
    res.redirect(`/tasks/update_task/${taskId}`);
}else{
    res.redirect('/');
  }
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
    if(req.user.rol=="administrador" || req.user.rol=="profesor"){
    try {
        // Obtener el ID del software de la URL
        const { id } = req.params;
        // Buscar el software por su ID en la base de datos
        const software = await Software.findById(id);
        // Renderizar el formulario de actualización con los datos del software
        res.render('update_software', { software });
    } catch (error) {
        console.error('Error al obtener el formulario de actualización de software:', error);
        res.redirect(`/tasks/update_task/${taskId}`); // Redirigir a la lista de software en caso de error
    }
}else{
    res.redirect('/');
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

        // Obtener el ID de la tarea asociada al software
        const taskId = software.task._id;

        // Actualizar los campos del software con los nuevos datos del formulario
        software.nombre = req.body.nombre; // Aquí actualizamos el nombre del software
        software.url = req.body.url;
        software.descripcion = req.body.descripcion;

        // Guardar los cambios en la base de datos
        await software.save();

        // Redirigir a la lista de software después de la actualización con un mensaje de éxito
        res.redirect(`/tasks/update_task/${taskId}`);
    } catch (error) {
        console.error('Error al actualizar el software:', error);
        res.redirect(`/tasks/update_task/${taskId}`); // Redirigir a la lista de software en caso de error
    }
});

module.exports = router;