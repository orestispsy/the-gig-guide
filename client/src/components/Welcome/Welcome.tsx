import { HashRouter, Route, Routes } from "react-router-dom";

import React from "react";

import { GlobalStyles } from "../../common/GlobalStyles.style";

import { Registration } from "../Registration/Registration";

import { Login } from "../Login/Login";

interface Props {}

export const Welcome: React.FC<Props> = ({}) => {
  return (
    <div className="welcomeContainerBack">
      <GlobalStyles />
      <div className="welcomeContainer">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
};
