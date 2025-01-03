
import { useTheme } from '../../context/ThemeContext';


const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`w-full h-1/5 mt-auto flex items-center justify-center text-${theme}-text opacity-30`}>
      <a href='https://github.com/aka-alvaroso/TypeMaster' target='_blank' rel='noreferrer'>Acerca de TypeMaster</a>
      <p>&nbsp; | &nbsp;</p>
      <p>Versión: {process.env.VITE_APP_VERSION}</p>
    </footer>
  );
}

export default Footer;