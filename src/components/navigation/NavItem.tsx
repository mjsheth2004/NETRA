import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed?: boolean;
  onClick?: () => void;
  badge?: number;
}

export const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isCollapsed, onClick, badge }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      title={isCollapsed ? label : undefined}
      className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="nav-icon" aria-hidden="true">
          {icon}
        </div>
        {!isCollapsed && <span className="nav-text">{label}</span>}
      </div>
      {!isCollapsed && badge !== undefined && (
        <span style={{ 
          backgroundColor: 'var(--color-threat-red)', 
          color: 'white', 
          fontSize: '0.7rem', 
          fontWeight: 'bold', 
          width: '20px', 
          height: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          borderRadius: '50%'
        }}>
          {badge}
        </span>
      )}
    </NavLink>
  );
};
