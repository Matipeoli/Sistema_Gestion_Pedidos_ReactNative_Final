import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'reactnative',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3307,
    dialect: 'mysql',
    logging: false, // Cambiar a console.log para ver queries SQL
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a MySQL correctamente');
    
    // Sincronizar modelos (crea tablas si no existen)
    await sequelize.sync({ alter: false }); // cambiar a true para actualizar tablas
    console.log('✅ Modelos sincronizados');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

export default sequelize;