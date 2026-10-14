import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { PlaceholderPage } from '../pages/PlaceholderPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/network-monitor" element={<PlaceholderPage title="Network Monitor" />} />
      <Route path="/alerts" element={<PlaceholderPage title="Alerts" />} />
      <Route path="/threat-dashboard" element={<PlaceholderPage title="Threat Dashboard" />} />
      <Route path="/mitre-attack" element={<PlaceholderPage title="MITRE ATT&CK" />} />
      <Route path="/ioc" element={<PlaceholderPage title="IOC" />} />
      <Route path="/devices" element={<PlaceholderPage title="Devices" />} />
      <Route path="/attack-history" element={<PlaceholderPage title="Attack History" />} />
      <Route path="/ai-assistants" element={<PlaceholderPage title="AI Assistants" />} />
      <Route path="/incident-response" element={<PlaceholderPage title="Incident Response" />} />
      <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
      <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
