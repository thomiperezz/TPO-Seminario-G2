import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Course from './pages/Course';
import DetalleCurso from './pages/DetalleCurso';
import NuevoCurso from './pages/NuevoCurso';
import NuevaActividad from './pages/NuevaActividad';
import PerfilAlumno from './pages/PerfilAlumno';
import AssistCorrection from './pages/AssistCorrection';
import PreguntasComprensión from './pages/PreguntasComprensión';
import RecuperarContrasena from './pages/RecuperarContrasena';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
      <Route path="/course" element={<Course />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/assistcorrection" element={<AssistCorrection />} />
      <Route path="/preguntas-comprensión" element={<PreguntasComprensión />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/detalle-curso" element={<DetalleCurso />} />
      <Route path="/nuevo-curso" element={<NuevoCurso />} />
      <Route path="/nueva-actividad" element={<NuevaActividad />} />
      <Route path="/perfil-alumno" element={<PerfilAlumno />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;

