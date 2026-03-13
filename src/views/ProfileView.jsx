import React, { useState, useEffect } from 'react';
import { STYLES, THEME } from '../assets/Theme';
import { Avatar } from '../components/atoms/Avatar';
import { updateProfile } from '../database/ProfileService';

export const ProfileView = ({ userId, profile }) => {
  const [formData, setFormData] = useState({ displayName: '', bio: '', avatar: '📖' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  const handleSave = async () => {
    if (!formData.displayName) {
      setMsg({ type: 'error', text: 'Display name is required.' });
      return;
    }
    setLoading(true);
    try {
      await updateProfile(userId, formData);
      setMsg({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMsg(null), 3000);
    } catch (e) {
      setMsg({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  const avatars = ['📖', '☕', '🕯️', '🌿', '🖋️', '🔍', '🦉', '📜', '🏹', '🐺'];

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight" style={{ fontFamily: THEME.fonts.heading }}>Explorer Profile</h2>
        <p className="text-slate-400 mt-2 font-medium">Manage your identity in the Book-Loop society.</p>
      </div>

      {msg && (
        <div className={`mb-8 p-6 rounded-[2rem] text-xs font-black text-center uppercase tracking-widest border transition-all animate-in fade-in slide-in-from-top-4 ${msg.type === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
          {msg.text}
        </div>
      )}

      <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col items-center space-y-8 mb-12">
          <div className="relative group">
             <Avatar src={formData.avatar} size="lg" />
             <div className="absolute inset-0 bg-indigo-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-2xl">📸</div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {avatars.map(a => (
              <button 
                key={a} 
                onClick={() => setFormData({...formData, avatar: a})}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all text-2xl ${formData.avatar === a ? 'border-indigo-600 bg-indigo-50 scale-110 shadow-lg shadow-indigo-100' : 'border-slate-50 bg-slate-50 hover:border-indigo-100 hover:bg-white'}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block">Explorer Alias</label>
            <input 
              className={`${STYLES.input} text-base h-16 px-6`} 
              value={formData.displayName} 
              onChange={e => setFormData({...formData, displayName: e.target.value})} 
              placeholder="e.g. MasterStoryteller" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block">Bibliophile Narrative</label>
            <textarea 
              className={`${STYLES.input} h-48 px-6 py-6 text-base resize-none leading-relaxed`} 
              value={formData.bio} 
              onChange={e => setFormData({...formData, bio: e.target.value})} 
              placeholder="Tell us about yourself..." 
            />
          </div>
        </div>

        <button 
          onClick={handleSave} 
          disabled={loading} 
          className={`${STYLES.button} ${STYLES.buttonPrimary} w-full mt-12 py-5 text-lg rounded-[2rem] tracking-tight`}
        >
          {loading ? 'Syncing...' : 'Update Loop Identity'}
        </button>
      </div>
    </div>
  );
};
