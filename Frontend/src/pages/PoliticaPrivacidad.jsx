import { Link } from 'react-router-dom';

const Section = ({ title, children }) => (
  <section className="flex flex-col gap-3">
    <h2 className="text-base font-medium text-kp-text">{title}</h2>
    <div className="text-sm text-kp-muted leading-relaxed flex flex-col gap-2">{children}</div>
  </section>
);

const PrivacyPolicy = () => (
  <div className="bg-kp-bg text-kp-text h-screen overflow-y-auto flex flex-col items-center">
    <div className="w-full max-w-2xl px-6 py-16 flex flex-col gap-10">

      <div className="flex flex-col gap-2">
        <Link to="/" className="text-xs text-kp-muted hover:text-kp-accent transition-colors">← Volver</Link>
        <h1 className="text-2xl font-medium">Política de privacidad</h1>
        <p className="text-sm text-kp-muted">Última actualización: mayo 2026</p>
      </div>

      <Section title="1. Información que recopilamos">
        <p>KeyPro recopila únicamente la información necesaria para ofrecer el servicio: nombre de usuario, dirección de correo electrónico y contraseña (almacenada en formato hash bcrypt).</p>
        <p>Los resultados de cada test (velocidad, precisión, errores, duración) se asocian a tu cuenta para mostrar tu historial y estadísticas.</p>
      </Section>

      <Section title="2. Cómo usamos tu información">
        <p>Utilizamos tus datos exclusivamente para:</p>
        <ul className="list-disc list-inside flex flex-col gap-1 pl-2">
          <li>Autenticar tu sesión mediante JWT.</li>
          <li>Mostrar tu perfil público y tu historial de tests.</li>
          <li>Calcular y mostrar estadísticas en el ranking global.</li>
        </ul>
        <p>No vendemos, cedemos ni compartimos tus datos con terceros bajo ningún concepto.</p>
      </Section>

      <Section title="3. Almacenamiento y seguridad">
        <p>Los datos se almacenan en una base de datos MongoDB alojada en servidores de MongoDB Atlas (región Europa). Las contraseñas nunca se almacenan en texto plano.</p>
        <p>Las sesiones se gestionan con tokens JWT almacenados en <code className="bg-kp-surface px-1 text-xs">sessionStorage</code> del navegador, que se eliminan al cerrar la pestaña.</p>
      </Section>

      <Section title="4. Cookies y almacenamiento local">
        <p>KeyPro no utiliza cookies de seguimiento. Se usa <code className="bg-kp-surface px-1 text-xs">localStorage</code> únicamente para guardar tus preferencias de configuración (estilo de cursor, fuente escrita, modo de temporizador).</p>
      </Section>

      <Section title="5. Tus derechos">
        <p>Puedes solicitar en cualquier momento la eliminación completa de tu cuenta y todos los datos asociados contactando con nosotros.</p>
      </Section>

      <Section title="6. Contacto">
        <p>Para cualquier consulta relacionada con tu privacidad, puedes escribirnos a través del repositorio público del proyecto.</p>
      </Section>

    </div>
  </div>
);

export default PrivacyPolicy;
