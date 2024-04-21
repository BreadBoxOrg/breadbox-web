/*
  * File: App.js

  * Description: 
    * This file is the main component of the application.
    * It is the parent component that wraps the entire application.
    * It is wrapped in a context provider that provides the access token to the application.
*/

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