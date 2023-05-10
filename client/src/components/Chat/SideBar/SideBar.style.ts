import styled, { css } from "styled-components";
import { mediaQueries } from "../../.../../../common/mediaQueries";

type Types = {
  dark?: boolean;
  emojiBar?: boolean;
  private?: boolean;
  mobileConfigOpen?: boolean;
};

export const Wrapper = styled.div<Types>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  ${mediaQueries(
    "landscape",
    css`
      align-self: center;
      padding-top: 2vmax;
      margin-bottom: 0;
    `
  )}

  ${(props) =>
    props.emojiBar &&
    css`
      margin-bottom: -3vmax;
      ${mediaQueries(
        "portrait",
        css`
          margin-bottom: 0;
        `
      )}
    `}

         ${(props) =>
    props.mobileConfigOpen &&
    css`
      ${mediaQueries(
        "portrait",
        css`
          height: 100%;
        `
      )}
    `}

                    ${(props) =>
    props.private &&
    css`
      margin-bottom: -2vmax;
      margin-left: 1vmax;
      ${mediaQueries(
        "portrait",
        css`
          height: unset;
          margin-left: 0;
        `
      )}
    `}
`;

export const Container = styled.div<Types>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  box-shadow: -0 0 10px rgba(0, 0, 0, 0.308), 0 -0 10px rgba(0, 0, 0, 0.308),
    -0 -0 10px rgba(0, 0, 0, 0.308), -0 -0 10px rgba(0, 0, 0, 0.308);
  margin-left: 1vmax;

  background-color: rgba(255, 0, 0, 0.158);
  border-radius: 10px;
  padding: 2vmax 1vmax 2vmax 1vmax;

  min-height: fit-content;

  ${mediaQueries(
    "landscape",
    css`
      align-self: center;
      padding-top: 2vmax;
      margin-bottom: 0;
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      margin-top: 3vmax;
      margin-left: 0;
      justify-content: center;
      border-radius: 2vh;
      width: 95%;
      height: 70vh;
      padding: 0vmax;
      background-color: rgba(116, 7, 7, 0.158);
    `
  )}

    ${(props) =>
    props.dark &&
    css`
      background-color: rgba(113, 255, 212, 0.021);
      border: 1px solid rgba(255, 255, 255, 0.13);

      ${mediaQueries(
        "portrait",
        css`
          border: 1px solid rgba(255, 255, 255, 0.281);
          background-color: rgba(113, 255, 212, 0.021);
        `
      )}
    `}

          ${(props) =>
    props.private &&
    css`
      ${mediaQueries(
        "portrait",
        css`
          height: unset;
        `
      )}
      box-shadow: -0 0 10px rgba(0, 0, 0, 0.308),
                0 -0 10px rgba(0, 0, 0, 0.308), -0 -0 10px rgba(0, 0, 0, 0.308),
                -0 -0 10px rgba(0, 0, 0, 0.308);
    `}
                ${(props) =>
    !props.mobileConfigOpen &&
    css`
      ${mediaQueries(
        "portrait",
        css`
          display: none;
        `
      )}
    `}
`;
