import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import App from "./App";
import * as theme from "./theme";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    width: 100%;
  }

  html, body {
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: "Open Sans", sans-serif;
  }
`;

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  );
}
