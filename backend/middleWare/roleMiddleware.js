const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ msg: "access dined" });
    }
    next();
  };
};

module.exports = authorize;
