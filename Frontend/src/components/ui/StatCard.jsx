import PropTypes from 'prop-types';

const StatCard = ({ label, value, unit, children, className = '' }) => (
  <section className={`p-4 border border-kp-border bg-kp-surface ${className}`}>
    <p className="text-xs text-kp-muted uppercase tracking-widest mb-2">{label}</p>
    {children ?? (
      <p className="text-center text-4xl font-medium text-kp-text">
        {value}
        {unit && <span className="text-lg font-medium text-kp-accent ml-1">{unit}</span>}
      </p>
    )}
  </section>
);

StatCard.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default StatCard;
