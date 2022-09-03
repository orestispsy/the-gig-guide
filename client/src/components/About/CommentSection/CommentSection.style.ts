import styled, { css } from "styled-components";
import { mediaQueries } from "../../../common/mediaQueries";

type Types = {
    reply?: boolean;
    block?: boolean;
};

const scrollConfig = css`
    &::-webkit-scrollbar-thumb {
        background: #0000004d;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #3b46014d;
    }

    &::-webkit-scrollbar {
        width: 20px;
    }

    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.075);
        border-radius: 10px;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1vmax 0;
    background-color: rgba(255, 255, 255, 0.13);
    padding: 1vh;
    margin: 1vmax 4vmax 2vmax 6vmax;
    width: 60vw;
    border-radius: 1vh;
    border: 1px solid black;
    resize: none;
    color: white;
    text-shadow: -1px 1px 0 rgba(0, 0, 0, 0.5), 1px -1px 0 rgba(0, 0, 0, 0.5),
        -1px -1px 0 rgba(0, 0, 0, 0.5), 1px 1px 0 rgba(0, 0, 0, 0.5);
    letter-spacing: 2px;
    font-size: 1vmax;

    ${scrollConfig}

    ${mediaQueries("100", "480", "portrait")`
        margin: 0;
        align-self: center;
        width: 82vw;
    `}
`;

export const BlogEntryContainer = styled.div<Types>`
    padding-top: 0.5vmax;

    ${(props) =>
        props.reply &&
        css`
            display: flex;
        `}
`;

export const BlogEntry = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1vh;
    width: 55vw;
    border-bottom: 1px solid rgba(0, 0, 0, 0.205);
    background-color: #00000082;
    padding: 0.5vmax;
    border-radius: 1vh;

    ${mediaQueries("100", "480", "portrait")`
         width: 70vw;
    `}
`;

export const EntryCount = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.233);
    text-indent: 0.3vmax;
    color: #ffd900a1;
    font-size: 1vmax;
`;

export const Number = styled.span`
`;

export const UserDetails = styled.div<Types>`
    display: flex;
    font-size: 1.7vmax;
    color: #ffd900a1;
    text-shadow: -1px 1px 10px rgba(255, 255, 255, 0.2),
        1px -1px 10px rgba(255, 255, 255, 0.2),
        -1px -1px 10px rgba(255, 255, 255, 0.2),
        1px 1px 10px rgba(255, 255, 255, 0.2);

    ${(props) =>
        props.reply &&
        css`
            flex-direction: column;
            align-items:flex-start;
        `}
`;

export const UserName = styled.span`
    background-color: rgba(184, 22, 22, 0.151);
`;

export const UserLinks = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const GoTo = styled.a`
    color: #ffd900a1 !important;
    margin: 0 0 0 0.5vmax;
    font-size: 0.7vmax !important;

    &:hover {
        color: white !important;
    }
`;

export const Text = styled.div<Types>`
    overflow-wrap: break-word;
    color: white;
    font-size: 1.5vmax;
    text-shadow: -1px 1px 10px rgba(255, 255, 255, 0.2),
        1px -1px 10px rgba(255, 255, 255, 0.2),
        -1px -1px 10px rgba(255, 255, 255, 0.2),
        1px 1px 10px rgba(255, 255, 255, 0.2);

    ${(props) =>
        props.reply &&
        css`
            font-size: 1.5vmax;
        `}
`;

export const UserActions = styled.div`
    margin: 0.5vmax;
    background-color: rgb(0 225 255 / 8%);
    margin-left: 2vh;
    width: 52vw;
    padding: 0.5vmax;
    border-radius: 1vh;
`;

export const ReplyBox = styled.div`
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.233);
    color: #ffd900a1;
    text-indent: 0.3vmax;
    display: flex;
    justify-content: space-between;
    width: 50vw;
    font-size: 1vmax;
`;

export const ReplyTitle = styled.span`
    background-color: transparent;
`;

export const Delete = styled.span`
    color: red;
    justify-self: flex-end;
    background-color: transparent !important;
    font-size: 1vmax;
`;

export const WriteReply = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ReplyUserActions= styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 48vw;
`;

export const DeleteEntry = styled.div`
    color: red;
    margin-right: 1vmax;
`;

export const ReplyButtonBack = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ReplyButton = styled.div<Types>`
    display: flex;

    &:hover {
        color: #ffd900a1;
    }

    ${(props) =>
        props.block &&
        css`
            cursor: not-allowed;
            color: white;
            &:hover {
                color: white;
            }
        `}
`;

export const ArrowUp = styled.div`
    background-image: url("/blogUp.png");
    width: 0.8vmax;
    height: 0.8vmax;
    background-size: cover;
    filter: invert(100%);
    margin-right: 0.5vmax;
`;

export const ButtonText = styled.span`
`;


export const ReplyTextArea = styled.textarea`
    background-color: rgba(0, 0, 0, 0.144);
    border: 1px solid rgba(0, 0, 0, 0.247);
    border-radius: 1vh;
    width: 50vw;
    resize: none;
    outline: none;
    margin-bottom: 1vmax;
    color: white;

   &::placeholder {
        color: rgba(255, 208, 0, 0.418);
    }
`;

export const NewEntryToggler = styled.div`
    text-align: center;
    cursor: pointer;
    margin-top: -1vmax;
    margin-bottom: 1vmax;

    &:hover {
        color: #ffd900a1;
    }

    ${mediaQueries("100", "480", "portrait")`
            margin: 0;
    `}
`;