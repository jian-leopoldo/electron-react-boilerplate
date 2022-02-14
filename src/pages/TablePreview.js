import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ConfigContext } from "../providers/config";
import { FileContext } from "../providers/file";

function TablePreview() {

  const { file } = useContext(FileContext);
  const { configFile } = useContext(ConfigContext);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (rows.length < 1) {
      window.api.send("toMain", file.path);

      window.api.receive("fromMain", (data) => {
        let rows1 = rows;
        rows1.push(data)
        setRows([...rows1])
      });

      window.api.receive("allDataSaved", (data) => {
        setLoading(false)
        setSaved(true)
      });
    }


  }, [rows, saved, loading])

  function sendData() {
    setLoading(true)
    window.api.send("saveData", {
      config: configFile,
      rows
    })
  }

  return (
    <header className="App-header">
      <button onClick={() => navigate("/")}>
        Voltar
      </button>
      <button onClick={() => sendData()}>
        Inserir Dados
      </button>
      {
        loading ? <h1>Inserindo dados , por favor aguarde ....</h1> :
          <>
            {
              saved ? <h3 style={{ textAlign: 'center', color: "green" }}>Todos dados foram salvos com sucesso!</h3> :
                <>
                  <h2>Visualização dos dados</h2>
                  <table>
                    <tr>

                      {
                        rows.length > 1 ?
                          Object.keys(rows[0]).map(head =>
                          (<th>

                            {head}
                          </th>)) : null
                      }
                    </tr>

                    {
                      rows.length > 1 ? rows.map(row =>
                      (
                        <tr>
                          {Object.values(row).map(vl => <td>{vl}</td>)}
                        </tr>
                      )

                      ) : null

                    }

                  </table>


                </>
            }
          </>
      }


    </header>
  )
}

export default TablePreview;
