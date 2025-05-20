import passport from 'passport';
import LocalStrategy from 'passport-local';
import JwtStrategy from 'passport-jwt';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const LocalStrategyConstructor = LocalStrategy.Strategy;
const JwtStrategyConstructor = JwtStrategy.Strategy;
const ExtractJwt = JwtStrategy.ExtractJwt;

export const initializePassport = () => {
  passport.use('login', new LocalStrategyConstructor({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'Usuario no encontrado' });

      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) return done(null, false, { message: 'Contraseña incorrecta' });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  passport.use('jwt', new JwtStrategyConstructor({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      return done(error);
    }
  }));
};
