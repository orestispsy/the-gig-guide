import styled, { css } from "styled-components";
import { mediaQueries } from "../../../../common/mediaQueries";

type Types = {
  color?: string;
  reveal?: boolean;
  wide?: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1vmax 2vmax;

  ${mediaQueries("273", "1024", "landscape")`
          width: 22vmax;
    `}

  ${mediaQueries("100", "480", "portrait")`
          margin-top: 1vmax;
          width: 26vmax;
    `}
`;

export const Title = styled.div`
  color: rgba(255, 255, 255, 0.418);
  text-align: center;
  font-size: 2vmax;
  margin: 0 0 1vmax 0;

  ${mediaQueries("100", "480", "portrait")`
          font-size: 3vmax;
          margin-bottom: 2vmax;
    `};
`;

export const SubTitle = styled.div`
  font-size: 1.2vmax;
  color: yellow;

  ${mediaQueries("100", "480", "portrait")`
          font-size: 2vmax;
    `};

  ${mediaQueries("273", "1024", "landscape")`
          font-size: 1.5vmax;
    `}
`;

export const Input = styled.input`
  border: 1px;
  text-align: center;
  outline: transparent;
  border-radius: 100px;
  width: 14vmax;
  height: 1.7vmax;
  color: orangered;
  margin: 0 0 1vmax 0;
  background-color: rgba(51, 255, 0, 0.103);
  border-radius: unset;
  box-shadow: -0 0 3px rgba(0, 0, 0, 0.054), 0 -0 3px rgba(0, 0, 0, 0.054),
    -0 -0 3px rgba(0, 0, 0, 0.054), -0 -0 3px rgba(0, 0, 0, 0.054);

  ${mediaQueries("100", "480", "portrait")`
          height: 4vmax;
          width: 20vmax;
          font-size: 2vmax;
          margin-bottom: 2vmax;
    `};

  ${mediaQueries("273", "1024", "landscape")`
          height: 3vmax;
          width: 18vmax;
          font-size: 1.5vmax;
    `}
`;

export const Error = styled.div<Types>`
  font-family: "BlackOpsOne";
  font-size: 1vmax;
  color: tomato;
  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
  text-align: center;
  margin: 0 0 1vmax 0;
  animation: 3s linear infinite blinkerBan;

  ${(props) =>
    props.wide &&
    css`
      width: 20vmax;
    `}
`;

export const PasswordWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EyeIcon = styled.div<Types>`
  width: 1.7vmax;
  margin-left: 0.5vmax;
  filter: invert(100%);
  cursor: pointer;
  ${(props) =>
    (props.reveal &&
      css`
        height: 1.1vmax;
        background-image: url("/passToggler.png");
        background-size: contain;
        background-repeat: no-repeat;
        align-self: flex-start;

        margin-top: 0.2vmax;
        padding: 0.1vmax 0.2vmax;

        ${mediaQueries("100", "480", "portrait")`
                        width: 4vmax !important;
                        height: 4vmax !important;
                        margin: -1vmax 0 1.5vmax 0.5vmax !important;
    `};

        ${mediaQueries("273", "1024", "landscape")`
                        width: 4vmax !important;
                        height: 4vmax !important;
                        margin: 0 0 1.5vmax 0.5vmax !important;
    `}
      `) ||
    css`
      height: 1.7vmax;
      background-image: url("/passTogglerNOT.png");
      background-size: cover;
      padding: 0.1vmax 0.2vmax;
      margin-top: -1.1vmax;

      ${mediaQueries("100", "480", "portrait")`
                        width: 4vmax !important;
                        height: 4vmax !important;
    `};

      ${mediaQueries("273", "1024", "landscape")`
                        width: 4vmax !important;
                        height: 3.5vmax !important;
                        margin: 1vmax 0 1vmax 0.5vmax !important;
    `}
    `}
`;

export const Confirm = styled.div`
  font-family: "BlackOpsOne";
  color: white;
  text-shadow: -0 0 3px rgba(0, 0, 0, 0.154), 0 -0 3px rgba(0, 0, 0, 0.154),
    -0 -0 3px rgba(0, 0, 0, 0.154), -0 -0 3px rgba(0, 0, 0, 0.154);
  background-color: #00ffbf;
  cursor: pointer;
  padding: 0.3vmax;

  &:hover {
    color: yellow;
  }

  ${mediaQueries("100", "480", "portrait")`
           font-size: 2vmax;
            padding: 0.5vmax;
    `};

  ${mediaQueries("273", "1024", "landscape")`
           margin: 1vmax;
    `}
`;
