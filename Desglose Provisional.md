<!-- Para tachar una frase hay encapsular esa frase entre "~~"-->
<!-- Para poner una cruz en una tarea, hay que colocar una "x" dentro de los "[ ]", "[x]"-->

# Desglose del programa:

***Tocara revisar cada parte y plantearlo todo en algún momento.***

<h1 align="center">
Models
</h1>

> [!Important] 
> - [ ] **Models: task.js - Apartados:**
> 	- [ ] Cambiar atributos a los de asignatura
> 	- [ ] Añadir métodos
> 	  - [ ] findAll ligado a usuario
> 	  - [ ] findAll no ligado a usuario (¿para admins? ¿Para testear?)
> 	  - [ ] insert
> 	  - [ ] update
>     - [ ] delete
> 	  - [ ] findById (¿necesario?)
> 	  - [ ] find de barra de búsqueda (findSearch) (¿necesario?)

> [!Important] 
> - [ ] **Models: user.js - Apartados:**
>   - [ ] Cambiar atributos a los de usuario
>   - [ ] Añadir métodos (adaptar a lo que puso Mario en Discord)
>     - [ ] encryptPassword
>     - [ ] comparePassword
>     - [ ] findEmail
>     - [ ] insert 

> [!Important] 
> - [ ] **Models: software.js - Apartados:**
>   - [ ] Atributos de software
>     - [ ] Descripción
>     - [ ] URL
>     - [ ] asignatura (ref)
>   - [ ] Añadir métodos (seguramente falten más)
>     - [ ] insert
>     - [ ] update
>     - [ ] delete

---

<h1 align="center">
Passport
</h1>

> [!Important]
> - [ ] **Passport: local-auth.js - Apartados:**
>   - [ ] Nada que cambiar (¿?)

---

<h1 align="center">
Routes
</h1>

> [!Important]
> - [ ] **Routes: tasks.js - Apartados:**
>   - [ ] Función para verificar si está autentificado el usuario (no estoy muy seguro de esto)
>    - [ ] **POST**
>     - [ ] Añadir asignatura (/tasks/add)
>     - [ ] Editar asignatura según su id (/tasks/edit/:id)
>    - [ ] **GET**
>      - [ ] Quitar la de cambiar de estado (?) (/tasks/turn/:id)
>      - [ ] Llegar a la pantalla de editar asignatura (/tasks/edit/:id)
>      - [ ] Borrar asignatura según su id (/tasks/delete/:id)
>      - [ ] Buscar asignatura por nombre (/tasks/search ligado a findSearch de task.js) (¿necesario?)

> [!Note]
> - ***users.js (probablemente se quede igual que ahora, pero solo un admin puede hacer un signup)***

---

<h1 align="center">
Views
</h1>

> [!Important]
> - [ ] **Views: Index - Apartados:**
>   - [ ] Header
>   - [ ] Footer
> - [ ] **Views: Sign in - Apartado**
> - [ ] **Views: Sign up - Apartado** ***(solo admins)***
> - [ ] **Views: Perfil - Apartados:**
>   - [ ] Se muestran los atributos correspondientes
> - [ ] **Views: Asignaturas - Apartados:**
>   - [ ] Se muestran los atributos correspondientes
>   - [ ] Se ven todos los alumnos que tienen cada asignatura (?)
> - [ ] **Views: Error - Apartado** ***(para página no encontrada)***
> - [ ] **Views: Editar asignatura - Apartados:**
>   - [ ] Permite editar descripción de software a profesores
>   - [ ] Crear, editar y borrar asignaturas a admins (?)
