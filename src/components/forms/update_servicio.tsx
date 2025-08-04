// src/components/forms/update_servicio.tsx

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { checkConnection } from '../../utils/connectionStatus';
import { saveServicio } from '../../utils/localServiciosDB'; // ← si implementas almacenamiento offline

interface Servicio {
    id: number;
    name: string;
    description?: string;
    duracion_estimada: number;
    precio: number;
}


interface Props {
    servicio: Servicio;
    onClose?: () => void; // Para cerrar el formulario desde fuera
}

const Update_servicio: React.FC<Props> = ({ servicio, onClose }) => {
    const [name, setName] = useState(servicio.name);
    const [description, setDescription] = useState(servicio.description || '');
    const [duracion_estimada, setDuracion_estimada] = useState(servicio.duracion_estimada);
    const [precio, setPrecio] = useState(servicio.precio);

    const handleUpdate = async () => {
        const updatedServicio: Servicio = {
            ...servicio,
            name,
            description,
            duracion_estimada,
            precio,
        };

        if (checkConnection()) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(
                    `http://localhost:5000/api/servicios/${servicio.id}`,
                    updatedServicio,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                console.log('Servicio actualizado (online):', response.data);

                onClose?.(); // cerrar si se proporcionó callback
            } catch (error) {
                console.error('Error al actualizar servicio:', error);
            }
        } else {
            try {
                // Opcional por si quieres guardar cambios offline
                // await saveServicio({ ...updatedServicio, pendingSync: true });
                console.log('Servicio actualizado offline (pendiente de sincronización)');
            } catch (error) {
                console.error('Error guardando servicio offline:', error);
            }
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
                mt: 4,
            }}
        >
            <Typography variant="h5" mb={3}>
                Editar Servicio
            </Typography>

            <TextField
                label="Nombre"
                fullWidth
                margin="normal"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <TextField
                label="Descripción"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <FormControl fullWidth margin="normal">
                <InputLabel id="duracion-label">Duración estimada</InputLabel>
                <Select
                    labelId="duracion-label"
                    id="duracion"
                    value={duracion_estimada.toString()} // ← debe ser string aquí
                    onChange={(e: SelectChangeEvent) => setDuracion_estimada(Number(e.target.value))}
                    label="Duración estimada"
                >
                    <MenuItem value=""><em>Seleccione una</em></MenuItem>
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
                onChange={(e) => setPrecio(Number(e.target.value))} // ← convertir a número
                required
            />


            <Box textAlign="center" mt={4}>
                <Button variant="contained" color="warning" onClick={handleUpdate}>
                    Guardar Cambios
                </Button>
                {onClose && (
                    <Button variant="text" sx={{ ml: 2 }} onClick={onClose}>
                        Cancelar
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default Update_servicio;
