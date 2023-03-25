import styled, { css } from "styled-components";
import { mediaQueries } from "../../../common/mediaQueries";

type Types = {
};


export const BottomWrapper = styled.div`
    margin: 1vmax 0;
        ${mediaQueries("100", "480", "portrait")`
           margin: 1vmax 0;
    `};
`;

export const Delete = styled.div`
    color: rgb(255, 0, 0);
    border-radius: 100px;
    border: 2px solid rgb(253, 68, 0);
    font-family: "PollerOne";
    outline: transparent;
    cursor: pointer;
    background-color: white;
    padding: 0.5vmax;
    margin-top: 0.5vmax;

    ${mediaQueries("100", "480", "portrait")`
           width: 100% !important;
           height: 3vmax;
           font-size: 2vmax;
           margin: 0 1vmax;
    `};

    ${mediaQueries("273", "1024", "landscape")`
    margin: 0 0 0.5vmax 0 !important;
    `}
`;

export const DeleteWarn = styled.div`
    color: white;
    background-color: lime;
    border-radius: 10vh;
    padding: 0.5vmax;
    font-size: 15px;
    border: 2px solid white;
    cursor: pointer;

    ${mediaQueries("100", "480", "portrait")`
           width: 100% !important;
           height: 3vmax;
           font-size: 2vmax;
    `};

    &:hover {
        background-color: black;
        color: lime;
    }
`;

export const DeleteSuccess = styled.div`
    background-color: transparent;
    background-image: url("redBall.gif");
    background-size: cover;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    padding: 0.7vmax;
    margin-bottom: 1vmax;
`;

