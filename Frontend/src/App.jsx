import './index.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Rankings from './pages/Rankings';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Profile from './pages/Profile';
// import About from './pages/About';
// import NotFound from './pages/NotFound';

function App () {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/rankings" component={<Rankings />} /> */}
      {/* <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/about" component={About} />
      <Route component={NotFound} /> Para manejar rutas no encontradas */}
    </Routes>
  )
}

export default App
