const Student = require("../models/student.model");

module.exports = (req, res, next) => {
  const errors = Student.validate(req.body);

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  next();
};