// src/components/Sidebar.tsx
import React from 'react';
import type { EventApi } from '@fullcalendar/core';
interface SidebarProps {
  currentEvents: EventApi[];
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentEvents, sidebarOpen, toggleSidebar }) => {
  return (
    <>
      <button className="hamburger-btn" onClick={toggleSidebar}>☰</button>

      <div className={`demo-app-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="demo-app-sidebar-section">
          <h2><a href="/">DENTAL - ART </a></h2>
          <ul>
            <li><a href="/dentistas" className="linkSideBar">Dentistas</a></li>
            <li><a href="/pacientes" className="linkSideBar">Pacientes</a></li>
            <li><a href="/horarios" className="linkSideBar">Horarios</a></li>
            <li><a href="/finanzas" className="linkSideBar">Finanzas</a></li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>Próximas citas ({currentEvents.length})</h2>
          <ul>
            {currentEvents.map((event) => (
              <li key={event.id}>
                <b>{event.start?.toLocaleDateString()}</b> <i>{event.title}</i>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
