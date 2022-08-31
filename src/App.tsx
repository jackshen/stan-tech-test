import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Programs from "#pages/Programs";

import Topbar from "./components/Topbar";
import Home from "./pages/Home";

const AppWrapper = styled.div`
  background: ${(props) => props.theme.palette.binaryBlack};
  box-sizing: border-box;
  color: ${(props) => props.theme.palette.white};
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
  padding: 40px 50px;
  width: 100%;

  @media (max-width: ${(props) => props.theme.size.xs}) {
    padding: 20px 25px;
  }
`;

const App = () => {
  return (
    <AppWrapper>
      <Topbar />
      <Routes>
        <Route element={<Home />} path="" />
        <Route element={<Programs />} path="programs/:id" />
        {/* Can add additional routes for out-of-scope pages e.g. TV Shows and Movies */}
      </Routes>
    </AppWrapper>
  );
};

export default App;
