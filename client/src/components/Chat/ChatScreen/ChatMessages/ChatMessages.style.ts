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
`;

export const UserDetails = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-start;
  align-self: flex-start;

  ${mediaQueries("273", "1024", "landscape")`
       font-size: 2vmax;
    `}

  ${mediaQueries("100", "480", "portrait")`
    font-size: 3vmax;
    `}
`;

export const Avatar = styled.img`
  user-select: none;
  width: 2.2vmax;
  height: 2.2vmax;
  border-radius: 0.5vmax;

  ${mediaQueries("273", "1024", "landscape")`
       width: 4vmax;
    height: 4vmax;
    `}

  ${mediaQueries("100", "480", "portrait")`
     width: 3vmax;
    height: 3vmax;
    `}
`;

export const Nickname = styled.h1`
  user-select: text;
  margin-left: 0.5vmax;
  color: rgb(255, 64, 64);
  font-family: "BlackOpsOne";
  font-size: 2vmax;
  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
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

  ${mediaQueries("273", "1024", "landscape")`
     margin-top: -2vmax;
    width: 1.2vmax;
    height: 1.2vmax;
    padding: 0.1vmax;
    `}

  ${mediaQueries("100", "480", "portrait")`
             margin-top: -3vmax;
    width: 1.2vmax;
    height: 1.2vmax;
    padding: 0.1vmax;
    `}
`;

export const Date = styled.div<Types>`
  color: rgba(0, 0, 0, 0.692);
  letter-spacing: 1px;
  text-align: right;
  font-size: 0.5vmax;

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
      text-shadow: none;
    `}
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
