import React from 'react';

import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Invitation from './components/Invitation';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Invitation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
