const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * studentService.js
 * 
 * INTEGRATION LAYER:
 * Now using the real 'fetch' API to connect to the Node.js backend.
 * Uses async/await and includes comprehensive error handling.
 */

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }
  return response.json();
};

export const studentService = {
  // GET all students
  async getAllStudents() {
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      return await handleResponse(response);
    } catch (error) {
      console.error('API Error (getAllStudents):', error);
      throw error;
    }
  },

  // GET student by ID
  async getStudentById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error(`API Error (getStudentById ${id}):`, error);
      throw error;
    }
  },

  // POST (Create) new student
  async createStudent(studentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('API Error (createStudent):', error);
      throw error;
    }
  },

  // PUT (Update) existing student
  async updateStudent(id, studentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`API Error (updateStudent ${id}):`, error);
      throw error;
    }
  },

  // DELETE student
  async deleteStudent(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
      return true;
    } catch (error) {
      console.error(`API Error (deleteStudent ${id}):`, error);
      throw error;
    }
  }
};
