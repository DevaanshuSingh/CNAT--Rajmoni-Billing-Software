import React, { useState } from 'react';
import StockForm from '../../components/stock/StockForm/StockForm';
import StockTable from '../../components/stock/StockTable/StockTable';
import './StockManagement.css';

/**
 * StockManagement Page Component (Item Master & Stock Level Control)
 * 
 * Core module for managing jewelry stock for Rajmoni Jewellers:
 * - Item Master Entry Form (with Minimum Stock Alert threshold)
 * - Stock Inventory Table
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

  return (
    <div className="stock-management-container space-y-6">
      {/* Item Master Form */}
      <StockForm onAddItem={handleAddItem} />

      {/* Items Stock Data Table */}
      <StockTable items={items} onDeleteItem={handleDeleteItem} />
    </div>
  );
}
