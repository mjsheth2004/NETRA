import React from 'react';
import { Bell, Settings, User } from 'lucide-react';

export const TopNavbar: React.FC = () => {
  // Using generic time string for visual completeness without unnecessary state
  const timeStr = "Apr 26, 2026 14:32:18";

  return (
    <header className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* New Eye Logo matching reference */}
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Eye Shape */}
            <path d="M15 50 Q 50 20, 85 50 Q 50 80, 15 50" stroke="var(--color-emerald-teal)" strokeWidth="4" fill="transparent" />
            {/* Pupil */}
            <circle cx="50" cy="50" r="14" fill="var(--color-bg-deep-navy)" stroke="var(--color-emerald-teal)" strokeWidth="4" />
            <circle cx="50" cy="50" r="6" fill="var(--color-emerald-teal)" />
            <circle cx="48" cy="48" r="2" fill="#fff" />
          </svg>
          
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '1.4rem', margin: '0 0 2px 0', fontWeight: 600, letterSpacing: '4px', color: 'var(--color-text-primary)', lineHeight: 1 }}>
              NETRA
            </h1>
            <span style={{ fontSize: '0.5rem', color: 'var(--color-emerald-teal)', letterSpacing: '2px', fontWeight: 600 }}>
              SEE • DETECT • DEFEND
            </span>
          </div>
        </div>

        {/* Separator and Tagline */}
        <div style={{ display: window.innerWidth > 768 ? 'flex' : 'none', alignItems: 'center', gap: '16px', marginLeft: '8px' }}>
          <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--color-border)' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            AI-Powered Network Detection & Response
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ 
        flex: 1, 
        maxWidth: '480px', 
        margin: '0 24px', 
        display: window.innerWidth > 768 ? 'flex' : 'none',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--color-border)',
        borderRadius: '6px',
        padding: '6px 12px'
      }}>
        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>Search IP, domain, threat, or keyword...</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
          <kbd style={{ fontSize: '0.7rem', padding: '2px 6px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}>Ctrl</kbd>
          <kbd style={{ fontSize: '0.7rem', padding: '2px 6px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}>K</kbd>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--color-text-secondary)' }}>
          <button style={{ color: 'inherit', position: 'relative' }} aria-label="Notifications">
            <Bell size={20} />
            <span style={{ 
              position: 'absolute', 
              top: '-4px', 
              right: '-4px', 
              backgroundColor: 'var(--color-threat-red)', 
              color: 'white', 
              fontSize: '10px', 
              width: '16px', 
              height: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              borderRadius: '50%',
              fontWeight: 'bold'
            }}>3</span>
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid var(--color-border)', paddingLeft: '16px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              backgroundColor: '#4B5563', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: 500
            }}>
              DV
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', display: window.innerWidth > 768 ? 'flex' : 'none' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Devika</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>SOC Analyst Level 2</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
