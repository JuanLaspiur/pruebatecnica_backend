import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import routes from './routes/index';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './docs/swagger';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(`/api`, routes);

const PORT: number = parseInt(process.env.PORT || '3000', 10);
connectDB();

app.get('/', (req: Request, res: Response): void => {
  res.send('¡Hola, mundo!');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, (): void => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});
