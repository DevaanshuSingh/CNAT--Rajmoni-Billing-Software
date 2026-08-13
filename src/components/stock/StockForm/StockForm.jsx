import React, { useState } from 'react';
import CategoryModal from '../CategoryModal/CategoryModal';
import './StockForm.css';

/**
 * StockForm Component (Item Master Entry Form)
 * 
 * Provides inputs for adding/managing jewelry items:
 * 1. Item Name
 * 2. Category (with '+' button to manage categories via pop-up)
 * 3. Produced Quantity (Current Stock)
 * 4. Minimum Stock Quantity (Alert Threshold Input Box)
 * Folderized with dedicated StockForm.css
 * 
 * @param {Function} onAddItem - Callback when user submits form
 */
export default function StockForm({ onAddItem }) {
  // Form State
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Ring');
  const [quantity, setQuantity] = useState('');
  const [minStock, setMinStock] = useState('');

  // Dynamic Categories State
  const [categories, setCategories] = useState([
    'Ring',
    'Chain',
    'Bangle',
    'Necklace',
    'Earrings',
    'Pendant',
    'Bracelet',
    'Coins/Bars',
  ]);

  // Modal Open/Close State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  /**
   * Add Category Handler
   */
  const handleAddCategory = (newCat) => {
    setCategories((prev) => [...prev, newCat]);
    setCategory(newCat); // Automatically select newly added category
  };

  /**
   * Delete Category Handler
   */
  const handleDeleteCategory = (catToDelete) => {
    if (categories.length <= 1) {
      alert('At least one category must remain.');
      return;
    }
    const updated = categories.filter((c) => c !== catToDelete);
    setCategories(updated);
    if (category === catToDelete) {
      setCategory(updated[0]);
    }
  };

  /**
   * Handle Form Submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!itemName.trim()) {
      alert('Please enter an Item Name.');
      return;
    }

    // Construct Item Payload
    const newItem = {
      id: Date.now(),
      name: itemName.trim(),
      category: category,
      stock: Number(quantity) || 0,
      minStock: Number(minStock) || 0,
      soldThisMonth: 0, // Placeholder counter as per requirement
    };

    // Callback to parent container
    if (onAddItem) {
      onAddItem(newItem);
    }

    // Reset Form Inputs
    setItemName('');
    setQuantity('');
    setMinStock('');
  };

  return (
    <>
      <div className="stock-form-card rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        
        {/* Form Title */}
        <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Add Jewelry Item</h2>
            <p className="text-xs text-slate-500">Item Master & Minimum Stock Alert Level Entry</p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
            Item Master Form
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* 1. Item Name Input */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Gold Wedding Ring 22K"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* 2. Category Selection (with + button beside Category label) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Category
                </label>
                {/* Plus Button to open category management pop-up */}
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="inline-flex items-center justify-center h-5 w-5 rounded bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition"
                  title="Add / Manage Categories"
                >
                  +
                </button>
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Produced Quantity (Initial Stock) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Produced Quantity (Stock)
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 50"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* 4. Minimum Stock Quantity (Alert Threshold) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Min. Stock Level Alert <span className="text-amber-600 font-semibold">(Threshold)</span>
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 10"
                value={minStock}
                onChange={(e) => setMinStock(e.target.value)}
                className="w-full rounded-lg border border-amber-300 bg-amber-50/30 px-3.5 py-2.5 text-sm text-slate-900 transition focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
              <p className="mt-1 text-[11px] text-amber-700">
                Notifies when current stock &le; this value
              </p>
            </div>

          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setItemName('');
                setCategory('Ring');
                setQuantity('');
                setMinStock('');
              }}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Clear Form
            </button>
            
            <button
              type="submit"
              className="inline-flex items-center space-x-2 rounded-lg bg-amber-500 px-5 py-2 text-xs font-bold text-slate-950 shadow-md hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition"
            >
              <span>+ Save Item to Stock</span>
            </button>
          </div>

        </form>
      </div>

      {/* Category Management Pop-up Modal */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </>
  );
}
