import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';

interface Props {
  pacienteId: number;
  onClose: () => void;
}

const DeletePaciente: React.FC<Props> = ({ pacienteId, onClose }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${pacienteId}`);
      onClose();
    } catch (error) {
      console.error('Error al eliminar paciente:', error);
      alert('Ocurrió un error al eliminar el paciente.');
    }
  };

  return (
    <Box
      sx={{
        width: '90%',
        maxWidth: 600,
        margin: '0 auto',
        backgroundColor: 'white',
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" mb={3}>
        ¿Estás seguro de que deseas eliminar este paciente?
      </Typography>

      <Box display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Eliminar
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default DeletePaciente;
