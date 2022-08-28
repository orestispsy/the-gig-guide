import styled, { css } from "styled-components";
import { mediaQueries } from "../../common/mediaQueries";

type AppLayoutTypes = {
  loaded?: boolean;
  aboutMode?: boolean;
  gigListOpen?: boolean;
  adminControls?: boolean;
  maps?: boolean;
  timelineMode?: boolean;
  darkMode?: boolean;
};

export const LayoutContainer = styled.div<AppLayoutTypes>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  animation: fadeIntroColor 1.5s ease-in-out;
  background-color: rgba(0, 0, 0, 0.418);

  ${(props) =>
    props.loaded &&
    css`
      animation: fadeIntroColorRewind 1.5s ease-in-out, fadeIn 1s ease-in-out;
      background-color: transparent;
    `}
`;

export const LoadingIntro = styled.div`
  margin-top: 50vh;
  display: flex;
  font-size: 3vmax;
  font-family: "BlackOpsOne";
  color: rgb(220, 20, 60);
  text-shadow: -1px 1px 0 yellow, 1px -1px 0 yellow, -1px -1px 0 yellow,
    1px 1px 0 yellow;
  animation: blinkerLoading 1s infinite ease-in-out;
  letter-spacing: 4px;
`;

export const LoadingIntroText = styled.div``;

export const LoadingIntroDots = styled.div`
  display: flex;
  align-items: flex-end;
  white-space: nowrap;
`;

export const Dot = styled.div`
  visibility: hidden;
`;

export const AboutBackground = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: fadeAbout 2s ease-in-out;
`;

const AppContainerAbout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  height: 100%;
  width: 100%;
  position: relative;
  background-image: none;
`;

const AppContainerDark = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  height: 100%;
  width: 100%;
  box-shadow: inset 0 0 0 100vh rgba(0, 0, 0, 0.65);
  animation: fadeAbout 0.3s ease-in-out;
`;

const AppContainerMap = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  height: 100%;
  width: 100%;
  box-shadow: inset 0 0 0 100vh rgba(0, 0, 0, 0.747);
`;

const AppContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  height: 100%;
  width: 100%;

  ${mediaQueries("273", "1024", "landscape")`
            background-position-y: 15%;
    `}

  ${mediaQueries("100", "480", "portrait")`
            background-color: rgba(0, 0, 0, 0.116);
    `}
`;

export const GeneralAppContainer = styled.div<AppLayoutTypes>`
  ${(props) =>
    (props.aboutMode &&
      css`
        ${AppContainerAbout}
      `) ||
    (props.gigListOpen &&
      css`
        ${AppContainerDark}
      `) ||
    (props.adminControls &&
      css`
        ${AppContainerDark}
      `) ||
    (props.maps &&
      css`
        ${AppContainerMap}
      `) ||
    (props.darkMode &&
      css`
        ${AppContainerDark}
      `) ||
    (!props.darkMode &&
      css`
        ${AppContainer}
      `)}

  ${(props) =>
    !props.loaded &&
    css`
      justify-content: center;
      height: 0;
      visibility: hidden;
    `}

    ${(props) =>
    props.loaded &&
    css`
      visibility: visible;
      animation: fadeAbout 1s ease-in-out;
    `}

    ${(props) =>
    !props.aboutMode &&
    !props.gigListOpen &&
    !props.adminControls &&
    !props.maps &&
    !props.timelineMode &&
    !props.darkMode &&
    css`
      background-image: url("/road.png");
    `}
`;
