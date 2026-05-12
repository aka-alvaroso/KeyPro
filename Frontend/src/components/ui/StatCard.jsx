import PropTypes from 'prop-types';

const StatCard = ({ label, value, unit, children, className = '' }) => (
  <section className={`rounded-xl p-3 border-2 border-kp-border bg-kp-bg ${className}`}>
    <p className="text-kp-muted text-sm mb-1">{label}</p>
    {children ?? (
      <p className="text-center text-6xl font-medium text-kp-text">
        {value}
        {unit && <span className="text-xl font-medium text-kp-accent ml-1">{unit}</span>}
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
