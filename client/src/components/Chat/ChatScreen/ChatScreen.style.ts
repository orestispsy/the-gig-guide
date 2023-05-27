import styled, { css } from "styled-components";
import { mediaQueries } from "../../../common/mediaQueries";

type Types = {
  dark?: boolean;
  horn?: boolean;
  shake?: boolean;
  private?: boolean;
  mobileConfigOpen?: boolean;
  emojiBar?: boolean;
};

export const Container = styled.div<Types>`
  position: relative;
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

  ${mediaQueries(
    "landscape",
    css`
      align-content: center;
      min-height: fit-content;
      height: fit-content;
      margin-top: 0;
      width: 65vw;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      width: fit-content;
      padding: 2vmax;
    `
  )}

     ${(props) =>
    props.dark &&
    css`
      background: none;
      border: 1px solid rgba(255, 255, 255, 0.171);

      ${mediaQueries(
        "landscape",
        css`
          border: 2px solid rgba(255, 255, 255, 0.178);
        `
      )}

      ${mediaQueries(
        "portrait",
        css`
          border: 1px solid rgba(255, 255, 255, 0.479);
        `
      )}
    `}

      ${(props) =>
    props.mobileConfigOpen &&
    css`
      ${mediaQueries(
        "portrait",
        css`
          display: none;
        `
      )}
    `}
`;

export const Headline = styled.div<Types>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  height: 6vmax;

  ${mediaQueries(
    "landscape",
    css`
      width: 64vw;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      width: 88vw;
    `
  )}

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
      ${mediaQueries(
        "portrait",
        css`
          color: white;
          text-shadow: none;
        `
      )}
    `}

  ${(props) =>
    props.private &&
    css`
      color: white;
      margin: 0;
      text-shadow: none;
    `}

  ${mediaQueries(
    "portrait",
    css`
      font-size: 5vmax;
    `
  )}
`;

export const MainChatBack = styled.div<Types>`
  width: 100%;

  ${(props) =>
    props.horn &&
    props.shake &&
    css`
      animation: shake 1s;
    `}

  ${mediaQueries(
    "portrait",
    css`
      height: 100%;
    `
  )}
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

  ${mediaQueries(
    "landscape",
    css`
      min-height: 0vmax;
      height: 40vh;
      width: 58vw;
      border-radius: 3vh;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      height: 50vh;
      width: 78vw;
      margin-bottom: 0.5vmax;
    `
  )}

     ${(props) =>
    props.private &&
    css`
      ${mediaQueries(
        "portrait",
        css`
          height: 42vh !important;
        `
      )}
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
      ${mediaQueries(
        "portrait",
        css`
          border: 1px solid rgba(255, 255, 255, 0.479);
        `
      )}
      ${mediaQueries(
        "landscape",
        css`
          border: 2px solid rgba(255, 255, 255, 0.178);
        `
      )}
    `}

             ${(props) =>
    props.emojiBar &&
    css`
      ${mediaQueries(
        "portrait",
        css`
          height: 33vh;
        `
      )}
    `}
`;
