const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  var user = new User();
  user = await user.findEmail(email)
  if (user) {
    return done(null, false, req.flash('signupMessage', 'Correo electronico ya registrado.')); //Mensaje cambiado
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.rol = req.body.rol; //Obtención del rol a través del body
    await newUser.insert();
    done(null); // Eliminado el usuario del "done()" para que la sesión actual no se convierta en la del usuario creado
  }
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  var user = new User();
  user = await user.findEmail(email);
  //Condicional y mensaje cambiados para que el que use la aplicacion no sepa
  //si es el correo o la contraseña lo que es incorrecto 
  if (!user || !user.comparePassword(password)) {
    return done(null, false, req.flash('signinMessage', 'Usuario o contraseña incorrectos.'));
  }
  return done(null, user);
}));
