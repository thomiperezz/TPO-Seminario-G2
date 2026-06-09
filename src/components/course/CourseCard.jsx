//import React from 'react';
import '../../assets/styles/global.css';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ code, name, info, alerts, alertType = 'info' }) => {
  const navigate = useNavigate();
  return (
    <div className="course-card" onClick={() => navigate('/detalle-curso')}>
        <div className="course-header">
          <div>
            <div className="course-code">{code}</div>
            <p className="course-name">{name}</p>
            <p className="course-info">{info}</p>
          </div>
          <div className={`course-alerts ${alertType}`}>
            {alerts}
          </div>
        </div>
    </div>
  );
};

export default CourseCard;
