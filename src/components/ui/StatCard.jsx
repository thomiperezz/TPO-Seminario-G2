import React from 'react';
import '../../assets/styles/global.css';

const StatCard = ({ title, value, description, onClick }) => {
  return (
    <div
      className="stat-card"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <p className="stat-card-title">{title}</p>
      <p className="stat-card-value">{value}</p>
      <p className="stat-card-description">{description}</p>
    </div>
  );
};

export default StatCard;