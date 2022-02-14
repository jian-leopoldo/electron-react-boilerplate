import React, { useState } from "react";


export const ConfigContext = React.createContext({});


export const ConfigProvider = (props) => {
  const [configFile, setConfigFile] = useState("");

  return (
    <ConfigContext.Provider value={{ configFile, setConfigFile }}>
      {props.children}
    </ConfigContext.Provider>
  )
}
