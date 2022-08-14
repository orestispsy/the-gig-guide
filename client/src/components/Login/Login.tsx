import React, { useState, useRef, useEffect } from "react";
import axios from "../../common/Axios/axios";
import { Link } from "react-router-dom";

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
    <div className="loginContainerBack">
      <div className="logoBackLogin">
        <div className="logo2Login"></div>

        <div className="logo2LoginDesc"> The Gig Guide</div>
      </div>

      <div className="loginContainer" onKeyDown={(e) => submitEnter(e)}>
        <div className="loginContainerLeft">
          <h1>Login</h1>
          {secondsLeft === 0 && (
            <React.Fragment>
              <span>Nickname</span>
              <input
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
              <span>Password</span>
              <input
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

              <div
                id="button"
                className="mainMenuLink"
                onClick={() => handleClick()}
              >
                Submit
              </div>
            </React.Fragment>
          )}
          {banError && (
            <p className="errorBan">
              {(secondsLeft !== 0 && `This Account is Temporarily Banned`) ||
                ""}
              <div ref={timerRef}>
                {secondsLeft !== 0 && `Seconds Left:`}
                {(secondsLeft !== 0 && <span>{secondsLeft}</span>) ||
                  (secondsLeft === 0 && (
                    <span>Check Again Your Account !</span>
                  ))}
              </div>
            </p>
          )}
          {blockError && <p className="errorBan">THIS ACCOUNT IS BLOCKED</p>}
        </div>
        <div className="loginContainerRight">
          <span className="regSpan">Not a Member?</span>
          <div className="mainMenuBottom">
            <Link to="/register" className="links">
              Register
            </Link>

            <div onClick={(e) => handleClick(true)} className="guest">
              Join as Guest
            </div>
          </div>
        </div>
        {error && (
          <p className="error">{"Oups ! Your Nickname or Password is Wrong"}</p>
        )}
      </div>
    </div>
  );
};
