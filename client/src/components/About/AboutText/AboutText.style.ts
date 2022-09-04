import styled, { css } from "styled-components";
import { mediaQueries } from "../../../common/mediaQueries";

type AboutTextTypes = {
  author?: boolean;
  wider?: boolean;
};

export const TextHeadline = styled.div`
  margin-top: 4vmax;
  text-align: center;
  font-family: "PollerOne";
  font-size: 3vmax;
  padding: 0 2vmax;
  color: black;
  border-bottom: 1px solid rgba(0, 0, 0, 0.258);
  text-shadow: -1px 1px 0 white, 1px -1px 0 white, -1px -1px 0 white,
    1px 1px 0 white;
`;

export const TextWrapper = styled.div`
  margin: 0 0 2vmax 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${mediaQueries("100", "480", "portrait")`
             margin: 0;
    `}
`;

export const Text = styled.div<AboutTextTypes>`
  border-radius: 1vh;
  margin: 0 auto;
  text-align: justify;
  color: rgba(255, 255, 255, 0.842);
  width: 60vmax;
  padding: 0 1vmax;
  text-shadow: -1px 1px 10px rgba(0, 0, 0, 0.7),
    1px -1px 10px rgba(0, 0, 0, 0.7), -1px -1px 10px rgba(0, 0, 0, 0.7),
    1px 1px 10px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaQueries("100", "480", "portrait")`
          text-indent: 1vmax;
          width: unset;
    `}

  ${(props) =>
    props.author &&
    css`
      ${mediaQueries("273", "1024", "landscape")`
              font-size: 2vmax !important;
    `}
    `}
`;

export const GoTo = styled.a`
  text-shadow: none;
  font-size: 2vmax;
  font-family: "Bangers";
  letter-spacing: 2px;
  color: rgb(220, 20, 60);
  text-shadow: -1px 1px 0 yellow, 1px -1px 0 yellow, -1px -1px 0 yellow,
    1px 1px 0 yellow;

  &:hover {
    color: black;
    text-shadow: -1px 1px 0 rgb(255, 255, 255), 1px -1px 0 rgb(255, 255, 255),
      -1px -1px 0 rgb(255, 255, 255), 1px 1px 0 rgb(255, 255, 255);
  }
`;

export const Paragraph = styled.div<AboutTextTypes>`
  margin-top: 1vmax;
  text-indent: 1vmax;

  ${(props) =>
    props.author &&
    css`
      text-indent: none;
      text-align: center;
      width: 20vw;
      ${mediaQueries("100", "480", "portrait")`
            width: 60vw;
    `}
    `}

  ${(props) =>
    props.wider &&
    css`
      width: 45vw;
    `}
`;

export const Author = styled.a`
  border-radius: 50%;
  background-image: url("/about/auth.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 2vmax;
  width: 10vmax;
  height: 10vmax;
  filter: hue-rotate(15deg) sepia(0.25) brightness(1) contrast(1);
  opacity: 40%;
  background-position-y: 50%;

  ${mediaQueries("100", "480", "portrait")`
          margin-left: 0;
          align-self: center;
    `}
`;
