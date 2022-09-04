import React, { useEffect, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { socket } from "../../../../../../common/Socket/socket";
import {
  BanBoxWrapper,
  BanBox,
  BanBoxText,
  BanTimeEditor,
  BanTimeInput,
  KickButton,
  HornButton,
  GoToSuperMode,
} from "./UserOptions.style";

const { keyCheck } = require("../../../SideBarUtils");

interface Props {
  guest: boolean;
  user: any;
  configTimer: any;
  setShakeUser: (e: boolean) => void;
  selectUserToKick: number | boolean;
  setConfigTimer: (e: any) => void;
  myUserId: number | undefined;
  superAdmin: boolean;
  setSelectUserToKick: (e: boolean | number) => void;
}

type LocationProps = {
  state: {
    previousPath: string;
  };
  pathname: string;
};

export const UserOptions: React.FC<Props> = ({
  guest,
  configTimer,
  setShakeUser,
  selectUserToKick,
  user,
  setConfigTimer,
  myUserId,
  superAdmin,
  setSelectUserToKick,
}) => {
  useEffect(function () {}, []);

  const navigate = useNavigate();
  const location = useLocation() as unknown as LocationProps;
  const { pathname } = location;

  return (
    <Fragment>
      {configTimer && selectUserToKick == user.id && (
        <BanBoxWrapper>
          <BanBox>
            <BanBoxText>BAN TIME</BanBoxText>
            <BanTimeEditor>
              <BanTimeInput
                type="number"
                onKeyDown={(e) => keyCheck(e, user.id, setConfigTimer)}
                onChange={(e) =>
                  socket.emit("BAN TIMER", {
                    time: e.target.value,
                    id: user.id,
                    nickname: user.nickname,
                  })
                }
              ></BanTimeInput>
              <BanBoxText>sec</BanBoxText>
            </BanTimeEditor>
          </BanBox>

          <KickButton
            active={true}
            title={`Kick User ${user.nickname}`}
            onClick={(e) => {
              setConfigTimer(false);
              if (user.id != myUserId) {
                socket.emit("forceDisconnect", user.id);
              }
            }}
          />
        </BanBoxWrapper>
      )}
      {user.id != myUserId && !configTimer && superAdmin && (
        <KickButton
          title={`Ban Settings`}
          onClick={(e) => {
            setConfigTimer(true);
            setSelectUserToKick(user.id);
          }}
        ></KickButton>
      )}
      {user.id != myUserId && !guest && (
        <HornButton
          title={`Hit a Horn to ${user.nickname}`}
          onClick={(e) => {
            setSelectUserToKick(user.id);
            setShakeUser(true);
            socket.emit("HORN", {
              user: user.id,
              horn: true,
              admin_shaked: myUserId,
            });
          }}
        ></HornButton>
      )}
      {user.id != myUserId && superAdmin && (
        <GoToSuperMode
          title={`Edit User ${user.nickname}`}
          onClick={() => {
            navigate("/super-admin", {
              state: {
                previousPath: pathname,
                user: user,
              },
            });
          }}
        ></GoToSuperMode>
      )}
    </Fragment>
  );
};
