import React, { useState } from 'react';
import { TextField, Box, Typography, Button, MenuItem } from '@mui/material';
import axios from 'axios';

interface Props {
    onSuccess: () => void;
    onClose: () => void;
}

const Create_dentista: React.FC<Props> = ({ onSuccess, onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [especialidad, setEspecialidad] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/api/users/register', {
                username,
                email,
                password,
                telefono: parseInt(telefono),
                especialidad,
                rol: 'Dentista',
                status: 'Activo',
            });

            onSuccess(); 
            onClose();
        } catch (error) {
            console.error('Error al registrar dentista:', error);
            alert('Ocurrió un error al registrar el dentista.');
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
            <Typography variant="h5" mb={3}>Nuevo Dentista</Typography>

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
                label="Contraseña"
                type="password"
                fullWidth
                margin="normal"
                required
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
                    Agregar
                </Button>
            </Box>
        </Box>
    );
};

export default Create_dentista;
