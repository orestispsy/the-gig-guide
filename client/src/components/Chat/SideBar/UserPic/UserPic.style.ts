import styled, { css } from "styled-components";
import { mediaQueries } from "../../../../common/mediaQueries";

type Types = {
  animation?: boolean;
  close?: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 1vh;
  padding: 1vmax 2vmax 0 2vmax;

  ${mediaQueries(
    "portrait",
    css`
      margin-bottom: 1vmax;
      font-size: 5vw;
      width: 100%;
    `
  )}
`;

export const UserImage = styled.img`
  width: 9vmax;
  height: 9vmax;
  border-radius: 50%;
  padding: 1vmax;
  margin-top: -1vmax;

  ${mediaQueries(
    "portrait",
    css`
      width: 30vmax;
      height: 30vmax;
    `
  )}
`;

export const Headline = styled.h1`
  font-size: 2vmax;
  margin: 0;

  ${mediaQueries(
    "portrait",
    css`
      margin-top: 1vmax;
      font-size: 5vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      font-size: 2vmax;
    `
  )}
`;

export const ImageUploader = styled.input`
  text-align: center;
  outline: transparent;
  border-radius: 100px;
  color: orangered;
  box-shadow: -0 0 4px black, 0 -0 4px black, -0 -0 4px black, -0 -0 4px black;
  overflow-wrap: break-word !important;
  padding: 0.8vmax 1vmax 2vmax 0.8vmax;
  background-color: rgba(0, 0, 0, 0.185);
  border: 1px solid black;
  border-radius: 1px;
  box-shadow: none;
  font-size: 0.7vmax;
  height: 2vmax;
  margin-top: 1vmax;
  margin-bottom: 12px;

  ${mediaQueries(
    "portrait",
    css`
      font-size: 1.5vmax;
      height: 5vmax;
      width: 75%;
      margin: 2vmax 0;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      width: 15vmax;
      height: 2vmax;
    `
  )}
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;

  ${mediaQueries(
    "portrait",
    css`
      width: 75%;
      justify-content: space-between;
    `
  )}
`;

export const Option = styled.h1<Types>`
  font-size: 1.2vmax;
  border-radius: 1vh;
  margin: 1vmax;
  height: 2vmax;
  color: lime;

  &:hover {
    text-shadow: -0 0 4px #fff70094, 0 -0 4px #fff70094, -0 -0 4px #fff70094,
      -0 -0 4px #fff70094;
  }

  ${mediaQueries(
    "portrait",
    css`
      font-size: 3vmax;
    `
  )}

  ${(props) =>
    props.animation &&
    css`
      animation: 2s linear infinite blinkerAvatar;
      cursor: pointer;
    `}

          ${(props) =>
    props.close &&
    css`
      color: rgb(252, 100, 73);
      cursor: pointer;
    `}
`;

export const Rocket = styled.div`
  background-image: url("/rocket.gif");
  background-size: cover;
  width: 45px;
  height: 45px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const Error = styled.p`
  font-family: "BlackOpsOne";
  font-size: 1vmax;
  color: tomato;

  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
  text-align: center;
  margin: 1vmax 0 0 0;
  animation: fadeAbout 1.5s ease-in-out;
  width: 20vmax;

  ${mediaQueries(
    "portrait",
    css`
      font-size: 2vmax;
      width: 100%;
      margin-top: 2vmax;
    `
  )}
`;
