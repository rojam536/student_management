const Student = require("../models/student.model");

module.exports = async (req, res, next) => {
  try {
    // Basic validation before hitting DB
    const { name, age, course } = req.body;
    const errors = [];

    if (!name || typeof name !== "string" || name.trim() === "") {
      errors.push("Name is required and must be a non-empty string");
    }

    if (!age || typeof age !== "number" || age <= 0) {
      errors.push("Age must be a positive number");
    }

    if (!course || typeof course !== "string" || course.trim() === "") {
      errors.push("Course is required and must be a non-empty string");
    }

    if (errors.length) {
      return res.status(400).json({ errors });
    }

    next();
  } catch (error) {
    next(error);
  }
};