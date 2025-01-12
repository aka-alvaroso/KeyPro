
import { useTheme } from '../../context/ThemeContext';


const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`w-full h-1/5 mt-auto flex items-center justify-center text-${theme}-text opacity-30`}>
      <p>Hecho con ❤️ por <a href='https://alvaroso.dev/' target='_blank' className='underline' >Alvaroso</a></p>
      <p>&nbsp; | &nbsp;</p>
      <p>Versión: {process.env.VITE_APP_VERSION}</p>
    </footer>
  );
}

export default Footer;