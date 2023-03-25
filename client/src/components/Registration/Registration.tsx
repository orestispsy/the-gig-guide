import React, { useEffect, useState } from "react";
import axios from "../../common/Axios/axios";
import { Link } from "react-router-dom";

import {
    LoginContainer,
    LogoWrapper,
    Logo,
    LogoText,
    ContentBottom,
    ContentTitle,
    InputHeader,
    Input,
    ConfirmButton,
    Error,
    ErrorContent,
    ErrorRegister,
    ContentBottomQuestion,
    SectionSwitch,
} from "./../Login/Login.style";

interface Props {}

export const Registration: React.FC<Props> = ({}) => {
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorDuplicate, setErrorDuplicate] = useState<boolean>(false);
  const [errorNickname, setErrorNickname] = useState<boolean>(false);

  useEffect(function () {}, []);

  const registerUser = () => {
    let nickChecker = nickname.trim();
    let passChecker = password.trim();
    if (nickChecker !== "" && passChecker !== "" && !errorNickname) {
      axios
        .post("/register", { nickname: nickname, password: password })
        .then(({ data }) => {
          if (data.errorDuplicate) {
            setErrorDuplicate(true);
          } else if (data.data) {
            location.replace("/");
          } else {
            setError(true);
          }
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    } else {
      setError(true);
    }
  };

  const submitEnter = (e: any) => {
    if (e.keyCode === 13) {
      registerUser();
    }
  };

  const nickNameChecker = (e: string) => {
    if ((e.length > 20 || e.length < 3) && e.length !== 0) {
      setErrorNickname(true);
    } else {
      setErrorNickname(false);
    }
  };

  return (
      <LoginContainer onKeyDown={(e) => submitEnter(e)}>
          <LogoWrapper>
              <Logo />
              <LogoText> The Gig Guide </LogoText>
          </LogoWrapper>
          <ContentTitle>Register</ContentTitle>
          <InputHeader>Nickname</InputHeader>
          <Input
              autoComplete="none"
              name="nickname"
              maxLength={20}
              placeholder="Nickname"
              onChange={(e) => {
                  setNickname(e.target.value);
                  nickNameChecker(e.target.value);
              }}
              onClick={() => {
                  setError(false);
                  setErrorDuplicate(false);
              }}
          />
          {errorDuplicate && (
              <ErrorRegister>
                  This Nickname Exists Already
                  <ErrorContent>Try Another One</ErrorContent>
              </ErrorRegister>
          )}
          {!errorDuplicate && <InputHeader>Password</InputHeader>}
          {!errorDuplicate && (
              <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={() => setError(false)}
              />
          )}
          <ConfirmButton onClick={() => registerUser()}>Submit</ConfirmButton>
          <ContentBottom>
              <ContentBottomQuestion>Joined Already?</ContentBottomQuestion>
              <SectionSwitch to="/">Login</SectionSwitch>
          </ContentBottom>
          {errorNickname && (
              <Error>
                  {
                      "Your Nickname must have a - min 3 | max 20 - length of characters"
                  }
              </Error>
          )}
          {error && !errorNickname && (
              <Error>{"Insert A Nickname And A Password to Proceed"}</Error>
          )}
      </LoginContainer>
  );
};
