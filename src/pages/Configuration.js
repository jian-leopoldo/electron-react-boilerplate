import { random } from "lodash";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ConfigContext } from "../providers/config";


function Configuration() {
  const [config, setConfig] = useState(window.api.databaseConfig)
  const [file, setFile] = useState(null);
  const { configFile, setConfigFile } = useContext(ConfigContext);


  const navigate = useNavigate()

  useEffect(() => {

    window.api.receive("sendJson", (data) => {
      setConfig(data)
      setConfigFile(data)

    });

  }, [file])

  function loadJson(file) {
    setFile(file.path)
    window.api.send("loadJson", file.path);
  }

  function testDataBase() {

  }

  return (
    <header className="App-header">
      <button onClick={() => navigate("/")} >
        voltar
      </button>
      <h2> Configurações banco de dados </h2>
      <input type="file" onChange={e => loadJson(e.target.files[0])} />
      <div>
        {Object.keys(window.api.databaseConfig).map(item => (
          <div key={random(1.1000)}>
            <label>{item}</label><br />
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
      <button
        onClick={() => testDataBase()}

      >
        Testar configuracao
      </button>
    </header>
  )
}

export default Configuration;
