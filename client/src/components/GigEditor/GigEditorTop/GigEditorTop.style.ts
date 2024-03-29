import styled, { css } from "styled-components";
import { mediaQueries } from "../../../common/mediaQueries";

import {
  CloseButton as MasterCloseButton,
  CloseButtonWrapper as MasterCloseButtonWrapper,
} from "../../GigCreator/GigCreator.style";

type Types = {};

export const Select = styled.select`
  background-color: rgba(0, 0, 0, 0.144);
  border-radius: 100px;
  font-family: "PollerOne";
  color: white;
  font-size: 1vmax;
  padding: 0.5vmax;
  width: 40vw;
  margin-bottom: 0.5vmax;
  border: 2px solid black;
  outline: none;

  ${mediaQueries(
    "portrait",
    css`
      width: 100% !important;
      font-size: 1.5vmax;
    `
  )};
`;

export const Option = styled.option`
  font-size: 1vmax;
  color: orangered;
`;

export const CloseButton = styled(MasterCloseButton)`
  ${mediaQueries(
    "landscape",
    css`
      margin: 0 0 0.5vmax 0 !important;
    `
  )}
`;

export const CloseButtonWrapper = styled(MasterCloseButtonWrapper)`
  margin: -2vmax 0;
`;
