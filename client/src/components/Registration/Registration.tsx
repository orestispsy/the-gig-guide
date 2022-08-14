import React, { useEffect, useState } from "react";
import axios from "../../common/Axios/axios";
import { Link } from "react-router-dom";

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
        <div className="errorNickRegister">
          This Nickname Exists Already<div>Try Another One</div>
        </div>
      )}
      {!errorDuplicate && <span>Password</span>}
      {!errorDuplicate && (
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          onClick={() => setError(false)}
        />
      )}
      <div id="button" className="mainMenuLink" onClick={() => registerUser()}>
        Submit
      </div>
      <div className="loginContainerRight">
        <span className="regSpan">Joined Already?</span>
        <Link to="/" className="links">
          Login
        </Link>
      </div>
      {errorNickname && (
        <p className="error">
          {"Your Nickname must have a - min 3 | max 20 - length of characters"}
        </p>
      )}
      {error && !errorNickname && (
        <p className="error">{"Insert A Nickname And A Password to Proceed"}</p>
      )}
    </div>
  );
};
