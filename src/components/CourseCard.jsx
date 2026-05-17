import React from 'react';
import '../assets/styles/global.css';

const CourseCard = ({ code, name, info, alerts, alertType = 'info' }) => {
  return (
    <div className="course-card">
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
