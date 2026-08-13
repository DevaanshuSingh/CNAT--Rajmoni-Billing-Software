import React from 'react';
import './MetricCard.css';

/**
 * MetricCard Component
 * 
 * Reusable summary card component to display key stock metrics
 * (e.g. Total Stock, Sold This Month, Low Stock Alerts).
 * Folderized with dedicated MetricCard.css
 * 
 * @param {string} title - Card header label
 * @param {string|number} value - Metric value to display
 * @param {string} subtitle - Context subtitle or helper text
 * @param {string} icon - Emoji or SVG icon representation
 * @param {string} accentColor - Color class for left border / icon background
 */
export default function MetricCard({ title, value, subtitle, icon, accentColor = 'border-amber-500' }) {
  return (
    <div className={`metric-card-wrapper flex flex-col justify-between rounded-xl border-l-4 border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md ${accentColor}`}>
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-xl shadow-inner">
          {icon}
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="mt-3">
        <div className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          {value}
        </div>
        {subtitle && (
          <p className="mt-1 text-xs font-medium text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

    </div>
  );
}
