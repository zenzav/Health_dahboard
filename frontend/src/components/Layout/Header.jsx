import React from 'react';
import { Menu, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const pageTitles = {
  '/dashboard': 'Overview',
  '/departments': 'Departments',
  '/staff': 'Staff Management',
  '/doctors': 'Doctors',
  '/patients': 'Patients',
  '/equipments': 'Equipments',
  '/settings': 'Settings',
};

export default function Header({ onMenuClick }) {
  const { user } = useAuth();
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800 leading-tight">
              {user?.name || 'Admin'}
            </p>
            <p className="text-xs text-gray-400 capitalize">{user?.role || 'Administrator'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
