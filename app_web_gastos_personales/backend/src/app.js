const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { setRoutes } = require('./routes/index');
const ExpensesController = require('./controllers');

// Configuración de variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON y form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS más específica
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Permitir solo el origen del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type'], // Headers permitidos
}));

// Middleware para manejar errores de JSON mal formado
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'JSON mal formado' });
    }
    next();
});

// Set routes
setRoutes(app);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Manejar errores de inicio del servidor
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`El puerto ${PORT} está en uso. Intenta con otro puerto.`);
    } else {
        console.error('Error al iniciar el servidor:', error);
    }
    process.exit(1);
});

// Manejar señales de terminación
process.on('SIGTERM', () => {
    console.log('Recibida señal SIGTERM. Cerrando servidor...');
    server.close(() => {
        console.log('Servidor cerrado.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('Recibida señal SIGINT. Cerrando servidor...');
    server.close(() => {
        console.log('Servidor cerrado.');
        process.exit(0);
    });
});