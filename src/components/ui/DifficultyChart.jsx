import '../../assets/styles/global.css';

const DifficultyChart = ({ items }) => {
  return (
    <div>
      <div className="difficulty-title">
        Conceptos con mayor dificultad
      </div>

      {items.map((item) => (
        <div key={item.label} className="difficulty-row">
          <div className="difficulty-label">
            {item.label}
          </div>

          <div className="difficulty-track">
            <div
              className="difficulty-bar"
              style={{
                width: `${item.pct}%`,
                background: item.color
              }}
            />
          </div>

          <span className="difficulty-value">
            {item.pct}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default DifficultyChart;