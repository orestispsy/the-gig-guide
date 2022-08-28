import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import useSound from "use-sound";
import kickedOut from "./../../../public/kickedOut.mp3";
import {
  BanContainer,
  BlockContainer,
  BlockText,
  BanBox,
  BanText,
  BanTextFocus,
  Timer,
} from "./BanOrBlock.style";

const { banCountDown } = require("./BanOrBlockUtils");

interface Props {
  profileBanned: boolean;
  profileBlocked: boolean;
}

export const BanOrBlock: React.FC<Props> = ({
  profileBanned,
  profileBlocked,
}) => {
  const banTimer = useSelector((state: any) => state && state.ban_timer);

  const timerRef = useRef<HTMLDivElement>(null);
  const [playKickedOut] = useSound(kickedOut, { volume: 0.75 });

  useEffect(() => {
    if (profileBanned) {
      playKickedOut();
      banCountDown(timerRef, banTimer);
    }
  }, [profileBanned]);

  return (
    <>
      {profileBanned && (
        <BanContainer>
          <BanBox>
            YOU'VE BEEN BANNED !<BanText>Take a Deep Breath,</BanText>{" "}
            <BanText>and Try Again </BanText>
            <BanTextFocus>Seconds Remaining</BanTextFocus>
            <Timer ref={timerRef}>{banTimer && banTimer}</Timer>
          </BanBox>
        </BanContainer>
      )}
      {profileBlocked && (
        <BlockContainer>
          <BlockText>YOU'VE BEEN BLOCKED</BlockText>
        </BlockContainer>
      )}
    </>
  );
};
