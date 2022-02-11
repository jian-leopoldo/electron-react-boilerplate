import logo from './logo.svg';
import './App.css';
import Component from './Component';
import { useParams, useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1> Sai-br import </h1>
        <button onClick={() => navigate("/config")}>
          Configurações
        </button>
        <Component />
      </header>
    </div>
  );
}

export default App;
