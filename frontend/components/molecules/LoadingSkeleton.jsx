import React from 'react';
import { STYLES } from '../../assets/Theme';

export const LoadingSkeleton = () => (
  <div className={`${STYLES.card} animate-pulse`}>
    <div className="w-full h-48 bg-slate-100 rounded-2xl mb-6" />
    <div className="space-y-3">
      <div className="h-6 bg-slate-100 rounded-xl w-3/4" />
      <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
      <div className="h-10 bg-slate-100 rounded-2xl w-full mt-4" />
    </div>
  </div>
);
