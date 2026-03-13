import React from 'react';
import { STYLES } from '../../assets/Theme';

export const NavLink = ({ active, onClick, icon, label, desktop }) => (
  <div onClick={onClick} className={`${STYLES.navLink} ${active ? STYLES.navLinkActive : ''} ${!desktop ? 'flex-col space-x-0 space-y-1 items-center p-2' : ''}`}>
    <span className="text-xl">{icon}</span>
    <span className={desktop ? "text-sm" : "text-[10px]"}>{label}</span>
  </div>
);
