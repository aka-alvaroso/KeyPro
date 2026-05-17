import { motion } from 'framer-motion';

/**
 * Wrapper que hace fade + slide-up al montar.
 * Props:
 *   delay   — retraso en segundos (por defecto 0)
 *   y       — distancia de desplazamiento inicial (por defecto 16px)
 *   duration— duración en segundos (por defecto 0.4)
 *   className
 */
const FadeUp = ({ children, delay = 0, y = 16, duration = 0.4, className = '', ...props }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export default FadeUp;
