import PropTypes from 'prop-types';

const Input = ({ className = '', ...props }) => (
  <input
    className={`
      w-full bg-kp-text/6 text-kp-text placeholder:text-kp-muted
      border-0 px-3 py-2.5 focus:outline-none focus:bg-kp-text/10
      transition-colors duration-150
      ${className}
    `}
    {...props}
  />
);

Input.propTypes = {
  className: PropTypes.string,
};

export default Input;
