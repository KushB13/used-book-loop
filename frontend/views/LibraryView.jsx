import React, { useState, useMemo } from 'react';
import { STYLES, THEME } from '../assets/Theme';
import { useLibrary } from '../../backend/database/LibraryService';
import { BookCard } from '../components/molecules/BookCard';
import { LoadingSkeleton } from '../components/molecules/LoadingSkeleton';

export const LibraryView = ({ userId, profile }) => {
  const { books, loading } = useLibrary(userId);
  const [filter, setFilter] = useState('active'); // active, sold

  const filteredBooks = useMemo(() => {
    return books;
  }, [books]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
           <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">My Active Listings</h2>
           <p className="text-sm text-slate-400 font-medium font-mono uppercase tracking-widest">Tracking {books.length} Items</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
           {['active', 'sold'].map(t => (
             <button 
               key={t}
               onClick={() => setFilter(t)}
               className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${filter === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
             >
               {t.charAt(0).toUpperCase() + t.slice(1)} ({t === 'active' ? books.length : 0})
             </button>
           ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading ? (
          [1,2,3,4].map(i => <LoadingSkeleton key={i} />)
        ) : (
          filteredBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              isDiscovery={false} 
              currentUserId={userId} 
              currentUserProfile={profile} 
            />
          ))
        )}
        
        {!loading && filteredBooks.length === 0 && (
          <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border border-slate-100">
            <div className="text-6xl mb-6 grayscale opacity-10">📦</div>
            <h3 className="text-xl font-bold text-slate-400">No {filter} listings found</h3>
          </div>
        )}
      </div>
    </div>
  );
};
