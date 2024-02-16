const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user'); //Añadida esta linea para que se pueda usar el modelo de User y acceder a sus metodos

router.get('/', (req, res, next) => {
  res.render('index');
});

//El boton de signup del inicio y la pagina de signup, se deberían quitar, ya que los usuarios se van a crear en /users, usando el post de /users/add

router.get('/signin', (req, res, next) => {
  res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));

router.get('/profile', isAuthenticated, (req, res, next) => {
  res.render('profile');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

//Añadida la ruta /users/add
router.post('/users/add', passport.authenticate('local-signup', {
  //Rutas cambiadas para que, falle o salga bien, añadir un usuario lleve a la pantalla de usuarios
  successRedirect: '/users',
  failureRedirect: '/users',
  failureFlash: true
}));

//Añadida la ruta /users
router.get('/users', isAuthenticated, async (req, res) => {
  const user = new User();
  const users = await user.findAll();
  res.render('users', {
    users
  });
});

//Añadida la ruta /users/delete/:id
router.get('/users/delete/:id', isAuthenticated, async (req, res, next) => {
  const user = new User();
  let { id } = req.params;
  await user.delete(id);
  res.redirect('/users');
});

//Añadida la rutas edit (get)
router.get('/users/edit/:id', isAuthenticated, async (req, res, next) => {
  var user = new User();
  user = await user.findById(req.params.id);
  res.render('userEdit', { user });
});

//Añadida la rutas edit (post)
router.post('/users/edit/:id', isAuthenticated, async (req, res, next) => {
  const user = new User();
  const { id } = req.params;
  await user.update({ _id: id }, req.body);
  res.redirect('/users');
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}

module.exports = router;
