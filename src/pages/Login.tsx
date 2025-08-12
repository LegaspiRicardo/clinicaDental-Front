// src/pages/Login.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("Respuesta login:", response.data);
      const { token, user } = response.data;

      if (!token) throw new Error("No se recibió token del servidor");
      if (!user?.rol) throw new Error("No se recibió rol del usuario");

      // Guardar datos en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("rol", user.rol);
      localStorage.setItem("username", user.username);

      // Redirigir según rol
      if (user.rol.toLowerCase() === "dentista") {
        navigate("/horarios");
      } else if (user.rol.toLowerCase() === "paciente") {
        navigate("/servicios");
      } else {
        navigate("/"); // Ruta por defecto para otros roles
      }
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err);
      setError(
        err.response?.data?.message || err.message || "Error al iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        width: "90%",
        maxWidth: 420,
        mx: "auto",
        mt: 8,
        p: 3,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Iniciar Sesión
      </Typography>

      <TextField
        margin="normal"
        required
        fullWidth
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <Typography color="error" variant="body2" mt={1}>
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={22} /> : "Ingresar"}
      </Button>
    </Box>
  );
};

export default Login;
