import styled, { css } from "styled-components";

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
