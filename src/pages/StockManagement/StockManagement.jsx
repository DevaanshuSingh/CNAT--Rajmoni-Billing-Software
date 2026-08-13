import React, { useState } from 'react';
import MetricCard from '../../components/common/MetricCard/MetricCard';
import StockForm from '../../components/stock/StockForm/StockForm';
import StockTable from '../../components/stock/StockTable/StockTable';
import './StockManagement.css';

/**
 * StockManagement Page Component (Item Master & Stock Level Control)
 * 
 * Core module for managing jewelry stock for Rajmoni Jewellers:
 * - Summary metric cards (Total Stock, Low Stock Alert Count, Sold This Month)
 * - Item Master Entry Form (with Minimum Stock Alert threshold)
 * - Stock Inventory Table
 * Folderized with dedicated StockManagement.css
 */
export default function StockManagement() {
  // Initial Mock Items Data to demonstrate UI state
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Gold Ring 22K (Floral Design)',
      category: 'Ring',
      stock: 45,
      minStock: 10,
      soldThisMonth: 12,
    },
    {
      id: 2,
      name: 'Diamond Cut Gold Chain',
      category: 'Chain',
      stock: 8,
      minStock: 15, // Low stock condition! (8 <= 15)
      soldThisMonth: 24,
    },
    {
      id: 3,
      name: 'Traditional Temple Necklace',
      category: 'Necklace',
      stock: 5,
      minStock: 5, // Alert condition! (5 <= 5)
      soldThisMonth: 3,
    },
    {
      id: 4,
      name: 'Silver Bangle Set 925',
      category: 'Bangle',
      stock: 60,
      minStock: 20,
      soldThisMonth: 18,
    },
  ]);

  /**
   * Add New Item Handler
   */
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [newItem, ...prevItems]);
  };

  /**
   * Delete Item Handler
   */
  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to remove this item from stock list?')) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  // Metric Computations
  const totalItemCount = items.length;
  const totalStockQuantity = items.reduce((acc, curr) => acc + (curr.stock || 0), 0);
  const lowStockCount = items.filter((item) => item.stock <= item.minStock).length;
  const totalSoldThisMonth = items.reduce((acc, curr) => acc + (curr.soldThisMonth || 0), 0);

  return (
    <div className="stock-management-container space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Stock Management & Item Master
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Rajmoni Jewellers - Item Master & Minimum Stock Alert Entry System
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center gap-2">
          <span className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-amber-400">
            Module Status: Active
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. Summary Metrics Cards Row */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Metric 1: Total Stock Quantity */}
        <MetricCard
          title="Total Stock Units"
          value={totalStockQuantity.toLocaleString()}
          subtitle={`Across ${totalItemCount} jewelry item master records`}
          icon="📦"
          accentColor="border-amber-500"
        />

        {/* Metric 2: Low Stock Alerts */}
        <MetricCard
          title="Low Stock Alerts"
          value={lowStockCount}
          subtitle="Items at or below minimum stock level"
          icon="🚨"
          accentColor={lowStockCount > 0 ? "border-rose-500" : "border-emerald-500"}
        />

        {/* Metric 3: Sold This Month */}
        <MetricCard
          title="Sold This Month"
          value={totalSoldThisMonth}
          subtitle="Units sold in current billing period"
          icon="📈"
          accentColor="border-blue-500"
        />

        {/* Metric 4: Total Categories */}
        <MetricCard
          title="Master Items Count"
          value={totalItemCount}
          subtitle="Active catalog items"
          icon="💎"
          accentColor="border-purple-500"
        />

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. Stock Entry Form Section (Item Master) */}
      {/* ------------------------------------------------------------- */}
      <StockForm onAddItem={handleAddItem} />

      {/* ------------------------------------------------------------- */}
      {/* 3. Items Stock Data Table Section */}
      {/* ------------------------------------------------------------- */}
      <StockTable items={items} onDeleteItem={handleDeleteItem} />

    </div>
  );
}
