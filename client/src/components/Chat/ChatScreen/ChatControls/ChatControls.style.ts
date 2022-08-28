import styled, { css } from "styled-components";
import { mediaQueries } from "../../../../common/mediaQueries";

type Types = {
  down?: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  text-shadow: -0 0 5px black, 0 -0 5px black, -0 -0 5px black, -0 -0 5px black;
  width: inherit;
  margin: 0.5vmax 0 -2.5vmax -1vmax;
  z-index: 2;

  ${mediaQueries("273", "1024", "landscape")`
          margin: 0 0 -3vmax -2vmax;
    `}

  ${mediaQueries("100", "480", "portrait")`
          align-items: flex-end;
          flex-direction: column-reverse;
          width: 87vw;
          margin: 1vmax -2vmax -9vmax 0vmax;
    `}
`;

export const Arrows = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${mediaQueries("100", "480", "portrait")`
          flex-direction: column;
    `}
`;

export const Arrow = styled.div<Types>`
  font-size: 2vmax;
  color: yellow;
  margin-top: 0.2vmax;
  cursor: pointer;

  &:hover {
    color: white;
  }

  &:active {
    color: black;
    text-shadow: none;
  }

  ${mediaQueries("100", "480", "portrait")`
          font-size: 2.5vmax;
          margin: 0;
    `}

  ${mediaQueries("273", "1024", "landscape")`
          font-size: 3vmax;
    `}

     ${(props) =>
    props.down &&
    css`
      ${mediaQueries("273", "1024", "landscape")`
           margin: 0 0.7vw 0 1vw;
    `}
    `}
`;

export const Next = styled.div`
  font-size: 2vmax;
  font-weight: lighter;
  color: white;
  cursor: pointer !important;
  text-shadow: -0 0 3px black, 0 -0 3px black, -0 -0 3px black, -0 -0 3px black;
  margin: 0 0.4vmax;

  &:hover {
    color: rgb(159, 255, 231);
  }

  &:active {
    text-shadow: none;
  }

  ${mediaQueries("100", "480", "portrait")`
          font-size: 2.5vmax;
          margin: 0 0.1vmax 0 0 !important;
    `}

  ${mediaQueries("273", "1024", "landscape")`
          font-size: 3vmax;
    `}
`;
