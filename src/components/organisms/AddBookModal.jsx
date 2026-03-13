import React, { useState } from 'react';
import { STYLES, THEME } from '../../assets/Theme';
import { generateBookMetadata } from '../../services/GeminiService';
import { generateBookCover } from '../../services/ImagenService';
import { saveBook } from '../../database/LibraryService';
import { searchBooks } from '../../services/GoogleBooksService';

export const AddBookModal = ({ isOpen, onClose, userId, profile }) => {
  const [step, setStep] = useState(1); // 1: Search/Entry, 2: AI Enrichment, 3: Preview
  const [formData, setFormData] = useState({ title: '', author: '', price: '' });
  const [publish, setPublish] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearch = (val) => {
    setFormData({ ...formData, title: val });
    
    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(async () => {
      if (val.length > 3) {
        setLoading(true);
        try {
          const results = await searchBooks(val);
          setSearchResults(results);
        } catch (e) {
          console.error("Search failed:", e);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 800);

    setSearchTimeout(timeout);
  };

  const selectBook = (book) => {
    setFormData({ 
      title: book.title, 
      author: book.author, 
      price: formData.price || '0.00',
      coverUrl: book.coverUrl,
      summary: book.summary,
      genre: book.genre
    });
    setSearchResults([]);
    setStep(2);
  };

  const handleManualNext = () => {
    setStep(2);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use existing data if available from Google Books, otherwise generate
      const [meta, cover] = await Promise.all([
        formData.summary ? Promise.resolve({ summary: formData.summary, genre: formData.genre }) : generateBookMetadata(formData.title, formData.author),
        formData.coverUrl ? Promise.resolve(formData.coverUrl) : generateBookCover(formData.title, formData.author)
      ]);
      setAiData({ ...meta, coverUrl: cover });
      setStep(3);
    } catch (e) {
      setError("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveBook(userId, { ...formData, ...aiData }, profile, publish);
      resetState();
      onClose();
    } catch (e) {
      setError("Saving to database failed.");
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setStep(1);
    setFormData({ title: '', author: '', price: '' });
    setSearchResults([]);
    setAiData(null);
    setPublish(true);
    setError(null);
  };

  return (
    <div className={STYLES.modalOverlay}>
      <div className={STYLES.modalContent}>
        <div className="p-10">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-slate-800" style={{ fontFamily: THEME.fonts.heading }}>
              {step === 1 ? 'New Listing' : step === 2 ? 'Listing Details' : 'Preview'}
            </h2>
            <button onClick={() => { resetState(); onClose(); }} className="text-3xl text-slate-300 hover:text-indigo-600 transition-colors">×</button>
          </div>

          {error && <div className="mb-8 p-4 rounded-2xl bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest border border-red-100">{error}</div>}

          {step === 1 && (
            <div className="space-y-6">
              <div className="relative">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Book Title / ISBN</p>
                <input 
                  className={`${STYLES.input} focus:bg-white`} 
                  placeholder="Enter book name or scan ISBN..." 
                  value={formData.title} 
                  onChange={e => handleSearch(e.target.value)} 
                />
                
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden max-h-64 overflow-y-auto">
                    {searchResults.map(b => (
                      <div 
                        key={b.id} 
                        onClick={() => selectBook(b)}
                        className="p-4 hover:bg-slate-50 cursor-pointer flex items-center space-x-4 border-b border-slate-50 last:border-0"
                      >
                         <img src={b.coverUrl} className="w-10 h-14 rounded-lg object-cover bg-slate-100" />
                         <div className="overflow-hidden">
                            <p className="font-bold text-sm text-slate-800 truncate">{b.title}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{b.author}</p>
                         </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="pt-4">
                 <button 
                  onClick={handleManualNext}
                  disabled={!formData.title}
                  className={`${STYLES.button} ${STYLES.buttonSecondary} w-full`}
                 >
                   Manual Entry
                 </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Title</p>
                    <input className={STYLES.input} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Author</p>
                    <input className={STYLES.input} value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
                  </div>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Listing Price ($)</p>
                  <input className={STYLES.input} type="number" placeholder="0.00" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
               </div>
               
               <button 
                onClick={handleGenerate} 
                disabled={loading || !formData.title || !formData.author}
                className={`${STYLES.button} ${STYLES.buttonPrimary} w-full mt-4 py-4`}
              >
                {loading ? 'Processing...' : '✨ Enhance with AI Details'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="flex space-x-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <img src={aiData.coverUrl} className="w-28 h-40 rounded-2xl object-cover shadow-xl rotate-1 group-hover:rotate-0 transition-transform" />
                <div className="flex-1 overflow-hidden">
                   <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-tighter mb-4">{aiData.genre}</span>
                   <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic line-clamp-6">{aiData.summary || 'No summary available.'}</p>
                </div>
              </div>
              
              <label className="flex items-center space-x-4 cursor-pointer p-5 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition-colors">
                 <input type="checkbox" checked={publish} onChange={e => setPublish(e.target.checked)} className="w-6 h-6 rounded-lg text-indigo-600 focus:ring-indigo-600 border-slate-200" />
                 <span className="text-sm font-bold text-slate-700">Share with University Community</span>
              </label>

              <div className="flex space-x-4">
                <button onClick={() => setStep(2)} className={`${STYLES.button} ${STYLES.buttonSecondary} flex-1 py-4`}>Revise</button>
                <button onClick={handleSave} disabled={loading} className={`${STYLES.button} ${STYLES.buttonPrimary} flex-1 py-4`}>Create Listing</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
