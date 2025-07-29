// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VistaDentista from './pages/Dentistas';
import VistaPaciente from './pages/Pacientes';
import VistaHorario from './pages/Horarios';
import VistaCitas from './pages/Citas';
import Layout from './components/Layout';
import VistaServicio from './pages/Servicios'
import VistaMiPerfil from './pages/Perfil';

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
