// src/components/CalendarHorario.tsx
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Select, MenuItem, Typography, Dialog, CircularProgress } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import FormularioHorario from './forms/FormularioHorario';


type TokenPayload = {
    id: string;
    email: string;
    rol: string;
};

const CalendarHorario = () => {
    const [decoded, setDecoded] = useState<TokenPayload | null>(null);
    const [dentistaSeleccionado, setDentistaSeleccionado] = useState<string>('');
    const [dentistas, setDentistas] = useState<any[]>([]);
    const [horarios, setHorarios] = useState<any[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [fechaSeleccionada, setFechaSeleccionada] = useState('');

    // Cargar y decodificar token una sola vez al montar
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode<TokenPayload>(token);
                setDecoded(decodedToken);
                if (decodedToken.rol.toLowerCase() === 'dentista') {
                    setDentistaSeleccionado(decodedToken.id);
                }
            } catch (error) {
                console.error('Error al decodificar token:', error);
                setDecoded(null);
            }
        } else {
            setDecoded(null);
        }
    }, []);

    // Cargar dentistas solo si NO es dentista
    useEffect(() => {
        if (decoded && decoded.rol.toLowerCase() !== 'dentista') {
            const fetchDentistas = async () => {
                try {
                    const res = await axios.get('/api/users?rol=dentista&status=activo');
                    setDentistas(res.data);
                } catch (err) {
                    console.error('Error al obtener dentistas', err);
                }
            };
            fetchDentistas();
        }
    }, [decoded]);

    // Cargar horarios cuando cambie dentistaSeleccionado
    useEffect(() => {
        const fetchHorarios = async () => {
            if (!dentistaSeleccionado) return;
            try {
                const res = await axios.get(`/api/horarios/dentista/${dentistaSeleccionado}`);
                const eventos = res.data.map((h: any) => ({
                    id: h.id,
                    title: 'Horario',
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

    // Esperar a tener el token decodificado para renderizar
    if (decoded === null) {
        return (
            <Box className="p-4 text-center">
                <CircularProgress />
            </Box>
        );
    }

    const isDentista = decoded.rol.toLowerCase() === 'dentista';

    const handleDateClick = (info: any) => {
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

            {/* Mostrar select solo si NO es dentista */}
            {!isDentista && (
                <Select
                    fullWidth
                    value={dentistaSeleccionado}
                    onChange={(e) => setDentistaSeleccionado(e.target.value)}
                    displayEmpty
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="">Selecciona un dentista</MenuItem>
                    {dentistas.map((d: any) => (
                        <MenuItem key={d.id} value={d.id}>
                            {d.username || d.nombre}
                        </MenuItem>
                    ))}
                </Select>
            )}

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
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    fecha={fechaSeleccionada}
                    dentistaId={dentistaSeleccionado}
                    onHorarioGuardado={() => {
                        // Recarga horarios después de guardar uno nuevo
                        setDentistaSeleccionado((prev) => prev);
                    }}
                />
            </Dialog>
        </Box>
    );
};

export default CalendarHorario;
