import React, { useContext, useEffect, useState } from 'react'

import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { useTable } from 'react-table'
import { FileContext } from './providers/file'

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

  const navigate = useNavigate();

  const { file, setFile } = useContext(FileContext);
  const [rows, setRows] = useState([]);

  return (
    <div>
      <div>
        {rows.map(r => {
          return <p>{r.firstName}</p>
        })}
      </div>
      <input type="file"
        onChange={e => {
          navigate("tablePreview")
          setFile(e.target.files[0])
        }}
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
