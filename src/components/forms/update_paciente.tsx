import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography, Button, MenuItem } from '@mui/material';
import axios from 'axios';

interface Paciente {
  id: number;
  username: string;
  email: string;
  telefono: number;
  status: string;
}

interface Props {
  paciente: Paciente;
  onClose: () => void;
}

const UpdatePaciente: React.FC<Props> = ({ paciente, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState(''); // opcional

  useEffect(() => {
    if (paciente) {
      setUsername(paciente.username);
      setEmail(paciente.email);
      setTelefono(paciente.telefono.toString());
      setStatus(paciente.status || 'Activo');
    }
  }, [paciente]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/users/${paciente.id}`, {
        username,
        email,
        telefono: parseInt(telefono, 10),
        password: password || undefined,
        status,
      });

      onClose(); // cerrar formulario y actualizar
    } catch (error) {
      console.error('Error al actualizar paciente:', error);
      alert('Ocurrió un error al actualizar el paciente.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        width: '90%',
        maxWidth: 600,
        margin: '0 auto',
        backgroundColor: 'white',
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" mb={3}>Actualizar Paciente</Typography>

      <TextField
        label="Nombre"
        fullWidth
        margin="normal"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Correo electrónico"
        type="email"
        fullWidth
        margin="normal"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Contraseña (opcional)"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Teléfono"
        type="number"
        fullWidth
        margin="normal"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <TextField
        select
        label="Estatus"
        fullWidth
        margin="normal"
        required
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <MenuItem value="Activo">Activo</MenuItem>
        <MenuItem value="Inactivo">Inactivo</MenuItem>
      </TextField>

      <Box textAlign="center" mt={4}>
        <Button type="submit" variant="contained" color="primary">
          Actualizar
        </Button>
      </Box>
    </Box>
  );
};

export default UpdatePaciente;
