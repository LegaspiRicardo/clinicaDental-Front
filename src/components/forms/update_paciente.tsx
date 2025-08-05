import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const UpdatePaciente = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [estatus, setEstatus] = useState('');

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}`);
                const paciente = response.data;

                setUsername(paciente.username);
                setEmail(paciente.email);
                setTelefono(paciente.telefono.toString());
                setEstatus(paciente.status);
            } catch (error) {
                console.error("Error al cargar el paciente:", error);
                alert("No se pudo cargar la información del paciente.");
            }
        };

        fetchPaciente();
    }, [id]);

    const handleChangeEstatus = (event: SelectChangeEvent) => {
        setEstatus(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.put(`http://localhost:5000/api/users/${id}`, {
                username,
                email,
                password: password || undefined, // solo si se edita
                telefono: parseInt(telefono, 10),
                status: estatus,
            });

            navigate('/pacientes');
        } catch (error) {
            console.error("Error al actualizar paciente:", error);
            alert("Ocurrió un error al actualizar el paciente.");
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
                Editar Paciente
            </Typography>

            <TextField
                label="Nombre"
                fullWidth
                margin="normal"
                variant="outlined"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <TextField
                label="Contraseña (dejar en blanco para no cambiar)"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <Typography variant="subtitle1" mt={2} mb={1}>
                Estatus
            </Typography>
            <Select
                labelId="estatus-label"
                id="estatus"
                fullWidth
                value={estatus}
                onChange={handleChangeEstatus}
                sx={{ backgroundColor: '#f9fafb' }}
                required
                MenuProps={{
                    disablePortal: true,
                    PaperProps: {
                        sx: {
                            backgroundColor: 'white',
                            boxShadow: 3,
                            mt: 1,
                        },
                    },
                }}
            >
                <MenuItem value="" disabled>
                    Seleccione una
                </MenuItem>
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="Inactivo">Inactivo</MenuItem>
            </Select>

            <Box textAlign="center" mt={4}>
                <Button type="submit" variant="contained" color="warning">
                    Editar
                </Button>
            </Box>
        </Box>
    );
};

export default UpdatePaciente;
