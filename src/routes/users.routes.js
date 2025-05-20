import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email ya registrado' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

export default router;
