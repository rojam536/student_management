import React from 'react';
import { User, BookOpen, Clock, Edit, Trash2, MoreVertical, GraduationCap } from 'lucide-react';
import Button from './Button';

/**
 * Enhanced StudentCard
 */
const StudentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="group bg-white rounded-[2rem] border border-gray-100 p-8 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[5rem] -z-10 group-hover:bg-indigo-600 transition-colors duration-500 opacity-50 group-hover:opacity-100"></div>
      
      <div className="flex justify-between items-start mb-8">
        <div className="relative">
          <div className="bg-indigo-100 p-4 rounded-2xl text-indigo-600 group-hover:bg-white group-hover:text-indigo-600 transition-colors duration-500 shadow-sm">
            <User size={28} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-5 h-5 rounded-full border-4 border-white"></div>
        </div>
        <button className="text-gray-300 hover:text-indigo-600 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="space-y-1 mb-8">
        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Student ID #{student.id}</p>
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-500">{student.name}</h3>
      </div>

      <div className="space-y-4 mb-10">
        <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-all">
          <div className="bg-white p-2 rounded-lg mr-4 shadow-sm text-gray-400">
            <BookOpen size={16} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Major</p>
            <p className="text-sm font-bold text-gray-700">{student.course}</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-all">
          <div className="bg-white p-2 rounded-lg mr-4 shadow-sm text-gray-400">
            <Clock size={16} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Age Group</p>
            <p className="text-sm font-bold text-gray-700">{student.age} Years Old</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="secondary" 
          onClick={() => onEdit(student.id)}
          className="rounded-xl py-3 font-bold text-xs uppercase tracking-widest bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white border-none shadow-none"
        >
          <Edit size={14} className="mr-2" />
          Edit
        </Button>
        <Button 
          variant="danger" 
          onClick={() => onDelete(student.id)}
          className="rounded-xl py-3 font-bold text-xs uppercase tracking-widest bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border-none shadow-none"
        >
          <Trash2 size={14} className="mr-2" />
          Drop
        </Button>
      </div>
    </div>
  );
};

export default StudentCard;

