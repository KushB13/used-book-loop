import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Something went wrong</h1>
          <p className="text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
            The application encountered an unexpected error. Don't worry, your data is safe.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-0.5"
          >
            Refresh Application
          </button>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-12 p-6 bg-white border border-slate-200 rounded-3xl text-left max-w-2xl overflow-auto shadow-sm">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Debug Information</p>
              <pre className="text-xs font-mono text-red-500 whitespace-pre-wrap">
                {this.state.error?.toString()}
              </pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
