import styled, { css } from "styled-components";
import { mediaQueries } from "../../common/mediaQueries";
import { Link } from "react-router-dom";

type Types = {
  finalLoadingCheck?: boolean;
  darkMode?: boolean;
  firstView?: boolean;
  visitors?: number | boolean;
};

export const MainContainer = styled.div<Types>`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  margin-bottom: auto;
  width: 100%;
  height: 92%;
  animation: fadeAbout 0.5s ease-in-out;
  visibility: hidden;

  ${mediaQueries("273", "1024", "landscape")`
        margin-top: -3vmax;
    `}

  ${(props) =>
    props.darkMode &&
    css`
      justify-content: center;
    `}
        
    ${(props) =>
    props.finalLoadingCheck &&
    css`
      visibility: visible;
    `}

            ${(props) =>
    props.firstView &&
    css`
      animation: fadeAbout 2s ease-in-out;
    `}
`;

export const LogoWrapper = styled.div<Types>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: center;
  font-family: "BlackOpsOne";

  ${mediaQueries("100", "480", "portrait")`
        align-items: center !important;
    `}
`;

export const Logo = styled.img<Types>`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 23vmax;
  width: 45vmax;

  ${mediaQueries("100", "480", "portrait")`
        width: 75vmax !important;
        height: 35vmax !important;
    `}

  ${mediaQueries("273", "1024", "landscape")`
        width: 48vmax !important;
        height: 22vmax !important;
    `}

    ${(props) =>
    props.darkMode &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-position-x: 50%;
      background-position-y: 25%;
      position: absolute;
      height: 92%;
      width: 70vh;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.11);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.616);
      padding: 0vmax 5vmax 0 5vmax;
      margin-top: -1vmax;

      ${mediaQueries("100", "480", "portrait")`
        border: none !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        margin-top: -6vmax !important;
        height: 92vmax !important;
        width: 120vw !important;
        padding: 0 9vmax 0 9vmax !important;
    `}

      ${mediaQueries("273", "1024", "landscape")`
        border: none !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        background-size: contain !important;
        height: 100% !important;
    `}
    `}
`;

export const LogoText = styled.p<Types>`
  color: red;
  font-size: 3.5vw;
  letter-spacing: 5px;
  align-self: center;
  margin: -8vh 0 5vh 0;
  animation: blinker 20s linear infinite;
  text-shadow: -0 0 10px black, 0 -0 10px black, -0 -0 10px black,
    -0 -0 10px black;
  padding: 0 1vmax;
  border-radius: 3vw;
  z-index: 2;

  ${mediaQueries("100", "480", "portrait")`
        font-size: 6vmax !important;
        margin: -6vh 0 6vh 0 !important;
    `}

  ${mediaQueries("273", "1024", "landscape")`
        font-size: 3.5vmax !important;
        margin: -6vh 0 6vh 0 !important;
    `}

    ${(props) =>
    props.darkMode &&
    css`
      margin: -4vmax 0 5vmax 0;

      ${mediaQueries("273", "1024", "landscape")`
        padding: 0 !important;
        margin: 20vmax 0 0 0 !important;
    `}
    `}
`;

export const SuperAdminButton = styled(Link)`
  position: fixed;
  right: 10vmax;
  bottom: 1vmax;
`;

export const SuperAdminButtonImage = styled.img`
  width: 4.5vmax;
  height: 3.5vmax;
  background-size: cover;
  transition: 0.5s;

  &:hover {
    width: 5.5vmax;
    height: 4.5vmax;
    transition: 0.5s;
  }

  ${mediaQueries("100", "480", "portrait")`
        width: 6.5vmax !important;
        height: 5.5vmax !important;
    `}

  ${mediaQueries("273", "1024", "landscape")`
        width: 6.5vmax !important;
        height: 5.5vmax !important;
    `}
`;

export const TopRightButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  margin: 0.5vmax 1vmax;
  z-index: 3;
