// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyCalendar from './pages/MyCalendar';

import Layout from './components/Layout';

import VistaDentistas from './pages/Dentistas'
import VistaPaciente from './pages/Pacientes'
import VistaHorario from './pages/Horarios'



function App() {
  return (
    <Router>
      <Routes>
        
        
        <Route element={<Layout />}>
          <Route path="/" element={<MyCalendar />} />
          <Route path="/dentistas" element={<VistaDentistas />}/>
          <Route path="/pacientes" element={<VistaPaciente />}/>
          <Route path="/horarios" element={<VistaHorario />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

