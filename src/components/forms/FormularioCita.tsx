import React, { useState, useEffect } from 'react';
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

interface FormularioCitaProps {
    open: boolean;
    onClose: () => void;
    fecha: string;
    dentistaId: string;
    inicioHorario: string;
    finHorario: string;
    idHorario: string;
    onCitaGuardada: () => void;
}

interface Servicio {
    id: string;
    nombre: string;
}

interface Paciente {
    id: string;
    nombre: string;
}

const FormularioCita = ({
    open,
    onClose,
    fecha,
    dentistaId,
    inicioHorario,
    finHorario,
    idHorario,
    onCitaGuardada,
}: FormularioCitaProps) => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [servicios, setServicios] = useState<Servicio[]>([]);

    const [pacienteSeleccionado, setPacienteSeleccionado] = useState('');
    const [servicioSeleccionado, setServicioSeleccionado] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [status, setStatus] = useState('Pendiente');
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (open) {
            const fetchPacientes = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const resPacientes = await axios.get('http://localhost:5000/api/users/pacientes', {
                        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                    });
                    setPacientes(resPacientes.data);
                } catch (error) {
                    console.error('Error cargando pacientes:', error);
                }
            };

            const fetchServicios = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const resServicios = await axios.get('http://localhost:5000/api/servicios', {
                        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                    });
                    setServicios(resServicios.data);
                } catch (error) {
                    console.error('Error cargando servicios:', error);
                }
            };

            fetchPacientes();
            fetchServicios();
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);

        try {
            const token = localStorage.getItem('token');

            await axios.post(
                'http://localhost:5000/api/citas',
                {
                    id_horario: idHorario,
                    id_dentista: dentistaId,
                    id_paciente: pacienteSeleccionado,
                    id_servicio: servicioSeleccionado,
                    fecha,
                    inicio: inicioHorario,
                    fin: finHorario,
                    description: descripcion,
                    status,
                },
                { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
            );

            alert('Cita creada con éxito');
            onCitaGuardada();
            setPacienteSeleccionado('');
            setServicioSeleccionado('');
            setDescripcion('');
            setStatus('Pendiente');
        } catch (error) {
            console.error('Error creando cita:', error);
            alert('Error creando cita');
        } finally {
            setCargando(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Crear nueva cita</DialogTitle>
            <DialogContent dividers>
                <form onSubmit={handleSubmit} id="form-cita">
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="paciente-label">Paciente</InputLabel>
                        <Select
                            labelId="paciente-label"
                            value={pacienteSeleccionado}
                            onChange={(e) => setPacienteSeleccionado(e.target.value)}
                            required
                        >
                            {pacientes.map((p) => (
                                <MenuItem key={p.id} value={p.id}>
                                    {p.username}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="servicio-label">Servicio</InputLabel>
                        <Select
                            labelId="servicio-label"
                            value={servicioSeleccionado}
                            onChange={(e) => setServicioSeleccionado(e.target.value)}
                            required
                        >
                            {servicios.map((s) => (
                                <MenuItem key={s.id} value={s.id}>
                                    {s.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        margin="normal"
                        label="Descripción"
                        multiline
                        rows={3}
                        fullWidth
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        label="Fecha"
                        fullWidth
                        disabled
                        value={fecha}
                    />

                    <TextField
                        margin="normal"
                        label="Inicio"
                        fullWidth
                        disabled
                        value={inicioHorario}
                    />

                    <TextField
                        margin="normal"
                        label="Fin"
                        fullWidth
                        disabled
                        value={finHorario}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="status-label">Estado</InputLabel>
                        <Select
                            labelId="status-label"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <MenuItem value="Pendiente">Pendiente</MenuItem>
                            <MenuItem value="Confirmada">Confirmada</MenuItem>
                            <MenuItem value="Cancelada">Cancelada</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={cargando}>
                    Cancelar
                </Button>
                <Button type="submit" form="form-cita" variant="contained" disabled={cargando}>
                    {cargando ? 'Guardando...' : 'Guardar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FormularioCita;
