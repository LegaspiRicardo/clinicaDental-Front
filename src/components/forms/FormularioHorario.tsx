import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from '@mui/material';
import axios from 'axios';

interface Props {
    open: boolean;
    onClose: () => void;
    fecha: string;
    dentistaId: string;
    onHorarioGuardado: () => void;
}

const FormularioHorario: React.FC<Props> = ({
    open,
    onClose,
    fecha,
    dentistaId,
    onHorarioGuardado
}) => {
    const [inicio, setInicio] = useState('');
    const [fin, setFin] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inicio || !fin) {
            alert('Por favor ingresa la hora de inicio y fin.');
            return;
        }

        try {
            await axios.post(
                'http://localhost:5000/api/horarios',
                {
                    id_dentista: dentistaId,
                    fecha,
                    inicio,
                    fin
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            onHorarioGuardado(); // recarga los eventos
            onClose(); // cierra el diálogo
            setInicio('');
            setFin('');
        } catch (error) {
            console.error('Error al guardar horario:', error);
            alert('Hubo un error al guardar el horario.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}   PaperProps={{
    sx: {
      backgroundColor: 'white',
      color: 'black'
    }
  }}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Registrar horario para {fecha}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Hora de inicio"
                        type="time"
                        value={inicio}
                        onChange={(e) => setInicio(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Hora de fin"
                        type="time"
                        value={fin}
                        onChange={(e) => setFin(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button type="submit" variant="contained">Guardar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default FormularioHorario;
