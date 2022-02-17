import { HashRouter, Route } from "react-router-dom";

import React from "react";

import { Registration } from "../Registration/Registration";

import { Login } from "../Login/Login";

interface Props {}

export const Welcome: React.FC<Props> = ({}) => {
  return (
    <div className="welcomeContainerBack">
      <div className="welcomeContainer">
        <HashRouter>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Registration} />
          </div>
        </HashRouter>
      </div>
    </div>
  );
};
