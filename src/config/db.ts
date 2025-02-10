import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI || '');
    console.log(`Conectado a la base de datos mongodb`);
  } catch (error: any) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

export default connectDB;
