import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { MenuItem, Select } from '@mui/material';
import axios from 'axios';
import FormularioCita from '../components/forms/FormularioCita';

const Citas = () => {
  const [dentistas, setDentistas] = useState<any[]>([]);
  const [dentistaSeleccionado, setDentistaSeleccionado] = useState('');
  const [eventos, setEventos] = useState<any[]>([]);
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<any | null>(null);

  // Cargar dentistas activos
  useEffect(() => {
    const fetchDentistas = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/dentistas', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        setDentistas(res.data.filter((d: any) => d.status === 'Activo'));
      } catch (error) {
        console.error('Error al cargar dentistas:', error);
      }
    };
    fetchDentistas();
  }, []);

  // Fragmentar horarios por hora
  const fetchHorariosFragmentados = async (dentistaId: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/horarios?dentistaId=${dentistaId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      const horariosFragmentados = res.data.flatMap((h: any) => {
        const fechaLocal = h.fecha.slice(0, 10);
        const inicioDate = new Date(`${fechaLocal}T${h.inicio}`);
        const finDate = new Date(`${fechaLocal}T${h.fin}`);

        const bloques = [];
        let bloqueInicio = new Date(inicioDate);

        while (bloqueInicio < finDate) {
          const bloqueFin = new Date(bloqueInicio);
          bloqueFin.setHours(bloqueInicio.getHours() + 1);
          if (bloqueFin > finDate) bloqueFin.setTime(finDate.getTime());

bloques.push({
  id: `horario-${h.id}-${bloqueInicio.toISOString()}`,
  title: `Disponible: ${bloqueInicio.toTimeString().slice(0, 5)} - ${bloqueFin.toTimeString().slice(0, 5)}`,
  start: bloqueInicio.toISOString(),
  end: bloqueFin.toISOString(),
  backgroundColor: '#1976d2',
  borderColor: '#1976d2',
  textColor: '#fff',
  extendedProps: { id_horario: h.id },
  // display: 'background',  // QUITAR esta línea para que los eventos sean clickeables
});


          bloqueInicio = bloqueFin;
        }
        return bloques;
      });

      return horariosFragmentados;
    } catch (error) {
      console.error('Error al cargar horarios:', error);
      return [];
    }
  };

  // Cargar citas del dentista
  const fetchCitas = async (dentistaId: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/citas?dentistaId=${dentistaId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      return res.data.map((c: any) => ({
        id: c.id,
        title: c.description || 'Cita',
        start: `${c.fecha}T${c.inicio}`,
        end: `${c.fecha}T${c.fin}`,
        backgroundColor: '#009688',
        borderColor: '#009688',
        textColor: '#fff',
      }));
    } catch (error) {
      console.error('Error al cargar citas:', error);
      return [];
    }
  };

  // Unir horarios y citas
  const cargarEventos = async (dentistaId: string) => {
    const horarios = await fetchHorariosFragmentados(dentistaId);
    const citas = await fetchCitas(dentistaId);
    setEventos([...horarios, ...citas]);
  };

  useEffect(() => {
    if (dentistaSeleccionado) {
      cargarEventos(dentistaSeleccionado);
    } else {
      setEventos([]);
    }
  }, [dentistaSeleccionado]);

  // Evento click
  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;
    console.log('Evento clickeado:', event); // <- Para depurar

    if (event.display === 'background') {
      if (!dentistaSeleccionado) {
        alert('Selecciona un dentista primero.');
        return;
      }
      setFechaSeleccionada(event.startStr.slice(0, 10));
      setHorarioSeleccionado({
        id_horario: event.extendedProps.id_horario,
        inicio: event.startStr.slice(11, 16),
        fin: event.endStr.slice(11, 16),
      });
      setDialogoAbierto(true);
    } else {
      // Aquí lógica para eventos cita (editar o eliminar)
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Gestión de Citas</h2>

      <Select
        fullWidth
        displayEmpty
        value={dentistaSeleccionado}
        onChange={(e) => setDentistaSeleccionado(e.target.value)}
        sx={{ mb: 4 }}
      >
        <MenuItem value="" disabled>
          Selecciona un dentista
        </MenuItem>
        {dentistas.map((d) => (
          <MenuItem key={d.id} value={d.id}>
            {d.username} — {d.especialidad}
          </MenuItem>
        ))}
      </Select>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        locale={esLocale}
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
        events={eventos}
        eventClick={handleEventClick}
        height="80vh"
      />

      <FormularioCita
        open={dialogoAbierto}
        onClose={() => setDialogoAbierto(false)}
        fecha={fechaSeleccionada}
        dentistaId={dentistaSeleccionado}
        inicioHorario={horarioSeleccionado?.inicio}
        finHorario={horarioSeleccionado?.fin}
        idHorario={horarioSeleccionado?.id_horario}
        onCitaGuardada={() => {
          cargarEventos(dentistaSeleccionado);
          setDialogoAbierto(false);
        }}
      />
    </div>
  );
};

export default Citas;
