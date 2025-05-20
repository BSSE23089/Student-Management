const StatCard = ({ title, value, icon }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  </div>
);

export default StatCard;
