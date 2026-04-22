import React, { useState, useEffect } from 'react';
import { User, BookOpen, Calendar, ArrowRight, X } from 'lucide-react';
import Button from './Button';

/**
 * Enhanced StudentForm
 */
const StudentForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    course: ''
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter student name';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (formData.age < 1 || formData.age > 100) newErrors.age = 'Enter a valid age';
    if (!formData.course.trim()) newErrors.course = 'Please specify a course';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const inputGroupClass = (field) => `
    relative group rounded-[1.25rem] transition-all duration-300 border-2
    ${focusedField === field ? 'border-indigo-600 bg-white shadow-lg shadow-indigo-50' : 'border-gray-50 bg-gray-50/50 hover:bg-white hover:border-gray-200'}
    ${errors[field] ? 'border-red-500 bg-red-50/10' : ''}
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name Input */}
      <div>
        <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2 mb-3 block">
          Full Name
        </label>
        <div className={inputGroupClass('name')}>
          <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'name' ? 'text-indigo-600' : 'text-gray-300'}`}>
            <User size={20} />
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            onChange={handleChange}
            className="w-full bg-transparent pl-14 pr-6 py-5 outline-none font-bold text-gray-900 placeholder:text-gray-300 placeholder:font-medium"
            placeholder="Johnathan Doe"
          />
        </div>
        {errors.name && <p className="mt-2 text-xs font-bold text-red-500 ml-2 italic">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Age Input */}
        <div>
          <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2 mb-3 block">
            Age
          </label>
          <div className={inputGroupClass('age')}>
            <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'age' ? 'text-indigo-600' : 'text-gray-300'}`}>
              <Calendar size={20} />
            </div>
            <input
              type="number"
              name="age"
              value={formData.age}
              onFocus={() => setFocusedField('age')}
              onBlur={() => setFocusedField(null)}
              onChange={handleChange}
              className="w-full bg-transparent pl-14 pr-6 py-5 outline-none font-bold text-gray-900 placeholder:text-gray-300 placeholder:font-medium"
              placeholder="21"
            />
          </div>
          {errors.age && <p className="mt-2 text-xs font-bold text-red-500 ml-2 italic">{errors.age}</p>}
        </div>

        {/* Course Input */}
        <div>
          <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2 mb-3 block">
            Major / Course
          </label>
          <div className={inputGroupClass('course')}>
            <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'course' ? 'text-indigo-600' : 'text-gray-300'}`}>
              <BookOpen size={20} />
            </div>
            <input
              type="text"
              name="course"
              value={formData.course}
              onFocus={() => setFocusedField('course')}
              onBlur={() => setFocusedField(null)}
              onChange={handleChange}
              className="w-full bg-transparent pl-14 pr-6 py-5 outline-none font-bold text-gray-900 placeholder:text-gray-300 placeholder:font-medium"
              placeholder="Software Engineering"
            />
          </div>
          {errors.course && <p className="mt-2 text-xs font-bold text-red-500 ml-2 italic">{errors.course}</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="w-full sm:w-auto px-8 py-4 rounded-xl border-none font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
        >
          Discard
        </Button>
        <Button 
          type="submit" 
          isLoading={isLoading}
          className="w-full sm:w-auto px-10 py-4 rounded-xl shadow-xl shadow-indigo-100 font-black uppercase tracking-widest text-sm"
        >
          {initialData ? 'Update Record' : 'Confirm Entry'}
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;

