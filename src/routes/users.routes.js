import { Router } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email ya registrado' });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ first_name, last_name, email, age, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error });
  }
});

export default router;
