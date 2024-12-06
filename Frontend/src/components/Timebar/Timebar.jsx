import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';

const Timebar = ({ percent }) => {
  const { theme } = useTheme();


  return (
    <div className={`my-4 w-4/5 h-2 bg-${theme}-secondary rounded-lg`}>
      <div className={`h-full bg-${theme}-primary rounded-lg text-center`} style={{ width: `${percent}%` }}>
      </div>
    </div>
  )


}

Timebar.propTypes = {
  percent: PropTypes.number,
  theme: PropTypes.string,
};

export default Timebar;
