import styled, { css } from "styled-components";
import { mediaQueries } from "../../../../common/mediaQueries";

type Types = {
  network?: boolean;
  dark?: boolean;
  private?: boolean;
  customColor?: string;
  horn?: string;
  shake?: boolean;
  online?: boolean;
};

export const Container = styled.div<Types>`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  ${mediaQueries(
    "portrait",
    css`
      height: 100%;
      width: 95%;
    `
  )}

  ${(props) =>
    props.private &&
    css`
      ${mediaQueries(
        "portrait",
        css`
          height: unset;
          width: unset;
          flex-direction: row;
        `
      )}
    `}
`;

export const Headline = styled.div<Types>`
  color: rgba(255, 255, 255, 0.418);
  font-size: 2.5vmax;
  text-align: center;
  align-self: center;
  width: auto;
  height: 3vmax;
  ${(props) =>
    props.network &&
    css`
      font-family: BlackOpsOne;
    `}

  ${mediaQueries(
    "portrait",
    css`
      font-size: 4vmax;
      margin: 2vmax 0 2vmax 0;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      margin: 0 0 1vmax 0;
    `
  )}
`;

export const Counter = styled.span`
  align-self: center;
  color: yellow;
  border-radius: 50%;
  border: 1px solid rgba(240, 243, 45, 0.315);
  padding: 0.3vmax;
  min-width: 1.5vmax;
  min-height: 1.5vmax;
  text-align: center;
  font-size: 1.1vmax;
  margin-bottom: -2vmax;
  box-shadow: -0 0 5px rgba(0, 0, 0, 0.308), 0 -0 5px rgba(0, 0, 0, 0.308),
    -0 -0 5px rgba(0, 0, 0, 0.308), -0 -0 5px rgba(0, 0, 0, 0.308);
  background-color: rgba(0, 0, 0, 0.384);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mediaQueries(
    "portrait",
    css`
      min-width: 2.5vmax;
      min-height: 2.5vmax;
      font-size: 2vmax;
      align-self: center;
      padding: 1vmax;
      margin-bottom: -3vmax;
    `
  )}
`;

const scrollConfig = css`
  &::-webkit-scrollbar-thumb {
    background: #96ff592a;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #ffc4015b;
  }

  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(136, 135, 135, 0.253);
    border-radius: 10px;
  }
`;

export const UsersBox = styled.div<Types>`
  width: 22vmax;
  height: 12vmax;
  min-height: 12vh;
  border: 1px double rgba(243, 45, 227, 0.164);
  margin: 1vmax;
  transform: 1s;
  overflow: auto;
  scrollbar-width: 20px;
  scrollbar-color: rgba(255, 255, 0, 0.39) rgba(172, 255, 104, 0.041);
  text-align: center;
  box-shadow: -0 0 5px rgba(0, 0, 0, 0.308), 0 -0 5px rgba(0, 0, 0, 0.308),
    -0 -0 5px rgba(0, 0, 0, 0.308), 0 0 5px rgba(0, 0, 0, 0.308);
  border-radius: 0.5vmax;
  padding-top: 0.7vmax;

  ${scrollConfig}

  ${mediaQueries(
    "portrait",
    css`
      height: 100%;
      height: 50vh;
      width: 90%;
      padding: 0vmax 1vmax;
      display: grid;
      grid-auto-rows: max-content;
    `
  )}

    &:nth-child(1) {
    margin-top: 2vmax !important;
  }

  ${(props) =>
    props.dark &&
    css`
      border-color: rgba(255, 255, 255, 0.13);

      ${mediaQueries(
        "portrait",
        css`
          border: 1px solid rgba(255, 255, 255, 0.281);
        `
      )}
      ${mediaQueries(
        "landscape",
        css`
          border: 2px solid rgba(255, 255, 255, 0.178);
        `
      )}
    `}

  ${(props) =>
    props.private &&
    css`
      margin-top: -2vmax;
      box-shadow: none;
      border: none !important;
      background-color: none;

      ${mediaQueries(
        "portrait",
        css`
          width: unset;
          height: unset;
        `
      )}
    `}
`;

export const User = styled.div`
  cursor: pointer;

  ${mediaQueries(
    "portrait",
    css`
      margin: 0.5vmax 0.3vmax;

      border-bottom: 3px solid white;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `
  )}
`;

