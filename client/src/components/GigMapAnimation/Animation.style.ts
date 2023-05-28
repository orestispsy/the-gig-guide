import styled, { css } from "styled-components";
import { mediaQueries } from "../../common/mediaQueries";

type Types = {
  delayed?: number;
  isCursorOverList?: boolean;
  city?: any;
  date?: any;
  poster?: any;
  tour_name?: any;
  venue?: any;
  started?: boolean;
};

export const Container = styled.div`
  position: absolute; //test
  display: flex;
  justify-content: center;
  align-items: center;
  height: 92vh;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Gig = styled.div<Types>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -100%;
  margin: 1vmax;

  padding: 1vmax 2vmax;
  border-radius: 1vh;
  z-index: 2;

  ${mediaQueries(
    "portrait",
    css`
      flex-direction: column-reverse !important;
    `
  )}

  @keyframes wars {
    0% {
      bottom: 30%;
      opacity: 0%;
      transform: scale(-1);
    }

    10% {
      opacity: 0%;
      background: transparent;
      box-shadow: none;
    }

    25% {
      bottom: 30%;
      opacity: 100%;
      transform: scale(1.1);
      /* transform: scale(1.2) skew(-3deg); */
      background: #00000054;
      box-shadow: -0 0 50px rgba(0, 0, 0, 0.15), 0 -0 50px rgba(0, 0, 0, 0.15),
        -0 -0 50px rgba(0, 0, 0, 0.15), -0 -0 50px rgba(0, 0, 0, 0.15);
    }
    65% {
      bottom: 30%;
      opacity: 100%;
      transform: scale(1.1);
      /* transform: scale(1.2) skew(-3deg); */
      background: #00000054;
      box-shadow: -0 0 50px rgba(0, 0, 0, 0.15), 0 -0 50px rgba(0, 0, 0, 0.15),
        -0 -0 50px rgba(0, 0, 0, 0.15), -0 -0 50px rgba(0, 0, 0, 0.15);
    }

    80% {
      opacity: 80%;
      bottom: 25%;
      box-shadow: none;
      background: transparent;
    }
    85% {
      opacity: 0%;
    }

    100% {
      bottom: 58%;
      opacity: 0%;
      transform: scale(-1) skew(0deg);
      z-index: 1;
    }
  }

  ${(props) =>
    props.started &&
    css`
      animation: wars 7s ease-in-out;
      transition: 7s;
    `}/* 
    &:hover {
        animation-play-state: paused;
    } */
`;

export const Section = styled.h1`
  text-align: center;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1:nth-child(1) {
    color: white;
    font-family: "Ultra";
    font-size: 2vmax;
    color: white;
    opacity: 70%;
    width: max-content;
  }

  h1:nth-child(2) {
    color: yellow;
    font-size: 4vmax;
    text-shadow: -0 0 10px red, 0 -0 10px red, -0 -0 10px red, -0 -0 10px red;
    line-height: 3vmax;
    margin-bottom: 1vmax;
    width: 35vmax;
  }

  h1:nth-child(3) {
    color: rgba(166, 255, 0, 0.616);
    margin-top: 1vmax;
    font-size: 2vmax;
    text-shadow: -0 0 10px rgba(0, 0, 0, 0.281), 0 -0 10px rgba(0, 0, 0, 0.281),
      -0 -0 10px rgba(0, 0, 0, 0.281), -0 -0 10px rgba(0, 0, 0, 0.281);
    box-shadow: -0 0 10px rgba(0, 0, 0, 0.281), 0 -0 10px rgba(0, 0, 0, 0.281),
      -0 -0 10px rgba(0, 0, 0, 0.281), -0 -0 10px rgba(0, 0, 0, 0.281);
    width: fit-content !important;
    align-self: center;
    padding: 2vmax;
    background-color: rgba(255, 255, 255, 0.11);
    border-radius: 3vh;
    line-height: 2vmax;
  }
`;

export const Poster = styled.div<Types>`
  width: 16vmax;
  height: 16vmax;
  border-radius: 50%;
  box-shadow: -0 0 10px rgba(0, 0, 0, 0.281), 0 -0 10px rgba(0, 0, 0, 0.281),
    -0 -0 10px rgba(0, 0, 0, 0.281), -0 -0 10px rgba(0, 0, 0, 0.281);
  ${(props) =>
    props.poster &&
    css`
      background-image: url(${props.poster});
    `}
  background-size:cover;
  margin: 0 2vmax;

  ${mediaQueries(
    "portrait",
    css`
      margin: 2vmax 0 !important;
    `
  )}
`;

export const Start = styled.div`
  font-family: "DarkerGrotesque";
  color: white;
  font-size: 2vmax;
  cursor: pointer;
  text-shadow: -0 0 10px rgba(229, 255, 0, 0.281),
    0 -0 10px rgba(229, 255, 0, 0.281), -0 -0 10px rgba(229, 255, 0, 0.281),
    -0 -0 10px rgba(229, 255, 0, 0.281);
  animation: blinkerLoading 2s infinite ease-in-out;

  &:hover {
    animation: unset;
  }
`;
