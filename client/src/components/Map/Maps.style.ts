import styled, { css } from "styled-components";
import { mediaQueries } from "../../common/mediaQueries";

import { Marker } from "@react-google-maps/api";

import { Link } from "react-router-dom";

type Types = {
  isTriggered?: boolean;
  gigsCounting?: boolean;
};

export const SectionButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1vmax;
  text-align: center;
  height: 2vmax;
  max-width: fit-content;
  margin-top: 0.5vmax;
  padding: 0vmax 0.5vmax;
  cursor: pointer;

  animation: fadeAbout 1s ease-in-out;
  background: linear-gradient(
    112.72013189013455deg,
    rgba(240, 92, 7, 0.253) 4.927083333333334%,
    rgba(30, 189, 176, 0.671) 97.84374999999999%
  );
  color: #e5ff00;

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
      font-size: 1.5vmax;
      text-align: center;
      height: 2vmax;
      margin-top: 1vmax;
      padding: 0.5vmax 2vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      font-size: 2vmax;
      padding: 0.7vmax 1.5vmax;
      min-width: unset;
      justify-content: center;
    `
  )}
`;
