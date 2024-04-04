import React from "react";
import BreadBox from "./routes/routes.js";
import './index.css'
import { useState } from "react";
import { DataFetchProvider } from './context/DataFetchContext';


export const AccessTokenContext = React.createContext();

export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

function App() {
  return (<>
          <DataFetchProvider>
            <AccessTokenProvider>
              <BreadBox />
            </AccessTokenProvider>
          </DataFetchProvider>
          </>);
}

export default App;