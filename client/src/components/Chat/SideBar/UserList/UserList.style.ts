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
  active?: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  ${mediaQueries("100", "480", "portrait")`
          height: 25vmax;
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

  ${mediaQueries("100", "480", "portrait")`
            font-size: 4vmax;
    margin: 2vmax 0 2vmax 0;
    `}

    ${mediaQueries("273", "1024", "landscape")`
            margin: 0 0 1vmax 0;
    `}
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

  ${mediaQueries("100", "480", "portrait")`
            font-size: 2vmax;
    align-self: center;
    padding: 1vmax;
    `}
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

  ${mediaQueries("100", "480", "portrait")`
           min-height: 14vmax;
    min-width: 23vmax;
    padding: 0vmax 1vmax;
    `}

    &:nth-child(1) {
    margin-top: 2vmax !important;
  }

  ${(props) =>
    props.dark &&
    css`
      border-color: rgba(255, 255, 255, 0.13);

      ${mediaQueries("100", "480", "portrait")`
               border: 1px solid rgba(255, 255, 255, 0.281);
    `}
      ${mediaQueries("273", "1024", "landscape")`
             border: 2px solid rgba(255, 255, 255, 0.178);
    `}
    `}

  ${(props) =>
    props.private &&
    css`
      margin-top: -2vmax;
      box-shadow: none;
      border: none;
      background-color: rgba(255, 255, 255, 0.027);
    `}
`;

export const User = styled.div`
  cursor: pointer;
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

  &:hover {
    background-color: #00ffbf13;
  }

  ${(props) =>
    props.horn &&
    css`
      background-color: #fbff0413;
    `}

  ${mediaQueries("100", "480", "portrait")`
                margin-bottom: 1vmax;
    `}
`;

export const Crown = styled.div`
  width: 2.5vmax;
  height: 2.5vmax;

  background-image: url("/crown.png");
  background-size: cover;
  margin-left: -2.4vmax;
  margin-top: -3vmax;

  ${mediaQueries("100", "480", "portrait")`
       width: 3vmax;
    height: 3vmax;
    margin: -5vmax 0.5vmax 0 -3vmax;
    `}

  ${mediaQueries("273", "1024", "landscape")`
               margin-top: -3vmax;
    margin: -3vmax 0 0 -2vmax;
    `}
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

  ${mediaQueries("100", "480", "portrait")`
             margin-left: unset;
    `}

  ${mediaQueries("273", "1024", "landscape")`
               margin-left: unset;
    `}
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

  ${mediaQueries("100", "480", "portrait")`
        width: 5vmax;
    height: 5vmax;
    `}
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

  ${mediaQueries("100", "480", "portrait")`
          font-size: 3vmax;
    `}

      ${mediaQueries("273", "1024", "landscape")`
               font-size: 2vmax;
    `}
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

  ${mediaQueries("100", "480", "portrait")`
       width: 4vmax;
    height: 4vmax;
    `}

  ${mediaQueries("273", "1024", "landscape")`
            width: 2.5vmax;
    height: 2.5vmax;
    `}
`;

export const BanBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
`;

export const BanBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0.5vmax;
  font-family: "BlackOpsOne" !important;
  color: rgb(252, 88, 88);
  font-size: 1vmax !important;
`;

export const BanBoxText = styled.div``;

export const BanTimeEditor = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  color: #76b3aa6e !important;
`;

export const BanTimeInput = styled.input`
  text-align: center;
  outline: transparent;
  border-radius: 100px;
  height: 1.7vmax;
  background-color: #ffe60049;
  border: none;
  width: 3vmax;
  color: white;

  input[type="number"] {
    -moz-appearance: textfield;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const KickButton = styled.div<Types>`
  background-image: url("/kick.jpg");
  background-size: cover;
  width: 1.5vmax;
  height: 1.5vmax;
  border-radius: 50%;
  cursor: pointer;
  transform: rotate(0.15turn);
  border: 1px solid white;

  &:hover {
    transform: rotate(0turn);
  }

  ${mediaQueries("100", "480", "portrait")`
          width: 3vmax;
          height: 3vmax;
          margin: 0 1vmax;
    `}

  ${(props) =>
    props.active &&
    css`
      animation: 1.1s linear infinite blinker2;
    `}
`;

export const HornButton = styled.div`
  margin-left: 0.5vmax;
  width: 1.5vmax;
  height: 1.5vmax;
  border-radius: 50%;
  background-image: url("/horn.jpg");
  background-size: cover;

  &:hover {
    animation: 1.1s linear infinite blinker2;
  }

  ${mediaQueries("100", "480", "portrait")`
            width: 3vmax
    height: 3vmax
    margin: 0 1vmax
    `}

  ${mediaQueries("273", "1024", "landscape")`
               width: 2vmax
    height: 2vmax
    margin: 0 1vmax
    `}
`;

export const GoToSuperMode = styled.div`
  background-image: url("/gear.png");
  background-size: cover;
  width: 1.5vmax;
  height: 1.5vmax;
  margin: 0 0.5vmax;
  transition: 1s;
  cursor: pointer;
  filter: invert(50%);
  border-radius: 90%;

  &:hover {
    transform: rotate(180deg);
    transition: 1s;
  }

  ${mediaQueries("100", "480", "portrait")`
              width: 3vmax;
    height: 3vmax;
    `}

  ${mediaQueries("273", "1024", "landscape")`
               width: 2vmax;
    height: 2vmax;
    margin-left: 0;
    `}
`;

export const PrivateModeImage = styled.img`
  width: 9vmax;
  height: 9vmax;
  border-radius: 50%;
  padding: 1vmax;
  margin-top: -1vmax;

  ${mediaQueries("100", "480", "portrait")`
            width: 15vmax;
    height: 15vmax;
    `}

  ${mediaQueries("273", "1024", "landscape")`
               width: 16vmax;
    height: 16vmax;
    `}
`;
