import styled, { css } from "styled-components";
import { mediaQueries } from "../../../../common/mediaQueries";

type Types = {
  dark?: boolean;
};

const scrollConfig = css`
  &::-webkit-scrollbar-thumb {
    background: #96ff592a;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #ffc4015b;
  }

  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(136, 135, 135, 0.253);
    border-radius: 10px;
  }
`;

export const Container = styled.div<Types>`
  margin-top: 1vmax;
  margin-left: 1vmax;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  justify-content: space-around;
  flex-wrap: wrap;
  align-self: center;
  min-width: 16vmax;
  width: 20vmax;
  height: 28vh;
  overflow-y: scroll;

  border-radius: 1vmax;
  box-shadow: -0 0 10px rgba(0, 0, 0, 0.308), 0 -0 10px rgba(0, 0, 0, 0.308),
    -0 -0 10px rgba(0, 0, 0, 0.308), -0 -0 10px rgba(0, 0, 0, 0.308);
  background-color: rgba(255, 0, 0, 0.158);
  border-radius: 10px;

  ${scrollConfig}

  ${(props) =>
    props.dark &&
    css`
      background-color: rgba(113, 255, 212, 0.021);
      scrollbar-color: rgba(255, 255, 0, 0.39) rgba(172, 255, 104, 0.075);
    `}

   ${mediaQueries(
    "landscape",
    css`
      width: 22vmax;
      height: 7vmax;
      overflow-x: scroll;
      overflow-y: unset;
      justify-content: unset;
      align-items: unset;
      flex-wrap: unset;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      width: 90%;
      max-height: 21vh;
      margin-left: 0;
    `
  )}
`;

export const Wrapper = styled.div`
  &:hover {
    position: relative;
    top: -0.3vmax;
  }
`;

export const Emoticon = styled.img`
  width: 3vmax;
  height: 3vmax;
  min-width: 2vmax;
  min-height: 2vmax;
  margin: 0.5vmax;
  cursor: grab;

  ${mediaQueries(
    "landscape",
    css`
      width: 4vmax !important;
      height: 4vmax !important;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      width: 8vmax !important;
      height: 8vmax !important;
      margin: 1vmax;
    `
  )}
`;
