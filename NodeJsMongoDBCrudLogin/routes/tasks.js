const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const Software = require('../models/software');//const para sacar el modelo de software
const User = require('../models/user');//const para sacar el modelo de user

//Nueva ruta para acceder al panel de control, pasandole todos los usuarios y todas las tareas
router.get('/ControlPanel', isAuthenticated, async (req, res) => {
  const user = new User();
  const task = new Task();
  const users = await user.findAll();
  const tasks = await task.findAll();
  res.render('controlPanel', {
    users,
    tasks
  });
});

router.get('/tasks',isAuthenticated, async (req, res) => {
  const task = new Task();
  const tasks = await task.findAll();
  console.log(tasks);
  res.render('tasks', {
    tasks
  });
});

//Ruta para acceder a los tasks del usuario logged in
router.get('/tasks/user/:userId', isAuthenticated, async (req, res) => {
  const task = new Task();
  const tasks = await task.findAllUser(req.params.userId);
  res.render('userTasks', { tasks });
});

router.post('/tasks/add', isAuthenticated,async (req, res, next) => {
  const task = new Task(req.body);
  //No parecen necesarias las siguientes tres líneas, pero por si da error ya que creamos asignaturas sin software asignado
  // if(!task.software){
  //   task.software = [];
  // }
  //Quitado lo siguiente de esta línea, que asocia una tarea a un usuario ->   task.usuario=req.user._id;
  await task.insert();
  res.redirect('/controlPanel');
});

router.get('/tasks/turn/:id',isAuthenticated, async (req, res, next) => {
  let { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  await task.insert();
  res.redirect('/tasks');
});


router.get('/tasks/edit/:id', isAuthenticated, async (req, res, next) => {
  var task = new Task();
  var softwares = new Software();
  task = await task.findById(req.params.id);
  softwares = await softwares.findAll();//Necesitamos pasarle la lista completa de softwares a esta vista para el dropdown
  res.render('edit', { task, softwares });
});

router.post('/tasks/edit/:id',isAuthenticated, async (req, res, next) => {
  const task = new Task();
  const { id } = req.params;
  await task.update({_id: id}, req.body);
  res.redirect('/tasks');
});

router.get('/tasks/delete/:id', isAuthenticated,async (req, res, next) => {
  const task = new Task();
  let { id } = req.params;
  await task.delete(id);
  res.redirect('/controlPanel');
});

router.get('/tasks/search',isAuthenticated, async (req, res, next) => {
  const task = new Task();
  let search = req.query.search;
  const tasks = await task.findSearch(search, req.user._id);
  res.render('tasks', {
    tasks
  });
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}
module.exports = router;
