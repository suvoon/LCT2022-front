import React, { useState } from "react";
import './App.css';
import HeaderBlock from './components/HeaderBlock/HeaderBlock';
import RequestContainer from './components/RequestContainer/RequestContainer';

function App() {

  const [currentPath, setCurrentPath] = useState('active');
  const [query, setQuery] = useState(' ');
  const server = 'http://127.0.0.1:8000/';

  return (
    <div className='App'>

      <HeaderBlock
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
        query={query}
        setQuery={setQuery}
      />

      <RequestContainer
        currentPath={currentPath}
        query={query}
        server={server}
      />

    </div>
  );
}

export default App;
