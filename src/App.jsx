import React, { useState, useEffect } from 'react';
import { useSwaps } from './database/SwapService';
import { STYLES, THEME } from './assets/Theme';
import { Avatar } from './components/atoms/Avatar';
import { NavLink } from './components/atoms/NavLink';
import { LibraryView } from './views/LibraryView';
import { ProfileView } from './views/ProfileView';
import { DiscoveryView } from './views/DiscoveryView';
import { SwapFeed } from './views/SwapFeed';
import { AddBookModal } from './components/organisms/AddBookModal';
import { LoginView } from './views/LoginView';
import { UserProfile } from './components/molecules/UserProfile';
import { useStore } from './store/useStore';
import ToastContainer from './components/ToastContainer';

const App = () => {
  const { user, profile, loading, logout, init } = useStore();
  const { swaps } = useSwaps(user?.uid);
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsub = init();
    return () => unsub();
  }, [init]);

  // Incoming pending swaps for the badge
  const pendingIncoming = swaps.filter(s => s.recipientId === user?.uid && s.status === 'pending').length;

  useEffect(() => {
    if (profile && !profile.displayName && currentView !== 'profile') {
      setCurrentView('profile');
    }
  }, [profile, currentView]);

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="text-5xl mb-6 animate-pulse grayscale opacity-20">📖</div>
        <div className="text-[#64748B] font-bold tracking-[0.3em] text-[10px] uppercase">Checking Credentials...</div>
      </div>
    );
  }

  // Mandatory Auth Gateway
  if (!user) {
    return <LoginView />;
  }

  if (profileLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="text-5xl mb-6 animate-bounce">📖</div>
        <div className="animate-pulse text-[#4F46E5] font-bold tracking-[0.3em] text-sm font-mono uppercase">Initializing Loop...</div>
      </div>
    );
  }

  const routes = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'communities', label: 'Communities', icon: '👥' },
    { id: 'listings', label: 'My Listings', icon: '📖' },
    { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
    { id: 'messages', label: 'Trade Center', icon: '🤝', badge: pendingIncoming },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'home': return <DiscoveryView userId={user?.uid} profile={profile} />;
      case 'listings': return <LibraryView userId={user?.uid} profile={profile} />;
      case 'profile': return <ProfileView userId={user?.uid} profile={profile} />;
      case 'messages': return <SwapFeed userId={user?.uid} />;
      default: return <DiscoveryView userId={user?.uid} profile={profile} />;
    }
  };

  return (
    <div className={STYLES.layout}>
      {/* Sidebar (Left) */}
      <aside className={STYLES.sidebar}>
        <div className="flex items-center space-x-3 mb-12 px-2">
          <div className="w-10 h-10 bg-[#4F46E5] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 flex-shrink-0">
            <span className="text-white text-xl">📖</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#1E293B] tracking-tight truncate">Book Loop</h1>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-hide">
          {routes.map(r => (
            <div key={r.id} className="relative">
              <NavLink 
                active={currentView === r.id} 
                onClick={() => setCurrentView(r.id)} 
                icon={r.icon} 
                label={r.label} 
                desktop 
              />
              {r.badge > 0 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                  {r.badge}
                </span>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-8 space-y-3">
          <button 
            onClick={() => {
              setCurrentView('listings');
              setIsModalOpen(true);
            }}
            className={`${STYLES.button} ${STYLES.buttonPrimary} w-full py-4`}
          >
            <span>＋</span> <span>New Listing</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className={STYLES.main}>
        <header className={STYLES.header}>
          <div className="flex-1 max-w-2xl relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300">🔍</span>
            <input 
              type="text" 
              placeholder="Search books, ISBNs, or campuses..." 
              className={`${STYLES.input} pl-14`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-slate-300 p-2 hover:text-indigo-600 transition-colors relative">
               <span className="text-xl">🔔</span>
               {pendingIncoming > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>}
            </button>
            <UserProfile 
              user={user} 
              profile={profile} 
              onLogout={logout} 
              onNavigateProfile={() => setCurrentView('profile')} 
            />
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto scrollbar-hide bg-slate-50/30">
            <div className={`${STYLES.content} max-w-6xl mx-auto`}>
               {renderView()}
            </div>
          </main>

          <aside className={STYLES.rightSidebar}>
             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm shadow-slate-100/50">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="font-bold text-lg text-slate-800 tracking-tight">Meetups</h3>
                   <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-lg">Live</span>
                </div>
                <div className="space-y-6">
                   {[
                     { date: 'OCT 24', title: 'Exchange with Sarah', loc: 'Main Library, 2:00 PM', variant: 'indigo' },
                     { date: 'OCT 26', title: 'Buy Physics 101', loc: 'Union, 11:30 AM', variant: 'slate' }
                   ].map((m, i) => (
                     <div key={i} className="flex space-x-4 group cursor-pointer hover:bg-slate-50 p-3 -m-3 rounded-3xl transition-all border border-transparent hover:border-slate-100">
                        <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center border shadow-sm ${m.variant === 'indigo' ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                           <span className="text-[10px] font-bold uppercase">{m.date.split(' ')[0]}</span>
                           <span className="text-lg font-black leading-none">{m.date.split(' ')[1]}</span>
                        </div>
                        <div className="overflow-hidden flex-1 py-0.5">
                           <p className="font-bold text-sm text-slate-800 truncate mb-0.5">{m.title}</p>
                           <p className="text-[10px] text-slate-400 font-medium truncate flex items-center">
                              <span className="mr-1">📍</span> {m.loc}
                           </p>
                        </div>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-10 py-4 border border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all">
                  Show Full Calendar
                </button>
             </div>

             <div className="bg-gradient-to-br from-[#4F46E5] to-[#4338CA] rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-xl shadow-indigo-100/50">
                <div className="absolute -right-6 -bottom-6 text-9xl grayscale opacity-5 group-hover:grayscale-0 group-hover:opacity-10 transition-all duration-700 rotate-12 pointer-events-none">⚡</div>
                <div className="relative z-10">
                   <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md">
                      <span className="text-xl">🌟</span>
                   </div>
                   <h3 className="font-bold text-xl mb-3 tracking-tight">Book Loop Pro</h3>
                   <p className="text-xs text-indigo-100 mb-8 leading-relaxed opacity-90">Unlock unlimited recognition scans and get featured on the global feed.</p>
                   <button className="w-full py-4 bg-white text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">Upgrade Now</button>
                </div>
             </div>
          </aside>
        </div>
      </div>

      <AddBookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userId={user?.uid} profile={profile} />
      <ToastContainer />
    </div>
  );
};

export default App;
