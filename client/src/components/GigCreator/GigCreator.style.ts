import styled, { css } from "styled-components";
import { mediaQueries } from "../../common/mediaQueries";

type Types = {
    dark?: boolean;
    doneUpdate?: boolean;
    noButton?: boolean;
    editMode?: boolean;
};

import { Form as MasterForm } from "../../common/Components/Form.style";
import { Input as MasterInput } from "./../Login/Login.style";

export const Container = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-bottom: auto;
    width: 100%;
    height: 92%;
    animation: fadeAbout 0.5s ease-in-out;

    ${mediaQueries("100", "480", "portrait")`
        overflow:auto;
    `};

    ${mediaQueries("273", "1024", "landscape")`
         height: 88% !important;
    `}
`;

export const Content = styled.div<Types>`
    box-shadow: -0 0 5px rgba(0, 0, 0, 0.432), 0 -0 5px rgba(0, 0, 0, 0.432),
        -0 -0 5px rgba(0, 0, 0, 0.432), -0 -0 5px rgba(0, 0, 0, 0.432);
    background-color: rgba(255, 211, 66, 0.137);
    border-radius: 1vh;
    height: fit-content;
    display: flex;
    flex-direction: column;

    ${mediaQueries("100", "480", "portrait")`
               width: 80vw !important;
    display: flex;
    flex-wrap: wrap;
    `};

    ${mediaQueries("273", "1024", "landscape")`
         margin: 10px 0;
    `}

    ${(props) =>
        props.dark &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-position-x: 50%;
            background-position-y: 35%;
            background-image: url("stickyLogo.png");
            background-repeat: no-repeat;
            background-size: contain;
            border: 1px solid rgba(255, 255, 255, 0.11);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.616);
        `}
`;

export const CloseButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    width: 55vw;
    margin-bottom: -4vmax;
    z-index: 2;

    ${mediaQueries("100", "480", "portrait")`
          width: 80vw;
    `};

    ${mediaQueries("273", "1024", "landscape")`
          width: 70vw;
    `}
`;

export const CloseButton = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    margin: 1vmax;
    align-self: flex-end;
    background: linear-gradient(
        112.72013189013455deg,
        rgba(7, 240, 170, 0.13) 4.927083333333334%,
        rgba(75, 189, 30, 0.123) 97.84374999999999%
    );
    color: yellow;
    font-size: 1vmax;
    font-family: "BlackOpsOne";
    width: 2vmax;
    height: 2vmax;
    border-radius: 10vh;
    box-shadow: -0 0 5px rgba(0, 0, 0, 0.133), 0 -0 5px rgba(0, 0, 0, 0.133),
        -0 -0 5px rgba(0, 0, 0, 0.133), -0 -0 5px rgba(0, 0, 0, 0.133);
    border: 1px solid rgba(255, 230, 0, 0.37);
    border-style: double;
    transition: 1s;

    cursor: pointer;
    text-shadow: -0 0 5px rgba(0, 0, 0, 0.7), 0 -0 5px rgba(0, 0, 0, 0.7),
        -0 -0 5px rgba(0, 0, 0, 0.7), -0 -0 5px rgba(0, 0, 0, 0.7);

    &:hover {
        box-shadow: -0 0 10px rgba(255, 208, 0, 0.205),
            0 -0 10px rgba(255, 208, 0, 0.205),
            -0 -0 10px rgba(255, 208, 0, 0.212),
            -0 -0 10px rgba(255, 208, 0, 0.178);
        background: linear-gradient(
            112.72013189013455deg,
            rgba(224, 247, 135, 1) 4.927083333333334%,
            rgba(78, 227, 250, 1) 97.84374999999999%
        );

        transition: 1s;
    }

    &:active {
        box-shadow: -0 0 15px rgba(255, 208, 0, 0.205),
            0 -0 15px rgba(255, 208, 0, 0.205),
            -0 -0 15px rgba(255, 208, 0, 0.205),
            -0 -0 15px rgba(255, 208, 0, 0.205);
        color: rgba(255, 208, 0, 0.541);
        text-shadow: none;
    }

    ${mediaQueries("100", "480", "portrait")`
         font-size: 1.25vmax;
            width: 2vmax;
    height: 2vmax;
    `};

    ${mediaQueries("273", "1024", "landscape")`
        font-size: 1.25vmax;
            width: 2vmax;
    height: 2vmax;

    `}
`;

export const Form = styled(MasterForm)`
    ${mediaQueries("100", "480", "portrait")`
        width: 80%;
    `};
`;

export const Title = styled.h1`
    width: 42vw;
    text-align: center;
    font-size: 3vmax;
    color: rgb(255, 255, 255);
    margin: 1.5vmax 0;
    border-bottom: 2px solid tomato;
    padding: 1vmax;

    ${mediaQueries("100", "480", "portrait")`
            width: 60vw !important;
               font-size: 4vmax;
               margin: 1vmax 0;
    `};
`;

