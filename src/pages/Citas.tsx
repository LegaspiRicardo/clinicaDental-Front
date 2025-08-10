import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import {
  MenuItem,
  Select,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import axios from 'axios';
import FormularioCita from '../components/forms/FormularioCita';

interface Dentista {
  id: string;
  username: string;
  especialidad: string;
  status: string;
}

interface Evento {
  id: string;
  title: string;
  start: string | Date;
  end: string | Date;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: any;
  priority: number;
}

const Citas = () => {
  const [dentistas, setDentistas] = useState<Dentista[]>([]);
  const [dentistaSeleccionado, setDentistaSeleccionado] = useState<string>('');
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>('');
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<{ id_horario: string; inicio: string; fin: string } | null>(null);
  const [cargando, setCargando] = useState(false);

  const [citaSeleccionada, setCitaSeleccionada] = useState<any>(null);
  const [dialogoCitaAbierto, setDialogoCitaAbierto] = useState(false);
  const [loadingEliminar, setLoadingEliminar] = useState(false);

  useEffect(() => {
    const fetchDentistas = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/dentistas', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        setDentistas(res.data.filter((d: Dentista) => d.status === 'Activo'));
      } catch (error) {
        console.error('Error al cargar dentistas:', error);
      }
    };
    fetchDentistas();
  }, []);

  const toLocalDateString = (fechaISO: string) => {
    const d = new Date(fechaISO);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchHorariosFragmentados = async (dentistaId: string) => {
    try {
      setCargando(true);
      const token = localStorage.getItem('token');
      const resHorarios = await axios.get(`http://localhost:5000/api/horarios?dentistaId=${dentistaId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      const resCitas = await axios.get(`http://localhost:5000/api/citas?dentistaId=${dentistaId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      const citas = resCitas.data;

      const bloques: Evento[] = [];

      for (const h of resHorarios.data) {
        const fechaLocal = h.fecha.slice(0, 10);
        const inicioDate = new Date(`${fechaLocal}T${h.inicio}`);
        const finDate = new Date(`${fechaLocal}T${h.fin}`);

        let bloqueInicio = new Date(inicioDate);

        while (bloqueInicio < finDate) {
          const bloqueFin = new Date(bloqueInicio);
          bloqueFin.setHours(bloqueInicio.getHours() + 1);
          if (bloqueFin > finDate) bloqueFin.setTime(finDate.getTime());

const citaOcupante = citas.find((c: any) => {
  // Sacamos el ID de horario sin importar cómo venga
  const idHorarioCita = c.id_horario ?? c.idHorario ?? c?.horario?.id;

  // Parseamos horas
  const [horaInicioC, minInicioC] = c.inicio.split(":").map(Number);
  const [horaFinC, minFinC] = c.fin.split(":").map(Number);

  const inicioCita = new Date(bloqueInicio);
  inicioCita.setHours(horaInicioC, minInicioC, 0, 0);

  const finCita = new Date(bloqueInicio);
  finCita.setHours(horaFinC, minFinC, 0, 0);

  const inicioBloque = new Date(bloqueInicio);
  const finBloque = new Date(bloqueFin);

  console.log("Comparando:", {
    idHorarioCita,
    id_horario_bloque: h.id,
    inicio_cita: inicioCita.toTimeString().slice(0, 5),
    fin_cita: finCita.toTimeString().slice(0, 5),
    inicio_bloque: inicioBloque.toTimeString().slice(0, 5),
    fin_bloque: finBloque.toTimeString().slice(0, 5),
  });

  return (
    String(idHorarioCita) === String(h.id) &&
    inicioBloque >= inicioCita &&
    finBloque <= finCita
  );
});


          if (citaOcupante) {
            bloques.push({
              id: `ocupado-${h.id}-${bloqueInicio.toISOString()}`,
              title: `Ocupado: ${bloqueInicio.toTimeString().slice(0, 5)} - ${bloqueFin.toTimeString().slice(0, 5)}`,
              start: bloqueInicio.toISOString(),
              end: bloqueFin.toISOString(),
              backgroundColor: '#7b1fa2',
              borderColor: '#7b1fa2',
              textColor: '#fff',
              extendedProps: {
                id_horario: h.id,
                ocupado: true,
                id_cita: citaOcupante.id,
                paciente: citaOcupante.paciente,
                dentista: citaOcupante.dentista,
                servicio: citaOcupante.servicio,
                description: citaOcupante.description,
                status: citaOcupante.status,
                inicio: citaOcupante.inicio,
                fin: citaOcupante.fin,
                fecha: citaOcupante.fecha,
              },
              priority: 2,
            });
          } else {
            bloques.push({
              id: `horario-${h.id}-${bloqueInicio.toISOString()}`,
              title: `Disponible: ${bloqueInicio.toTimeString().slice(0, 5)} - ${bloqueFin.toTimeString().slice(0, 5)}`,
              start: bloqueInicio.toISOString(),
              end: bloqueFin.toISOString(),
              backgroundColor: '#1976d2',
              borderColor: '#1976d2',
              textColor: '#fff',
              extendedProps: { id_horario: h.id, ocupado: false },
              priority: 3,
            });
          }

          bloqueInicio = bloqueFin;
        }
      }

      setCargando(false);
      return bloques;
    } catch (error) {
      console.error('Error al cargar horarios:', error);
      setCargando(false);
      return [];
    }
  };

  const cargarEventos = async (dentistaId: string) => {
    if (!dentistaId) {
      setEventos([]);
      return;
    }
    const bloques = await fetchHorariosFragmentados(dentistaId);
    setEventos(bloques);
  };

  useEffect(() => {
    if (dentistaSeleccionado) {
      cargarEventos(dentistaSeleccionado);
    } else {
      setEventos([]);
    }
  }, [dentistaSeleccionado]);

  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;

    if (!dentistaSeleccionado) {
      alert('Selecciona un dentista primero.');
      return;
    }

    if (event.extendedProps.ocupado) {
      const cita = {
        id: event.extendedProps.id_cita,
        title: event.title,
        start: event.start,
        end: event.end,
        paciente: event.extendedProps.paciente,
        dentista: event.extendedProps.dentista,
        servicio: event.extendedProps.servicio,
        description: event.extendedProps.description,
        status: event.extendedProps.status,
      };
      setCitaSeleccionada(cita);
      setDialogoCitaAbierto(true);
    } else if (event.extendedProps.id_horario) {
      setFechaSeleccionada(event.startStr.slice(0, 10));
      setHorarioSeleccionado({
        id_horario: event.extendedProps.id_horario,
        inicio: event.startStr.slice(11, 16),
        fin: event.endStr.slice(11, 16),
      });
      setDialogoAbierto(true);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <Typography variant="h5" component="h2" gutterBottom>
        Gestión de Citas
      </Typography>

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

      {cargando ? (
        <div className="flex justify-center my-20">
          <CircularProgress />
        </div>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          locale={esLocale}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="timeGridWeek"
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={eventos}
          eventClick={handleEventClick}
          eventOrder="priority,start"
          height="80vh"
        />
      )}

      <FormularioCita
        open={dialogoAbierto}
        onClose={() => setDialogoAbierto(false)}
        fecha={fechaSeleccionada}
        dentistaId={dentistaSeleccionado}
        inicioHorario={horarioSeleccionado?.inicio || ''}
        finHorario={horarioSeleccionado?.fin || ''}
        idHorario={horarioSeleccionado?.id_horario || ''}
        onCitaGuardada={() => {
          cargarEventos(dentistaSeleccionado);
          setDialogoAbierto(false);
        }}
      />

      <Dialog
        open={dialogoCitaAbierto}
        onClose={() => {
          if (!loadingEliminar) setDialogoCitaAbierto(false);
        }}
        PaperProps={{ sx: { minWidth: 300 } }}
      >
        <DialogTitle>Información de la cita</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" gutterBottom>
            <strong>Paciente:</strong> {citaSeleccionada?.paciente || 'N/A'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Dentista:</strong> {citaSeleccionada?.dentista || 'N/A'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Servicio:</strong> {citaSeleccionada?.servicio || 'N/A'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Descripción:</strong> {citaSeleccionada?.description || 'N/A'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Inicio:</strong>{' '}
            {citaSeleccionada?.start ? new Date(citaSeleccionada.start).toLocaleString() : ''}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Fin:</strong>{' '}
            {citaSeleccionada?.end ? new Date(citaSeleccionada.end).toLocaleString() : ''}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDialogoCitaAbierto(false)} disabled={loadingEliminar}>
            Cancelar
          </Button>
          <Button
            color="error"
            variant="contained"
            disabled={loadingEliminar}
onClick={async () => {
  if (!citaSeleccionada) return;
  setLoadingEliminar(true);
  try {
    const token = localStorage.getItem('token');
    console.log('Eliminar cita ID:', citaSeleccionada.id, 'Token:', token);
    await axios.delete(`http://localhost:5000/api/citas/${citaSeleccionada.id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    alert('Cita eliminada correctamente');
    setDialogoCitaAbierto(false);
    cargarEventos(dentistaSeleccionado);
  } catch (error) {
    console.error(error);
    alert('Error al eliminar cita');
  } finally {
    setLoadingEliminar(false);
  }
}}

          >
            Eliminar cita
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Citas;
