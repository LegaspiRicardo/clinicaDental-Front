//src/pages/Register.tsx

import React, { useState } from "react";
import { TextField, Button, Container, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
    const navigate = useNavigate();
    //Estado para manejar los datos del formulario
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();   //Evitar recargar de pagina al enviar el formulario
        try {
            //Enviar los datos al backend
            const response = await axios.post('http://localhost:5000/api/users/register', {
                username,
                email,
                password,
                rol: 'Admin',
                status: 'Activo',
                telefono: 0
            });
            console.log("Registro exitosillo: ", response.data);
            navigate("/");  //Redirigir a la pagina de inicio despues de iniciar sesion
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error.response?.data?.message || "Error al registrar el usuario");
        }

    };

    return (
        <Container maxWidth="sm" >
            <Box sx={{ mt: 8, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Registro
                </Typography>

                <Box component={"form"} noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        label="Nombre"
                        margin="normal"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Correo Electronico"
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Contraseña"
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {errorMessage && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }} >
                            {errorMessage}
                        </Typography>
                    )}


                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        type="submit"
                    >Registrar</Button>

                </Box>
            </Box>

            <Box sx={{ mt: 2 }}></Box>
            <Typography variant="body2">
                ¿Ya tienes cuenta? {' '}
                <Link component="button"
                    variant="body2"
                    onClick={() => navigate('/')} >
                    Inicia sesión aqui</Link>



            </Typography>
        </Container>




    );


};
export default Register;