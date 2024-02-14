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

module.exports = router;