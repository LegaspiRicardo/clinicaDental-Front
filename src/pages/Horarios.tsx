// src/pages/Horarios.tsx
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import type { DateSelectArg, EventClickArg, EventContentArg, EventApi } from '@fullcalendar/core';
import axios from 'axios';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Box,
} from '@mui/material';

const Horarios = () => {
  const [dentistas, setDentistas] = useState<any[]>([]);
  const [dentistaId, setDentistaId] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

  // Traer dentistas activos
  useEffect(() => {
    const fetchDentistas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/dentistas');
        setDentistas(res.data.filter((d: any) => d.status === 'Activo'));
      } catch (error) {
        console.error('Error al cargar dentistas:', error);
      }
    };
    fetchDentistas();
  }, []);


  //Actualiza el contenido cada que dentistaId cambie
useEffect(() => {
  const fetchHorarios = async () => {
    if (!dentistaId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/horario?dentistaId=${dentistaId}`);
      const eventos = res.data.map((h: any) => ({
        id: h.id.toString(),
        title: `Horario`,
        start: `${h.fecha}T${h.inicio}`,
        end: `${h.fecha}T${h.fin}`,
      }));
      setCurrentEvents(eventos);
    } catch (error) {
      console.error('Error al cargar horarios:', error);
    }
  };
  fetchHorarios();
}, [dentistaId]);




  // Al seleccionar día en el calendario
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    if (!dentistaId) {
      alert('Por favor, selecciona primero un dentista.');
      return;
    }
    setSelectedDate(selectInfo.startStr.slice(0, 10)); // yyyy-mm-dd
    setHoraInicio('');
    setHoraFin('');
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Guardar horario en BD
const handleGuardarHorario = async () => {
  if (!horaInicio || !horaFin) {
    alert('Por favor ingresa hora de inicio y fin');
    return;
  }
  if (horaInicio >= horaFin) {
    alert('La hora de inicio debe ser menor a la hora fin');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    await axios.post(
      'http://localhost:5000/api/horario',
      {
        id_dentista: dentistaId,
        fecha: selectedDate,
        inicio: horaInicio,
        fin: horaFin,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert('Horario guardado correctamente');
    setDialogOpen(false);
  } catch (error) {
    console.error('Error al guardar horario:', error);
    alert('Error al guardar horario');
  }
};


  const handleEventClick = (clickInfo: EventClickArg) => {
    if (window.confirm(`¿Quieres eliminar el horario '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
      // Aquí también puedes hacer llamada para eliminar en backend
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  const renderEventContent = (eventContent: EventContentArg) => (
    <>
      <b>{eventContent.timeText}</b> <i>{eventContent.event.title}</i>
    </>
  );

  return (
    <Box className="demo-app container mx-auto p-8 rounded-md bg-cyan-800">
      <Box className="main-wrapper">
        <h2 className="text-white text-4xl mb-8">Horarios dentistas DENTAL - ART</h2>

        {/* Select dentista */}
        <FormControl fullWidth sx={{ mb: 4, backgroundColor: 'white', borderRadius: 1 }}>
          <InputLabel id="select-dentista-label">Selecciona un dentista</InputLabel>
          <Select
            labelId="select-dentista-label"
            value={dentistaId}
            label="Selecciona un dentista"
            onChange={(e) => setDentistaId(e.target.value)}
          >
            {dentistas.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.username} - {d.especialidad}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Calendario */}
        <Box className="calendar-container bg-white p-8 rounded-lg">
          <FullCalendar
            locale={esLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView="dayGridMonth"
            editable={false}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
            events={currentEvents}
            eventContent={renderEventContent}
          />
        </Box>

        {/* Dialog para ingresar hora inicio y fin */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Agregar horario para {selectedDate}</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Hora inicio"
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }} // intervalos de 5 minutos
            />
            <TextField
              label="Hora fin"
              type="time"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancelar</Button>
            <Button onClick={handleGuardarHorario} variant="contained" color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Horarios;
