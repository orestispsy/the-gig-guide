import styled, { css } from "styled-components";
import { mediaQueries } from "../../../common/mediaQueries";

type Types = {
  block?: boolean;
};

export const TextArea = styled.textarea`
  padding: 1vh;
  margin: 1vmax 4vmax 2vmax 6vmax;
  width: 60vw;
  border-radius: 1vh;
  background-color: rgba(255, 255, 255, 0.295);
  border: 1px solid black;
  resize: none;
  color: white;
  min-height: 40vh;
  text-shadow: -1px 1px 0 rgba(0, 0, 0, 0.5), 1px -1px 0 rgba(0, 0, 0, 0.5),
    -1px -1px 0 rgba(0, 0, 0, 0.5), 1px 1px 0 rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
  font-size: 1vmax;

  ${mediaQueries("100", "480", "portrait")`
        margin: 0;
        align-self: center;
        width: 82vw;
    `}
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-evenly;

  ${mediaQueries("100", "480", "portrait")`
           margin-top: 1vmax !important;
    `}
`;

export const InputBack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  background-color: white;
  text-align: center;
  outline: transparent;
  border-radius: 100px;
  width: 14vmax;
  height: 1.7vmax;
  color: orangered;
  box-shadow: -0 0 4px black, 0 -0 4px black, -0 -0 4px black, -0 -0 4px black;
  margin: 0 1vmax;
  background-color: black;
  border: 1px solid rgba(255, 255, 255, 0.445);

  &::placeholder {
    color: rgba(255, 208, 0, 0.418);
  }
`;

export const Required = styled.div`
  color: orangered;
  font-size: 0.7vmax;
`;

export const SendContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SendButton = styled.div<Types>`
  text-align: center;
  cursor: pointer;
  margin-bottom: 1vmax;
  width: max-content;

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

export const CommentToggler = styled.div`
    width: 60vw;
    margin: 2vh 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export const Close = styled.div`
  &:hover{
    color:crimson;
  }
`;
