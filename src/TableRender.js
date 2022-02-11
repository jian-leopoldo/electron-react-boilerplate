import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { useTable } from 'react-table'


const makeData = [
  {
    firstName: "Jian Leopoldo",
    lastName: "Rodrigues",
    age: 20,
    visits: 2,
    progress: 1,
    status: 'maried'
  },
  {
    firstName: "Jian Leopoldo",
    lastName: "Rodrigues",
    age: 20,
    visits: 2,
    progress: 1,
    status: 'maried'
  },
  {
    firstName: "Jian Leopoldo",
    lastName: "Rodrigues",
    age: 20,
    visits: 2,
    progress: 1,
    status: 'maried'
  },

]
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {

  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([{
    firstName: "asd"
  }]);

  const [name, setName] = useState("valor inicial");

  useEffect(() => {
    window.api.receive("fromMain", (data) => {
      console.log(`Received ${data} from main process`);
      setName(data.firstName)
      setRows([...rows, data])
    });

  }, [rows])



  return (
    <div>
      <button onClick={() => {
        window.api.send("toMain", file.path);
        const childWindow = window.open('', 'modal')
        childWindow.document.write('<h1>Hello</h1>')
      }}>
        Log
      </button>
      <div>
        {rows.map(r => {
          return <p>{r.firstName}</p>
        })}
        {name}
      </div>
      <input type="file"
        onChange={e => setFile(e.target.files[0])}
      />

    </div>

  )
}

function TableRender() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )

  // const data = React.useMemo(() => makeData(1), [])

  return (
    <Styles>
      <Table columns={columns} />
    </Styles>
  )
}

export default TableRender
