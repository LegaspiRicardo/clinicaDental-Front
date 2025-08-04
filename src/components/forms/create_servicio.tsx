import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkConnection } from '../../utils/connectionStatus';
// import { saveServicio } from '../../utils/localServiciosDB'; // Si implementas offline

interface Props {
    onSuccess?: () => void;
    onClose?: () => void;
}

const Create_servicio: React.FC<Props> = ({ onSuccess, onClose }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [duracion, setDuracion] = useState('');
    const [precio, setPrecio] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const nuevoServicio = {
            name: nombre,
            description: descripcion,
            duracion_estimada: parseInt(duracion),
            precio: parseFloat(precio),
        };

        if (checkConnection()) {
            try {
                const token = localStorage.getItem('token');
                console.log('🔐 Token usado:', token);

                const response = await axios.post(
                    'http://localhost:5000/api/servicios',
                    nuevoServicio,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log('✅ Servicio creado (online):', response.data);
                setErrorMessage('');
                // Limpiar formulario
                setNombre('');
                setDescripcion('');
                setDuracion('');
                setPrecio('');
                
                if (onSuccess) onSuccess();
                if (onClose) onClose();

                navigate('/servicios'); // 👉 ajusta esta ruta si es necesario
                
            } catch (error: any) {
                console.error('❌ Error al crear servicio:', error);
                setErrorMessage(error.response?.data?.message || 'Error al crear el servicio');
            }
        } else {
            try {
                // await saveServicio({ ...nuevoServicio, pendingSync: true });
                console.log('🟡 Servicio guardado offline (pendiente de sincronización)');
            } catch (error) {
                console.error('❌ Error guardando servicio offline:', error);
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box  sx={{
                width: '90%',
                maxWidth: 600,
                margin: '0 auto',
                backgroundColor: 'white',
                padding: 4,
                borderRadius: 2,
                mt: 4,
            }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Crear Nuevo Servicio
                </Typography>
                <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />

                    <TextField
                        label="Descripción"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        variant="outlined"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="duracion-label">Duración estimada</InputLabel>
                        <Select
                            labelId="duracion-label"
                            id="duracion"
                            value={duracion}
                            onChange={(e: SelectChangeEvent) => setDuracion(e.target.value)}
                            label="Duración estimada"
                            required
                        >
                            <MenuItem value="">
                                <em>Seleccione una</em>
                            </MenuItem>
                            <MenuItem value="30">30 minutos</MenuItem>
                            <MenuItem value="60">1 hora</MenuItem>
                            <MenuItem value="120">2 horas</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Precio"
                        type="number"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />

                    {errorMessage && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {errorMessage}
                        </Typography>
                    )}

                    <Box textAlign="center" mt={4}>
                        <Button type="submit" variant="contained" color="primary">
                            Agregar
                        </Button>
                        {onClose && (
                            <Button variant="text" sx={{ ml: 2 }} onClick={onClose}>
                                Cancelar
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Create_servicio;
