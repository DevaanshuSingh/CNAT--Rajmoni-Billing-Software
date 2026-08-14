import React from 'react';
import './Sidebar.css';

/**
 * Sidebar Component
 * 
 * Displays module navigation links. Supports desktop fixed sidebar
 * and mobile slide-over overlay drawer.
 * Folderized with dedicated Sidebar.css
 * 
 * @param {string} activePage - Name of currently active page route
 * @param {Function} setActivePage - Function to change active page
 * @param {boolean} isOpenMobile - Mobile drawer open state
 * @param {Function} onCloseMobile - Function to close mobile drawer
 */
export default function Sidebar({ activePage, setActivePage, isOpenMobile, onCloseMobile }) {

  /**
   * Navigation Modules List
   * Structured array defining available application modules
   */
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      sublabel: 'Sales & Stock Analytics',
      icon: '📊',
      badge: 'Future',
      badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
      active: false,
    },
    {
      id: 'stock',
      label: 'Stock Management',
      sublabel: 'Items & Stock',
      icon: '💎',
      badge: 'Main',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      active: true,
    },
    {
      id: 'billing',
      label: 'Bill Printing',
      sublabel: 'Invoicing & Sales Entry',
      icon: '🧾',
      badge: 'Phase 2',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      active: false,
    },
  ];

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 1. Mobile Backdrop Overlay (Visible only when mobile drawer open) */}
      {/* ------------------------------------------------------------- */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity md:hidden"
          aria-hidden="true"
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. Sidebar Main Container (Responsive Slide-over on mobile) */}
      {/* ------------------------------------------------------------- */}
      <aside
        className={`app-sidebar fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-slate-900 text-slate-100 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        {/* Sidebar Header & Close Button (Mobile) */}
        <div className="flex h-16 items-center justify-between border-b bg-[#85e2fe3b] border-slate-800 px-6">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-amber-400 tracking-wide">Rajmoni Jewellers</span>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            type="button"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu Links */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="mt-4 space-y-1.5">
            {navItems.map((item) => {
              const isCurrent = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    onCloseMobile();
                  }}
                  type="button"
                  className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-all duration-150 ${isCurrent
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                >
                  {/* Left: Icon & Label */}
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className={`text-sm ${isCurrent ? 'font-bold text-slate-950' : 'font-medium'}`}>
                        {item.label}
                      </div>
                      <div className={`text-xs ${isCurrent ? 'text-slate-900/80' : 'text-slate-400'}`}>
                        {item.sublabel}
                      </div>
                    </div>
                  </div>

                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-800 p-4 text-xs text-slate-400 text-center">
          Coder & AccoTax v1.0
        </div>
      </aside>
    </>
  );
}
