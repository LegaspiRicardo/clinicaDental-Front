import { Box, TextField, Button, Typography, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';


const UpdatePaciente = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // lógica de envío aquí
    };


    const [estatus, setEstatus] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setEstatus(event.target.value);
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
            />

            <TextField
                label="Correo electrónico"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="exampleuser@gmail.com"
            />

            <TextField
                label="Contraseña"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
            />

            <TextField
                label="Teléfono"
                type="number"
                fullWidth
                margin="normal"
                variant="outlined"
            />

            <label htmlFor="" className='mt-8'>Estatus</label>
            <Select
                labelId="estatus-label"
                id="estatus"
                fullWidth
                value={estatus}
                label="Estatus"
                sx={{ backgroundColor: '#f9fafb'}}
                MenuProps={{   //Desactiva el estilo modal del select
                    disablePortal: true,
                    PaperProps: {
                        sx: {
                            backgroundColor: 'white', // o el color que estés usando
                            boxShadow: 3,
                            mt: 1,
                        },
                    },
                }}
            > 
                <MenuItem value="" disabled >
                    Seleccione una
                </MenuItem>
                <MenuItem value="activo" selected >Activo</MenuItem>
                <MenuItem value="inactivo">Inactivo</MenuItem>
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
