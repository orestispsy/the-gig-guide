import styled, { css } from "styled-components";
import { mediaQueries } from "../../common/mediaQueries";

type Types = {
  commentsMainButton?: boolean;
  sendCommentButton?: boolean;
  goToEntryButton?: boolean;
};

export const SectionButton = styled.div<Types>`
  font-family: "Ultra";

  height: 2vmax;
  font-size: 1.5vmax;
  margin-top: 1vmax;
  text-shadow: -0 0 10px rgba(0, 0, 0, 0.432), 0 -0 10px rgba(0, 0, 0, 0.432),
    -0 -0 10px rgba(0, 0, 0, 0.432), -0 -0 10px rgba(0, 0, 0, 0.432);

  cursor: pointer;
  background: rgba(0, 255, 234, 0.253);

  animation: fadeAbout 1s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #e5ff00;
  padding: 0.5vmax 1vmax;
  border-radius: 10vh;
  box-shadow: -0 0 10px rgba(0, 0, 0, 0.432), 0 -0 10px rgba(0, 0, 0, 0.432),
    -0 -0 10px rgba(0, 0, 0, 0.432), -0 -0 10px rgba(0, 0, 0, 0.432);
  border: 1px solid rgba(255, 230, 0, 0.37);
  border-style: double;
  transition: 1s;

  &:hover {
    color: white;
    box-shadow: -0 0 10px rgba(255, 208, 0, 0.205),
      0 -0 10px rgba(255, 208, 0, 0.205), -0 -0 10px rgba(255, 208, 0, 0.212),
      -0 -0 10px rgba(255, 208, 0, 0.178);
    background: linear-gradient(
      112.72013189013455deg,
      rgba(224, 247, 135, 1) 4.927083333333334%,
      rgba(78, 227, 250, 1) 97.84374999999999%
    );

    transition: 1s;
  }

  &:hover:active {
    box-shadow: -0 0 15px rgba(255, 208, 0, 0.205),
      0 -0 15px rgba(255, 208, 0, 0.205), -0 -0 15px rgba(255, 208, 0, 0.205),
      -0 -0 15px rgba(255, 208, 0, 0.205);
    color: rgba(255, 208, 0, 0.541);
    text-shadow: none;
  }

  ${mediaQueries(
    "portrait",
    css`
      font-size: 1.5vmax !important;
      margin-top: 2vmax !important;
      margin-bottom: 1.5vmax !important;
      padding: 1vmax 1vmax 0.5vmax 1vmax !important;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      justify-content: unset;
      font-size: 1.5vmax !important;
      margin-bottom: 1vmax !important;
      padding: 1vmax 1vmax 0.5vmax 1vmax !important;
    `
  )}

    ${(props) =>
    props.commentsMainButton &&
    css`
      margin-left: 1vmax;
    `}

        
    ${(props) =>
    props.sendCommentButton &&
    css`
      margin-bottom: 1vmax;

      &:hover {
        transition: 0s;
      }

      ${mediaQueries(
        "landscape",
        css`
          text-shadow: -0 0 10px rgba(0, 0, 0, 0.432),
            0 -0 10px rgba(0, 0, 0, 0.432), -0 -0 10px rgba(0, 0, 0, 0.432),
            -0 -0 10px rgba(0, 0, 0, 0.432);
          margin-top: 1.5vmax !important;
        `
      )}
    `}
`;
