import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import FinanceDash from "./root-navigator";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Router>
          <FinanceDash />
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
