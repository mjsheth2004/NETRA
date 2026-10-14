import React from 'react';
import { NavItem } from '../navigation/NavItem';
import { 
  LayoutDashboard, Activity, Bell, ShieldAlert, BarChart3, Settings,
  ChevronLeft, ChevronRight, X
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileDrawerOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  onToggle, 
  isMobileDrawerOpen, 
  onMobileClose 
}) => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/network-monitor', label: 'Network Monitor', icon: <Activity size={20} /> },
    { path: '/alerts', label: 'Alerts', icon: <Bell size={20} />, badge: 3 },
    { path: '/threat-dashboard', label: 'Threat Dashboard', icon: <ShieldAlert size={20} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const sidebarClass = `sidebar-container desktop-sidebar ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`;
  const mobileClass = `mobile-drawer ${isMobileDrawerOpen ? 'open' : ''}`;

  const renderNavItems = () => (
    <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column' }} className="no-scrollbar">
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          to={item.path}
          icon={item.icon}
          label={item.label}
          isCollapsed={isCollapsed}
          onClick={onMobileClose}
        />
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={sidebarClass} style={{ display: window.innerWidth > 768 ? 'flex' : 'none' }}>
        {renderNavItems()}
        <div style={{ padding: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-emerald-teal)', boxShadow: '0 0 8px var(--color-teal-glow)' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>System Online</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: isCollapsed ? 'center' : 'flex-end' }}>
            <button 
              onClick={onToggle}
              style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}
              aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <ChevronRight size={20} /> : (
                <>
                  <ChevronLeft size={20} />
                  <span style={{ fontSize: '0.85rem' }}>Collapse</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <aside className={mobileClass}>
        <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Menu</span>
          <button onClick={onMobileClose} style={{ color: 'var(--color-text-secondary)' }} aria-label="Close Menu">
            <X size={24} />
          </button>
        </div>
        {renderNavItems()}
        <div style={{ padding: '16px', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-emerald-teal)', boxShadow: '0 0 8px var(--color-teal-glow)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>System Online</span>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileDrawerOpen && (
        <div className="mobile-overlay" onClick={onMobileClose} aria-hidden="true" />
      )}
    </>
  );
};
