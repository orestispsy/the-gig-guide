import { HashRouter, Route, Routes } from "react-router-dom";

import { WelcomeContainer, Content, ContentWrapper } from "./Welcome.style";

import React from "react";

import { GlobalStyles } from "../../common/GlobalStyles.style";

import { Registration } from "../Registration/Registration";

import { Login } from "../Login/Login";

interface Props {}

export const Welcome: React.FC<Props> = ({}) => {
  return (
      <WelcomeContainer>
          <GlobalStyles />
          <ContentWrapper>
              <Content>
                  <HashRouter>
                      <Routes>
                          <Route path="/" element={<Login />} />
                          <Route path="/register" element={<Registration />} />
                      </Routes>
                  </HashRouter>
              </Content>
          </ContentWrapper>
      </WelcomeContainer>
  );
};
