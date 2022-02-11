import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


function Configuration() {
  const [config, setConfig] = useState(window.api.databaseConfig)
  const navigate = useNavigate()
  return (
    <header className="App-header">
      <button onClick={() => navigate("/")} >
        voltar
      </button>
      <h2> Configurações banco de dados </h2>
      <div>
        {Object.keys(window.api.databaseConfig).map(item => (
          <div key={item}>
            <label key={item} >{item}</label><br />
            <input
              key={item}
              type="text"
              name="test"
              value={config[item]}
              onChange={e => setConfig(
                {
                  ...config,
                  [item]: e.target.value
                }
              )}
            />
          </div>
        ))}

      </div>
    </header>
  )
}

export default Configuration;