import React, { useState } from 'react';
import { TextField, Box, Typography, Button, MenuItem } from '@mui/material';
import axios from 'axios';

interface Dentista {
  id: number;
  username: string;
  email: string;
  telefono: number;
  especialidad: string;
}

interface Props {
  dentista: Dentista;
  onClose: () => void;
}

const Update_dentista: React.FC<Props> = ({ dentista, onClose }) => {
  const [username, setUsername] = useState(dentista.username);
  const [email, setEmail] = useState(dentista.email);
  const [telefono, setTelefono] = useState(dentista.telefono.toString());
  const [especialidad, setEspecialidad] = useState(dentista.especialidad || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/users/${dentista.id}`, {
        username,
        email,
        telefono: parseInt(telefono),
        especialidad,
      });

      onClose(); // oculta formulario y actualiza tabla
    } catch (error) {
      console.error('Error al actualizar dentista:', error);
      alert('Ocurrió un error al actualizar el dentista.');
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
      <Typography variant="h5" mb={3}>Actualizar Dentista</Typography>

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
        label="Teléfono"
        type="number"
        fullWidth
        margin="normal"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <TextField
        select
        label="Especialidad"
        fullWidth
        margin="normal"
        required
        value={especialidad}
        onChange={(e) => setEspecialidad(e.target.value)}
      >
        <MenuItem value="Ortodoncia">Ortodoncia</MenuItem>
        <MenuItem value="Limpieza">Limpieza</MenuItem>
        <MenuItem value="Coronas">Coronas</MenuItem>
        <MenuItem value="Reconstrucción">Reconstrucción</MenuItem>
      </TextField>

      <Box textAlign="center" mt={4}>
        <Button type="submit" variant="contained" color="primary">
          Actualizar
        </Button>
      </Box>
    </Box>
  );
};

export default Update_dentista;
