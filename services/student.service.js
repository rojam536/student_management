const Student = require("../models/student.model");
const ApiError = require("../utils/ApiError");

class StudentService {
  async create(data) {
    try {
      const student = await Student.create(data);
      return student;
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        throw new ApiError(400, errors.join(', '));
      }
      throw new ApiError(500, 'Database error');
    }
  }

  async getAll({ page = 1, limit = 5, search = "" }) {
    try {
      const query = search ? { name: { $regex: search, $options: 'i' } } : {};

      const total = await Student.countDocuments(query);
      const students = await Student.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      return {
        total,
        page,
        limit,
        data: students,
      };
    } catch (error) {
      throw new ApiError(500, 'Database error');
    }
  }

  async getById(id) {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(400, 'Invalid student ID');
      }

      const student = await Student.findById(id);
      if (!student) throw new ApiError(404, "Student not found");
      return student;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Database error');
    }
  }

  async update(id, data) {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(400, 'Invalid student ID');
      }

      const student = await Student.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!student) throw new ApiError(404, "Student not found");
      return student;
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        throw new ApiError(400, errors.join(', '));
      }
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Database error');
    }
  }

  async delete(id) {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(400, 'Invalid student ID');
      }

      const student = await Student.findByIdAndDelete(id);
      if (!student) throw new ApiError(404, "Student not found");
      return { message: "Deleted successfully" };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Database error');
    }
  }
}

module.exports = new StudentService();