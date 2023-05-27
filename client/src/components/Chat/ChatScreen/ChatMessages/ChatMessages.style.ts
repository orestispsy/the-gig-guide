import styled, { css } from "styled-components";
import { mediaQueries } from "../../../../common/mediaQueries";

type Types = {
  dark?: boolean;
  left?: boolean;
  exit?: boolean;
  private?: boolean;
};

export const Wrapper = styled.div`
  margin: 0 10px 10px 10px;
  background-color: rgba(255, 255, 255, 0.027);
`;

export const PostContainer = styled.div`
  color: yellow;
  font-family: "PollerOne";
  font-size: 20px;
  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
  letter-spacing: 0.15vmax;
  margin: 0;

  a {
    color: black;
    font-family: none;
    font-size: 20px;
    text-decoration: underline;
    text-shadow: none;
    font-weight: bold;
    margin-right: 5px;
  }
`;

export const Message = styled.div<Types>`
  user-select: text;
  overflow-wrap: break-word;
  font-family: "Ultra";
  font-size: 1.2vmax;

  ${(props) =>
    props.private &&
    css`
      color: rgb(255, 255, 255);
    `}

  img {
    position: relative;
    left: 40%;
    max-height: 10vmax;
    max-width: 8vmax;
    margin: 1vmax;
    margin-left: auto;
    margin-right: auto;

    ${mediaQueries(
      "portrait",
      css`
        max-height: 14vmax;
        max-width: 10vmax;
        left: 37%;
      `
    )}
  }

  ${mediaQueries(
    "portrait",
    css`
      font-size: 1.5vmax;
    `
  )}
`;

export const UserDetails = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-start;
  align-self: flex-start;

  ${mediaQueries(
    "landscape",
    css`
      font-size: 2vmax;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      font-size: 3vmax;
    `
  )}
`;

export const Avatar = styled.img`
  user-select: none;
  width: 2.2vmax;
  height: 2.2vmax;
  border-radius: 0.5vmax;

  ${mediaQueries(
    "landscape",
    css`
      width: 4vmax;
      height: 4vmax;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      width: 5vmax;
      height: 5vmax;
    `
  )}
`;

export const Nickname = styled.h1`
  user-select: text;
  margin-left: 0.5vmax;
  color: rgb(255, 64, 64);
  font-family: "BlackOpsOne";
  font-size: 2vmax;
  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
  overflow: hidden;

  ${mediaQueries(
    "portrait",
    css`
      font-size: 3.5vmax;

      &:hover {
        word-break: break-all;
      }
    `
  )}
`;

export const Delete = styled.div`
  filter: contrast(150%);
  background-image: url("./delete.png");
  background-size: cover;
  width: 0.8vmax;
  height: 0.8vmax;
  margin-top: -2.2vmax;
  mix-blend-mode: hard-light;
  cursor: pointer;
  margin-left: -0.2vmax;

  ${mediaQueries(
    "landscape",
    css`
      margin-top: -2vmax;
      width: 1.2vmax;
      height: 1.2vmax;
      padding: 0.1vmax;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      margin-top: -3vmax;
      width: 1.2vmax;
      height: 1.2vmax;
      padding: 0.1vmax;
    `
  )}

    &:hover {
    transform: scale(1.2);
  }
`;

export const Date = styled.div<Types>`
  color: rgba(0, 0, 0, 0.692);
  letter-spacing: 1px;
  text-align: right;
  font-size: 0.5vmax;
  text-shadow: none;

  ${(props) =>
    props.dark &&
    !props.private &&
    css`
      color: rgba(255, 255, 0, 0.692);
    `}

  ${(props) =>
    props.private &&
    props.dark &&
    css`
      color: rgba(255, 255, 0, 0.692);
    `}

  ${mediaQueries(
    "portrait",
    css`
      font-size: 0.6vmax;
    `
  )}
`;

export const Time = styled.div<Types>`
  color: rgba(255, 255, 255, 0.719);
  letter-spacing: 1px;
  text-align: right;
  font-size: 0.8vmax;
  ${(props) =>
    props.private &&
    css`
      text-shadow: none;
    `}

  ${mediaQueries(
    "portrait",
    css`
      font-size: 0.9vmax;
    `
  )}
`;

export const UserStatus = styled.div<Types>`
  font-size: 1vmax !important;
  color: rgba(255, 251, 0, 0.671) !important;
  margin: 5px !important;
  text-align: center !important;
  background-color: rgba(255, 0, 0, 0.267);
  padding: 0.5vmax;
  height: 1.5vmax;
  align-self: center;
  border-radius: 2vh;
  animation: fadeAbout 0.5s ease-in-out;

  ${(props) =>
    props.left &&
    css`
      color: rgba(51, 255, 0, 0.719) !important;
      background-color: rgba(0, 0, 0, 0.192);
    `}

  ${(props) =>
    props.exit &&
    css`
      color: rgba(0, 132, 255, 0.671) !important;
      background-color: rgba(255, 0, 0, 0);
    `}
`;
