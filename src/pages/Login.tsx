import React, {useState} from "react";
import { TextField, Button, Container, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login:React.FC = () =>{

const Nnavigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");



    const handleSubmit = async (event: React.FormEvent) =>{
    event.preventDefault();


    try{
        //enviar las credenciales al backend
        const response = await axios.post('http://localhost:5000/api/auth/login', 
            {
            email, password,
            }
        );

        console.log('token recibido: ', response.data.token);
        localStorage.setItem('token', `${response.data.token}` ); //Guarar el token
        setErrorMessage('');
        Nnavigate('/'); //Redireccionar al dashboard despues de iniciar sesion
  
    } catch(error:any){
        //manejo de errores
        console.error("Error al iniciar sesion: ", error);
        setErrorMessage(error.response?.data?.message || "Error al iniciar sesion. Por favor, intentalo de nuevo");
    }

};

 return(
    <Container maxWidth="sm">  
        <Box sx={{mt:8, textAlign:"center"}}>
            <Typography variant="h4" gutterBottom>
                Iniciar Sesión
            </Typography>
            
            <Box component= "form" noValidate sx={{mt:2}} onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Correo electronico"
                    margin="normal"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />



                <TextField
                    fullWidth
                    label="Contraseña"
                    margin="normal"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {
                    errorMessage && (
                        <Typography color="error" variant="body2" sx={{mt:1}}>
                            {errorMessage}
                        </Typography>
                    )
                }

                <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{mt:3}}
                type="submit"
                >Ingresar</Button>

            </Box>

            <Box sx={{mt:2}}>
                <Typography variant="body2">
                    ¿No tienes una cuenta? {' '}
                    <Link component="button" variant="body2" onClick={()=> Nnavigate('/register')} >
                        Registrate aqui
                    </Link>
                </Typography>
            </Box>
        </Box>

    </Container>



 )

};

export default Login;