import styled, { css } from "styled-components";
import { mediaQueries } from "../../../../common/mediaQueries";

type Types = {
  reply?: boolean;
  block?: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserActions = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 48vw;
`;

export const DeleteEntry = styled.div`
  color: red;
  margin-right: 1vmax;
`;

export const ArrowUp = styled.div`
  background-image: url("/blogUp.png");
  width: 0.8vmax;
  height: 0.8vmax;
  background-size: cover;
  filter: invert(100%);
  margin-right: 0.5vmax;
`;

export const ButtonText = styled.span``;
