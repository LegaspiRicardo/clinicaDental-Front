// src/components/Layout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import type { EventApi } from '@fullcalendar/core';
import Sidebar from './Sidebar';

const Layout = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([
    { id: '1', title: 'Consulta Juan Pérez', start: new Date() } as EventApi,
    { id: '2', title: 'Ortodoncia Ana', start: new Date(Date.now() + 86400000) } as EventApi,
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className=" flex h-screen bg-cyan-700">
      <Sidebar
        currentEvents={currentEvents}
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="flex-1 overflow-y-auto scrollbar-hide ml-0 ">
        <Outlet context={{ setCurrentEvents }} />
      </main>
    </div>
  );
};

export default Layout;
