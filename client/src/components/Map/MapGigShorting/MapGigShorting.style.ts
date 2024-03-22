import styled, { css } from "styled-components";
import { mediaQueries } from "../../../common/mediaQueries";

type Types = {
  isTriggered?: boolean;
  gigsCounting?: boolean;
  ref?: any;
};

export const CloseBox = styled.div`
  background-image: url("closeIcon.png");
  background-size: cover;
  width: 1.5vmax;
  height: 1.5vmax;
  cursor: pointer;
  filter: invert(100%);

  &:hover {
    filter: invert(0%);
  }

  ${mediaQueries(
    "portrait",
    css`
      width: 2.5vmax;
      height: 2.5vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      width: 2.5vmax;
      height: 2.5vmax;
    `
  )}
`;

export const GigSortingBox = styled.span<Types>`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  font-size: 1.5vmax;
  color: white;
  text-align: right;
  font-family: "DarkerGrotesque";
  margin: 0 20px;
  text-shadow: -0 0 5px black, 0 -0 5px black, -0 -0 5px black, -0 -0 5px black;

  ${(props) =>
    props.isTriggered &&
    css`
      ${mediaQueries(
        "portrait",
        css`
          bottom: 3vmax;
        `
      )}
    `}
`;

export const BoxContent = styled.div`
  width: 70vw;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  align-items: center;
`;

export const YearInput = styled.input<Types>`
  z-index: 1000;
  background-color: transparent;
  border-radius: 100px;
  border: 0;
  font-family: "PollerOne";
  color: orangered;
  font-size: 1vmax;
  padding: 0.5vmax;
  width: 100% !important;
  animation: fadeAbout 0.5s ease-in-out;

  &::-webkit-slider-thumb {
    background: #000000dc !important;
    border: 1px solid #ffffffb9 !important;
    height: 20px !important;
    width: 20px !important;
    border-radius: 50% !important;
  }

  &::-webkit-slider-runnable-track {
    background: #beb4b454 !important;
  }

  &::-webkit-slider-runnable-track {
    height: 5px !important;
  }

  &::-webkit-slider-thumb {
    margin-top: -7px !important;
  }

  ${mediaQueries(
    "portrait",
    css`
      width: 90% !important;
      justify-self: center;

      &::-webkit-slider-runnable-track {
        height: 20px !important;
      }

      &::-webkit-slider-thumb {
        height: 40px !important;
        width: 40px !important;
        margin-top: -10px !important;
      }

      &::-ms-thumb {
        height: 40px !important;
        width: 40px !important;
      }
    `
  )}

  ${(props) =>
    props.gigsCounting &&
    css`
            cursor: progress !important;

            &::-webkit-slider-runnable-track {
                cursor: progress !important;
            }
             &::-webkit-slider-thumb {{
                cursor: progress !important;
            }
        `}
          }
`;

export const YearInputTrigger = styled.div`
  font-size: 1.5vmax;
  font-family: "DarkerGrotesque";
  min-width: 50px;
  background-image: url("arrowUpMap.png");
  width: 3vmax;
  height: 3vmax;
  background-size: cover;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    transform: translateY(-0.5vmax);
    filter: invert(100%);
    transition: 0.5s;
  }

  ${mediaQueries(
    "landscape",
    css`
      margin-bottom: 0.7vmax;
    `
  )}
`;

export const Year = styled.div`
  color: white;
  font-size: 1.5vmax;
  font-family: "Bangers";
  letter-spacing: 0.5px;
  margin: 0 5px 0 10px;
  min-width: 50px;
  animation: fadeAbout 0.5s ease-in-out;

  ${mediaQueries(
    "portrait",
    css`
      font-size: 2.5vmax;
    `
  )}
  ${mediaQueries(
    "landscape",
    css`
      font-size: 2.5vmax;
    `
  )}
`;

export const Reset = styled.div<Types>`
  color: white;
  font-size: 1.5vmax;
  font-family: "Bangers";
  letter-spacing: 0.5px;
  margin: 0 5px 0 10px;
  cursor: pointer;
  animation: fadeAbout 0.5s ease-in-out;
  text-align: start;

  ${mediaQueries(
    "portrait",
    css`
      font-size: 2.5vmax;
    `
  )}
  ${mediaQueries(
    "landscape",
    css`
      font-size: 2.5vmax;
    `
  )}

    
    ${(props) =>
    props.gigsCounting &&
    css`
      cursor: progress;
    `}
`;

export const LoadingDotAnimation = styled.div`
  animation: blinkerLoading 1s infinite ease-in-out;
  font-family: "Bangers";

  & span {
    margin-left: 5px;
    font-size: 1.7vmax;
    color: rgb(220, 20, 60);
    text-shadow: -1px 1px 0 yellow, 1px -1px 0 yellow, -1px -1px 0 yellow,
      1px 1px 0 yellow;
  }
`;

export const CloseGigCounter = styled.div`
  background-image: url("closeIcon.png");
  background-size: cover;
  width: 1.5vmax;
  height: 1.5vmax;
  cursor: pointer;
  filter: invert(100%);

  &:hover {
    filter: invert(0%);
  }

  ${mediaQueries(
    "portrait",
    css`
      width: 2.5vmax;
      height: 2.5vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      width: 2.5vmax;
      height: 2.5vmax;
    `
  )}
`;

export const GigCounterBox = styled.span`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 1.5vmax;
  z-index: 666;
  color: white;
  text-align: right;
  font-family: "Bangers";
  letter-spacing: 0.5px;
  margin: 0 20px;
  text-shadow: -0 0 5px black, 0 -0 5px black, -0 -0 5px black, -0 -0 5px black;
  ${mediaQueries(
    "portrait",
    css`
      font-size: 2vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      font-size: 2vmax;
    `
  )}
`;

export const GigCounter = styled.span`
  min-width: 2.5vmax;
  color: rgb(220, 20, 60);
  text-shadow: -1px 1px 0 yellow, 1px -1px 0 yellow, -1px -1px 0 yellow,
    1px 1px 0 yellow;

  ${mediaQueries(
    "portrait",
    css`
      margin-left: 10px;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      margin-left: 10px;
    `
  )}
`;


export const Dates = styled.div`
    position: absolute;
    width: 100%;
    height: 5px;
    margin-top: -4vmax;
`;

export const Date = styled.div`
  width: 3vmax;
  height: 1.5vmax;
  background-color: white;
`;

export const InputWrapper = styled.div`
position: relative
   
`;
