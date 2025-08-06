import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

interface Props {
  paciente: {
    id: number;
    username: string;
    email: string;
    telefono?: string;
  };
  onClose: () => void;
  onDeleted: () => void; // callback para actualizar lista tras borrar
}

const DeletePaciente: React.FC<Props> = ({ paciente, onClose, onDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:5000/api/users/${paciente.id}`);
      setSuccess(true);
      onDeleted();
    } catch (err) {
      setError('Error al eliminar el paciente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box
        sx={{
          width: '90%',
          maxWidth: 600,
          margin: '0 auto',
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" mb={3}>
          Paciente eliminado
        </Typography>
        <Typography>
          El paciente <strong>{paciente.username}</strong> fue eliminado correctamente.
        </Typography>
        <Box mt={4}>
          <Button variant="contained" onClick={onClose}>
            Cerrar
          </Button>
        </Box>
      </Box>
    );
  }

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
      <Typography variant="h5" mb={3}>
        Confirmar eliminación
      </Typography>

      <Typography mb={2}>
        ¿Estás seguro que deseas eliminar al paciente <strong>{paciente.username}</strong> ?
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box display="flex" justifyContent="space-between" mt={3}>


        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Eliminar
        </Button>
                <Button variant="outlined" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default DeletePaciente;
