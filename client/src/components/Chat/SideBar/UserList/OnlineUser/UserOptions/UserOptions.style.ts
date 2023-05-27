import styled, { css } from "styled-components";
import { mediaQueries } from "../../../../../../common/mediaQueries";

type Types = {
  active?: boolean;
};

export const BanBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
`;

export const BanBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0.5vmax;
  font-family: "BlackOpsOne" !important;
  color: rgb(252, 88, 88);
  font-size: 1vmax !important;

  ${mediaQueries(
    "portrait",
    css`
      font-size: 2vmax !important;
    `
  )}
`;

export const BanBoxText = styled.div``;

export const BanTimeEditor = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #76b3aa6e !important;
`;

export const BanTimeInput = styled.input`
  text-align: center;
  outline: transparent;
  border-radius: 100px;
  height: 1.7vmax;
  font-size: 1.5vmax;
  background-color: #ffe60049;
  border: none;
  width: 3vmax;
  color: white;

  input[type="number"] {
    -moz-appearance: textfield;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ${mediaQueries(
    "portrait",
    css`
      height: 3vmax;
      width: 6vmax;
    `
  )}
`;

export const KickButton = styled.div<Types>`
  background-image: url("/kick.jpg");
  background-size: cover;
  width: 1.5vmax;
  height: 1.5vmax;
  border-radius: 50%;
  cursor: pointer;
  transform: rotate(0.15turn);
  border: 1px solid white;

  &:hover {
    transform: rotate(0turn);
  }

  ${mediaQueries(
    "portrait",
    css`
      width: 4vmax;
      height: 4vmax;
      margin: 0 1vmax;
    `
  )}

  ${(props) =>
    props.active &&
    css`
      animation: 1.1s linear infinite blinker2;
    `}
`;

export const HornButton = styled.div`
  margin-left: 0.5vmax;
  width: 1.5vmax;
  height: 1.5vmax;
  border-radius: 50%;
  background-image: url("/horn.jpg");
  background-size: cover;

  &:hover {
    animation: 1.1s linear infinite blinker2;
  }

  ${mediaQueries(
    "portrait",
    css`
      width: 4vmax;
      height: 4vmax;
      margin: 0 1vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      width: 2vmax;
      height: 2vmax;
      margin: 0 1vmax;
    `
  )}
`;

export const GoToSuperMode = styled.div`
  background-image: url("/gear.png");
  background-size: cover;
  width: 1.5vmax;
  height: 1.5vmax;
  margin: 0 0.5vmax;
  transition: 1s;
  cursor: pointer;
  filter: invert(50%);
  border-radius: 90%;

  &:hover {
    transform: rotate(180deg);
    transition: 1s;
  }

  ${mediaQueries(
    "portrait",
    css`
      width: 4vmax;
      height: 4vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      width: 2vmax;
      height: 2vmax;
      margin-left: 0;
    `
  )}
`;
