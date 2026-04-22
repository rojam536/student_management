// Simulated mock data
let students = [
  { id: 1, name: 'John Doe', age: 20, course: 'Computer Science' },
  { id: 2, name: 'Jane Smith', age: 22, course: 'Mathematics' },
  { id: 3, name: 'Alice Johnson', age: 21, course: 'Physics' },
];

/**
 * studentService.js
 * 
 * WHY THIS FILE?
 * 1. Abstraction: The components don't need to know WHERE the data comes from (mock or real API).
 * 2. Maintainability: When we switch to a real backend, we only change code in this file.
 * 3. Reusability: Multiple components can use these same data-fetching functions.
 */

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const studentService = {
  // GET all students
  async getAllStudents() {
    await delay();
    // Use spread to return a new array (immutability principle)
    return [...students];
  },

  // GET student by ID
  async getStudentById(id) {
    await delay();
    return students.find(s => s.id === parseInt(id));
  },

  // POST (Create) new student
  async createStudent(studentData) {
    await delay();
    const newStudent = {
      ...studentData,
      id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1
    };
    students.push(newStudent);
    return newStudent;
  },

  // PUT (Update) existing student
  async updateStudent(id, studentData) {
    await delay();
    const index = students.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
      students[index] = { ...students[index], ...studentData };
      return students[index];
    }
    throw new Error('Student not found');
  },

  // DELETE student
  async deleteStudent(id) {
    await delay();
    students = students.filter(s => s.id !== parseInt(id));
    return true;
  }
};
