import React from 'react';

export const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      <header>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{title}</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          This section is currently under construction for Phase 1.
        </p>
      </header>
      
      <div className="panel" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-text-secondary)' }}>Content for {title} will be implemented in later phases.</p>
      </div>
    </div>
  );
};
