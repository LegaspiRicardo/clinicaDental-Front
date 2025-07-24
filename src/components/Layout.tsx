// src/components/Layout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import type { EventApi } from '@fullcalendar/core';
import Sidebar from './Sidebar';

const Layout = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

return (
    <div className="demo-app">
      <Sidebar
        currentEvents={currentEvents}
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="main-wrapper">
        {/* Aquí va el contenido (MyCalendar, Dentistas, etc) */}
        <Outlet context={{ setCurrentEvents }} />
      </div>
    </div>
  );
};

export default Layout;
