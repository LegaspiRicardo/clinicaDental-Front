// src/pages/Horarios.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MenuItem, Select } from '@mui/material';
import FormularioHorario from '../components/forms/FormularioHorario';

const Horarios = () => {
  const [dentistas, setDentistas] = useState<any[]>([]);
  const [dentistaSeleccionado, setDentistaSeleccionado] = useState<string>('');
  const [eventos, setEventos] = useState<any[]>([]);
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');

  useEffect(() => {
    const fetchDentistas = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('token (fetchDentistas):', token);
        const res = await axios.get('http://localhost:5000/api/users/dentistas', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined
        });
        setDentistas(res.data.filter((d: any) => d.status === 'Activo'));
      } catch (error) {
        console.error('Error al cargar dentistas:', error);
      }
    };
    fetchDentistas();
  }, []);

  const fetchHorarios = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      console.log('token (fetchHorarios):', token);
      const res = await axios.get(`http://localhost:5000/api/horarios?dentistaId=${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });
      const eventosFormateados = res.data.map((h: any) => ({
        id: h.id,
        title: `🕓 ${h.inicio} - ${h.fin}`,
        start: h.fecha,
        allDay: true,
        color: '#1976d2',
        textColor: '#fff',
      }));
      setEventos(eventosFormateados);
    } catch (error: any) {
      console.error('Error al cargar horarios:', error);
      if (error?.response?.status === 401) {
        alert('No autorizado. Revisa que haya token en localStorage (inicia sesión).');
      }
    }
  };

  useEffect(() => {
    if (dentistaSeleccionado) fetchHorarios(dentistaSeleccionado);
    else setEventos([]);
  }, [dentistaSeleccionado]);

  const handleDateClick = (arg: any) => {
    if (!dentistaSeleccionado) {
      alert('Selecciona un dentista primero.');
      return;
    }
    setFechaSeleccionada(arg.dateStr);
    setDialogoAbierto(true);
  };


  console.log('Dentistas cargados:', dentistas);

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Gestión de Horarios</h2>

      <div className="mb-6">
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
    <MenuItem
      key={d.id}
      value={d.id}
      style={{ color: 'black' }} // <-- Aquí fuerzo inline color negro
    >
      {d.username} . ---- Especialidad: {d.especialidad}
    </MenuItem>
  ))}
</Select>


      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={eventos}
        eventColor="#1976d2"
        eventTextColor="#fff"
        height="90vh"
      />

      <FormularioHorario
        open={dialogoAbierto}
        onClose={() => setDialogoAbierto(false)}
        fecha={fechaSeleccionada}
        dentistaId={dentistaSeleccionado}
        onHorarioGuardado={() => fetchHorarios(dentistaSeleccionado)}
      />
    </div>
  );
};

export default Horarios;
