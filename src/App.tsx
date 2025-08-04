// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VistaDentista from './pages/Dentistas';
import VistaPaciente from './pages/Pacientes';
import VistaHorario from './pages/Horarios';
import VistaCitas from './pages/Citas';
import Layout from './components/Layout';
import VistaServicio from './pages/Servicios'
import VistaMiPerfil from './pages/Perfil';
import Login from "./pages/Login";
import Register from "./pages/Register";


import DeleteServicio from './components/forms/delete_servicio'; 
import CreateServicio from './components/forms/delete_servicio';
//import UpdateServicio from './components/forms/update_servicio';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<VistaCitas />} />
          <Route path="/dentistas" element={<VistaDentista />} />
          <Route path="/pacientes" element={<VistaPaciente />} />
          <Route path="/horarios" element={<VistaHorario />} />
          <Route path="/servicios" element={<VistaServicio />} />
          <Route path="/miperfil" element={<VistaMiPerfil/>} />


        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
          {/* Formularios de servicio */}
          <Route path="/servicios/crear" element={<CreateServicio />} />
         {/*   <Route path="/servicios/editar/:id" element={<UpdateServicio />} />*/}
          <Route path="/servicios/eliminar/:id" element={<DeleteServicio />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
