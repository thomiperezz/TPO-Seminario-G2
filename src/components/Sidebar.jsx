import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { key: 'course', label: 'Cursos', path: '/course' },
    { key: 'assistcorrection', label: 'Corrección asistida', path: '/assistcorrection' },
    { key: 'checkquestions', label: 'Preguntas de repaso', path: '/checkquestions' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">
        <span style={{ color: 'rgb(5, 150, 105)' }}>acompaña</span>
        <span style={{ color: '#000000' }}>educa</span> 
      </h1>
      </div>
      <p className="sidebar-menu-label">Menú</p>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;