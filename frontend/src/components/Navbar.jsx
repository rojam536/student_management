import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, Home, UserPlus } from 'lucide-react';

/**
 * Navbar Component
 * 
 * ACCESSIBILITY & SEMANTIC HTML:
 * Using <nav> tag for navigation landmarks.
 * Proper links with clear labels.
 */
const Navbar = () => {
  const navLinks = [
    { to: '/', label: 'Home', icon: <Home size={18} /> },
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { to: '/add', label: 'Add Student', icon: <UserPlus size={18} /> },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-indigo-600 font-bold text-xl">
              <GraduationCap size={28} />
              <span>SMS Pro</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
