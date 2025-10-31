// components/Sidebar.tsx
import React from 'react';
import { MenuItem } from '../types';

const menuItems: MenuItem[] = [
  { name: 'Dashboard', path: '/', icon: '🏠' },
  { name: 'CV & Profile', path: '/cv', icon: '📄' },
  { name: 'Interview Coach', path: '/interview', icon: '🎤' },
  { name: 'Flight Opportunities', path: '/jobs', icon: '✈️' },
  { name: 'Crew Network', path: '/network', icon: '👥' },
  { name: 'Career Guide', path: '/career', icon: '📚' },
];

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white shadow-sm min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;