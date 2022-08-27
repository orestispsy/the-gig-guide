import styled, { css } from "styled-components";
import { mediaQueries } from "../../common/mediaQueries";

const common = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 0 100vh rgba(223, 0, 0, 0.36);
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  animation: fadeAbout 3s ease-in-out;
`

export const BanContainer = styled.div`
    ${common}
    justify-content: center;

    box-shadow: inset 0 0 0 100vh rgba(0, 0, 0, 0.705);
`;

export const BanBox = styled.div`
    background-color: rgba(0, 0, 0, 0.705);
    color: yellow;
    font-family: "Black Ops One";
    font-size: 3vmax;
    text-align: center;
    height: 100%;
    width:50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: inherit;
    animation: fadeAbout 1.5s ease-in-out;
`;

export const BanText = styled.span`
    font-size: 2vmax;
    color: cyan;
    font-family: "Poller One", cursive;
    width: 75%;
    margin: 0.2vmax 0;
`;

export const BanTextFocus = styled.h1`
    color: crimson;
    margin-top: 1vmax;
    font-size: 2vmax;
`;

export const Timer = styled.div`
    font-family: "Black Ops One", cursive;
    color: cyan;
    font-size: 4vmax;
    animation: blinkerTextCyan 1s infinite;
    animation-delay: 0.5s;
    width: 75%;
    height: 100px;
`;


export const BlockContainer = styled.div`
    ${common}
`;


export const BlockText = styled.div`
    font-family: "Ultra", serif !important;
    font-size: 3vmax;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10vh;
    width: 50vw;
    height: 40vh;
    animation: fadeAbout 3s step-end;
    text-align: center;
`;

