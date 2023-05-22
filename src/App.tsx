import React from 'react';

import './App.css';
import CustomNavbar from './components/navbar/CustomNavbar';
import CustomHeader from './components/header/CustomHeader';
function App() {
  return (
    <div className="App">
      <CustomNavbar/>
      <CustomHeader/>
    </div>
  );
}

export default App;
