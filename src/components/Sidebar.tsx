import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Users, MessageSquare, Settings } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import clsx from 'clsx';

const navItems = [
  { icon: Terminal, label: 'Feed', path: '/' },
  { icon: Users, label: 'Network', path: '/network' },
  { icon: MessageSquare, label: 'Chat', path: '/chat' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="w-64 bg-gray-800 p-4">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <img
            src={user?.avatar}
            alt={user?.username}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-bold">{user?.username}</h2>
            <p className="text-sm text-gray-400">Developer</p>
          </div>
        </div>
      </div>
      <nav>
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={clsx(
              'flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors',
              location.pathname === path
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            )}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}