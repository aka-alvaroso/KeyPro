import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="w-full grid grid-cols-3 items-center px-8 py-4 text-xs text-kp-muted border-t border-kp-border/50">
    <p>v2.0.0</p>
    <p className="text-center">
      Hecho con ❤️ por{' '}
      <a href="https://alvaroso.dev/" target="_blank" rel="noreferrer" className="hover:text-kp-accent transition-colors">
        Alvaroso
      </a>
    </p>
    <div className="flex items-center justify-end gap-4">
      <Link to="/politica" className="hover:text-kp-accent transition-colors">Privacidad</Link>
      <Link to="/terminos" className="hover:text-kp-accent transition-colors">Términos</Link>
      <a
        href="https://github.com/aka-alvaroso/KeyPro"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-kp-accent transition-colors"
      >
        Código fuente
      </a>
    </div>
  </footer>
);

export default Footer;
