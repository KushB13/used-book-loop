export const THEME = {
  colors: {
    background: '#F8FAFC',
    sidebar: '#FFFFFF',
    primary: '#4F46E5', // Indigo-600
    primaryLight: '#EEF2FF',
    text: '#1E293B', // Slate-800
    textLight: '#64748B', // Slate-500
    white: '#FFFFFF',
    border: '#E2E8F0',
    error: '#EF4444'
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif"
  }
};

export const STYLES = {
  layout: "min-h-screen flex bg-[#F8FAFC] text-[#1E293B] font-sans",
  sidebar: "hidden lg:flex flex-col w-72 bg-white border-r border-[#E2E8F0] p-8 sticky top-0 h-screen z-40",
  main: "flex-1 pb-24 lg:pb-0 relative flex flex-col min-w-0",
  rightSidebar: "hidden xl:flex flex-col w-80 p-8 sticky top-0 h-screen space-y-8",
  content: "flex-1 max-w-[1200px] mx-auto w-full p-8 lg:p-12",
  header: "h-20 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-8 sticky top-0 z-30",
  
  navLink: "flex items-center space-x-4 p-4 rounded-2xl transition-all hover:bg-[#F1F5F9] cursor-pointer text-[#64748B]",
  navLinkActive: "bg-[#EEF2FF] text-[#4F46E5] font-semibold",
  
  button: "px-6 py-3 rounded-2xl font-bold transition-all disabled:opacity-50 flex items-center justify-center space-x-2 shrink-0",
  buttonPrimary: "bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-lg shadow-[#4F46E5]/20",
  buttonSecondary: "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]",
  
  card: "bg-white rounded-[2rem] p-6 border border-[#E2E8F0] transition-all hover:shadow-xl hover:shadow-slate-200/50",
  input: "w-full p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 text-sm",
  
  modalOverlay: "fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-[100]",
  modalContent: "bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl shadow-slate-900/20",
  
  badge: "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
};