export const UserInner = styled.div<Types>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  border-radius: 0.8vh;
  margin: 0 0.3vmax 0.2vmax 0.3vmax;
  border-radius: 2vh;
  min-width: max-content;
  padding: 0.5vmax 0.5vmax 0.5vmax 0.2vmax;
  box-sizing: border-box;

  &:hover {
    background-color: #00ffbf13;
  }

  ${(props) =>
    props.horn &&
    css`
      background-color: #fbff0413;
    `}
`;

export const Crown = styled.div`
  width: 2.5vmax;
  height: 2.5vmax;

  background-image: url("/crown.png");
  background-size: cover;
  margin-left: -2.4vmax;
  margin-top: -3vmax;

  ${mediaQueries(
    "portrait",
    css`
      width: 3vmax;
      height: 3vmax;
      margin: -5vmax 0.5vmax 0 -3vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      margin-top: -3vmax;
      margin: -3vmax 0 0 -2vmax;
    `
  )}
`;

export const UserStatus = styled.div<Types>`
  ${(props) =>
    (props.online &&
      css`
        background: linear-gradient(
          112.72013189013455deg,
          rgba(224, 247, 135, 1) 4.927083333333334%,
          rgb(155, 250, 78) 97.84374999999999%
        );
        border-radius: 50%;
        padding: 0.4vmax;
        box-shadow: -0 0 2px rgba(255, 255, 255, 0.3),
          0 -0 2px rgba(255, 255, 255, 0.3), -0 -0 2px rgba(255, 255, 255, 0.3),
          -0 -0 2px rgba(255, 255, 255, 0.3);
        margin-right: 0.2vmax;
      `) ||
    css`
      background-color: rgba(255, 0, 0, 0.103);
      border-radius: 50%;
      padding: 0.5vmax;
      margin-right: 0.2vmax;
    `}
`;

export const UserDetails = styled.div<Types>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 0.5vmax;

  ${mediaQueries(
    "portrait",
    css`
      margin: 1vmax auto 1vmax 0;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      margin-left: unset;
    `
  )}
    ${(props) =>
    props.shake &&
    css`
      animation: shake 1s;
    `}
`;

export const NetworkUser = styled.div`
  margin-right: 0.2vmax;
`;

export const UserImage = styled.img`
  height: 2.5vmax;
  width: 2.5vmax;
  background-position: center;
  background-size: contain;
  border-radius: 50%;

  box-shadow: -0 0 5px rgba(0, 0, 0, 0.308), 0 -0 5px rgba(0, 0, 0, 0.308),
    -0 -0 5px rgba(0, 0, 0, 0.308), -0 -0 5px rgba(0, 0, 0, 0.308);

  ${mediaQueries(
    "portrait",
    css`
      width: 5vmax;
      height: 5vmax;
    `
  )}
`;

export const UserNickName = styled.span<Types>`
  margin: 0 0.5vmax 0 0.3vmax;
  font-family: "BlackOpsOne";
  font-size: 2vmax;
  text-shadow: -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,
    -1px -1px 0 black;
  color: yellow;
  ${(props) =>
    props.customColor &&
    css`
      color: ${props.customColor};
    `}

  ${mediaQueries(
    "portrait",
    css`
      font-size: 3vmax;
    `
  )}

   ${mediaQueries(
    "landscape",
    css`
      font-size: 2vmax;
    `
  )}
`;

export const Notification = styled.div`
  background-image: url("/newMsg.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 1.5vmax;
  height: 1.5vmax;
  margin: 0 0.7vmax 0 0;
  animation: privateNotifier 4s infinite ease-in-out,
    blinkerBoxYellow 3s ease-in-out, shake 0.5s;
  border-radius: 50%;

  ${mediaQueries(
    "portrait",
    css`
      width: 4vmax;
      height: 4vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      width: 2.5vmax;
      height: 2.5vmax;
    `
  )}
`;

export const PrivateModeImage = styled.img`
  width: 9vmax;
  height: 9vmax;
  border-radius: 50%;
  padding: 1vmax;
  margin-top: -1vmax;

  ${mediaQueries(
    "portrait",
    css`
      width: 10vmax;
      height: 10vmax;
    `
  )}

  ${mediaQueries(
    "landscape",
    css`
      width: 16vmax;
      height: 16vmax;
    `
  )}
`;
