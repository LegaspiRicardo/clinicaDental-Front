import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import type { DateSelectArg, EventClickArg, EventContentArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';
import { createEventId } from '../event-utils';

const MyCalendar = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [dentistas, setDentistas] = useState<any[]>([]);
  const [dentistaId, setDentistaId] = useState('');

  const [pacientes, setPacientes] = useState<any[]>([]);

  const [horarios, setHorarios] = useState<any[]>([]);

  // Estado para el modal/formulario
  const [openForm, setOpenForm] = useState(false);
  const [selectedHorario, setSelectedHorario] = useState<any>(null);

  // Datos del formulario para la cita
  const [formData, setFormData] = useState({
    id_paciente: '',
    id_servicio: '',
    description: '',
  });

  const [servicios, setServicios] = useState<any[]>([]);

  // Cargar dentistas activos
  useEffect(() => {
    const fetchDentistas = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/dentistas', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const activos = res.data.filter((d: any) => d.status?.toLowerCase() === 'activo');
        setDentistas(activos);
      } catch (error) {
        console.error('Error al cargar dentistas:', error);
      }
    };
    fetchDentistas();
  }, []);

  // Cargar pacientes activos
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/pacientes', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const activos = res.data.filter((p: any) => p.status?.toLowerCase() === 'activo');
        setPacientes(activos);
      } catch (error) {
        console.error('Error al cargar pacientes:', error);
      }
    };
    fetchPacientes();
  }, []);

  // Cargar servicios activos
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/servicios', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        setServicios(res.data);
      } catch (error) {
        console.error('Error al cargar servicios:', error);
      }
    };
    fetchServicios();
  }, []);

  // Cargar horarios cuando cambia dentista seleccionado
  useEffect(() => {
    if (!dentistaId) {
      setHorarios([]);
      return;
    }
    const fetchHorarios = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/horarios?dentistaId=${dentistaId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        setHorarios(res.data);
      } catch (error) {
        console.error('Error al cargar horarios:', error);
      }
    };
    fetchHorarios();
  }, [dentistaId]);

  // Mapear horarios a eventos para FullCalendar
  const eventosHorarios = horarios.map(horario => ({
    id: String(horario.id),
    title: 'Horario disponible',
    start: `${horario.fecha}T${horario.inicio}`,
    end: `${horario.fecha}T${horario.fin}`,
    allDay: false,
  }));

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // Aquí no haremos nada, la cita se crea desde el modal al seleccionar un horario
    alert('Por favor, seleccione un horario haciendo clic en el evento.');
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const horario = horarios.find(h => String(h.id) === clickInfo.event.id);
    if (!horario) return;

    setSelectedHorario(horario);
    setFormData({
      id_paciente: '',
      id_servicio: '',
      description: '',
    });

    setOpenForm(true);
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  const renderEventContent = (eventContent: EventContentArg) => (
    <>
      <b>{eventContent.timeText}</b> <i>{eventContent.event.title}</i>
    </>
  );

  const renderSidebarEvent = (event: EventApi) => (
    <li key={event.id}>
      <b>{event.start?.toLocaleDateString()}</b> <i>{event.title}</i>
    </li>
  );

  const handleFormChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value as string,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedHorario) return alert('No hay horario seleccionado');
    if (!formData.id_paciente || !formData.id_servicio) return alert('Debe seleccionar paciente y servicio');

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/citas', {
        fecha: selectedHorario.fecha,
        inicio: selectedHorario.inicio,
        fin: selectedHorario.fin,
        id_dentista: Number(dentistaId),
        id_paciente: Number(formData.id_paciente),
        id_servicio: Number(formData.id_servicio),
        description: formData.description,
        status: 'Pendiente',
        id_horario: selectedHorario.id,
      }, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      alert('Cita creada correctamente');
      setOpenForm(false);
    } catch (error) {
      console.error('Error al crear cita:', error);
      alert('Error al crear cita');
    }
  };

  return (
    <div className="demo-app">
      <button className="hamburger-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>

      <div className={`demo-app-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="demo-app-sidebar-section">
          <h2>DENTAL - ART</h2>
          <ul>
            <li><a href="" className="linkSideBar">Dentistas</a></li>
            <li><a href="" className="linkSideBar">Pacientes</a></li>
            <li><a href="" className="linkSideBar">Horarios</a></li>
            <li><a href="" className="linkSideBar">Finanzas</a></li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>Próximas citas ({currentEvents.length})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>

      <div className="main-wrapper">
        <div className="filters-bar">
          <Select
            value={dentistaId}
            onChange={(e) => setDentistaId(e.target.value)}
            displayEmpty
            sx={{ minWidth: 250, backgroundColor: 'white' }}
          >
            <MenuItem value="" disabled>Doctores y dentistas</MenuItem>
            {dentistas.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.username} - {d.especialidad}
              </MenuItem>
            ))}
          </Select>

          <Select
            value="" // Aquí podrías usar estado para paciente si quieres filtrar también
            displayEmpty
            sx={{ minWidth: 250, marginLeft: 2, backgroundColor: 'white' }}
          >
            <MenuItem value="" disabled>Pacientes activos</MenuItem>
            {pacientes.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.username} {p.apellido || ''}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="calendar-container">
          <FullCalendar
            locale={esLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
            events={eventosHorarios} // Mostrar horarios disponibles
          />
        </div>
      </div>

      {/* Modal para crear cita */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Crear cita para horario seleccionado</DialogTitle>
        <DialogContent>
          <TextField
            label="Fecha"
            type="date"
            fullWidth
            margin="normal"
            name="fecha"
            value={selectedHorario?.fecha || ''}
            disabled
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hora inicio"
            type="time"
            fullWidth
            margin="normal"
            name="inicio"
            value={selectedHorario?.inicio || ''}
            disabled
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hora fin"
            type="time"
            fullWidth
            margin="normal"
            name="fin"
            value={selectedHorario?.fin || ''}
            disabled
            InputLabelProps={{ shrink: true }}
          />

          <Select
            fullWidth
            name="id_paciente"
            value={formData.id_paciente}
            onChange={handleFormChange}
            displayEmpty
            sx={{ marginTop: 2 }}
          >
            <MenuItem value="" disabled>Selecciona un paciente</MenuItem>
            {pacientes.map(p => (
              <MenuItem key={p.id} value={p.id}>
                {p.username} {p.apellido || ''}
              </MenuItem>
            ))}
          </Select>

          <Select
            fullWidth
            name="id_servicio"
            value={formData.id_servicio}
            onChange={handleFormChange}
            displayEmpty
            sx={{ marginTop: 2 }}
          >
            <MenuItem value="" disabled>Selecciona un servicio</MenuItem>
            {servicios.map(s => (
              <MenuItem key={s.id} value={s.id}>
                {s.nombre}
              </MenuItem>
            ))}
          </Select>

          <TextField
            label="Descripción"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Guardar cita
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyCalendar;
