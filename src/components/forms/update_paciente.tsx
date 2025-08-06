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
import axios from 'axios';

interface Props {
    paciente: {
        id: number;
        username: string;
        email: string;
        telefono: number;
        status: string;
    };
    onClose: () => void;
}

const UpdatePaciente: React.FC<Props> = ({ paciente, onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [estatus, setEstatus] = useState('');

    useEffect(() => {
        if (paciente) {
            setUsername(paciente.username);
            setEmail(paciente.email);
            setTelefono(paciente.telefono.toString());
            setEstatus(paciente.status ?? 'Activo');

        }
    }, [paciente]);

    const handleChangeEstatus = (event: SelectChangeEvent) => {
        setEstatus(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.put(`http://localhost:5000/api/users/${paciente.id}`, {
                username,
                email,
                password: password || undefined, // solo si se edita
                telefono: parseInt(telefono, 10),
                status: estatus,
            });

            onClose();
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
                fullWidth
                value={estatus}
                onChange={handleChangeEstatus}
                required
                sx={{
                    backgroundColor: '#f9fafb',
                    color: 'black',
                    '.MuiSelect-select': {
                        color: 'black'
                    }
                }}
            >
                <MenuItem value="" disabled>Seleccione una</MenuItem>
                <MenuItem value="Activo" >Activo</MenuItem>
                <MenuItem value="Inactivo">Inactivo</MenuItem>
            </Select>

            <Box textAlign="center" mt={4}>
                <Button type="submit" variant="contained" color="warning">
                    Guardar Cambios
                </Button>
            </Box>
        </Box>
    );
};

export default UpdatePaciente;
