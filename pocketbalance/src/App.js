import React from 'react';
import './App.css';
import MainContainer from './MainContainer';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> PocketBalance
            </div>
            {/* Button placeholder, can be used for settings/about in future */}
          </div>
        </div>
      </nav>
      {/* MainContainer holds main state and UI */}
      <MainContainer />
    </div>
  );
}

export default App;