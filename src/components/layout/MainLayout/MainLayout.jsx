import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../common/Header/Header';
import Sidebar from '../../common/Sidebar/Sidebar';
import './MainLayout.css';

export default function MainLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="main-layout-frame flex h-screen w-full overflow-hidden bg-slate-100 font-sans text-slate-800">
      <Sidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onToggleSidebar={() => setIsMobileSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}