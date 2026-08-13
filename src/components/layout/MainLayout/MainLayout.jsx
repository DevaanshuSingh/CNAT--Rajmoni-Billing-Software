import React, { useState } from 'react';
import Header from '../../common/Header/Header';
import Sidebar from '../../common/Sidebar/Sidebar';
import './MainLayout.css';

/**
 * MainLayout Component
 * 
 * Provides the application outer frame wrapper:
 * - Top Header with mobile sidebar drawer toggle
 * - Left Navigation Sidebar (desktop & mobile slide-over)
 * - Main Scrollable Content Workspace
 * Folderized with dedicated MainLayout.css
 * 
 * @param {string} activePage - Active route module key
 * @param {Function} setActivePage - Setter function for active route
 * @param {React.ReactNode} children - Main page content
 */
export default function MainLayout({ activePage, setActivePage, children }) {
  // Mobile sidebar open/close drawer state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="main-layout-frame flex h-screen w-full overflow-hidden bg-slate-100 font-sans text-slate-800">
      
      {/* 1. Left Navigation Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Right Main Column (Header + Page Content) */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* Top Header */}
        <Header onToggleSidebar={() => setIsMobileSidebarOpen(true)} />

        {/* Main Content Workspace (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}
