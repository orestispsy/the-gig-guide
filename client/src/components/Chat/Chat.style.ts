import styled, { css } from "styled-components";
import { mediaQueries } from "../../common/mediaQueries";

type Types = {
  dark?: boolean;
  private?: boolean;
  mobileConfigOpen?: boolean;
  isMobileToggler?: boolean;
};

export const Container = styled.div<Types>`
  display: flex;
  flex-direction: row;
  align-self: center;
  margin-bottom: auto;

  ${mediaQueries(
    "landscape",
    css`
      height: 88%;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      flex-direction: column;
      width: 100%;
      height: 92%;
    `
  )}

          ${(props) =>
    props.mobileConfigOpen &&
    css`
      ${mediaQueries(
        "portrait",
        css`
          height: 90%;
        `
      )}
    `}
`;

export const MobileChat = styled.div<Types>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${mediaQueries(
    "portrait",
    css`
      flex-direction: column;
    `
  )}

  ${(props) =>
    props.private &&
    css`
      ${mediaQueries(
        "portrait",
        css`
          flex-direction: column-reverse;
          height: unset;
        `
      )}
    `}
`;

export const Jukebox = styled.div`
  position: fixed;
  bottom: 2.3vmax;
  right: 1.7vmax;
  width: 3vmax;
  height: 2.5vmax;
  background-size: cover;
  background-image: url("/jukebox.png");
  cursor: pointer;

  &:hover {
    animation: shake 0.2s;
  }

  ${mediaQueries(
    "portrait",
    css`
      height: 4vmax;
      width: 5vmax;
      bottom: 3.5vmax;
    `
  )}
`;

export const TickerToggler = styled.div`
  position: fixed;
  right: 2vmax;
  bottom: 0.5vmax;
  cursor: pointer;
  color: white;
  font-family: "PressStart2P";
  font-size: 0.7vmax;
  width: 3vmax;

  &:hover {
    text-shadow: -0 0 10px rgba(255, 0, 0, 0.37),
      0 -0 10px rgba(255, 0, 0, 0.37), -0 -0 10px rgba(255, 0, 0, 0.37),
      -0 -0 10px rgba(255, 0, 0, 0.37);
  }

  ${mediaQueries(
    "portrait",
    css`
      font-size: 1vmax;
      right: 4vmax;
    `
  )}
`;

export const ThemeToggler = styled.div<Types>`
  background-image: url("/darkMode.png");
  border-radius: 50%;
  width: 3vmax;
  height: 3vmax;
  background-size: cover;
  position: fixed;
  left: 1vmax;
  bottom: 0.5vmax;
  cursor: pointer;
  transition: 0.5s;
  box-shadow: -0 0 5px rgba(0, 0, 0, 0.2), 0 -0 5px rgba(0, 0, 0, 0.2),
    -0 -0 5px rgba(0, 0, 0, 0.2), -0 -0 5px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: rotate(-360deg);
    transition: 1s;
  }

  ${(props) =>
    props.dark &&
    css`
      background-image: url("/lightMode.png");
      transition: 1s;
      box-shadow: none;
      border-radius: none;
      &:hover {
        transform: rotate(360deg);
        transition: 2s;
      }
    `}

  ${mediaQueries(
    "portrait",
    css`
      width: 5vmax;
      height: 5vmax;
    `
  )}

    
  ${mediaQueries(
    "landscape",
    css`
      width: 5vmax;
      height: 5vmax;
    `
  )}
`;

export const MobileToggler = styled.div<Types>`
  display: none;
  margin-top: 2vmax;
  padding: 1vmax 4vmax;
  background: #00000026;
  border-radius: 3vh;

  &:after {
    content: "Panel";
    font-size: 3vmax;
    color: #ffffffcc;
    letter-spacing: 2px;
    text-shadow: 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black;
  }

  ${(props) =>
    props.mobileConfigOpen &&
    css`
      &:after {
        content: "Close";
      }
    `}
  ${(props) =>
    props.private &&
    css`
      display: none !important;
    `}
    ${(props) =>
    props.dark &&
    css`
      &:after {
        text-shadow: none;
        color: rgba(255, 255, 255, 0.418);
      }
    `}

        
  ${mediaQueries(
    "portrait",
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `
  )};
`;
