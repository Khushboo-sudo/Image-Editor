import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageSearch from './components/ImageSearch';
import CanvasEditor from './components/CanvasEditor';

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<ImageSearch onSelectImage={(url) => {}} />} />
        <Route path="/editor" element={<CanvasEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
