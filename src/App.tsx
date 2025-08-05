// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import VistaDentista from './pages/Dentistas';
import VistaPaciente from './pages/Pacientes';
import UpdatePaciente from './components/forms/update_paciente';


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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path='/'
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<VistaCitas />} />
          <Route path="dentistas" element={<VistaDentista />} />
          <Route path="pacientes" element={<VistaPaciente />} />
          <Route path="pacientes/:id" element={<UpdatePaciente />} />


          <Route path="horarios" element={<VistaHorario />} />
          <Route path="servicios" element={<VistaServicio />} />
          <Route path="miperfil" element={<VistaMiPerfil />} />
          <Route path="servicios/crear" element={<CreateServicio />} />
          <Route path="servicios/eliminar/:id" element={<DeleteServicio />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
