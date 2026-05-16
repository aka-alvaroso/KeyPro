import { Link } from 'react-router-dom';

const Section = ({ title, children }) => (
  <section className="flex flex-col gap-3">
    <h2 className="text-base font-medium text-kp-text">{title}</h2>
    <div className="text-sm text-kp-muted leading-relaxed flex flex-col gap-2">{children}</div>
  </section>
);

const TermsOfService = () => (
  <div className="bg-kp-bg text-kp-text h-screen overflow-y-auto flex flex-col items-center">
    <div className="w-full max-w-2xl px-6 py-16 flex flex-col gap-10">

      <div className="flex flex-col gap-2">
        <Link to="/" className="text-xs text-kp-muted hover:text-kp-accent transition-colors">← Volver</Link>
        <h1 className="text-2xl font-medium">Términos de uso</h1>
        <p className="text-sm text-kp-muted">Última actualización: mayo 2026</p>
      </div>

      <Section title="1. Aceptación">
        <p>Al crear una cuenta o usar KeyPro como invitado, aceptas estos términos. Si no estás de acuerdo, no utilices el servicio.</p>
      </Section>

      <Section title="2. Descripción del servicio">
        <p>KeyPro es una aplicación web gratuita de entrenamiento de velocidad de escritura. Permite realizar tests con textos en distintos idiomas y lenguajes de programación, y consultar estadísticas de progreso.</p>
      </Section>

      <Section title="3. Uso permitido">
        <p>Puedes usar KeyPro para uso personal y no comercial. Queda prohibido:</p>
        <ul className="list-disc list-inside flex flex-col gap-1 pl-2">
          <li>Usar scripts o bots para manipular resultados o el ranking.</li>
          <li>Intentar acceder a cuentas ajenas o a la infraestructura del servidor.</li>
          <li>Usar el servicio para cualquier actividad ilegal.</li>
        </ul>
      </Section>

      <Section title="4. Cuentas de usuario">
        <p>Eres responsable de mantener la confidencialidad de tus credenciales. KeyPro no puede recuperar contraseñas perdidas ya que no se almacenan en texto plano.</p>
        <p>Nos reservamos el derecho de suspender cuentas que incumplan estos términos sin previo aviso.</p>
      </Section>

      <Section title="5. Contenido y propiedad intelectual">
        <p>Los textos utilizados en los tests proceden de fuentes de dominio público o generadas específicamente para la plataforma. El código fuente de KeyPro está disponible públicamente bajo licencia MIT.</p>
      </Section>

      <Section title="6. Disponibilidad">
        <p>KeyPro se ofrece «tal cual» y sin garantías de disponibilidad continua. Podemos interrumpir, modificar o discontinuar el servicio en cualquier momento.</p>
      </Section>

      <Section title="7. Limitación de responsabilidad">
        <p>KeyPro no será responsable de ningún daño directo, indirecto o incidental derivado del uso o la imposibilidad de usar el servicio.</p>
      </Section>

      <Section title="8. Cambios en los términos">
        <p>Podemos actualizar estos términos en cualquier momento. La fecha de la última actualización siempre estará visible en esta página. El uso continuado del servicio implica la aceptación de los términos vigentes.</p>
      </Section>

    </div>
  </div>
);

export default TermsOfService;
