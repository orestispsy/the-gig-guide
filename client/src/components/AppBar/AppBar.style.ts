import styled, { css } from "styled-components";
import { mediaQueries } from "../../common/mediaQueries";

type AppBarTypes = {
  chatMode: boolean;
  private: boolean;
  chat: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
  font-size: 20px;
  height: 8%;
  width: 100%;

  ${mediaQueries(
    "landscape",
    css`
      z-index: 1;
      height: 12%;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      z-index: 1;
    `
  )}
`;

export const BarLeftSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ProfileImage = styled.img`
  width: 3vmax;
  height: 3vmax;
  background-size: cover;
  border-radius: 50%;
  margin-left: 0.5vmax;
  background-color: rgb(255, 255, 255);
  cursor: default;
  box-shadow: -0 0 5px rgba(0, 0, 0, 0.2), 0 -0 5px rgba(0, 0, 0, 0.2),
    -0 -0 5px rgba(0, 0, 0, 0.2), -0 -0 5px rgba(0, 0, 0, 0.2);

  &:hover {
    animation: 1.1s linear infinite blinker2;
  }

  ${mediaQueries(
    "landscape",
    css`
      width: 4.5vmax;
      height: 4.5vmax;
      margin-top: 0.5vmax;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      width: 6vmax;
      height: 6vmax;
    `
  )}
`;

export const ChatToggler = styled.div<AppBarTypes>`
  background-image: url("/chat.png");
  background-position: center;
  background-size: cover;
  width: 1.5vmax;
  height: 1.5vmax;
  margin-left: -1vmax;
  margin-bottom: -2vmax;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: -0 0 3px rgba(0, 0, 0, 0.1), 0 -0 3px rgba(0, 0, 0, 0.1),
    -0 -0 3px rgba(0, 0, 0, 0.1), -0 -0 3px rgba(0, 0, 0, 0.1);
  &:hover {
    transition: 1s;
    filter: hue-rotate(360deg);
  }

  ${mediaQueries(
    "landscape",
    css`
      width: 2.5vmax;
      height: 2.5vmax;
      margin-left: -1vmax;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      width: 3vmax;
      height: 3vmax;
    `
  )}

     ${(props) =>
    props.private &&
    css`
      background-image: url("/newMsg.png") !important;
      animation: shake 0.5s, privateNotifier 4s infinite ease-in-out,
        blinkerBoxYellow 3s ease-in-out !important;
    `}

             ${(props) =>
    props.chat &&
    !props.chatMode &&
    css`
      animation: 1.1s linear infinite blinker2, shake 0.5s;
    `}
`;

export const Nickname = styled.div`
  color: white;
  font-size: 30px;
  margin-left: 10px;

  ${mediaQueries(
    "portrait",
    css`
      font-size: 3vmax;
    `
  )}
`;

export const WebLink = styled.a``;

export const Logo = styled.div`
  background-image: url("/logo2.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 18vmax;
  height: 5vmax;
  margin-top: -1vmax;
  margin-left: -3vmax;

  ${mediaQueries(
    "portrait",
    css`
      width: 25vmax;
      height: 8vmax;
      margin: 0;
    `
  )}
`;

export const NavButtonWrapper = styled.div`
  cursor: pointer;
`;
export const NavButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 3px solid white;
  padding: 0.3vmax;
  width: 2vmax;
  height: 2vmax;
  margin: 0 1vmax;

  &:hover {
    animation: 1.5s linear infinite blinker2, bounceDesc 2s infinite linear;
    border-color: transparent;
  }

  ${mediaQueries(
    "portrait",
    css`
      width: 4vmax;
      height: 4vmax;
      z-index: 2;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      margin: 0.5vmax 1vmax 0 0;
      z-index: 2;
      width: 3vmax;
      height: 3vmax;
    `
  )}
`;

export const Arrow = styled.div`
  border-radius: 50%;
  font-size: 3vmax;
  color: white;
  background-image: url("/arrowUp.png");
  background-size: cover;
  width: 0.7vmax;
  height: 0.7vmax;
  filter: invert(100%);
  padding: 0.3vmax;
  margin: 0;

  ${mediaQueries(
    "portrait",
    css`
      width: 2vmax;
      height: 2vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      width: 1.3vmax;
      height: 1.3vmax;
    `
  )}
`;
