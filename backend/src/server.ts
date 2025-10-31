import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: '🍔 API i2TASTE funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Ruta de salud (health check)
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    
    // Levantar servidor
    app.listen(PORT, () => {
      console.log('═══════════════════════════════════════');
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📚 Documentación: http://localhost:${PORT}/`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
      console.log('═══════════════════════════════════════');
    });
  } catch (error) {
    console.error('❌ Error al iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;