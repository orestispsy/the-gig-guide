import styled, { css } from "styled-components";
import { mediaQueries } from "../../../../common/mediaQueries";

type Types = {
  color: string;
};

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-self: center;
  align-items: center;
  width: 15vw;
  margin-bottom: 0.5vmax;

  ${mediaQueries("273", "1024", "landscape")`
          width: 22vmax;
    `}

  ${mediaQueries("100", "480", "portrait")`
          flex-direction: row;
          margin-top: 1vmax;
          width: 26vmax;
    `}
`;

export const ConfigButton = styled.div`
  background-image: url("/superAdmin.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 4vmax;
  height: 4vmax;
  cursor: pointer;
  transform: rotate(0.15turn);
  transition: 1s;

  &:hover {
    transform: rotate(0.1turn);
    transition: 1s;
  }

  ${mediaQueries("273", "1024", "landscape")`
            width: 6.5vmax;
            height: 6.5vmax;
    `}

  ${mediaQueries("100", "480", "portrait")`
            width: 7vmax;
            height: 7vmax;
    `}
`;

export const NetworkButton = styled.div`
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
  transition: 0.5s;

  &:hover {
    box-shadow: -0 0 10px rgba(0, 0, 0, 0.432), 0 -0 10px rgba(0, 0, 0, 0.432),
      -0 -0 10px rgba(0, 0, 0, 0.432), -0 -0 10px rgba(0, 0, 0, 0.432);
    transition: 0.5s;
  }

  ${mediaQueries("273", "1024", "landscape")`
            width: 5vmax !important;
            height: 5vmax !important;
            box-shadow: -0 0 10px rgba(255, 255, 255, 0.432),
                0 -0 10px rgba(255, 255, 255, 0.432),
                -0 -0 10px rgba(255, 255, 255, 0.432),
                -0 -0 10px rgba(255, 255, 255, 0.432);
    `}

  ${mediaQueries("100", "480", "portrait")`
            width: 6vmax !important;
            height: 6vmax !important;
            box-shadow: -0 0 10px rgba(255, 255, 255, 0.432),
              0 -0 10px rgba(255, 255, 255, 0.432),
              -0 -0 10px rgba(255, 255, 255, 0.432),
              -0 -0 10px rgba(255, 255, 255, 0.432);
    `}
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

  ${mediaQueries("273", "1024", "landscape")`
              width: 5vmax !important;
    height: 5vmax !important;
    `}

  ${mediaQueries("100", "480", "portrait")`
              width: 6vmax !important;
    height: 6vmax !important;
    `}
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

  ${mediaQueries("273", "1024", "landscape")`
             padding: 2vmax;
    `}

  ${mediaQueries("100", "480", "portrait")`
              padding: 2vmax;
    `}
`;
