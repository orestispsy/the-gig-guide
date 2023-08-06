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
  skyIsLoaded?: boolean;
  aboutBackIsLoaded?: boolean;
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

export const AboutBackground = styled.img<AppLayoutTypes>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: fadeAbout 2s ease-in-out;
  visibility: hidden;

  ${(props) =>
    props.aboutBackIsLoaded &&
    css`
      visibility: visible;
      animation: fadeIntroColorRewind 1.5s ease-in-out, fadeIn 1s ease-in-out;
    `}
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
  height: 100%;
  width: 100%;

  ${mediaQueries(
    "landscape",
    css`
      background-position-y: 15%;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      background-color: rgba(0, 0, 0, 0.116);
    `
  )}
`;

export const GeneralAppContainer = styled.div<AppLayoutTypes>`
  ${(props) =>
    (props.timelineMode &&
      css`
        ${AppContainerDark}
      `) ||
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
      visibility: hidden;
    `}

    ${(props) =>
    props.loaded &&
    css`
      visibility: visible;
      animation: fadeAbout 1s ease-in-out;
    `}
`;

export const Road = styled.img<AppLayoutTypes>`
  z-index: -1;
  position: absolute;
  visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  width: 100%;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;

  ${(props) =>
    props.loaded &&
    css`
      animation: fadeAbout 1s ease-in-out;
    `}

  ${(props) =>
    props.skyIsLoaded &&
    !props.aboutMode &&
    !props.gigListOpen &&
    !props.adminControls &&
    !props.maps &&
    !props.timelineMode &&
    !props.darkMode &&
    props.loaded &&
    css`
      visibility: visible;
    `}
`;

export const Sky = styled.img<AppLayoutTypes>`
  z-index: -2;
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  visibility: hidden;
  height: 100%;
  width: 100%;
  min-width: 100%;
  object-fit: cover;

  ${(props) =>
    props.loaded &&
    css`
      visibility: visible;
      animation: fadeAbout 1.5s ease-in-out;
    `}
`;
