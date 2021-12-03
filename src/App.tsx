import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import FinanceDash from "./root-navigator";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./theme/components/button";

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Router>
          <FinanceDash />
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
