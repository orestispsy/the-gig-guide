import React, { useState } from "react";
import axios from "../../common/Axios/axios";
import { Link } from "react-router-dom";

interface Props {}

export const Login: React.FC<Props> = ({}) => {
  const [error, setError] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
          <span>Nickname</span>
          <input
            autoComplete="none"
            name="nickname"
            placeholder="Nickname"
            onChange={(e: any) => {
              setNickname(e.target.value);

            }}
            onClick={() => setError(false)}
          />
          <span>Password</span>
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
            onClick={() => setError(false)}
          />

          <div
            id="button"
            className="mainMenuLink"
            onClick={() => handleClick()}
          >
            Submit
          </div>
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
