const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  //Igual no se requiere un id? Ya se pone un _id automático
  // id: {
  //   type: Number,
  //   required: true
  // },
  nombre: {
    type: String,
    required: true
  },
  planEstudios: {
    type: String,
    required: true
  },
  cuatrimestre: {
    type: String,
    required: true
  },
  curso: {
    type: String,
    required: true
  },
  software: {
    type: Array,
    required: false
  },
  usuario: [
    {type: mongoose.Schema.Types.ObjectId, ref:'user'}
  ]
});

//En los apuntes de Mario se ve que pone cada atributo a la constante por separado, pero aquí se junta todo?
//Para buscar todas las asignaturas simultáneamente en vez de las asignadas a usuarios
TaskSchema.methods.findAll= async function () {
  const Task = mongoose.model("tasks", TaskSchema);
  return await Task.find();
};

//Cambiado el nombre del método para evitar conflictos
TaskSchema.methods.findAllUser= async function (usuario) {
  const Task = mongoose.model("tasks", TaskSchema);
  return await Task.find({'usuario':usuario});
};

//Cambiado a lo que nos dijo Mario de Promises
TaskSchema.methods.insert= async function () {
  await this.save()
  .then(result => console.log(result))
  .catch(error => console.log(error));
};

//Cambiado a lo que nos dijo Mario de Promises
TaskSchema.methods.update= async (id, task) => {
  const Task = mongoose.model("tasks", TaskSchema);
  await Task.updateOne({_id: id})
    .then(result => console.log(result))
  .catch(error => console.log(error));
};

TaskSchema.methods.delete= async function (id) {
  const Task = mongoose.model("tasks", TaskSchema);
  await Task.deleteOne({_id: id}, err => {
    if (err) console.log(err);
  });
  console.log(id + " deleted");

};

TaskSchema.methods.findById= async function (id) {
  const Task = mongoose.model("tasks", TaskSchema);
  return await Task.findById(id);
};

TaskSchema.methods.findSearch= async function (search, usuario) {
  const Task = mongoose.model("tasks", TaskSchema);
  return await Task.find({'title' : new RegExp(search, 'i'),'usuario': usuario});
};


module.exports = mongoose.model('tasks', TaskSchema);
