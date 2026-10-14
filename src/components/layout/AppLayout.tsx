import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { Menu } from 'lucide-react';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileDrawerOpen]);

  return (
    <div className="app-layout" style={{ flexDirection: 'column' }}>
      <TopNavbar />
      
      {/* Mobile menu toggle button overlay on navbar for smaller screens */}
      <div 
        style={{ 
          position: 'absolute', 
          top: '0', 
          left: '0', 
          height: 'var(--navbar-height)', 
          display: 'flex', 
          alignItems: 'center', 
          paddingLeft: '16px',
          zIndex: 35
        }}
        className="mobile-only-toggle"
      >
        <button 
          onClick={() => setMobileDrawerOpen(true)}
          style={{ 
            color: 'var(--color-text-secondary)',
            display: window.innerWidth <= 768 ? 'block' : 'none'
          }}
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Adjust navbar padding for mobile via JS to ensure space for the menu button */}
      <style>
        {`
          @media (max-width: 768px) {
            .top-navbar { padding-left: 56px !important; }
          }
        `}
      </style>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!isSidebarCollapsed)} 
          isMobileDrawerOpen={isMobileDrawerOpen}
          onMobileClose={() => setMobileDrawerOpen(false)}
        />
        <main className="page-container">
          {children}
        </main>
      </div>
    </div>
  );
};
