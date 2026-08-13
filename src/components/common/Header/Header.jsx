import React from 'react';
import './Header.css';

/**
 * Header Component
 * 
 * Displays top navigation bar with application title, user badge,
 * and responsive mobile drawer toggle button.
 * Folderized with dedicated Header.css
 * 
 * @param {Function} onToggleSidebar - Function to toggle mobile sidebar drawer
 */
export default function Header({ onToggleSidebar }) {
  return (
    <header className="app-header sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-6">
      
      {/* Left side: Mobile Menu Toggle & App Title */}
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={onToggleSidebar}
          type="button"
          aria-label="Open sidebar menu"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 md:hidden"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Branding Logo & Title */}
        <div className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 font-bold text-white shadow-md">
            💎
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight sm:text-lg">
              Rajmoni Jewellers
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Billing & Stock Management System
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Quick Status & Shop Badge */}
      <div className="flex items-center space-x-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          System Ready
        </span>

        {/* Shop Avatar / Profile Label */}
        <div className="flex items-center space-x-2 border-l border-slate-200 pl-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-amber-400">
            RJ
          </div>
          <span className="hidden text-sm font-medium text-slate-700 md:inline-block">
            Rajmoni Jewellers
          </span>
        </div>
      </div>

    </header>
  );
}
