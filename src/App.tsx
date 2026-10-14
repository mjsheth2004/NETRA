import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { AppRoutes } from './routes/AppRoutes';
import './index.css';
import './styles/layout.css';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
