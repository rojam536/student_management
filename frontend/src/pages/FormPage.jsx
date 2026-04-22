import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, GraduationCap, Sparkles } from 'lucide-react';
import StudentForm from '../components/StudentForm';
import { studentService } from '../services/studentService';

/**
 * Enhanced Form Page
 */
const FormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const student = await studentService.getStudentById(id);
          if (student) {
            setInitialData(student);
          } else {
            alert('Student not found');
            navigate('/dashboard');
          }
        } catch (err) {
          console.error('Fetch error:', err);
        } finally {
          setFetching(false);
        }
      };
      fetchStudent();
    }
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (id) {
        await studentService.updateStudent(id, formData);
      } else {
        await studentService.createStudent(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to save data');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50/50">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="group flex items-center text-gray-400 hover:text-indigo-600 mb-10 transition-colors font-bold uppercase tracking-widest text-xs"
        >
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Directory
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 overflow-hidden border border-gray-100">
          <div className="relative bg-indigo-600 px-10 py-12 text-white overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 rounded-full bg-indigo-400/20 blur-2xl"></div>
            
            <div className="relative flex items-center space-x-5">
              <div className="bg-white/20 p-4 rounded-[1.25rem] backdrop-blur-md border border-white/20 shadow-xl">
                {id ? <Sparkles className="text-white" size={32} /> : <GraduationCap className="text-white" size={32} />}
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">
                  {id ? 'Edit Profile' : 'New Admission'}
                </h1>
                <p className="text-indigo-100 font-medium mt-1">
                  {id ? `Updating record #${id}` : 'Create a new student entry'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="px-10 py-12">
            <StudentForm 
              initialData={initialData} 
              onSubmit={handleSubmit}
              onCancel={() => navigate('/dashboard')}
              isLoading={loading}
            />
          </div>
        </div>
        
        <p className="text-center mt-10 text-gray-400 text-sm font-medium">
          All changes are saved instantly to the local directory.
        </p>
      </div>
    </div>
  );
};

export default FormPage;

