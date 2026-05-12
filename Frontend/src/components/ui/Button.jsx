import PropTypes from 'prop-types';

const variants = {
  filled:  'bg-kp-accent text-kp-text hover:brightness-105 active:brightness-95',
  outline: 'border-2 border-kp-accent text-kp-accent hover:bg-kp-accent hover:text-kp-text',
  ghost:   'text-kp-muted hover:text-kp-accent',
  subtle:  'bg-kp-accent/10 text-kp-accent hover:bg-kp-accent/20',
};

const sizes = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4 text-sm',
  lg: 'py-2.5 px-6 text-base',
};

const Button = ({ children, variant = 'filled', size = 'md', className = '', ...props }) => (
  <button
    className={`
      inline-flex items-center justify-center gap-2 font-medium rounded-lg
      transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
      ${variants[variant]} ${sizes[size]} ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['filled', 'outline', 'ghost', 'subtle']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Button;
