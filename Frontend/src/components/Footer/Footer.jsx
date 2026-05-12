const Footer = () => (
  <footer className="w-full flex items-center justify-center gap-2 py-4 text-sm text-kp-muted opacity-60">
    <p>Hecho con ❤️ por <a href="https://alvaroso.dev/" target="_blank" rel="noreferrer" className="underline hover:text-kp-text transition-colors">Alvaroso</a></p>
    <span>|</span>
    <p>v{import.meta.env.VITE_APP_VERSION}</p>
  </footer>
);

export default Footer;
