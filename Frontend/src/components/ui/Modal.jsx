import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 w-screen h-screen flex items-center justify-center bg-kp-text/10 backdrop-blur-sm z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-1/3 max-h-[80vh] bg-kp-bg border border-kp-border overflow-y-auto shadow-xl"
      >
        <div className="flex justify-between items-center px-8 py-6 border-b border-kp-border">
          <h2 className="text-2xl font-medium text-kp-text">{title}</h2>
          <button
            onClick={onClose}
            className="text-kp-muted hover:text-kp-text transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
