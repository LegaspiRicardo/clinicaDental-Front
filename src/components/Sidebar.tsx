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
      {/* Botón hamburguesa: solo visible en pantallas < md */}
      <button
        className="md:hidden fixed top-8 right-8 z-50 text-2xl p-2 bg-gray-800 text-white rounded shadow"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-md p-4 z-40
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block
        `}
      >
        {/* Logo y navegación */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-12 mt-5">
            <a href="/" className="hover:text-blue-600">DENTAL - ART</a>
          </h2>
          <ul className="space-y-2 ml-3">
            <li>
              <a href="/dentistas" className="block text-gray-700 text-xl my-8 hover:text-blue-500">Dentistas</a>
            </li>
            <li>
              <a href="/pacientes" className="block text-gray-700 text-xl my-8 hover:text-blue-500">Pacientes</a>
            </li>
            <li>
              <a href="/horarios" className="block text-gray-700 text-xl my-8 hover:text-blue-500">Horarios</a>
            </li>
            <li>
              <a href="/finanzas" className="block text-gray-700 text-xl my-8 hover:text-blue-500">Finanzas</a>
            </li>
          </ul>
        </div>

        {/* Próximas citas */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Próximas citas ({currentEvents.length})
          </h2>
          <ul className="space-y-1 text-sm text-gray-700">
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
