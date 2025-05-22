
# Gestor de Gastos Personales

Esta es una aplicación web completa para gestionar gastos personales, construida con React en el frontend y Express.js en el backend.

## Características

*   **CRUD de Gastos:** Crear, leer, actualizar y eliminar gastos.
*   **Gestión de Estado Global:** Uso de React Context API para manejar el estado de los gastos.
*   **Navegación:** Rutas para la página principal, añadir gasto y editar gasto.
*   **Validación de Datos:** Validaciones tanto en el frontend como en el backend.
*   **Notificaciones Toast:** Feedback al usuario para todas las acciones.
*   **Persistencia de Datos:** Los gastos se almacenan en el servidor.

## Tecnologías Utilizadas

### Frontend
*   **Vite:** Herramienta de construcción y servidor de desarrollo.
*   **React:** Biblioteca para construir interfaces de usuario.
*   **React Router:** Para la navegación en la aplicación.
*   **TailwindCSS:** Framework CSS para estilos.
*   **shadcn/ui:** Componentes de UI reutilizables.
*   **Lucide React:** Iconos.
*   **Framer Motion:** Para animaciones.

### Backend
*   **Express.js:** Framework web para Node.js.
*   **CORS:** Para permitir peticiones desde el frontend.
*   **dotenv:** Para manejar variables de entorno.

## Estructura del Proyecto

```
/
|-- src/                  # Frontend
|   |-- components/       # Componentes React
|   |-- context/         # Context API y gestión de estado
|   |-- lib/            # Utilidades y funciones API
|   |-- pages/          # Páginas de la aplicación
|   |-- App.jsx         # Componente principal
|   |-- main.jsx        # Punto de entrada
|
|-- backend/             # Backend
|   |-- src/
|   |   |-- controllers/ # Controladores
|   |   |-- routes/      # Rutas API
|   |   |-- app.js       # Aplicación Express
|   |   `-- ExpenseForm.jsx
|   |-- context/
|   |   `-- ExpenseContext.jsx
|   |-- lib/
|   |   `-- utils.js    (Utilidad cn para Tailwind)
|   |-- pages/
|   |   |-- AddExpensePage.jsx
|   |   |-- EditExpensePage.jsx
|   |   `-- HomePage.jsx
|   |-- App.jsx         (Componente principal y configuración de rutas)
|   |-- index.css       (Estilos globales y configuración de Tailwind)
|   `-- main.jsx        (Punto de entrada de la aplicación React)
|-- .eslintrc.cjs
|-- .gitignore
|-- index.html
|-- package.json
|-- postcss.config.js
|-- tailwind.config.js
`-- vite.config.js
```

## Instalación y Ejecución

1. Clona el repositorio:
   ```bash
   git clone [URL del repositorio]
   ```

2. Instala las dependencias del frontend:
   ```bash
   npm install
   ```

3. Instala las dependencias del backend:
   ```bash
   cd backend
   npm install
   ```

4. Inicia el backend (desde la carpeta backend):
   ```bash
   node src/app.js
   ```
   El servidor backend estará disponible en `http://localhost:3000`

5. Inicia el frontend (desde la carpeta raíz):
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`