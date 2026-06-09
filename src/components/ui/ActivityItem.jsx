import React from 'react';
import '../../assets/styles/global.css';

const ActivityItem = ({ icon, title, description, type = 'info' }) => {
  return (
    <div className="activity-item">
      <div className={`activity-icon ${type}`}>
        {icon}
      </div>
      <div className="activity-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
