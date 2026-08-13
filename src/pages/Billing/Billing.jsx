import React from 'react';
import './Billing.css';

/**
 * Billing Page Component (Phase 2 Invoicing Module)
 * 
 * Future module for sales entry, billing invoice layout, and print receipt.
 * Folderized with dedicated Billing.css
 */
export default function Billing() {
  return (
    <div className="billing-page-container space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Bill Printing & Invoicing
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Sales transaction entry, bill calculation, and printable receipt layout for Rajmoni Jewellers.
        </p>
      </div>

      {/* Preview Card */}
      <div className="billing-preview-card rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
          🧾
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          Bill Printing Module (Phase 2)
        </h3>
        <p className="mx-auto mt-2 max-w-md text-xs text-slate-500">
          This module will be developed after finalizing Stock Management. It will allow selecting items from stock, entering sales quantity, and printing invoices.
        </p>
        <span className="mt-4 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
          Next Phase Milestone
        </span>
      </div>

    </div>
  );
}
