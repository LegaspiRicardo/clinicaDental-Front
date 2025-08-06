import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';

interface Dentista {
    id: number;
    username: string;
    // puedes agregar otros campos si quieres mostrarlos
}

interface Props {
    dentista: Dentista;
    onClose: () => void;
}

const Delete_dentista: React.FC<Props> = ({ dentista, onClose }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${dentista.id}`);
            onClose();
        } catch (error) {
            console.error('Error al eliminar dentista:', error);
            alert('No se pudo eliminar el dentista.');
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
                textAlign: 'center',
            }}
        >
            <Typography variant="h6" mb={3}>
                ¿Seguro que quieres eliminar al dentista <strong>{dentista.username}</strong>?
            </Typography>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ mr: 2 }}>
                Eliminar
            </Button>
            <Button variant="outlined" onClick={onClose}>
                Cancelar
            </Button>
        </Box>
    );
};

export default Delete_dentista;
