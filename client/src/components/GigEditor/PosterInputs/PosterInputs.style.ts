import styled, { css } from "styled-components";
import { mediaQueries } from "../../../common/mediaQueries";

import { InputWrapper as MasterInputWrapper } from "./../../GigCreator/GigCreator.style";

type Types = {
  empty?: boolean;
};

export const Container = styled.div<Types>`
  display: grid;
  grid-template-columns: 2.5fr 0.5fr 2.5fr;
  width: 46vmax;

  ${(props) =>
    !props.empty &&
    css`
      grid-template-columns: 1fr;
    `}

  ${mediaQueries(
    "portrait",
    css`
      grid-template-columns: 1fr;
      width: 100%;
    `
  )};

  ${mediaQueries(
    "landscape",
    css`
      width: unset;
    `
  )}
`;

export const TogglerWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const TogglerLabel = styled.div`
  color: yellow;
  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
  margin-top: 0.2vmax;
  width: 5vw;
  font-size: 1vmax;
  text-align: center;

  ${mediaQueries(
    "portrait",
    css`
      margin: 0;
      width: unset;
    `
  )};

  ${mediaQueries(
    "landscape",
    css`
      margin-left: 0.7vmax !important;
    `
  )}
`;

export const Toggler = styled.img`
  width: 4vmax;
  height: 4vmax;

  border-radius: 50%;
  cursor: pointer;
  box-shadow: -0 0 7px rgb(0, 0, 0, 0.1), 0 -0 7px rgb(0, 0, 0, 0.1),
    -0 -0 7px rgb(0, 0, 0, 0.1), -0 -0 7px rgb(0, 0, 0, 0.1);

  &:hover {
    box-shadow: -0 0 15px rgb(0, 0, 0, 0.2), 0 -0 15px rgb(0, 0, 0, 0.2),
      -0 -0 15px rgb(0, 0, 0, 0.2), -0 -0 15px rgb(0, 0, 0, 0.2);
  }

  ${mediaQueries(
    "portrait",
    css`
      width: 6vmax !important;
      height: 6vmax !important;
      margin: 0 -3vmax 0 -2vmax !important;
      margin: 0 0 0 -1vmax !important;
    `
  )}
`;

export const FileUploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2.5vmax;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 1vh;
  background-color: rgba(255, 255, 255, 0.185);
  border: 1px solid black;
  padding: 0.5vmax;

  ${mediaQueries(
    "portrait",
    css`
      margin: 1vmax 0;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      padding: 1vmax 2vmax 1vmax 1vmax !important;
      margin-right: -4vmax !important;
    `
  )}
`;

export const FileUploaderContent = styled.div`
  display: flex;
  background-color: orangered;
  padding: 0 1vmax;
  height: 1.5vmax;
  width: 14vmax;
  align-items: center;
  justify-content: flex-start;
  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
  font-size: 0.7vmax;
  color: white !important;

  ${mediaQueries(
    "portrait",
    css`
      width: 90%;
      font-size: 1.2vmax;
      height: 2.5vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      width: 17vmax;
      font-size: 1vmax;
      height: 2vmax;
    `
  )}
`;

export const FileUploaderLabel = styled.div``;

export const UploadButton = styled.div`
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  font-size: 0.8vmax;
  padding: 0.3vmax 0.5vmax;
  margin: 0 1vmax;
  animation: blinkUploader 1s infinite ease-in-out;

  &:hover {
    background-color: lime;
    color: white;
    animation: none;
  }
`;

export const InputPoster = styled.input`
  padding-top: 0.1vmax;
  background-color: rgba(0, 0, 0, 0.185);
  border: 1px solid black;
  border-radius: 1px;
  box-shadow: none;
  height: 1.7vmax;
  width: 16vmax;
  margin: 0;

  ${mediaQueries(
    "portrait",
    css`
      width: 97%;
      height: 2.5vmax;
      font-size: 1vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      width: 19vmax !important;
      height: 2.5vmax !important;
      margin-right: 3.5vmax;
    `
  )}
`;

export const InputWrapper = styled(MasterInputWrapper)`
  ${mediaQueries(
    "landscape",
    css`
      margin-right: 2.5vmax;
    `
  )}
`;
