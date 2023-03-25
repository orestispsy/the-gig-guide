import styled from "styled-components";
import { mediaQueries } from "../../common/mediaQueries";

type Types = {
};

import {
    Container as MasterContainer,
    Content as MasterContent,
    Error as MasterError
} from "../GigCreator/GigCreator.style";

export const Container = styled(MasterContainer)`

    ${mediaQueries("100", "480", "portrait")`
                   overflow-y: auto !important;
                       justify-content: flex-start;
    `};
    ${mediaQueries("273", "1024", "landscape")`
             overflow-y: auto !important;
    `}
`;

export const Content = styled(MasterContent)`
    overflow-y: scroll;
    scrollbar-width: none;
    padding: 2vmax 0 1vmax 0;
    flex-wrap: unset;
    justify-content: flex-start;
    flex-direction: column;

    ${mediaQueries("273", "1024", "landscape")`
        margin: 10px 0;
    `}
`;


export const Error = styled(MasterError)`
    margin: 0;
    text-align: center;
`;

