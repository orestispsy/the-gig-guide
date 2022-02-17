import React, { useEffect, useState } from "react";
import axios from "../../common/Axios/axios";
import { Link } from "react-router-dom";

interface Props {}

export const Registration: React.FC<Props> = ({}) => {
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(function () {}, []);

  const registerUser = () => {
    axios
      .post("/register", { nickname: nickname, password: password })
      .then(({ data }) => {
        if (data.data) {
          location.replace("/");
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  const submitEnter = (e: any) => {
    if (e.keyCode === 13) {
      registerUser();
    }
  };

  return (
    <div className="registerContainer" onKeyDown={(e) => submitEnter(e)}>
      <div className="logoBackLogin">
        <div className="logo2Login"></div>

        <div className="logo2LoginDesc"> The Gig Guide</div>
      </div>
      <h1>Register</h1>
      <span>Nickname</span>
      <input
        autoComplete="none"
        name="nickname"
        placeholder="Nickname"
        onChange={(e) => setNickname(e.target.value)}
        onClick={() => setError(false)}
      />
      <span>Password</span>
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        onClick={() => setError(false)}
      />

      <div id="button" className="mainMenuLink" onClick={() => registerUser()}>
        Submit
      </div>
      <div className="loginContainerRight">
        <span className="regSpan">Joined Already?</span>
        <Link to="/" className="links">
          Login
        </Link>
      </div>
      {error && (
        <p className="error">{"Insert A Nickname And A Password to Proceed"}</p>
      )}
    </div>
  );
};
