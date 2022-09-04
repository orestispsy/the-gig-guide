import styled, { css } from "styled-components";
import { mediaQueries } from "../../../common/mediaQueries";

type Types = {
  dark?: boolean;
  emojiBar?: boolean;
  private?: boolean;
};

export const Wrapper = styled.div<Types>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  ${mediaQueries("273", "1024", "landscape")`
            align-self: center;
            padding-top: 2vmax;
            margin-bottom: 0;
    `}

  ${mediaQueries("100", "480", "portrait")`
            flex-direction: row;
    `}

    ${(props) =>
    props.emojiBar &&
    css`
      margin-bottom: -3vmax;
    `}

            ${(props) =>
    props.private &&
    css`
      margin-bottom: -2vmax;
      margin-left: 1vmax;
    `}
`;

export const Container = styled.div<Types>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  box-shadow: -0 0 10px rgba(0, 0, 0, 0.308), 0 -0 10px rgba(0, 0, 0, 0.308),
    -0 -0 10px rgba(0, 0, 0, 0.308), -0 -0 10px rgba(0, 0, 0, 0.308);
  margin-left: 1vmax;

  background-color: rgba(255, 0, 0, 0.158);
  border-radius: 10px;
  padding: 2vmax 1vmax 2vmax 1vmax;

  min-height: fit-content;

  ${mediaQueries("273", "1024", "landscape")`
            align-self: center;
            padding-top: 2vmax;
            margin-bottom: 0;
    `}

  ${mediaQueries("100", "480", "portrait")`
            margin-top: 2vmax;
            margin-right: 0.5vmax;
            justify-content: center;
            border-radius: 2vh;
            min-width: 27vmax;
            min-height: 25vmax;
            padding: 0vmax;
            background-color: rgba(116, 7, 7, 0.158);
    `}

    ${(props) =>
    props.dark &&
    css`
      background-color: rgba(113, 255, 212, 0.021);
      border: 1px solid rgba(255, 255, 255, 0.13);

      ${mediaQueries("100", "480", "portrait")`
                  border: 1px solid rgba(255, 255, 255, 0.281);
                  background-color: rgba(113, 255, 212, 0.021);
    `}
    `}

          ${(props) =>
    props.private &&
    css`
      box-shadow: -0 0 10px rgba(0, 0, 0, 0.308), 0 -0 10px rgba(0, 0, 0, 0.308),
        -0 -0 10px rgba(0, 0, 0, 0.308), -0 -0 10px rgba(0, 0, 0, 0.308);
    `}
`;
