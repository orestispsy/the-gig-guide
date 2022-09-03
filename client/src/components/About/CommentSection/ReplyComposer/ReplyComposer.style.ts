import styled, { css } from "styled-components";

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
