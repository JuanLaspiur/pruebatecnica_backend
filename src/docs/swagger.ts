import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Challenge DevUniversity',
      description: 'To-do list',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Servidor local de desarrollo',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
  
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
