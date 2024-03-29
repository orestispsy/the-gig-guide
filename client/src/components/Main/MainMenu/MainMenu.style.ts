import styled, { css } from "styled-components";
import { mediaQueries } from "../../../common/mediaQueries";

import { Link } from "react-router-dom";

type Types = {
  darkMode?: boolean;
};

export const MenuWrapper = styled.div<Types>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 2vmax;
  z-index: 2;

  ${(props) =>
    !props.darkMode &&
    css`
      background: radial-gradient(
        closest-side,
        #d9ff2e00,
        #ff585217,
        #52fff627,
        #b1151500
      );
      a:nth-child(2) {
        margin-top: -1vmax;
      }
    `}

  ${mediaQueries(
    "portrait",
    css`
      flex-direction: column;
      justify-content: space-evenly;
      height: 40vw;

      a:nth-child(2) {
        margin-top: -5vmax;
      }
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      width: 60vw;
    `
  )}

    ${(props) =>
    props.darkMode &&
    css`
      flex-direction: column-reverse;
      margin: 0 0 -15vmax 0;
      ${mediaQueries(
        "portrait",
        css`
          margin: 5vmax 0 0vmax 0;
        `
      )}

      ${mediaQueries(
        "landscape",
        css`
          margin: 2vmax 0 0 0;
        `
      )}
    `}
`;

export const Options = styled.div<Types>`
  display: flex;
`;

export const SectionButton = styled(Link)<Types>`
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
  font-size: 2.3vmax;
  height: 3vmax;
  padding: 0.5vmax 1vmax;
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
      font-size: 3.5vmax;
      padding: 1.5vmax 1.5vmax 2vmax 1.5vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      font-size: 2vmax;
      padding: 1vmax 1.5vmax 0 1.5vmax;
      justify-content: unset;
    `
  )}
`;

export const Globe = styled.img<Types>`
  animation: fadeAbout 1s ease-in-out;
  width: 8vmax;
  height: 8vmax;
  border-radius: 50%;
  margin: -3vmax 4vmax 3vmax 4vmax;
  object-fit: cover;
  box-shadow: -0 0 15px black, 0 -0 15px black, -0 -0 15px black,
    -0 -0 15px black;
  transition: 0.5s;

  &:hover {
    box-shadow: -0 0 25px black, 0 -0 25px black, -0 -0 25px black,
      -0 -0 25px black;
    transition: 0.5s;
  }

  &:active {
    box-shadow: -0 0 15px black, 0 -0 15px black, -0 -0 15px black,
      -0 -0 15px black;
  }

  ${mediaQueries(
    "portrait",
    css`
      width: 14vmax;
      height: 14vmax;
      margin: -4vmax 4vmax 7vmax 4vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      width: 9vmax;
      height: 9vmax;
      margin: -3vmax 4vmax 3vmax 4vmax;
    `
  )}

    ${(props) =>
    props.darkMode &&
    css`
      margin: 2vmax;
      ${mediaQueries(
        "landscape",
        css`
          margin-top: 2vmax;
        `
      )}
    `}
`;
