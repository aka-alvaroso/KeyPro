import PropTypes from 'prop-types';

const Timebar = ({ percent }) => (
  <div className="my-4 w-4/5 h-1.5 bg-kp-border rounded-full">
    <div
      className="h-full bg-kp-accent rounded-full transition-all duration-1000"
      style={{ width: `${percent}%` }}
    />
  </div>
);

Timebar.propTypes = {
  percent: PropTypes.number,
};

export default Timebar;
