import React, { useState } from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePaciente: React.FC = () => {
    const navigate = useNavigate();

    // Estados para los campos del formulario
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');

    // Envío del formulario
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/pacientes', {
                nombre: username,
                correo: email,
                contrasena: password,
                telefono: telefono,
                status: 'activo',   // <-- valor oculto
                rol: 'paciente',    // <-- valor oculto
            });

            // Redirigir después de agregar
            navigate('/pacientes');
        } catch (error) {
            console.error('Error al crear paciente:', error);
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
            <Typography variant="h5" mb={3}>
                Nuevo Paciente
            </Typography>

            <TextField
                label="Nombre"
                margin="normal"
                fullWidth
                variant="outlined"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <TextField
                label="Correo electrónico"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="exampleuser@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <TextField
                label="Contraseña"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <TextField
                label="Teléfono"
                type="number"
                fullWidth
                margin="normal"
                variant="outlined"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
            />

            <Box textAlign="center" mt={4}>
                <Button type="submit" variant="contained" color="primary">
                    Agregar
                </Button>
            </Box>
        </Box>
    );
};

export default CreatePaciente;

