import React from 'react';
import { useSwaps, handleSwapAction } from '../database/SwapService';
import { STYLES, THEME } from '../assets/Theme';

export const SwapFeed = ({ userId }) => {
  const { swaps, loading } = useSwaps(userId);

  if (loading) return <div className="p-12 text-center text-slate-400">Loading Swap Requests...</div>;

  const incoming = swaps.filter(s => s.recipientId === userId);
  const outgoing = swaps.filter(s => s.senderId === userId);

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-8">Trade Requests</h2>
        {incoming.length === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] p-12 text-center text-slate-400 text-sm font-medium">
             No active trade requests for your books.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {incoming.map(swap => (
              <div key={swap.id} className="bg-white border border-slate-100 rounded-[2rem] p-6 flex items-center justify-between shadow-sm shadow-slate-50">
                <div className="flex items-center space-x-6">
                  <img src={swap.bookCover} className="w-16 h-20 object-cover rounded-xl shadow-sm" alt={swap.bookTitle} />
                  <div>
                    <h4 className="font-bold text-slate-800">{swap.bookTitle}</h4>
                    <p className="text-xs text-slate-400 font-medium">Requested by <span className="text-indigo-600 font-bold">{swap.senderName}</span></p>
                  </div>
                </div>
                <div className="flex space-x-3">
                   <button 
                     onClick={() => handleSwapAction(swap.id, 'accepted')}
                     className="px-6 py-3 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-100"
                   >
                     Accept
                   </button>
                   <button 
                     onClick={() => handleSwapAction(swap.id, 'declined')}
                     className="px-6 py-3 border border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50"
                   >
                     Decline
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-400 mb-6 uppercase tracking-widest text-center">My Outgoing Requests</h3>
        <div className="grid grid-cols-1 gap-4 opacity-70">
           {outgoing.map(swap => (
             <div key={swap.id} className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 flex items-center justify-between grayscale">
                <div className="flex items-center space-x-6">
                  <img src={swap.bookCover} className="w-16 h-20 object-cover rounded-xl" alt={swap.bookTitle} />
                  <div>
                    <h4 className="font-bold text-slate-600">{swap.bookTitle}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Waiting for response...</p>
                  </div>
                </div>
                <span className="bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase text-slate-400 border border-slate-100">
                   Pending
                </span>
             </div>
           ))}
           {outgoing.length === 0 && <p className="text-center text-xs text-slate-300 font-mono italic">No pending outgoing trades.</p>}
        </div>
      </section>
    </div>
  );
};
