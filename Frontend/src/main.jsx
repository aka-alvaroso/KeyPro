import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import App from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <Router>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Router>,
)
