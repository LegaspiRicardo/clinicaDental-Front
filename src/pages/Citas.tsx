// src/pages/Citas.tsx
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
import { jwtDecode } from 'jwt-decode';
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

type TokenPayload = {
  id: string;
  email: string;
  rol: string;
};

const Citas = () => {
  const token = localStorage.getItem('token');
  const decoded: TokenPayload | null = token ? jwtDecode(token) : null;
  const isDentista = decoded?.rol.toLowerCase() === 'dentista';

  const [dentistas, setDentistas] = useState<Dentista[]>([]);
  const [dentistaSeleccionado, setDentistaSeleccionado] = useState<string>(isDentista ? (decoded?.id ?? '') : '');
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>('');
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<{ id_horario: string; inicio: string; fin: string } | null>(null);
  const [cargando, setCargando] = useState(false);

  const [citaSeleccionada, setCitaSeleccionada] = useState<any>(null);
  const [dialogoCitaAbierto, setDialogoCitaAbierto] = useState(false);
  const [loadingEliminar, setLoadingEliminar] = useState(false);

  // Para mostrar nombre dentista logueado si es dentista
  const [nombreDentista, setNombreDentista] = useState<string>('');

  // Cargar dentistas SOLO si NO es dentista
  useEffect(() => {
    if (!isDentista) {
      const fetchDentistas = async () => {
        try {
          if (!token) return;
          const res = await axios.get('http://localhost:5000/api/users/dentistas', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDentistas(res.data.filter((d: Dentista) => d.status === 'Activo'));
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
          setNombreDentista(res.data.username || decoded.email);
        } catch (error) {
          console.error('Error al obtener nombre dentista:', error);
          setNombreDentista(decoded.email); // fallback
        }
      };
      fetchNombreDentista();
    }
  }, [isDentista, decoded, token]);

  // Función para cargar horarios y citas y armar eventos
  const fetchHorariosFragmentados = async (dentistaId: string) => {
    try {
      setCargando(true);
      if (!token) return [];
      const resHorarios = await axios.get(`http://localhost:5000/api/horarios?dentistaId=${dentistaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const resCitas = await axios.get(`http://localhost:5000/api/citas?dentistaId=${dentistaId}`, {
        headers: { Authorization: `Bearer ${token}` },
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
            const idHorarioCita = c.id_horario ?? c.idHorario ?? c?.horario?.id;

            const [horaInicioC, minInicioC] = c.inicio.split(":").map(Number);
            const [horaFinC, minFinC] = c.fin.split(":").map(Number);

            const inicioCita = new Date(bloqueInicio);
            inicioCita.setHours(horaInicioC, minInicioC, 0, 0);

            const finCita = new Date(bloqueInicio);
            finCita.setHours(horaFinC, minFinC, 0, 0);

            const inicioBloque = new Date(bloqueInicio);
            const finBloque = new Date(bloqueFin);

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

      <div className="mb-4">
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
        )}
      </div>

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
