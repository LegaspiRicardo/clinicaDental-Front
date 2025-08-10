import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    CircularProgress,
} from '@mui/material';
import axios from 'axios';

interface Props {
    open: boolean;
    onClose: () => void;
    fecha: string;
    dentistaId: string;
    inicioHorario?: string;  // Ejemplo: "14:00"
    finHorario?: string;     // Ejemplo: "15:00"
    idHorario?: number | string; // id del horario seleccionado
    onCitaGuardada: () => void;
}

const FormularioCita: React.FC<Props> = ({
    open,
    onClose,
    fecha,
    dentistaId,
    onCitaGuardada,
    inicioHorario,
    finHorario,
    idHorario,
}) => {
    const [inicio, setInicio] = useState('');
    const [fin, setFin] = useState('');
    const [pacientes, setPacientes] = useState<any[]>([]);
    const [servicios, setServicios] = useState<any[]>([]);
    const [pacienteId, setPacienteId] = useState('');
    const [servicioId, setServicioId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) return;

        // Cargar pacientes activos
        const fetchPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/users/pacientes', {
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                });
                const activos = res.data.filter((p: any) => p.status.toLowerCase() === 'activo');
                setPacientes(activos);
            } catch (error) {
                console.error('Error al cargar pacientes:', error);
            }
        };

        // Cargar servicios
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

        fetchPacientes();
        fetchServicios();

        // Inicializar horas con las props si existen
        if (inicioHorario && finHorario) {
            setInicio(inicioHorario);
            setFin(finHorario);
        } else {
            setInicio('');
            setFin('');
        }

        // Limpiar selección paciente y servicio
        setPacienteId('');
        setServicioId('');
    }, [open, inicioHorario, finHorario]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inicio || !fin || !pacienteId || !servicioId) {
            alert('Completa todos los campos.');
            return;
        }

        if (inicio >= fin) {
            alert('La hora de inicio debe ser menor que la hora de fin.');
            return;
        }

        if (!idHorario) {
            alert('Debes seleccionar un horario válido.');
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                'http://localhost:5000/api/citas',
                {
                    fecha,
                    inicio,
                    fin,
                    id_dentista: dentistaId,
                    id_paciente: pacienteId,
                    id_servicio: servicioId,
                    description: '',
                    status: 'Pendiente',
                    id_horario: idHorario,
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );

            alert('Cita agendada con éxito');
            onCitaGuardada();
            onClose();
        } catch (error) {
            console.error('Error al guardar cita:', error);
            alert('Error al guardar la cita');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => {
                if (!loading) onClose();
            }}
            PaperProps={{ sx: { backgroundColor: 'white', color: 'black', minWidth: 350 } }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>Agendar cita para {fecha}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Hora de inicio"
                        type="time"
                        value={inicio}
                        onChange={(e) => setInicio(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mt: 2 }}
                        required
                        disabled={loading || Boolean(inicioHorario)}
                    />
                    <TextField
                        fullWidth
                        label="Hora de fin"
                        type="time"
                        value={fin}
                        onChange={(e) => setFin(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mt: 2 }}
                        required
                        disabled={loading || Boolean(finHorario)}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="paciente-label">Paciente</InputLabel>
                        <Select
                            labelId="paciente-label"
                            value={pacienteId}
                            label="Paciente"
                            onChange={(e) => setPacienteId(e.target.value)}
                            required
                            disabled={loading}
                        >
                            {pacientes.length === 0 && <MenuItem disabled>No hay pacientes activos</MenuItem>}
                            {pacientes.map((p) => (
                                <MenuItem key={p.id} value={p.id}>
                                    {p.username} {p.apellido || ''}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="servicio-label">Servicio</InputLabel>
                        <Select
                            labelId="servicio-label"
                            value={servicioId}
                            label="Servicio"
                            onChange={(e) => setServicioId(e.target.value)}
                            required
                            disabled={loading}
                        >
                            {servicios.length === 0 && <MenuItem disabled>No hay servicios</MenuItem>}
                            {servicios.map((s) => (
                                <MenuItem key={s.id} value={s.id}>
                                    {s.nombre || s.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Agendar'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default FormularioCita;
