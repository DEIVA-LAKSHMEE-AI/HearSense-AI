import React from 'react';
import './StatsCard.css';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color = 'blue',
  trend,
}) => {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-card-header">
        <h3 className="stats-title">{title}</h3>
        <span className="stats-icon">{icon}</span>
      </div>

      <div className="stats-value">{value}</div>

      {trend && (
        <div className={`stats-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
          <span className="trend-icon">
            {trend.isPositive ? '↑' : '↓'}
          </span>
          <span className="trend-value">{trend.value}%</span>
          <span className="trend-label">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