export const FormContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 5vmax;
    justify-items: center;
    width: 70%;

    ${mediaQueries("100", "480", "portrait")`
             grid-template-columns: 1fr;
                 width: 100%;
    `};
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 100%;

    &:focus-within {
        background-color: rgba(0, 0, 0, 0.151);
        border-radius: 1vh;
        transition: 0.5s;
    }

    ${mediaQueries("100", "480", "portrait")`
                width: 100%;
    `};
`;

export const InputLabel = styled.span`
    font-size: 2.5vmax;
    text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
        -1px -1px 0 black;

    ${mediaQueries("100", "480", "portrait")`
       font-size: 3.5vmax;
    `};
`;

export const Input = styled(MasterInput)`
    margin-bottom: 3vh;
    height: 3vmax;

    ${mediaQueries("100", "480", "portrait")`
     margin-bottom: 2vh;
      height: 5vmax;
      width: 100%;
    `};
`;

export const CoordinatesSection = styled.div<Types>`
    display: grid;
    grid-template-columns: 2.5fr 3fr;
    width: 85%;

    ${(props) =>
        !props.noButton &&
        props.editMode &&
        css`
            grid-template-columns: 2.5fr 2.5fr;
        `}

    ${mediaQueries("100", "480", "portrait")`
          grid-template-columns: 1fr;
              width: 100%;
    `};
`;

export const FlipperWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    ${mediaQueries("100", "480", "portrait")`
    flex-direction: column-reverse;
    `};
`;

export const CoordinatesRightContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 4vmax;
    cursor: pointer;

    ${mediaQueries("100", "480", "portrait")`
          margin-top: -1vmax !important;
    margin-bottom: 1vmax !important;
         width: unset;
    `};
`;

export const CoordinatesButtonLabel = styled.div`
    color: rgb(255, 68, 0);
    text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
        -1px -1px 0 black;
    text-align: center;
    font-size: 1vmax;
    width: 5vmax;

    ${mediaQueries("100", "480", "portrait")`
          font-size: 1.2vmax;
          width: unset;
    `};
`;

export const CoordinatesButton = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgb(14, 255, 243);
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    background-image: url("globe.png");
    width: 3vmax;
    height: 3vmax;
    background-size: cover;
    z-index: 2;
    border-radius: 50%;
    filter: invert(70%);

    &:hover {
        box-shadow: -0 0 15px rgb(0, 0, 0, 0.2), 0 -0 15px rgb(0, 0, 0, 0.2),
            -0 -0 15px rgb(0, 0, 0, 0.2), -0 -0 15px rgb(0, 0, 0, 0.2);
    }
`;

export const SubmitButtonWrapper = styled.div<Types>`
    width: 40vw;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    align-self: center;
    margin: 0.5vmax 0;

    ${(props) =>
        props.doneUpdate &&
        css`
            width: unset;
        `}
`;
export const SubmitButton = styled.div`
    text-align: center;
    color: orangered;
    border-radius: 100px;
    border: 2px solid orangered;
    font-family: "PollerOne";
    outline: transparent;
    cursor: pointer;
    background-color: white;
    padding: 0.5vmax;

    &:hover {
        border-color: transparent;
    }

    &:active {
        background-color: orangered;
        color: white;
        border-color: transparent;
    }

    ${mediaQueries("100", "480", "portrait")`
           width: 100% !important;
           height: 3vmax;
           font-size: 2vmax;
    `};
`;

export const Required = styled.p`
    letter-spacing: 0.5px;
    color: orangered;
    font-size: 1vmax;
    margin: 1vh;
    width: 20vw;
    text-align: center;
    text-shadow: -0 0 5px black, 0 -0 5px black, -0 -0 5px black,
        -0 -0 5px black;

    ${mediaQueries("100", "480", "portrait")`
           width: 80vw !important;
    `};
`;

export const Error = styled.p`
    font-family: "BlackOpsOne";
    font-size: 1vmax;
    color: tomato;

    text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
        -1px -1px 0 black;
    text-align: center;
    margin: 1vmax 0 0 0;
    animation: fadeAbout 1.5s ease-in-out;

    ${mediaQueries("100", "480", "portrait")`
             font-size: 1.5vmax;
    `};
`;

export const SubmitSuccess = styled.div`
    background-image: url("rocket.gif");
    background-size: cover;
    width: 45px;
    height: 45px;
    margin-bottom: 1vmax;
`;

export const DoneButton = styled.div`
    border-radius: 100px;
    font-family: "PollerOne";
    outline: transparent;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.103);
    padding: 0.5vmax;

    width: 20vmax;
    text-align: center;
    color: #00ff88;
    font-size: 2vmax;
    margin: -1vmax 0 1vmax 0;

    &:hover {
        color: white;
    }
`;
