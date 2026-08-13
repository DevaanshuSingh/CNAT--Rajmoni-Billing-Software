import React, { useState } from 'react';
import MainLayout from './components/layout/MainLayout/MainLayout';
import StockManagement from './pages/StockManagement/StockManagement';
import Billing from './pages/Billing/Billing';
import Dashboard from './pages/Dashboard/Dashboard';

/**
 * App Root Component
 * 
 * Folderized page layout router for Rajmoni Jewellers software.
 */
export default function App() {
  // Active Navigation Module Page Key ('stock' | 'billing' | 'dashboard')
  const [activePage, setActivePage] = useState('stock');

  /**
   * Render active page view component dynamically based on route selection
   */
  const renderActivePage = () => {
    switch (activePage) {
      case 'stock':
        return <StockManagement />;
      case 'billing':
        return <Billing />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <StockManagement />;
    }
  };

  return (
    <MainLayout activePage={activePage} setActivePage={setActivePage}>
      {renderActivePage()}
    </MainLayout>
  );
}
