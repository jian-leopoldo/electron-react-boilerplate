import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function TablePreview() {

  const [rows, setRows] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    window.api.receive("fromMain", (data) => {
      console.log(`Received ${data} from main process`);
      setRows([...rows, data])
    });
  }, [rows])

  function sendData() {
    console.log(Object.keys(rows[0]))
    console.log(rows[0])
    // window.api.send("insertDatabase", rows)
    // window.api.send("toMain", rows);

  }

  return (
    <header className="App-header">
      <button onClick={() => navigate("/")}>
        Voltar
      </button>
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

      <button onClick={() => sendData()}>
        Ok
      </button>
    </header>
  )
}

export default TablePreview;
