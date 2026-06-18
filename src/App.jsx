import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Home from './pages/Home';
import Course from './pages/Course';
import DetalleCurso from './pages/DetalleCurso';
import NuevoCurso from './pages/NuevoCurso';
import NuevaActividad from './pages/NuevaActividad';
import PerfilAlumno from './pages/PerfilAlumno';
import AssistCorrection from './pages/AssistCorrection';
import PreguntasComprensión from './pages/PreguntasComprensión';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/course" element={<Course />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/assistcorrection" element={<AssistCorrection />} />
      <Route path="/preguntas-comprensión" element={<PreguntasComprensión />} />
      <Route path="/detalle-curso" element={<DetalleCurso />} />
      <Route path="/nuevo-curso" element={<NuevoCurso />} />
      <Route path="/nueva-actividad" element={<NuevaActividad />} />
      <Route path="/perfil-alumno" element={<PerfilAlumno />} />
    </Routes>
  );
}

export default App;
