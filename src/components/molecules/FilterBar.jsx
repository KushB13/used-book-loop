import React from 'react';
import { STYLES } from '../../assets/Theme';

export const FilterBar = ({ onSearch, onSort, currentSort, placeholder = "Search..." }) => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D4D4D]/40">🔍</span>
        <input 
          type="text" 
          placeholder={placeholder} 
          className={`${STYLES.input} pl-12 h-14`} 
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <select 
        className={`${STYLES.input} md:w-48 h-14 bg-white cursor-pointer font-bold text-[#0D4D4D]`}
        value={currentSort}
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="newest">Newest Added</option>
        <option value="alpha">Alphabetical</option>
      </select>
    </div>
  );
};
