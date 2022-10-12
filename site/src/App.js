import { Routes, Route, Link } from "react-router-dom";
import './styles/App.scss';

import Home from '../src/pages/Home.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
