import styled, { css } from "styled-components";
import { mediaQueries } from "../../common/mediaQueries";
import { Link } from "react-router-dom";

type AboutTypes = {
  isLoaded: boolean;
};

export const Container = styled.div`
  color: yellow;
  width: 90%;
  height: 92%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeAbout 1s step-end;
  position: relative;

  ${mediaQueries(
    "landscape",
    css`
      height: 88%;
    `
  )}
`;

export const BackSwitcher = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  text-shadow: none;
  font-size: 25px;
  font-family: "Bangers";
  letter-spacing: 2px;
  color: rgb(220, 20, 60);
  text-shadow: -1px 1px 0 yellow, 1px -1px 0 yellow, -1px -1px 0 yellow,
    1px 1px 0 yellow;
  animation: blinkerLoading 0.5s infinite ease-in-out;
  letter-spacing: 4px;

  ${mediaQueries(
    "portrait",
    css`
      zoom: 1.5;
    `
  )}
`;

export const InnerContainer = styled.div`
  border-radius: 1vh;
  height: 89%;
  width: 99%;
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: auto;
  color: #ffffff;
  z-index: 123;
  font-size: 2vmax;
  font-family: "DarkerGrotesque";
  cursor: pointer;

  ${mediaQueries(
    "portrait",
    css`
      width: unset;
    `
  )}
`;

export const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  width: 85vw;
  position: relative;
`;

export const Logo = styled.div`
  background-image: url("/logo2.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 18vmax;
  height: 5vmax;
`;

export const LogoText = styled.div`
  margin: -1.3vmax 0 0 3.4vmax;
  width: max-content;
  color: white;
  font-size: 2vmax;
  font-family: "DarkerGrotesque";
`;

export const GoToStart = styled(Link)`
  display: flex;
  flex-direction: column;
  width: max-content;
`;

const scrollConfig = css`
  &::-webkit-scrollbar-thumb {
    background: #fffb002f;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #d7e6056b;
  }

  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.075);
    border-radius: 10px;
  }
`;

export const AboutBody = styled.div`
  margin: 2vh 0 0 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  ${scrollConfig}

  ${mediaQueries(
    "landscape",
    css`
      height: 88%;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      height: 100%;
      width: 90vw;
      align-items: unset;
    `
  )}
`;

export const Background = styled.div<AboutTypes>`
  box-shadow: -0 0 10px rgba(0, 0, 0, 0.332), 0 -0 10px rgba(0, 0, 0, 0.332),
    -0 -0 10px rgba(0, 0, 0, 0.332), -0 -0 10px rgba(0, 0, 0, 0.332);
  border-radius: 1vh;
  position: relative;
  width: 99%;
  height: 97%;

  ${(props) =>
    !props.isLoaded &&
    css`
      transition: 0.3s;
      filter: blur(2px);
      background-color: rgba(255, 255, 255, 0.05);
    `}

  ${mediaQueries(
    "portrait",
    css`
      height: 100%;
    `
  )}
`;

export const Cover = styled.img<AboutTypes>`
  filter: hue-rotate(15deg) sepia(0.95) brightness(1.3) contrast(2);
  border-radius: 1vh;
  width: 100%;
  height: 100%;
  opacity: 50%;
  object-fit: cover;
  background-repeat: no-repeat;
  display: flex;
  visibility: hidden;

  ${(props) =>
    props.isLoaded &&
    css`
      visibility: visible;
      animation: fadeCover 1s ease-in-out;
    `}
`;
