import '../../assets/styles/global.css';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ id, code, name, info, alerts, alertType = 'info', onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete?.(id, name);
  };

  const handleOpenCourse = () => {
    navigate('/detalle-curso', {
      state: {
        course: {
          id,
          code,
          name,
          info,
          alerts,
          alertType,
        },
      },
    });
  };

  return (
    <div className="course-card" onClick={handleOpenCourse}>
      <div className="course-header">
        <div className="course-card-content">
          <div className="course-code">{code}</div>
          <p className="course-name">{name}</p>
          <p className="course-info">{info}</p>
        </div>
        <div className="course-card-actions">
          <button
            type="button"
            className="course-delete-btn"
            onClick={handleDelete}
            aria-label={`Eliminar curso ${name}`}
          >
            <span className="course-delete-icon">✕</span>
          </button>
        </div>
      </div>
      <div className="course-card-footer">
        <div className={`course-alerts ${alertType}`}>
          {alerts}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
