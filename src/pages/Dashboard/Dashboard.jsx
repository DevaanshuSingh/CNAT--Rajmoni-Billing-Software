import React from 'react';
import './Dashboard.css';

/**
 * Dashboard Page Component (Future Overview Module)
 * 
 * Future overview dashboard for high-level business analytics.
 * Folderized with dedicated Dashboard.css
 */
export default function Dashboard() {
  return (
    <div className="dashboard-page-container space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Executive Dashboard
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          High-level sales summaries, inventory trends, and analytics overview for Rajmoni Jewellers.
        </p>
      </div>

      {/* Preview Card */}
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-3xl">
          📊
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          Analytics Dashboard (Future Module)
        </h3>
        <p className="mx-auto mt-2 max-w-md text-xs text-slate-500">
          As agreed, the dashboard will be built after completing the main requirements: Stock Management and Bill Printing.
        </p>
        <span className="mt-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
          Scheduled for Future Phase
        </span>
      </div>

    </div>
  );
}
