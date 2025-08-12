// src/pages/Horarios.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // para vista por horas
import interactionPlugin from '@fullcalendar/interaction';
import { MenuItem, Select } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import FormularioHorario from '../components/forms/FormularioHorario';
import FormularioEliminarHorario from '../components/forms/FormularioEliminarHorario';

type TokenPayload = {
  id: string;
  email: string;
  rol: string;
};

const Horarios = () => {
  const token = localStorage.getItem('token');
  const decoded: TokenPayload | null = token ? jwtDecode(token) : null;

  // Estado si es dentista
  const isDentista = decoded?.rol.toLowerCase() === 'dentista';

  // Estados para dentistas y nombre dentista logueado
  const [dentistas, setDentistas] = useState<any[]>([]);
  const [dentistaSeleccionado, setDentistaSeleccionado] = useState<string>(isDentista ? (decoded?.id ?? '') : '');
  const [nombreDentista, setNombreDentista] = useState<string>('');

  const [eventos, setEventos] = useState<any[]>([]);
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<any | null>(null);
  const [dialogoEliminarAbierto, setDialogoEliminarAbierto] = useState(false);

  // Cargar dentistas para select SOLO si NO es dentista
  useEffect(() => {
    if (!isDentista) {
      const fetchDentistas = async () => {
        try {
          if (!token) return;
          const res = await axios.get('http://localhost:5000/api/users/dentistas', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDentistas(res.data.filter((d: any) => d.status === 'Activo'));
        } catch (error) {
          console.error('Error al cargar dentistas:', error);
        }
      };
      fetchDentistas();
    }
  }, [isDentista, token]);

  // Obtener nombre dentista logueado SI es dentista
  useEffect(() => {
    if (isDentista && decoded?.id && token) {
      const fetchNombreDentista = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/users/${decoded.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setNombreDentista(res.data.username || res.data.nombre || decoded.email);
        } catch (error) {
          console.error('Error al obtener nombre dentista:', error);
          setNombreDentista(decoded.email); // fallback
        }
      };
      fetchNombreDentista();
    }
  }, [isDentista, decoded, token]);

  // Función para cargar horarios del dentista seleccionado
  const fetchHorarios = async (id: string) => {
    try {
      if (!token) return;
      const res = await axios.get(`http://localhost:5000/api/horarios?dentistaId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const eventosFormateados = res.data.map((h: any) => {
        const fechaLocal = h.fecha.slice(0, 10); // yyyy-mm-dd
        return {
          id: h.id,
          title: `🕓 ${h.inicio} - ${h.fin}`,
          start: `${fechaLocal}T${h.inicio}`,
          end: `${fechaLocal}T${h.fin}`,
          allDay: false,
          color: '#1976d2',
          textColor: '#fff',
        };
      });
      setEventos(eventosFormateados);
    } catch (error) {
      console.error('Error al cargar horarios:', error);
    }
  };

  // Cargar horarios al cambiar dentista seleccionado (o al iniciar si dentista)
  useEffect(() => {
    if (dentistaSeleccionado) {
      fetchHorarios(dentistaSeleccionado);
    } else {
      setEventos([]);
    }
  }, [dentistaSeleccionado]);

  const handleDateClick = (arg: any) => {
    if (!dentistaSeleccionado) {
      alert('Selecciona un dentista primero.');
      return;
    }
    setFechaSeleccionada(arg.dateStr);
    setDialogoAbierto(true);
  };

  const handleEventClick = (clickInfo: any) => {
    setHorarioSeleccionado({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      startStr: clickInfo.event.startStr,
      end: clickInfo.event.end,
    });
    setDialogoEliminarAbierto(true);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Gestión de Horarios</h2>

      <div className="mb-6">
        {isDentista ? (
          <div
            style={{
              color: 'black',
              fontWeight: 'bold',
              minWidth: 250,
              fontSize: 16,
              padding: '8px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              userSelect: 'none',
            }}
          >
            {nombreDentista || 'Dentista'}
          </div>
        ) : (
          <Select
            fullWidth
            displayEmpty
            value={dentistaSeleccionado}
            onChange={(e) => setDentistaSeleccionado(e.target.value)}
            sx={{
              color: 'black',
              backgroundColor: 'white',
              minWidth: 250,
              fontSize: 16,
              '& .MuiSelect-icon': {
                color: 'black',
              },
              '& .MuiInputBase-input': {
                color: 'black',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: 'white',
                  color: 'black',
                  minWidth: 250,
                },
              },
              MenuListProps: {
                sx: {
                  backgroundColor: 'white',
                  color: 'black',
                  '& .MuiMenuItem-root': {
                    color: 'black',
                    fontSize: 16,
                    minHeight: 40,
                  },
                },
              },
            }}
          >
            <MenuItem value="" disabled sx={{ color: 'gray' }}>
              Selecciona un dentista
            </MenuItem>
            {dentistas.map((d) => (
              <MenuItem key={d.id} value={d.id} style={{ color: 'black' }}>
                {d.username} {d.especialidad}
              </MenuItem>
            ))}
          </Select>
        )}
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek" // Puedes cambiar a timeGridDay o dayGridMonth si quieres
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={eventos}
        eventColor="#1976d2"
        eventTextColor="#fff"
        height="90vh"
        slotMinTime="07:00:00" // hora mínima visible (opcional)
        slotMaxTime="21:00:00" // hora máxima visible (opcional)
      />

      <FormularioHorario
        open={dialogoAbierto}
        onClose={() => setDialogoAbierto(false)}
        fecha={fechaSeleccionada}
        dentistaId={dentistaSeleccionado}
        onHorarioGuardado={() => fetchHorarios(dentistaSeleccionado)}
      />

      <FormularioEliminarHorario
        open={dialogoEliminarAbierto}
        onClose={() => setDialogoEliminarAbierto(false)}
        horario={horarioSeleccionado}
        onEliminarExitoso={() => fetchHorarios(dentistaSeleccionado)}
      />
    </div>
  );
};

export default Horarios;
