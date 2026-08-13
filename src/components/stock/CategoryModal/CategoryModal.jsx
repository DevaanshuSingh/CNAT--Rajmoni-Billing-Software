import React, { useState } from 'react';
import './CategoryModal.css';

/**
 * CategoryModal Component
 * 
 * Pop-up dialog to manage jewelry categories:
 * - Top section: Input box for new category name + Submit button beside it
 * - Bottom section: List of all categories with a Delete button beside each item
 * Folderized with dedicated CategoryModal.css
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {Function} onClose - Function to close modal
 * @param {Array} categories - Array of category strings
 * @param {Function} onAddCategory - Function to add a new category string
 * @param {Function} onDeleteCategory - Function to delete a category string
 */
export default function CategoryModal({
  isOpen,
  onClose,
  categories = [],
  onAddCategory,
  onDeleteCategory,
}) {
  // Input state for new category name
  const [newCategory, setNewCategory] = useState('');

  // If modal is not open, render nothing
  if (!isOpen) return null;

  /**
   * Handle adding a new category
   */
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const trimmed = newCategory.trim();
    if (!trimmed) return;

    if (categories.includes(trimmed)) {
      alert('Category already exists.');
      return;
    }

    if (onAddCategory) {
      onAddCategory(trimmed);
    }

    setNewCategory('');
  };

  return (
    <div className="category-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      
      {/* Modal Container Card */}
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl transition-all">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Manage Categories</h3>
            <p className="text-xs text-slate-500">Add or remove jewelry item categories</p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        {/* 1. Add Category Form (Input box + Submit button beside it) */}
        <form onSubmit={handleAddSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Enter category name..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
          >
            Submit
          </button>
        </form>

        {/* 2. Categories List Section (Just below the input form) */}
        <div className="mt-5 border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Existing Categories ({categories.length})
            </span>
          </div>

          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 rounded-lg border border-slate-200">
            {categories.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No categories available.
              </div>
            ) : (
              categories.map((cat) => (
                <div
                  key={cat}
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-medium text-slate-800">{cat}</span>
                  
                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => onDeleteCategory && onDeleteCategory(cat)}
                    className="rounded px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 border border-rose-200 transition"
                    title={`Delete ${cat}`}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-5 flex justify-end border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
}
