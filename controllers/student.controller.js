const studentService = require("../services/student.service");

exports.createStudent = async (req, res, next) => {
  try {
    const student = studentService.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

exports.getStudents = async (req, res, next) => {
  try {
    const { page, limit, search } = req.query;

    const result = studentService.getAll({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const student = studentService.getById(req.params.id);
    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const student = studentService.update(req.params.id, req.body);
    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const result = studentService.delete(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};