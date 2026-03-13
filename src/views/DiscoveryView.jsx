import React, { useState } from 'react';
import { STYLES, THEME } from '../assets/Theme';
import { useDiscovery } from '../database/DiscoveryService';
import { BookCard } from '../components/molecules/BookCard';
import { LoadingSkeleton } from '../components/molecules/LoadingSkeleton';

export const DiscoveryView = ({ userId, profile }) => {
  const { discoveryBooks: books, loading } = useDiscovery();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div className="flex-1">
           <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Trending Near You</h2>
           <div className="flex items-center justify-between">
             <p className="text-sm text-slate-400 font-medium font-mono uppercase tracking-widest">Global Community Feed</p>
             <div className="relative w-64 lg:hidden">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-xs">🔍</span>
               <input 
                 type="text" 
                 placeholder="Search feed..." 
                 className={`${STYLES.input} pl-10 h-10 text-xs`}
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
             </div>
           </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Scan Action Card */}
        <div className={`${STYLES.card} bg-indigo-50 border-indigo-100 border-dashed flex flex-col items-center justify-center text-center py-12 px-8 group cursor-pointer hover:bg-white transition-all`}>
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:shadow-md transition-all">📸</div>
           <h3 className="font-bold text-indigo-900 mb-2">Scan a Book</h3>
           <p className="text-xs text-indigo-400 font-medium leading-relaxed">Instantly recognize any book cover with AI.</p>
        </div>

        {loading ? (
          [1,2,3].map(i => <LoadingSkeleton key={i} />)
        ) : (
          filteredBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              isDiscovery={true} 
              currentUserId={userId} 
              currentUserProfile={profile} 
            />
          ))
        )}
      </div>
    </div>
  );
};
