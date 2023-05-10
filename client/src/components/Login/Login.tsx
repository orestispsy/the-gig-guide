import React, { useState, useRef, useEffect } from "react";
import axios from "../../common/Axios/axios";

import {
  LoginContainer,
  LogoWrapper,
  Logo,
  LogoText,
  Content,
  ContentTop,
  ContentBottom,
  ContentTitle,
  InputHeader,
  Input,
  ConfirmButton,
  Error,
  ErrorContent,
  ErrorContentText,
  ErrorBan,
  ContentBottomQuestion,
  ContentBottomBox,
  SectionSwitch,
  GuestButton,
} from "./Login.style";

const { banCountDown } = require("./LoginUtils");

interface Props {}

export const Login: React.FC<Props> = ({}) => {
  const [error, setError] = useState<boolean>(false);
  const [banError, setBanError] = useState<boolean>(false);
  const [blockError, setBlockError] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secondsLeft, setSecondsLeft] = useState<any>(0);

  const timerRef = useRef<HTMLDivElement>(null);

  useEffect(function () {}, [secondsLeft]);

  const handleClick = (e?: any) => {
    if (e) {
      axios
        .post("/register", {
          nickname: "Guest" + Math.floor(Math.random() * 1000),
          password: "1kggguest",
        })
        .then(({ data }) => {
          if (data.data) {
            location.replace("/");
          } else {
            setError(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("/login", { password, nickname })
        .then(({ data }) => {
          if (data.data) {
            location.replace("/");
          } else if (data.errorBlock) {
            setBlockError(true);
          } else if (data.errorBan) {
            setSecondsLeft(Math.round(-Number(data.secondsLeft)));
            setBanError(true);
            setPassword("");
            setNickname("");
            setTimeout(() => {
              banCountDown(-Number(data.secondsLeft), setSecondsLeft);
            }, 1000);
          } else {
            setError(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const submitEnter = (e: any) => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };

  return (
    <LoginContainer>
      <LogoWrapper>
        <Logo />
        <LogoText> The Gig Guide </LogoText>
      </LogoWrapper>

      <Content onKeyDown={(e) => submitEnter(e)}>
        <ContentTop>
          <ContentTitle>Login</ContentTitle>
          {secondsLeft === 0 && (
            <React.Fragment>
              <InputHeader>Nickname</InputHeader>
              <Input
                autoComplete="none"
                name="nickname"
                maxLength={20}
                placeholder="Nickname"
                onChange={(e: any) => {
                  setNickname(e.target.value);
                  setError(false);
                }}
                onClick={() => {
                  setError(false);
                  setBanError(false);
                  setBlockError(false);
                }}
              />
              <InputHeader>Password</InputHeader>
              <Input
                name="password"
                placeholder="Password"
                type="password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                onClick={() => {
                  setError(false);
                  setBanError(false);
                  setBlockError(false);
                }}
              />

              <ConfirmButton onClick={() => handleClick()}>
                Submit
              </ConfirmButton>
            </React.Fragment>
          )}
          {banError && (
            <ErrorBan>
              {(secondsLeft !== 0 && `This Account is Temporarily Banned`) ||
                ""}
              <ErrorContent ref={timerRef}>
                {secondsLeft !== 0 && `Seconds Left:`}
                {(secondsLeft !== 0 && (
                  <ErrorContentText>{secondsLeft}</ErrorContentText>
                )) ||
                  (secondsLeft === 0 && (
                    <ErrorContentText>
                      Check Again Your Account !
                    </ErrorContentText>
                  ))}
              </ErrorContent>
            </ErrorBan>
          )}
          {blockError && <ErrorBan>THIS ACCOUNT IS BLOCKED</ErrorBan>}
        </ContentTop>
        <ContentBottom>
          <ContentBottomQuestion>Not a Member?</ContentBottomQuestion>
          <ContentBottomBox>
            <GuestButton onClick={(e) => handleClick(true)}>
              Join as Guest
            </GuestButton>
            <SectionSwitch to="/register">Register</SectionSwitch>
          </ContentBottomBox>
        </ContentBottom>
        {error && <Error>{"Oups ! Your Nickname or Password is Wrong"}</Error>}
      </Content>
    </LoginContainer>
  );
};
