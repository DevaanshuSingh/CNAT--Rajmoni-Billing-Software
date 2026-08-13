import React, { useState } from 'react';
import './StockTable.css';

/**
 * StockTable Component
 * 
 * Renders a structured, fully responsive table listing jewelry items in stock.
 * Highlights low stock warnings when current stock <= minimum stock threshold.
 * Folderized with dedicated StockTable.css
 * 
 * @param {Array} items - List of item objects
 * @param {Function} onDeleteItem - Function to handle deleting item (UI placeholder)
 */
export default function StockTable({ items = [], onDeleteItem }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Unique categories for filtering dropdown
  const filterCategories = ['All', ...new Set(items.map((item) => item.category))];

  // Filter items based on search term and category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="stock-table-card rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      
      {/* Table Toolbar Header */}
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
        
        <div>
          <h3 className="text-base font-bold text-slate-900">Stock Inventory List</h3>
          <p className="text-xs text-slate-500">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-amber-500 focus:outline-none"
          >
            {filterCategories.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Item Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48 sm:w-64 rounded-lg border border-slate-300 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-700 focus:border-amber-500 focus:outline-none"
            />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
              🔍
            </span>
          </div>

        </div>

      </div>

      {/* Table Wrapper (Horizontal Scroll for Responsive Screens) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          
          {/* Table Header */}
          <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th scope="col" className="px-4 py-3"># Code</th>
              <th scope="col" className="px-4 py-3">Item Name</th>
              <th scope="col" className="px-4 py-3">Category</th>
              <th scope="col" className="px-4 py-3 text-center">Current Stock</th>
              <th scope="col" className="px-4 py-3 text-center">Min. Stock Level</th>
              <th scope="col" className="px-4 py-3 text-center">Sold This Month</th>
              <th scope="col" className="px-4 py-3 text-center">Stock Status</th>
              <th scope="col" className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-slate-400">
                  <div className="text-2xl mb-1">📦</div>
                  No jewelry items found in stock list.
                </td>
              </tr>
            ) : (
              filteredItems.map((item, index) => {
                // Determine if stock is at or below minimum alert threshold
                const isLowStock = item.stock <= item.minStock;

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      isLowStock ? 'bg-rose-50/40' : ''
                    }`}
                  >
                    {/* 1. Item Code */}
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-500">
                      JWL-{(index + 1).toString().padStart(3, '0')}
                    </td>

                    {/* 2. Item Name */}
                    <td className="px-4 py-3 font-bold text-slate-900">
                      {item.name}
                    </td>

                    {/* 3. Category Badge */}
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 border border-slate-200">
                        {item.category}
                      </span>
                    </td>

                    {/* 4. Current Stock */}
                    <td className="px-4 py-3 text-center font-extrabold text-slate-900 text-base">
                      {item.stock}
                    </td>

                    {/* 5. Minimum Stock Threshold */}
                    <td className="px-4 py-3 text-center font-medium text-slate-600">
                      {item.minStock}
                    </td>

                    {/* 6. Sold This Month */}
                    <td className="px-4 py-3 text-center font-medium text-slate-500">
                      {item.soldThisMonth || 0}
                    </td>

                    {/* 7. Stock Status Indicator (Normal vs Low Stock Warning) */}
                    <td className="px-4 py-3 text-center">
                      {isLowStock ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-800 border border-rose-300 animate-pulse">
                          <span>🚨</span> Low Stock Alert
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
                          <span>✅</span> Normal
                        </span>
                      )}
                    </td>

                    {/* 8. Action Buttons */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => alert(`Edit feature for "${item.name}" will be connected to Laravel backend.`)}
                          className="rounded p-1 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
                          title="Edit Item"
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteItem && onDeleteItem(item.id)}
                          className="rounded p-1 text-slate-500 hover:bg-rose-100 hover:text-rose-600"
                          title="Delete Item"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>

      {/* Table Footer */}
      <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500 flex justify-between items-center">
        <span>Items highlighted in light red have reached minimum stock alert level.</span>
        <span className="font-semibold text-slate-700">Rajmoni Jewellers - Stock Inventory</span>
      </div>

    </div>
  );
}
