import React from 'react';
import Counter from 'npm-react-ts-starter';
import './App.css';

function App() {
  return (
    <div className="App">
      <Counter src="https://player.vimeo.com/external/685303927.m3u8?s=7d558b13eb18c59c1e8619c1b340a431c94751b0" />
    </div>
  );
}

export default App;
