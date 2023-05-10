import styled, { css } from "styled-components";
import { mediaQueries } from "../../common/mediaQueries";

type FormTypes = {};

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

  ${mediaQueries(
    "portrait",
    css`
      width: 55vw;
      flex-wrap: unset;
      flex-direction: column;
      justify-content: flex-start;
    `
  )};

  ${mediaQueries(
    "landscape",
    css`
      width: 70vw;
    `
  )};
`;
