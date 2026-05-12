import PropTypes from 'prop-types';

const Input = ({ className = '', ...props }) => (
  <input
    className={`
      w-full bg-transparent text-kp-text placeholder:text-kp-muted
      border-b-2 border-kp-border focus:border-kp-accent
      py-1 focus:outline-none transition-colors duration-150
      ${className}
    `}
    {...props}
  />
);

Input.propTypes = {
  className: PropTypes.string,
};

export default Input;