`;

export const TimeLineButton = styled.img`
  width: 2.5vmax;
  height: 2.5vmax;
  background-size: contain;
  margin: 0.2vmax 1vmax 0 1vmax;
  border-radius: 50%;
  border: 1px solid #00ffaa0f;
  &:hover {
    animation: 1s timeline ease-in-out;
  }

  ${mediaQueries("100", "480", "portrait")`
        width: 5vmax !important;
        height: 5vmax !important;
        margin-top: 0 !important;
    `}

  ${mediaQueries("273", "1024", "landscape")`
        width: 5vmax !important;
        height: 5vmax !important;
    `}
`;

export const AboutButton = styled.div`
  border-radius: 50%;

  font-size: 1.5vmax;
  color: white;
  background-image: url("about.png");
  width: 2.3vmax;
  height: 2.3vmax;
  background-size: cover;
  filter: invert(100%);

  box-shadow: -0 0 10px rgba(0, 0, 0, 0.2), 0 -0 10px rgba(0, 0, 0, 0.2),
    -0 -0 10px rgba(0, 0, 0, 0.2), -0 -0 10px rgba(0, 0, 0, 0.2);

  opacity: 80%;

  &:hover {
    box-shadow: -0 0 7px rgba(128, 20, 20, 0.4), 0 -0 7px rgba(128, 20, 20, 0.4),
      -0 -0 7px rgba(128, 20, 20, 0.4), -0 -0 7px rgba(128, 20, 20, 0.4);
    background-color: rgba(128, 20, 20, 0.2);
  }

  ${mediaQueries("100", "480", "portrait")`
        height: 4vmax !important;
        width: 4vmax !important;
    `}

  ${mediaQueries("273", "1024", "landscape")`
        height: 4vmax !important;
        width: 4vmax !important;
    `}
`;

export const BottomRightMenuWrapper = styled.div`
  position: fixed;
  right: 0.5vmax;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BottomRightMenu = styled.div`
  font-family: "BlackOpsOne";
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: rgba(255, 208, 0, 0.815);

  text-shadow: -0 0 5px rgba(0, 0, 0, 0.308), 0 -0 5px rgba(0, 0, 0, 0.308),
    -0 -0 5px rgba(0, 0, 0, 0.308), -0 -0 5px rgba(0, 0, 0, 0.308);

  border-radius: 1vh;
  padding: 0.5vmax;

  text-align: center;
  font-size: 1.5vmax;
`;

export const VisitorsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: -0 0 5px rgba(0, 0, 0, 0.308), 0 -0 5px rgba(0, 0, 0, 0.308),
    -0 -0 5px rgba(0, 0, 0, 0.308), -0 -0 5px rgba(0, 0, 0, 0.308);
  background-color: rgba(0, 0, 0, 0.199);
  padding: 0.5vmax 0.5vmax 0 0.5vmax;
  border-radius: 1vh;
`;

export const VisitorsTitle = styled.div``;

export const VisitorsCount = styled.div<Types>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  text-shadow: 0 0 5px rgba(19, 253, 50, 0.267),
    0 -0 5px rgba(19, 253, 50, 0.267), -0 -0 5px rgba(19, 253, 50, 0.267),
    -0 -0 5px rgba(19, 253, 50, 0.267);
  color: rgba(255, 255, 255, 0.692);
  margin: -0.5vmax 0;
  height: 3vmax;
  border-radius: 1vh;

  ${(props) =>
    props.visitors &&
    css`
      animation: blinkerTextCyan 3s ease-in-out;
    `}
`;

export const LogOut = styled.div`
  border-radius: 1vh;
  margin-top: 0.3vmax;
  font-size: 1.1vmax;
  color: rgb(0, 102, 255);
  cursor: pointer;
  font-family: "BlackOpsOne";
  text-shadow: -0 0 5px black, 0 -0 5px black, -0 -0 5px black, -0 -0 5px black;
  letter-spacing: 1px;

  &:hover {
    color: orangered;
  }
`;
