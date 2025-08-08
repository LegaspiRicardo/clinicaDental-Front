// src/components/CalendarHorario.tsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import { Box, Select, MenuItem, Typography, Dialog } from '@mui/material';
import axios from 'axios';

const CalendarHorario = () => {
    const [dentistas, setDentistas] = useState([]);
    const [dentistaSeleccionado, setDentistaSeleccionado] = useState('');
    const [horarios, setHorarios] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [fechaSeleccionada, setFechaSeleccionada] = useState('');

    // ✅ Cargar dentistas activos al inicio
    useEffect(() => {
        const fetchDentistas = async () => {
            try {
                const res = await axios.get('/api/users?rol=dentista&status=activo');
                setDentistas(res.data);
            } catch (err) {
                console.error('Error al obtener dentistas', err);
            }
        };
        fetchDentistas();
    }, []);

    // ✅ Obtener horarios del dentista seleccionado
    useEffect(() => {
        const fetchHorarios = async () => {
            if (!dentistaSeleccionado) return;
            try {
                const res = await axios.get(`/api/horarios/dentista/${dentistaSeleccionado}`);
                const eventos = res.data.map((h) => ({
                    id: h.id,
                    title: `Horario`,
                    start: `${h.fecha}T${h.inicio}`,
                    end: `${h.fecha}T${h.fin}`,
                }));
                setHorarios(eventos);
            } catch (err) {
                console.error('Error al obtener horarios', err);
            }
        };
        fetchHorarios();
    }, [dentistaSeleccionado]);

    // ✅ Abrir modal al dar clic en una fecha del calendario
    const handleDateClick = (info) => {
        if (dentistaSeleccionado) {
            setFechaSeleccionada(info.dateStr);
            setDialogOpen(true);
        }
    };

    return (
        <Box className="bg-white p-4 rounded-lg shadow">
            <Typography variant="h5" gutterBottom>
                Horarios de Dentistas
            </Typography>

            <Select
                fullWidth
                value={dentistaSeleccionado}
                onChange={(e) => setDentistaSeleccionado(e.target.value)}
                displayEmpty
                sx={{ mb: 2 }}
            >
                <MenuItem value="">Selecciona un dentista</MenuItem>
                {dentistas.map((d) => (
                    <MenuItem key={d.id} value={d.id}>
                        {d.nombre}
                    </MenuItem>
                ))}
            </Select>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                selectable={true}
                editable={false}
                events={horarios}
                dateClick={handleDateClick}
                height="auto"
            />

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
                <FormularioHorario
                    fecha={fechaSeleccionada}
                    dentistaId={dentistaSeleccionado}
                    onClose={() => {
                        setDialogOpen(false);
                        // ✅ Recargar horarios después de agregar uno nuevo
                        setTimeout(() => {
                            setDentistaSeleccionado((prev) => prev); // Trigger useEffect
                        }, 300);
                    }}
                />
            </Dialog>
        </Box>
    );
};

export default CalendarHorario;
