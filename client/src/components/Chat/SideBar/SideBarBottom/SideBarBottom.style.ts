import styled, { css } from "styled-components";
import { mediaQueries } from "../../../../common/mediaQueries";

type Types = {
  color?: string;
  isMobileToggler?: boolean;
  mobileConfigOpen?: boolean;
  private?: boolean;
  userConfig?: boolean;
};

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-self: center;
  align-items: center;
  width: 15vw;
  margin-bottom: 0.5vmax;

  ${mediaQueries(
    "landscape",
    css`
      width: 22vmax;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      flex-direction: row;
      margin-top: 1vmax;
      width: 26vmax;
    `
  )}
`;

export const ConfigButton = styled.div<Types>`
  background-image: url("/superAdmin.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 4vmax;
  height: 4vmax;
  cursor: pointer;
  transform: rotate(0.15turn);
  transition: 1s;

  ${mediaQueries(
    "landscape",
    css`
      width: 6.5vmax;
      height: 6.5vmax;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      width: 9vmax;
      height: 9vmax;
    `
  )}

    ${(props) =>
    props.userConfig &&
    css`
      transform: rotate(-0.1turn);
      &:hover {
      }
    `}
`;

export const NetworkButton = styled.div<Types>`
  background-image: url("/network.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-color: rgb(59, 255, 255);
  width: 3.3vmax;
  height: 3.3vmax;
  border-radius: 50%;
  box-shadow: -0 0 10px rgba(255, 255, 255, 0.25),
    0 -0 10px rgba(255, 255, 255, 0.25), -0 -0 10px rgba(255, 255, 255, 0.25),
    -0 -0 10px rgba(255, 255, 255, 0.25);
  cursor: pointer;
  margin: 0 1vmax;
  transition: box-shadow 0.5s;

  &:hover {
    box-shadow: -0 0 10px rgba(0, 0, 0, 0.432), 0 -0 10px rgba(0, 0, 0, 0.432),
      -0 -0 10px rgba(0, 0, 0, 0.432), -0 -0 10px rgba(0, 0, 0, 0.432);
    transition: box-shadow 0.5s;
  }

  ${mediaQueries(
    "landscape",
    css`
      width: 5vmax;
      height: 5vmax;
      box-shadow: -0 0 10px rgba(255, 255, 255, 0.432),
        0 -0 10px rgba(255, 255, 255, 0.432),
        -0 -0 10px rgba(255, 255, 255, 0.432),
        -0 -0 10px rgba(255, 255, 255, 0.432);
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      width: 7vmax;
      height: 7vmax;
      box-shadow: -0 0 10px rgba(255, 255, 255, 0.432),
        0 -0 10px rgba(255, 255, 255, 0.432),
        -0 -0 10px rgba(255, 255, 255, 0.432),
        -0 -0 10px rgba(255, 255, 255, 0.432);
    `
  )}
`;

export const ImageUploaderButton = styled.div`
  background-image: url("/photoc.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 3vmax;
  height: 3vmax;
  outline: 0 !important;
  border: 1px solid rgba(255, 255, 255, 0.452) !important;
  border-radius: 50%;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.377);
  box-shadow: -0 0 10px rgba(0, 0, 0, 0.308), 0 -0 10px rgba(0, 0, 0, 0.308),
    -0 -0 10px rgba(0, 0, 0, 0.308), -0 -0 10px rgba(0, 0, 0, 0.308);

  &:hover {
    transform: scaleX(-1);
  }

  ${mediaQueries(
    "landscape",
    css`
      width: 5vmax !important;
      height: 5vmax !important;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      width: 8vmax !important;
      height: 8vmax !important;
    `
  )}
`;

export const ColorSelector = styled.input<Types>`
  outline: transparent;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("/spectrum.png");
  background-size: cover;
  width: 2vmax;
  height: 2vmax;
  background-color: transparent;
  text-align: center;
  font-size: 1.1vmax;
  padding: 1.35vmax;
  cursor: pointer;
  box-shadow: none;
  margin: 0 0 0 0.5vmax;
  box-shadow: -0 0 6px rgba(0, 0, 0, 0.5), 0 -0 6px rgba(0, 0, 0, 0.5),
    -0 -0 6px rgba(0, 0, 0, 0.5), -0 -0 6px rgba(0, 0, 0, 0.5);
  transition: 1s;

  ${(props) =>
    props.color &&
    css`
      box-shadow: -0 0 10px ${props.color}, 0 -0 10px ${props.color},
        -0 -0 10px ${props.color}, -0 -0 10px ${props.color};
    `}

  &:hover {
    transition: 2s;
    filter: hue-rotate(-380deg);
  }

  ${mediaQueries(
    "landscape",
    css`
      padding: 2vmax;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      padding: 3.3vmax;
      margin-left: 1vmax;
    `
  )}
`;
