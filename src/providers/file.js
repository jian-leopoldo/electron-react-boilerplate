import React, { useState } from "react";


export const FileContext = React.createContext({});


export const FileProvider = (props) => {
  const [file, setFile] = useState(null);
  return (
    <FileContext.Provider value={{ file, setFile }}>
      {props.children}
    </FileContext.Provider>
  )
}
