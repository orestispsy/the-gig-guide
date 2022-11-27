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

  ${mediaQueries("100", "480", "portrait")`
        flex-direction: column !important;
        justify-content: space-evenly !important;
        height: 40vw !important;

        a:nth-child(2) {
            margin-top: -5vmax !important;
        }
    `}

    ${mediaQueries("273", "1024", "landscape")`
        width: 60vw !important;
    `}

    ${(props) =>
    props.darkMode &&
    css`
      flex-direction: column-reverse;
      margin: 0 0 -15vmax 0 !important;
      ${mediaQueries("100", "480", "portrait")`
          margin: 5vmax 0 0vmax 0 !important;
    `}

      ${mediaQueries("273", "1024", "landscape")`
          margin: 2vmax 0 0 0 !important;
    `}
    `}
`;

export const Options = styled.div<Types>`
  display: flex;
`;

export const SectionButton = styled(Link)<Types>`
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

  ${mediaQueries("100", "480", "portrait")`
        font-size: 3.5vmax !important;
        padding: 1.5vmax 1.5vmax 2vmax 1.5vmax !important;
    `}

  ${mediaQueries("273", "1024", "landscape")`
        font-size: 2vmax !important;
        padding: 1vmax 1.5vmax 0 1.5vmax !important;
        justify-content: unset !important;
    `}
`;

export const Globe = styled.img<Types>`
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

  ${mediaQueries("100", "480", "portrait")`
        width: 14vmax !important;
        height: 14vmax !important;
        margin: -4vmax 4vmax 7vmax 4vmax !important;
    `}

  ${mediaQueries("273", "1024", "landscape")`
        width: 9vmax !important;
        height: 9vmax !important;
        margin: -3vmax 4vmax 3vmax 4vmax !important;
    `}

    ${(props) =>
    props.darkMode &&
    css`
      margin: 2vmax;
      ${mediaQueries("273", "1024", "landscape")`
        margin-top: 2vmax !important;
    `}
    `}
`;
