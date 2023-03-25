import styled, { css } from "styled-components";
import { mediaQueries } from "../../common/mediaQueries";

type FormTypes = {
};

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    font-size: 25px;
    color: orangered;
    max-height: 90vh;
    width: 55vw;
    margin-bottom: 1vmax;

    ${mediaQueries("100", "480", "portrait")`
        width: 55vw;
        flex-wrap: unset;
        flex-direction: column;
            justify-content: flex-start;
    `};

    ${mediaQueries("273", "1024", "landscape")`
        width: 70vw;
    `};
`;
