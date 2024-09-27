import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const Test = ({ text }) => {
  const [cursor, setCursor] = useState(0)
  const [results, setResults] = useState([])

  useEffect(() => {

    const handleKeyPress = (event) => {
      const currentChar = text[cursor];
      const typedChar = event.key;

      // Reiniciar
      if (typedChar === 'Escape') {
        setCursor(0)
        setResults([])
        return;
      }

      // Manejo de Backspace
      if (typedChar === 'Backspace') {
        if (cursor > 0) {
          const newResults = results.slice(0, cursor - 1);
          setResults(newResults); // Elimina el último resultado
          setCursor(cursor - 1); // Mueve el cursor hacia atrás
        }
        return;
      }

      if (typedChar === 'CapsLock' || typedChar === 'Dead' || typedChar === 'Control' || typedChar === 'Backspace' || typedChar === 'Tab') {
        return
      }

      const isCorrect = typedChar === currentChar;

      setResults((prevResults) => {
        const newResults = [...prevResults];
        newResults[cursor] = isCorrect ? 'correct' : 'incorrect'; // Actualiza solo el carácter actual
        return newResults;
      });


      setCursor(cursor + 1);
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [cursor, text, results]);

  // Renderizar el texto
  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = '';

      // Aplicar la clase cursor al actual
      if (index === cursor) {
        className = 'text-orange-700 underline'
      } else if (results[index]) {
        // Asignar 'correct' o 'incorrect' según el resultado almacenado
        className = results[index] === 'correct' ? ' text-green-600 underline' : ' text-red-600  underline';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );

    });
  }


  return (
    <div className='flex-wrap w-4/6 my-8 text-stone-600 text-3xl'>
      {renderText()}
    </div>
  );
};

Test.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Test;
