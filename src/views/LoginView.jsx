import React, { useState } from 'react';
import { useAuth } from '../auth/AuthService';
import { THEME, STYLES } from '../assets/Theme';

export const LoginView = () => {
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
    } catch (e) {
      setError("Connection failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl shadow-indigo-100/50 text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-50 rounded-full grayscale opacity-20 blur-xl"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-50 rounded-full grayscale opacity-20 blur-xl"></div>

        <div className="relative z-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl shadow-indigo-200 rotate-3">
             <span className="text-white text-4xl">📖</span>
          </div>
          
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-4" style={{ fontFamily: THEME.fonts.heading }}>
            Welcome to the Loop
          </h1>
          <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10 px-4">
            The exclusive community for campus book swaps and literary discoveries.
          </p>

          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-2xl border border-red-100 italic">
              {error}
            </div>
          )}

          <button 
            onClick={handleLogin}
            disabled={loading}
            className={`${STYLES.button} ${STYLES.buttonPrimary} w-full py-5 text-base flex justify-center items-center space-x-4 mb-4 transform hover:scale-[1.02] active:scale-95 transition-all`}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/icon_google.svg" className="w-5 h-5 bg-white rounded-full p-0.5" alt="Google" />
            )}
            <span>{loading ? 'Entering Loop...' : 'Sign in with Google'}</span>
          </button>

          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-8">
            Secured by Firebase Loop-Auth
          </p>
        </div>
      </div>
    </div>
  );
};
