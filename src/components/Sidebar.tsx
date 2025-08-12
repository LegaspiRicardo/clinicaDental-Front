// src/components/Sidebar.tsx
import { useNavigate } from 'react-router-dom';
import React from 'react';
import type { EventApi } from '@fullcalendar/core';
import { Button } from '@mui/material';

interface SidebarProps {
  currentEvents: EventApi[];
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentEvents, sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol'); // quitar también el rol
    navigate('/login');
  };

  const rol = localStorage.getItem('rol'); // obtener rol del usuario

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
            {/* Opciones solo visibles para roles que no sean dentista */}
            {rol == 'Dentista' && (
              <>
                <li>
                  <a href="/horarios" className="block text-gray-700 text-xl my-8 hover:text-blue-500">Horarios</a>
                </li>
                <li>
                  <a href="/" className="block text-gray-700 text-xl my-8 hover:text-blue-500">Citas</a>
                </li> 
              </>
            )}

            {/* Opciones visibles para admin */}
                        {rol == 'Admin' && (
              <>
            <li>
              <a href="/dentistas" className="block text-gray-700 text-xl my-8 hover:text-blue-500">Dentistas</a>
            </li>
            <li>
              <a href="/pacientes" className="block text-gray-700 text-xl my-8 hover:text-blue-500">Pacientes</a>
            </li>
            <li>
              <a href="/servicios" className="block text-gray-700 text-xl my-8 hover:text-blue-500">Servicios</a>
            </li>
            <li>
              <a href="/horarios" className="block text-gray-700 text-xl my-8 hover:text-blue-500">Horarios</a>
            </li>
            <li>
              <a href="/" className="block text-gray-700 text-xl my-8 hover:text-blue-500">Citas</a>
            </li>
            <li>
              <a href="/miperfil" className="block text-gray-700 text-xl mt-48 hover:text-blue-500">Mi perfil</a>
            </li>
            </>
            )}

            {/* Botón de cerrar sesión */}
            <div className="mt-8">
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            </div>
          </ul>
        </div>

        {/* Próximas citas */}

      </div>
    </>
  );
};

export default Sidebar;
