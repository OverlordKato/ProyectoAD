const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/sugerencias', async (req, res) => {
    const success = req.query.success; // Obtener el parámetro de consulta "success"
    const error = req.query.error;
    res.render('sugerencias_formulario', { success, error }); // Pasar el parámetro "success" a la vista
});


// Ruta para procesar el envío del formulario de sugerencias
router.post('/sugerencias/enviar', async (req, res) => {
    const { name, suggestion } = req.body;

    try {
        // Configuración del transportador de correo electrónico
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'shaylee.kuhlman@ethereal.email',
                pass: 'CpDCAKnFu2kyVt4WUE'
            }
        });

        // Opciones del correo electrónico
        let mailOptions = {
            from: 'shaylee.kuhlman@ethereal.email',
            to: 'dam2proyectoad3@gmail.com',
            subject: `Asunto: ${name}`,
            text: `Sugerencia: ${suggestion}`
        };

        // Enviar correo electrónico al administrador
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado: ' + info.response);

        // Redireccionar con parámetro de éxito
        res.redirect('/sugerencias?success=true');
    } catch (error) {
        console.log(error);

        // Redireccionar con parámetro de error
        res.redirect('/sugerencias?error=true');
    }
});

module.exports = router;
