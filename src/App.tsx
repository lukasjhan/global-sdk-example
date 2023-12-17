import React, { useSyncExternalStore } from 'react';
import logo from './logo.svg';
import './App.css';
import { mySDKStore } from './external';

function App() {
  const data = useSyncExternalStore(
    mySDKStore.subscribe,
    mySDKStore.getSnapshot
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{data.label}</p>

        <button
          onClick={() => {
            window.setLabel('new Label');
          }}
        >
          Button
        </button>
      </header>
    </div>
  );
}

export default App;
