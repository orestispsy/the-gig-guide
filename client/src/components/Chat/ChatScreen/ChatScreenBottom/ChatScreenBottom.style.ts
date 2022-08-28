import styled, { css } from "styled-components";
import { mediaQueries } from "../../../../common/mediaQueries";

type Types = {
  dark?: boolean;
  mute?: boolean;
  private?: boolean;
};

export const Container = styled.div<Types>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;

  ${mediaQueries("273", "1024", "landscape")`
       width: 60vw;
    justify-content: space-evenly;
    `}

  ${mediaQueries("100", "480", "portrait")`
       width: 80vw;
    `}

     ${(props) =>
    props.private &&
    css`
      margin: 1vmax 0;
    `}
`;

export const TypeLine = styled.textarea.attrs({ className: "chatTypeLine" })`
  width: 27vmax;
  height: 1.4vmax;
  resize: none;
  outline: none;
  white-space: nowrap;
  overflow-x: hidden;
  font-size: 0.9vmax;
  border-radius: 10vh;
  padding-left: 0.5vmax;
  padding-top: 0.2vmax;
  background-color: rgba(255, 255, 255, 0.058);
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
  border: 1px solid #ffffff52;

  &:focus {
    transition: 1s;
    border-color: transparent;
    background-color: rgba(255, 255, 255, 0.108) !important;
    box-shadow: -0 0 2px rgba(255, 255, 255, 0.308),
      0 -0 2px rgba(255, 255, 255, 0.308), -0 -0 2px rgba(255, 255, 255, 0.308),
      -0 -0 2px rgba(255, 255, 255, 0.308);
  }

  ${mediaQueries("273", "1024", "landscape")`
       min-height: 3vmax;
    font-size: 2vmax;
    padding-left: 1.3vmax;
    width: 40vmax;
    margin-right: 0.5vmax;
    border-radius: 3vh;
  }
    `}

  ${mediaQueries("100", "480", "portrait")`
    padding-left: 1.7vmax;
    height: 3vmax;
    font-size: 2vmax;
    min-width: 40vw;
    `}
`;

export const SendMsg = styled.div<Types>`
  background-image: url("/send.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 1.8vmax;
  height: 1vmax;
  align-self: center;
  margin-left: 0.5vmax;
  margin-right: 2vmax;
  cursor: pointer;
  filter: invert(0%);

  &:hover {
    filter: invert(100%);
  }

  ${mediaQueries("273", "1024", "landscape")`
       width: 2vmax;
    height: 2vmax;
    padding-right: 1vmax;
    padding-left: 1vmax;
  }
    `}

  ${mediaQueries("100", "480", "portrait")`
     min-width: 3.5vmax;
    min-height: 2.2vmax;
    margin-left: 1vmax;
    `}

         ${(props) =>
    props.dark &&
    css`
      filter: invert(100%);
      &:hover {
        filter: invert(0%);
      }
    `}
`;

export const ChatControls = styled.div`
  border-radius: 10vh;
  width: fit-content;
  height: fit-content;
  box-shadow: inset 0 0 0 100vh rgba(0, 217, 255, 0.103),
    -0 0 5px rgba(209, 255, 4, 0.308), 0 -0 5px rgba(0, 0, 0, 0.308),
    -0 -0 5px rgba(0, 0, 0, 0.308), -0 -0 5px rgba(0, 0, 0, 0.308);
  margin: 0.5vmax;
  margin-right: 0.5vmax;

  &:hover {
    box-shadow: inset 0 0 0 100vh rgba(44, 255, 2, 0.253),
      -0 0 5px rgba(209, 255, 4, 0.308), 0 -0 5px rgba(0, 0, 0, 0.308),
      -0 -0 5px rgba(0, 0, 0, 0.308), -0 -0 5px rgba(0, 0, 0, 0.308);
  }
`;

export const SoundConfig = styled.div<Types>`
  width: 1.5vmax;
  height: 1.5vmax;
  cursor: pointer;
  background-image: url("/mute.png");
  background-size: cover;
  margin: 0.5vmax;

  ${(props) =>
    props.mute &&
    css`
      background-image: url("/play.png");
    `}

  ${mediaQueries("273", "1024", "landscape")`
    width: 3vmax;
    height: 3vmax;
  }
    `}

    ${mediaQueries("100", "480", "portrait")`
     width: 4vmax;
    height: 4vmax;
    `}
`;

export const EmojisToggler = styled.div`
  background-image: url("/styles.png");
  background-position: center;
  background-size: cover;
  width: 2.5vmax;
  height: 2.5vmax;
  margin: 0.5vmax;
  margin-bottom: 1vmax;
  cursor: pointer;

  &:hover {
    animation: shake 1s;
  }

  ${mediaQueries("273", "1024", "landscape")`
        width: 5vmax;
    height: 5vmax;
    margin-left: 1vmax;
  }
    `}

  ${mediaQueries("100", "480", "portrait")`
     min-width: 5vmax;
    min-height: 5vmax;
    margin-left: 1vmax;
    `}
`;
