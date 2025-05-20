import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import usersRouter from './routes/users.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.log('❌ Error conectando a MongoDB:', err));

app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
