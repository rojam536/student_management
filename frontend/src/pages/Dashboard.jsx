import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Search, SlidersHorizontal, AlertCircle, Users, GraduationCap, BookOpen, Clock } from 'lucide-react';
import StudentCard from '../components/StudentCard';
import Button from '../components/Button';
import { studentService } from '../services/studentService';

/**
 * Enhanced Dashboard Page
 */
const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getAllStudents();
      // Ensure we are setting an array even if API returns nested object
      setStudents(Array.isArray(data) ? data : (data.students || []));
    } catch (err) {
      console.error('Failed to fetch students:', err);
      setError('Could not connect to the server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        // Optimistic UI Update: Filter locally first for instant feedback
        const previousStudents = [...students];
        setStudents(prev => prev.filter(s => s._id !== id && s.id !== id));
        
        await studentService.deleteStudent(id);
      } catch (err) {
        alert('Failed to delete student. Reverting changes.');
        fetchStudents(); // Refetch to sync state
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const filteredStudents = students.filter(student => 
    (student.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (student.course?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = [
    { label: 'Total Students', value: students.length, icon: <Users size={20} />, color: 'bg-blue-500' },
    { label: 'Active Courses', value: new Set(students.map(s => s.course)).size, icon: <BookOpen size={20} />, color: 'bg-purple-500' },
    { label: 'Avg. Age', value: students.length ? (students.reduce((acc, s) => acc + (Number(s.age) || 0), 0) / students.length).toFixed(1) : 0, icon: <Clock size={20} />, color: 'bg-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <nav className="flex mb-4 text-sm font-medium text-gray-500 space-x-2">
              <span>Home</span>
              <span>/</span>
              <span className="text-indigo-600">Dashboard</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Student Directory</h1>
            <p className="mt-1 text-gray-500 font-medium">Overview of your academic community.</p>
          </div>
          <Button 
            onClick={() => navigate('/add')} 
            className="h-12 px-6 rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg transition-all"
          >
            <UserPlus size={20} className="mr-2" />
            Add New Student
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-100 p-6 rounded-[2rem] flex flex-col items-center text-center">
            <AlertCircle className="text-red-500 mb-2" size={32} />
            <p className="text-red-800 font-bold mb-4">{error}</p>
            <Button variant="secondary" onClick={fetchStudents} className="bg-red-100 text-red-600 border-none">
              Retry Connection
            </Button>
          </div>
        )}

        {/* Stats Grid */}
        {!error && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg shadow-gray-100`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search & Actions */}
        {!error && (
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, ID, or course..."
                className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-gray-700 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center px-6 py-2 bg-gray-50 rounded-xl text-sm font-bold text-gray-500">
              <SlidersHorizontal size={18} className="mr-3" />
              {filteredStudents.length} Results
            </div>
          </div>
        )}

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-indigo-50 border-t-indigo-600 animate-spin"></div>
            </div>
            <p className="mt-6 text-gray-500 font-bold tracking-tight">Accessing records...</p>
          </div>
        ) : filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudents.map(student => (
              <StudentCard 
                key={student._id || student.id} 
                student={student} 
                onEdit={() => handleEdit(student._id || student.id)}
                onDelete={() => handleDelete(student._id || student.id)}
              />
            ))}
          </div>
        ) : !error && (
          <div className="bg-white rounded-[2rem] border-2 border-dashed border-gray-100 p-20 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-8 font-medium">
              {searchTerm 
                ? `We couldn't find anything matching "${searchTerm}".` 
                : "Your student directory is currently empty."}
            </p>
            <Button variant="secondary" onClick={() => navigate('/add')} className="rounded-xl px-8 py-3">
              Register First Student
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

