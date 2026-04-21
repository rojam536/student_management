const Student = require("../models/student.model");
const generateId = require("../utils/generateId");
const ApiError = require("../utils/ApiError");

let students = []; // In-memory storage

class StudentService {
  create(data) {
    const errors = Student.validate(data);
    if (errors.length) {
      throw new ApiError(400, errors.join(", "));
    }

    const student = new Student({
      id: generateId(),
      ...data,
      createdAt: new Date(),
    });

    students.push(student);
    return student;
  }

  getAll({ page = 1, limit = 5, search = "" }) {
    let filtered = students;

    if (search) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      total: filtered.length,
      page,
      limit,
      data: paginated,
    };
  }

  getById(id) {
    const student = students.find(s => s.id === id);
    if (!student) throw new ApiError(404, "Student not found");
    return student;
  }

  update(id, data) {
    const student = this.getById(id);

    Object.assign(student, data);
    return student;
  }

  delete(id) {
    const index = students.findIndex(s => s.id === id);
    if (index === -1) throw new ApiError(404, "Student not found");

    students.splice(index, 1);
    return { message: "Deleted successfully" };
  }
}

module.exports = new StudentService();