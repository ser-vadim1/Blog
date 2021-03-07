import React from 'react';
import RootComponent from "./Components/Header/RootComponent"
import {GlobalStyle} from "./GlobalStyle/GlobalStyledBody"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


function App() {
  const theme =createMuiTheme({
        palette: {
          type:"light",
        },
      })

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <RootComponent/>
      </ThemeProvider>
    </>
  );
}

export default App;
