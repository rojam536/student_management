import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, ShieldCheck, Zap, Users, Star, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';

/**
 * Enhanced Landing Page
 * 
 * DESIGN CONCEPTS:
 * - Gradient backgrounds and text for a premium feel.
 * - Glassmorphism effects on cards.
 * - Interactive elements and better spacing.
 */
const Landing = () => {
  const features = [
    {
      title: 'Full CRUD Support',
      description: 'Easily Create, Read, Update, and Delete student records with our intuitive interface.',
      icon: <Zap className="text-amber-500" size={24} />,
      bg: 'bg-amber-50'
    },
    {
      title: 'Clean Architecture',
      description: 'Built with modern React principles ensuring scalability and easy maintenance.',
      icon: <ShieldCheck className="text-emerald-500" size={24} />,
      bg: 'bg-emerald-50'
    },
    {
      title: 'Real-time Management',
      description: 'Instant feedback and responsive UI for managing large student bodies efficiently.',
      icon: <Users className="text-sky-500" size={24} />,
      bg: 'bg-sky-50'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        {/* Hero Section with Mesh Gradient */}
        <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400 blur-[120px]"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-purple-400 blur-[120px]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full mb-8">
              <Star size={16} className="text-indigo-600 fill-indigo-600" />
              <span className="text-sm font-semibold text-indigo-700 uppercase tracking-wider">Trusted by 500+ Institutions</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-8">
              Manage your students <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                with modern precision.
              </span>
            </h1>
            
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
              SMS Pro is the world's most intuitive student management platform. 
              Built for speed, styled for elegance, and designed for results.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/dashboard">
                <Button className="px-10 py-4 text-lg rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Get Started Free
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link to="/add">
                <Button variant="outline" className="px-10 py-4 text-lg rounded-xl border-gray-200 hover:bg-gray-50 transition-all">
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-20 flex flex-wrap justify-center items-center gap-8 grayscale opacity-50">
              <div className="font-bold text-2xl tracking-tighter text-gray-400">EDUCORE</div>
              <div className="font-bold text-2xl tracking-tighter text-gray-400">CAMPUS+</div>
              <div className="font-bold text-2xl tracking-tighter text-gray-400">SCHOLAR</div>
              <div className="font-bold text-2xl tracking-tighter text-gray-400">INSTITUTE</div>
            </div>
          </div>
        </section>

        {/* Features Section with Card Design */}
        <section className="bg-gray-50/50 py-24 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-[0.2em] mb-4">Features</h2>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Built for the future of education.</h3>
              <p className="text-gray-600 text-lg">Every tool you need to streamline student administration in one powerful dashboard.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <div key={index} className="group relative bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className={`${feature.bg} w-16 h-16 flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {['Fast performance', 'Secure data', 'Mobile ready'].map((item) => (
                      <li key={item} className="flex items-center text-sm text-gray-500">
                        <CheckCircle2 size={16} className="mr-2 text-indigo-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-2xl">
            <GraduationCap size={32} />
            <span>SMS Pro</span>
          </div>
          <div className="flex space-x-8 text-gray-500 text-sm font-medium">
            <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>
          <div className="text-gray-400 text-sm">
            &copy; 2026 SMS Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

