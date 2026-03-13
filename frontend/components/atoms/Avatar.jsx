import React from 'react';

export const Avatar = ({ src, label, size = 'md', showGoogle = false }) => {
  const sizes = { sm: 'w-8 h-8 text-sm', md: 'w-12 h-12 text-xl', lg: 'w-24 h-24 text-4xl' };
  const badgeSizes = { sm: 'w-3 h-3 p-0.5', md: 'w-4 h-4 p-0.5', lg: 'w-8 h-8 p-1.5' };
  
  return (
    <div className="relative inline-block">
      <div className={`${sizes[size]} rounded-full bg-slate-100 ring-2 ring-white shadow-lg overflow-hidden flex items-center justify-center flex-shrink-0`}>
        {src && src.length > 2 ? <img src={src} className="w-full h-full object-cover" alt="Avatar" /> : <span>{src || label?.charAt(0) || '👤'}</span>}
      </div>
      {showGoogle && (
        <div className={`absolute bottom-0 right-0 ${badgeSizes[size]} bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center`}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/icon_google.svg" className="w-full h-full" alt="G" />
        </div>
      )}
    </div>
  );
};
