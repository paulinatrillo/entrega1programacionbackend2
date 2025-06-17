import passport from 'passport';

export const auth = passport.authenticate('jwt', { session: false });

export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'No autenticado' });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    next();
  };
};

export const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'No autenticado' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    next();
  };
};
