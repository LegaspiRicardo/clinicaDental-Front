// src/components/forms/FormularioEliminarHorario.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import axios from 'axios';

interface Props {
  open: boolean;
  onClose: () => void;
  horario: any;
  onEliminarExitoso: () => void;
}

const FormularioEliminarHorario: React.FC<Props> = ({ open, onClose, horario, onEliminarExitoso }) => {
  const handleEliminar = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/horarios/${horario.id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      onEliminarExitoso();
      onClose();
    } catch (error) {
      alert('Error al eliminar horario.');
      console.error(error);
    }
  };

  if (!horario) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Eliminar horario</DialogTitle>
      <DialogContent>
        <Typography>¿Seguro que quieres eliminar este horario?</Typography>
        <Typography>Fecha: {horario.startStr || horario.start?.toISOString().slice(0, 10)}</Typography>
        <Typography>Horario: {horario.title}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleEliminar} color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormularioEliminarHorario;
