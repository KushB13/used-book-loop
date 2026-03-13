import React from 'react';
import { Avatar } from '../atoms/Avatar';

export const UserProfile = ({ user, profile, onLogout, onNavigateProfile }) => {
  return (
    <div className="flex items-center space-x-3 group transition-all duration-300">
      {/* Profile Info & Avatar Group */}
      <div 
        className="flex items-center space-x-4 cursor-pointer p-1.5 pr-5 border border-slate-100/50 bg-white/50 backdrop-blur-sm rounded-[1.5rem] hover:bg-slate-50 hover:border-slate-200 transition-all shadow-sm"
        onClick={onNavigateProfile}
      >
        <Avatar src={profile?.avatar || user?.photoURL} size="md" showGoogle={true} />
        
        <div className="text-right hidden sm:block">
          <p className="text-sm font-black text-slate-800 leading-none mb-1">
            {profile?.displayName || user?.displayName?.split(' ')[0] || 'Set Name'}
          </p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter opacity-70">
            {user?.email?.split('@')[0]}
          </p>
        </div>
      </div>

      {/* Independent Logout Button */}
      <button 
        onClick={onLogout}
        className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all shadow-sm group"
        title="Logout"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">👋</span>
      </button>
    </div>
  );
};
