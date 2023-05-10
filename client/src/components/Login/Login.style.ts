import styled, { css } from "styled-components";
import { mediaQueries } from "../../common/mediaQueries";
import { Link } from "react-router-dom";

type Types = {};

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "BlackOpsOne";
  height: 80vh;

  ${mediaQueries(
    "landscape",
    css`
      margin-top: 0;
    `
  )}
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  font-family: "BlackOpsOne";
  align-items: center;
`;

export const Logo = styled.div`
  background-image: url("logo2.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 22vmax;
  height: 10vmax;
  margin-bottom: -4vmax;

  ${mediaQueries(
    "portrait",
    css`
      width: 68vw;
      height: 15vh;
    `
  )}
`;

export const LogoText = styled.div`
  margin-top: -1.5vmax;
  width: max-content;
  color: white;
  font-size: 2vmax;
  font-family: "DarkerGrotesque";

  ${mediaQueries(
    "portrait",
    css`
      font-size: 4vmax;
      margin: -3vmax 0 0 0;
    `
  )}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  justify-content: space-evenly;
  align-items: center;

  ${mediaQueries(
    "portrait",
    css`
      width: unset;
      flex-direction: column;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      margin-top: 0;
      width: 70vw;
      min-height: fit-content;
      height: fit-content;
    `
  )}
`;

export const ContentTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1vmax;
  border: 1px solid rgba(0, 255, 170, 0.032);
  border-radius: 1vh;
  padding: 0 1vmax 1vmax 1vmax;
  border-bottom: 1px solid rgba(0, 255, 170, 0.052);
  background-color: rgba(147, 156, 23, 0.022);

  ${mediaQueries(
    "portrait",
    css`
      border: none;
      background-color: transparent;
    `
  )}
`;

export const ContentBottomQuestion = styled.span`
  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
  font-size: 1.5vmax;
  margin-top: 1.5vmax;

  ${mediaQueries(
    "portrait",
    css`
      font-size: 3vmax;
      margin: 0 0 2vmax 0;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      font-size: 3vmax;
      margin: 0;
    `
  )}
`;

export const ContentBottomBox = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${mediaQueries(
    "portrait",
    css`
      font-size: 3vmax;
      flex-direction: row-reverse;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      flex-direction: row-reverse;
    `
  )}
`;

export const SectionSwitch = styled(Link)`
  color: cyan;
  font-size: 2vmax;
  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
  transition: 0.5s;

  &:hover {
    text-shadow: -0 0 2px cyan, 0 -0 2px cyan, -0 -0 2px cyan, -0 -0 2px cyan;
    color: rgba(229, 255, 0, 0.438);
    transition: 0.5s;
  }

  ${mediaQueries(
    "portrait",
    css`
      font-size: 3vmax;
    `
  )}
`;

export const ContentTitle = styled.h1`
  color: yellow;
  font-size: 3vmax;
  text-shadow: 3px 2px red;

  ${mediaQueries(
    "portrait",
    css`
      font-size: 6vmax;
      margin-bottom: 2vmax;
      text-shadow: 6px 4px red;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      font-size: 5vmax;
      margin: 0;
    `
  )}
`;

export const InputHeader = styled.span`
  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
  font-size: 1.5vmax;
  color: yellow;

  ${mediaQueries(
    "portrait",
    css`
      font-size: 5vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      font-size: 3vmax;
    `
  )}
`;

export const Input = styled.input`
  margin-bottom: 0.5vmax;
  background-color: white;
  border: 1px;
  text-align: center;
  outline: transparent;
  border-radius: 100px;
  width: 14vmax;
  height: 2.5vmax;
  color: orangered;
  box-shadow: -0 0 4px black, 0 -0 4px black, -0 -0 4px black, -0 -0 4px black;

  ${mediaQueries(
    "portrait",
    css`
      width: 50vw;
      height: 5vh;
      padding: 2vmax;
      font-size: 2vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      width: 22vw;
      padding: 2vmax;
      font-size: 2vmax;
    `
  )}
`;

export const GuestButton = styled.div`
  color: rgb(188, 204, 42);
  font-size: 2.2vmax;
  cursor: pointer;
  text-align: center;
  align-self: center;
  transition: 0.5s;
  margin: 0.5vmax;

  &:hover {
    text-shadow: -0 0 2px cyan, 0 -0 2px cyan, -0 -0 2px cyan, -0 -0 2px cyan;
    color: rgba(229, 255, 0, 0.836);
    transition: 0.5s;
  }

  ${mediaQueries(
    "portrait",
    css`
      font-size: 3vmax;
      margin: 0 0 0 2.5vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      font-size: 2.2vmax;
      margin: 0 0 0 3vmax;
    `
  )}
`;

export const ConfirmButton = styled.div`
  font-size: 1.5vmax;
  padding: 0 1.5vmax;
  margin-top: 0.5vmax;
  text-align: center;
  cursor: pointer;
  animation: fadeAbout 1s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(
    112.72013189013455deg,
    rgba(240, 92, 7, 0.253) 4.927083333333334%,
    rgba(30, 189, 176, 0.671) 97.84374999999999%
  );
  color: #e5ff00;
  height: 2.7vmax;

  border-radius: 10vh;
  box-shadow: -0 0 10px rgba(0, 0, 0, 0.432), 0 -0 10px rgba(0, 0, 0, 0.432),
    -0 -0 10px rgba(0, 0, 0, 0.432), -0 -0 10px rgba(0, 0, 0, 0.432);
  border: 1px solid rgba(255, 230, 0, 0.37);
  border-style: double;
  transition: 1s;

  text-shadow: -0 0 5px rgba(0, 0, 0, 0.7), 0 -0 5px rgba(0, 0, 0, 0.7),
    -0 -0 5px rgba(0, 0, 0, 0.7), -0 -0 5px rgba(0, 0, 0, 0.7);

  &:hover {
    box-shadow: -0 0 10px rgba(255, 208, 0, 0.205),
      0 -0 10px rgba(255, 208, 0, 0.205), -0 -0 10px rgba(255, 208, 0, 0.212),
      -0 -0 10px rgba(255, 208, 0, 0.178);
    background: linear-gradient(
      112.72013189013455deg,
      rgba(224, 247, 135, 1) 4.927083333333334%,
      rgba(78, 227, 250, 1) 97.84374999999999%
    );

    transition: 1s;
  }

  &:hover:active {
    box-shadow: -0 0 15px rgba(255, 208, 0, 0.205),
      0 -0 15px rgba(255, 208, 0, 0.205), -0 -0 15px rgba(255, 208, 0, 0.205),
      -0 -0 15px rgba(255, 208, 0, 0.205);
    color: rgba(255, 208, 0, 0.541);
    text-shadow: none;
  }

  ${mediaQueries(
    "portrait",
    css`
      height: 4.3vmax;
      width: 17vmax;
      font-size: 3.5vmax;
      margin: 2vmax;
      padding: 0.5vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      height: 4vmax;
      width: 17vmax;
      font-size: 3vmax;
      margin: 1vmax;
      padding: 0.5vmax;
    `
  )}
`;

export const Error = styled.div`
  font-family: "BlackOpsOne";
  font-size: 1vmax;
  color: tomato;

  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
  text-align: center;
  margin: 1vmax 0 0 0;
  animation: fadeAbout 1.5s ease-in-out;
`;

export const ErrorBan = styled.div`
  font-family: "DarkerGrotesque";
  font-size: 2vmax;
  color: tomato;

  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
  text-align: center;
  margin: 1vmax 0 0 0;
`;

export const ErrorRegister = styled.div`
  font-family: "BlackOpsOne";
  color: tomato;
  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
  text-align: center;
  font-size: 1.3vmax;
  margin: 1vmax 0;
  animation: 3s linear infinite blinkerBan;

  ${mediaQueries(
    "portrait",
    css`
      font-size: 2vmax;
      margin-top: 2vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      font-size: 2vmax;
      margin-top: 2vmax;
    `
  )}
`;

export const ErrorContent = styled.div``;

export const ErrorContentText = styled.span`
  margin: 1vmax;
  animation: 2s linear infinite blinkerBan;
  width: 25vw;
  overflow-x: hidden;
  text-align: center;
`;
