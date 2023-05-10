import styled, { css } from "styled-components";
import { mediaQueries } from "../../../../common/mediaQueries";

type Types = {
  reply?: boolean;
  block?: boolean;
};

export const BlogEntry = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1vh;
  width: 55vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.205);
  background-color: #00000082;
  padding: 0.5vmax;
  border-radius: 1vh;

  ${mediaQueries(
    "portrait",
    css`
      width: 70vw;
    `
  )}
`;

export const EntryCount = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.233);
  text-indent: 0.3vmax;
  color: #ffd900a1;
  font-size: 1vmax;
`;

export const Number = styled.span``;

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
      align-items: flex-start;
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
