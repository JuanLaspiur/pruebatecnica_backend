# Backend Typescript-Next

Este es un proyecto de backend simple utilizando **TypeScript** con **Express**.

## Requisitos previos
nextproyecto38@gmail.com
Asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 18 o superior recomendada)
- **npm** o **yarn**

## Configuración del proyecto

### Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd backend_typescrit-next

npm install
 
 backend_typescrit-next/
├── src/
│   ├── index.ts       # Archivo principal de la aplicación
│   ├── routes/        # Define las rutas del servidor
│   ├── middlewares/   # Middlewares personalizados
│   ├── controllers/   # Lógica de negocio
│   └── models/        # Modelos de datos
├── dist/              # Archivos compilados (se genera después de `npm run build`)
├── package.json       # Configuración del proyecto y dependencias
├── tsconfig.json      # Configuración de TypeScript
└── README.md          # Documentación del proyecto
npm run dev

npm run build
npm start
