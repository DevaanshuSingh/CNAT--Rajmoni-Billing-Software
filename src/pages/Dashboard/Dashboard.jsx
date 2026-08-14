import React from 'react';
import MetricCard from '../../components/common/MetricCard/MetricCard';
import './Dashboard.css';

/**
 * Dashboard Page Component
 * 
 * Overview Dashboard containing stock summary metric cards,
 * inventory analytics overview, and quick shortcuts for Rajmoni Jewellers.
 */
export default function Dashboard() {
  // Sample analytics computations
  const totalItemCount = 4;
  const totalStockQuantity = 118;
  const lowStockCount = 2; // Items at or below min stock level
  const totalSoldThisMonth = 57;

  return (
    <div className="dashboard-page-container space-y-6">
      
      {/* 1. Dashboard Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Executive Dashboard
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Rajmoni Jewellers - High-level stock metrics, inventory alerts, and sales overview.
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center gap-2">
          <span className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-amber-400">
            Overview Active
          </span>
        </div>
      </div>

      {/* 2. Summary Metric Cards Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Metric 1: Total Stock Units */}
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

      {/* 3. System Information & Quick Module Status Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-2">
          System Overview & Modules Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="rounded-lg border border-slate-200 p-4 bg-slate-50">
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-1">
              <span>💎</span>
              <span>Stock Management & Item Master</span>
            </div>
            <p className="text-xs text-slate-600">
              Manage jewelry item master records, produced quantities, and set minimum stock alert levels.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4 bg-slate-50">
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-1">
              <span>🧾</span>
              <span>Bill Printing & Sales Invoicing</span>
            </div>
            <p className="text-xs text-slate-600">
              Authentic Rajmoni Jewellers GST invoice sale bill layout with modal print preview.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
