import styled, { css } from "styled-components";
import { mediaQueries } from "../../../common/mediaQueries";

type Types = {
  dark?: boolean;
  horn?: boolean;
  shake?: boolean;
  private?: boolean;
};

export const Container = styled.div<Types>`
  animation: fadeAbout 0.5s ease-in-out;
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  box-shadow: -0 0 10px rgba(0, 0, 0, 0.308), 0 -0 10px rgba(0, 0, 0, 0.308),
    -0 -0 10px rgba(0, 0, 0, 0.308), -0 -0 10px rgba(0, 0, 0, 0.308);
  border-radius: 1vh;
  margin-top: 3vmax;
  background: radial-gradient(
    closest-side,
    #05303380,
    #e08216c2,
    #ff6767,
    #b1151542
  );

  ${mediaQueries("273", "1024", "landscape")`
    align-content: center;
    min-height: fit-content;
    height: fit-content;
    margin-top: 0;
    width: 65vw;
    `}

  ${mediaQueries("100", "480", "portrait")`
    height: fit-content;
    width: fit-content;
    padding: 0 1vmax 1vmax 1vmax;
    `}

     ${(props) =>
    props.dark &&
    css`
      background: none;
      border: 1px solid rgba(255, 255, 255, 0.171);

      ${mediaQueries("273", "1024", "landscape")`
    border: 2px solid rgba(255, 255, 255, 0.178);
    `}

      ${mediaQueries("100", "480", "portrait")`
      border: 1px solid rgba(255, 255, 255, 0.479);
    `}
    `}
`;

export const Headline = styled.div<Types>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  height: 6vmax;

  ${mediaQueries("273", "1024", "landscape")`
     width: 64vw;
    `}

  ${mediaQueries("100", "480", "portrait")`
     width: 88vw;
    `}

     ${(props) =>
    props.dark &&
    css`
      background: radial-gradient(
        closest-side,
        rgba(59, 255, 255, 0.055),
        rgba(59, 255, 255, 0.055),
        transparent
      );
    `}
`;

export const Title = styled.div<Types>`
  font-size: 4vmax;
  color: rgb(255, 0, 0);
  text-shadow: -1px 1px 0 white, 1px -1px 0 white, 1px 1px 0 white,
    -1px -1px 0 white;
  font-family: "BlackOpsOne";

  ${(props) =>
    props.dark &&
    css`
      color: rgb(0, 0, 0);
    `}

  ${(props) =>
    props.private &&
    css`
      color: white;
      margin: 0;
      text-shadow: none;
    `}
`;

export const MainChatBack = styled.div<Types>`
  width: 100%;

  ${(props) =>
    props.horn &&
    props.shake &&
    css`
      animation: shake 1s;
    `}
`;

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

export const MainChat = styled.div<Types>`
  ${scrollConfig}

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  height: 60vh;
  background-color: rgba(255, 255, 255, 0.11);
  overflow-y: auto;
  scrollbar-color: rgba(255, 255, 0, 0.39) rgba(172, 255, 104, 0.075);
  color: yellowgreen;
  box-shadow: inset 0 0 0 100vh rgba(30, 255, 0, 0.164),
    -0 0 10px rgba(0, 0, 0, 0.308), 0 -0 10px rgba(0, 0, 0, 0.308),
    -0 -0 10px rgba(0, 0, 0, 0.308), -0 -0 10px rgba(0, 0, 0, 0.308);
  border-radius: 1vh;
  margin: 0 2vmax 0 2vmax;

  ${mediaQueries("273", "1024", "landscape")`
          min-height: 0vmax !important;
          height: 40vh !important;
          width: 60vw !important;
          border-radius: 3vh !important;
    `}

  ${mediaQueries("100", "480", "portrait")`
          height: 27vh !important;
          width: 80vw !important;
          margin-bottom: 0.5vmax !important;
    `}

         ${(props) =>
    props.dark &&
    css`
      background: radial-gradient(
        closest-side,
        rgba(59, 255, 255, 0.055),
        rgba(59, 255, 255, 0.055),
        rgba(59, 255, 255, 0.055),
        transparent
      );
      box-shadow: none;
      border: 1px solid rgba(255, 255, 255, 0.171);
      ${mediaQueries("100", "480", "portrait")`
           border: 1px solid rgba(255, 255, 255, 0.479);
    `}
      ${mediaQueries("273", "1024", "landscape")`
             border: 2px solid rgba(255, 255, 255, 0.178);
    `}
    `}
`;
