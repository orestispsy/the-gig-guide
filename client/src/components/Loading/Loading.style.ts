import styled, { css } from "styled-components";
import { mediaQueries } from "../.../../../common/mediaQueries";

type Types = {
  delayed?: number;
  transition?: boolean;
  percentage?: number;
  shouldLoad?: boolean | 0 | undefined;
  noDots?: boolean;
};

export const LoadingContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  color: white;
  font-size: 3vmax;
  animation: appFadeIn 2s ease-in-out;
  background-color: #00000075;
  z-index: 666;
`;

export const Box = styled.div<Types>`
  position: absolute;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  z-index: 666;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  animation: rotate 15s linear;
  animation-iteration-count: infinite;

  ${mediaQueries(
    "portrait",
    css`
      zoom: 1.5;
    `
  )}

  ${(props) =>
    props.noDots &&
    css`
      display: none;
    `}
`;

export const Dot = styled.div<Types>`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 10px #f100c4;
  transition: background-color 1s, top 0.3s, left 0.3s;
  animation: zoom 1s ease-in-out infinite, shrink 1s ease-in-out infinite;
  ${(props) =>
    props.transition &&
    css`
      transition: background-color 1s, top 0s, left 0s;
    `}
  ${(props) =>
    (props.delayed === 0 &&
      css`
        animation-delay: 0s;
        transition: background-color 1s, top 0.15s, left 0.15s;
      `) ||
    (props.delayed &&
      !props.transition &&
      css`
        animation-delay: ${props.delayed * 0.1}s;
      `) ||
    (props.transition &&
      props.delayed &&
      css`
        animation-delay: ${props.delayed * 0.01}s;
      `)}

    @keyframes zoom {
    0% {
      background-color: yellow;
      box-shadow: unset;
    }
    20% {
      z-index: 667;
      background-color: #cd0046;
      box-shadow: 0 0 30px yellow;
    }
    100% {
      background-color: yellow;
      box-shadow: unset;
    }
  }

  @keyframes shrink {
    20% {
      transform: scale(2);
    }
  }

  &:hover {
    transition: background-color 1s;
    transition-timing-function: linear;
  }
`;

export const DotWrapper = styled.div<Types>`
  position: relative;
`;

export const LoadingIntro = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  width: 100vw;
  height: 100vh;
`;

export const LoadingIntroText = styled.div`
  font-size: 25px;
  font-family: "DarkerGrotesque";
  color: white;
  animation: blinkerLoading 1s infinite ease-in-out;
  letter-spacing: 4px;
  ${mediaQueries(
    "portrait",
    css`
      zoom: 1.5;
    `
  )}
`;

export const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
`;

export const Logo = styled.div`
  background-image: url("/logo2.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 250px;
  height: 80px;
  ${mediaQueries(
    "portrait",
    css`
      zoom: 1.5;
    `
  )}
`;

export const LogoText = styled.div`
  margin: -30px 0 0 0;
  width: max-content;
  color: white;
  font-size: 30px;
  font-family: "DarkerGrotesque";
  ${mediaQueries(
    "portrait",
    css`
      zoom: 1.5;
    `
  )}
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 666;
`;

export const LoadingBarWrapper = styled.div<Types>`
  visibility: ${(props) => (props.shouldLoad && `visible`) || `hidden`};
  width: 150px;
  height: 2px;
  background-color: white;
  position: relative;
  margin: 10px 0 -10px 0;
`;

export const LoadingBar = styled.div<Types>`
  height: 2px;
  background-color: white;
  position: absolute;
  width: ${(props) => props.percentage && `${props.percentage}%`};
  transition: 1s;
  background-color: #06bedbed;
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(1 255 161), 0 0 10px rgb(0 255 189),
    0 0 10px rgb(9 255 203 / 43%), 0 0 10px rgb(2 255 166 / 43%);
  left: 0;
  top: 0;
`;
