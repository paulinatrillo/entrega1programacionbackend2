import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import usersRouter from './routes/users.routes.js';
import sessionsRouter from './routes/sessions.routes.js';
import { initializePassport } from './config/passport.js';
import User from './models/user.js';

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB conectado');
    User.findOne()
      .then(user => {
        if (user) {
          console.log('Usuario encontrado:', user.email);
        } else {
          console.log('No hay usuarios en la base de datos aún');
        }
      })
      .catch(err => console.log('Error buscando usuario:', err));
  })
  .catch(err => console.log('❌ Error conectando a MongoDB:', err));

initializePassport();
app.use(passport.initialize());

app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

export default app;
