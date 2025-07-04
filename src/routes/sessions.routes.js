import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { auth } from '../middlewares/auth.js';
import { userDTO } from '../dto/user.dto.js';

const router = Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    req.login(user, { session: false }, (error) => {
      if (error) return next(error);

      const payload = {
        id: user._id,
        email: user.email,
        role: user.role
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.json({ token });
    });
  })(req, res, next);
});

router.get('/current', auth, (req, res) => {
  const safeUser = userDTO(req.user);
  res.json(safeUser);
});

export default router;
