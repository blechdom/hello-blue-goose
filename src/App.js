import React from 'react';
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import logo from './logo.svg';
import './App.css';

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
