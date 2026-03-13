import React, { useState } from 'react';
import { STYLES, THEME } from '../../assets/Theme';
import { submitSwapRequest } from '../../database/SwapService';

export const BookCard = ({ book, isDiscovery, currentUserId, currentUserProfile }) => {
  const [requesting, setRequesting] = useState(false);
  const [requested, setRequested] = useState(false);

  const isOwner = book.ownerId === currentUserId;

  const handleRequest = async () => {
    if (requested) return;
    setRequesting(true);
    try {
      await submitSwapRequest(currentUserId, currentUserProfile, book.ownerId, book);
      setRequested(true);
    } catch (e) {
      console.error("Swap Error:", e);
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className={STYLES.card}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className={`px-2.5 py-1 ${isOwner ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'} text-[10px] font-bold rounded-lg border italic`}>
            {isOwner ? 'Yours' : 'Selling'}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">/7d ago</span>
        </div>
        <button className="text-slate-300 hover:text-indigo-600 text-sm">•••</button>
      </div>

      <div className="mb-6 group relative">
        <img 
          src={book.coverUrl} 
          alt={book.title} 
          className="w-full h-48 object-cover rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-300" 
        />
        {!book.coverUrl && (
          <div className="w-full h-48 bg-slate-50 flex items-center justify-center rounded-2xl border border-dashed border-slate-200">
            <span className="text-4xl grayscale opacity-20">📖</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-bold text-slate-800 line-clamp-1 leading-tight mb-1" style={{ fontFamily: THEME.fonts.heading }}>
          {book.title || 'Unknown Title'}
        </h3>
        <p className="text-xs text-slate-400 font-medium h-4 line-clamp-1">
          {book.author ? `by ${book.author}` : 'Unknown Author'}
        </p>
      </div>

      <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed h-8 mb-6">
        {book.summary || 'Good condition. Description coming soon...'}
      </p>

      <div className="pt-4 border-t border-slate-50 mt-auto flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
             <div className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase">
               {book.ownerName?.charAt(0) || '?'}
             </div>
             <span className="text-[10px] text-slate-400 font-bold">{book.ownerName || 'Explorer'}</span>
          </div>
          <div className="text-sm font-black text-slate-800">
            ${book.price || '0.00'}
          </div>
        </div>

        {isDiscovery && !isOwner && (
          <button 
            onClick={handleRequest}
            disabled={requesting || requested}
            className={`${STYLES.button} ${requested ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : STYLES.buttonPrimary} w-full py-2.5 text-[10px] uppercase tracking-widest`}
          >
            {requesting ? 'Sending...' : requested ? '✓ Requested' : '🤝 Request Swap'}
          </button>
        )}
      </div>
    </div>
  );
};
