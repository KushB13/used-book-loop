import React, { useState } from 'react';
import { STYLES, THEME } from '../assets/Theme';
import { useDiscovery } from '../../backend/database/DiscoveryService';
import { BookCard } from '../components/molecules/BookCard';
import { LoadingSkeleton } from '../components/molecules/LoadingSkeleton';

export const DiscoveryView = ({ userId, profile }) => {
  const { books, loading } = useDiscovery();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
           <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Trending Near You</h2>
           <p className="text-sm text-slate-400 font-medium font-mono uppercase tracking-widest">Global Community Feed</p>
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
          books.map(book => (
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
