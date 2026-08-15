import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ isOpenMobile, onCloseMobile }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      sublabel: 'Sales & Stock Analytics',
      icon: '📊',
      path: '/dashboard',
    },
    {
      id: 'stock',
      label: 'Stock Management',
      sublabel: 'Items & Stock',
      icon: '💎',
      path: '/stock',
    },
    {
      id: 'billing',
      label: 'Bill Printing',
      sublabel: 'Invoicing & Sales Entry',
      icon: '🧾',
      path: '/billing',
    },
  ];

  return (
    <>
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`app-sidebar fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-slate-900 text-slate-100 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpenMobile
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 bg-[#85e2fe3b] px-6">
          <span className="font-bold tracking-wide text-amber-400">
            Rajmoni Jewellers
          </span>

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

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="mt-4 space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `group flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-all duration-150 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{item.icon}</span>

                  <div>
                    <div className="text-sm font-medium">
                      {item.label}
                    </div>

                    <div className="text-xs opacity-80">
                      {item.sublabel}
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="border-t border-slate-800 p-4 text-center text-xs text-slate-400">
          Coder & AccoTax v1.0
        </div>
      </aside>
    </>
  );
}