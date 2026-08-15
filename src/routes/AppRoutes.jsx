import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import StockManagement from '../pages/StockManagement/StockManagement';
import Billing from '../pages/Billing/Billing';
import Dashboard from '../pages/Dashboard/Dashboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="stock" element={<StockManagement />} />
        <Route path="billing" element={<Billing />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}