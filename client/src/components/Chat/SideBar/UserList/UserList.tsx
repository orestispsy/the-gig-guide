import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { socket } from "../../../../common/Socket/socket";

import {
  Container,
  Headline,
  Counter,
  UsersBox,
  User,
  UserDetails,
  NetworkUser,
  UserImage,
  UserNickName,
  Notification,
  Crown,
  UserStatus,
  UserInner,
  BanBoxWrapper,
  BanBox,
  BanTimeEditor,
  BanBoxText,
  BanTimeInput,
  KickButton,
  HornButton,
  GoToSuperMode,
  PrivateModeImage,
} from "./UserList.style";

interface Props {
  privateMode: boolean;
  darkMode: boolean;
  superAdmin: boolean;
  setEmojiBar: (e: boolean) => void;
  horn: any;
  shakeUser: boolean;
  myUserId: number | undefined;
  userPicBar: boolean;
  networkList: any;
  onlineUsers: any;
  networkUsers: any;
  setPrivateMode: (e: boolean) => void;
  privateMessages: any;
  selectUserToKick: number | boolean;
  privatePic: any;
  privateNick: string | boolean;
  configTimer: any;
  setShakeUser: (e: boolean) => void;
  myNickname: string;
  chatColor: string;
  setConfigTimer: (e: boolean) => void;
  setSelectUserToKick: (e: boolean | number) => void;
  guest: boolean;
  setUserPrivate: (e: any) => void;
  setPrivateNick: (e: string | boolean) => void;
  setPrivatePic: (e: string) => void;
  onlineUserPic: string;
}

type LocationProps = {
  state: {
    previousPath: string;
  };
  pathname: string;
};

const { keyCheck } = require("../SideBarUtils");

export const UserList: React.FC<Props> = ({
  privateMode,
  darkMode,
  superAdmin,
  setEmojiBar,
  horn,
  shakeUser,
  myUserId,
  onlineUsers,
  networkUsers,
  networkList,
  selectUserToKick,
  setPrivateMode,
  privateMessages,
  privatePic,
  privateNick,
  configTimer,
  chatColor,
  setConfigTimer,
  setSelectUserToKick,
  setShakeUser,
  myNickname,
  setPrivateNick,
  setPrivatePic,
  setUserPrivate,
  onlineUserPic,
  guest,
}) => {
  useEffect(function () {}, []);

  const navigate = useNavigate();
  const location = useLocation() as unknown as LocationProps;
  const { pathname } = location;

  return (
    <Container>
      {!privateMode && !networkList && (
        <Headline>{!networkList && "Online"}</Headline>
      )}

      {!privateMode && networkList && (
        <Headline network={true}>Network</Headline>
      )}
      {!privateMode && (
        <Counter>
          {!networkList && onlineUsers && onlineUsers.length}
          {networkList &&
            networkUsers.filter((user: any) => !user.nickname.includes("Guest"))
              .length}
        </Counter>
      )}
      <UsersBox dark={darkMode} private={privateMode}>
        {!privateMode &&
          networkList &&
          networkUsers &&
          networkUsers.map((user: any) => (
            <User key={user.id}>
              {!user.nickname.includes("Guest") && (
                <UserInner>
                  <UserDetails
                    onClick={(e) => {
                      if (user.id != myUserId) {
                        setEmojiBar(false);
                        setPrivateMode(!privateMode);
                        setUserPrivate(user.id);
                        setPrivatePic(user.chat_img);
                        setPrivateNick(user.nickname);
                      }
                    }}
                  >
                    <NetworkUser>
                      <UserImage
                        alt={user.nickname}
                        src={
                          (myUserId == user.id && onlineUserPic) ||
                          (user.chat_img && user.chat_img) ||
                          "./../avatar.png"
                        }
                      ></UserImage>
                    </NetworkUser>

                    <UserNickName
                      customColor={
                        (myUserId == user.id && chatColor) ||
                        (user.chat_color && user.chat_color)
                      }
                      title={
                        (user.id != myUserId && "Send Private Message") || ""
                      }
                    >
                      {user.nickname}
                    </UserNickName>
                    {privateMessages &&
                      privateMessages.map((msg: any) => {
                        if (
                          !msg.receiver_seen &&
                          msg.msg_sender_id == user.id
                        ) {
                          return <Notification key={msg.id}></Notification>;
                        } else {
                          return;
                        }
                      })}
                  </UserDetails>
                </UserInner>
              )}
            </User>
          ))}

        {onlineUsers &&
          !networkList &&
          !privateMode &&
          onlineUsers.map((user: any) => (
            <User key={user.id}>
              <UserInner horn={horn && horn.admin_shaked == user.id}>
                <UserDetails
                  shake={shakeUser && user.id == selectUserToKick}
                  onClick={(e) => {
                    if (user.id != myUserId) {
                      setEmojiBar(false);
                      setPrivateMode(!privateMode);
                      setUserPrivate(user.id);
                      setPrivatePic(user.chat_img);
                      setPrivateNick(user.nickname);
                    }
                  }}
                >
                  <UserStatus online={user.online}>
                    <UserImage
                      alt={user.nickname}
                      src={
                        (myUserId == user.id && onlineUserPic) ||
                        (user.chat_img && user.chat_img) ||
                        "./../avatar.png"
                      }
                    />
                  </UserStatus>
                  {user.super_admin && <Crown></Crown>}

                  <UserNickName
                    title={
                      (user.id != myUserId && "Send Private Message") || ""
                    }
                    customColor={
                      (myUserId == user.id && chatColor) ||
                      (user.chat_color && user.chat_color)
                    }
                  >
                    {(user.id == myUserId && myNickname) || user.nickname}
                  </UserNickName>
                  {privateMessages &&
                    privateMessages.map((msg: any) => {
                      if (!msg.receiver_seen && msg.msg_sender_id == user.id) {
                        return <Notification key={msg.id}></Notification>;
                      } else {
                        return;
                      }
                    })}
                </UserDetails>

                {configTimer && selectUserToKick == user.id && (
                  <BanBoxWrapper>
                    <BanBox>
                      <BanBoxText>BAN TIME</BanBoxText>
                      <BanTimeEditor>
                        <BanTimeInput
                          type="number"
                          onKeyDown={(e) =>
                            keyCheck(e, user.id, setConfigTimer)
                          }
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
              </UserInner>
            </User>
          ))}

        {privateMode && (
          <PrivateModeImage
            onClick={(e) => {
              setPrivateMode(false);
            }}
            src={(privatePic && privatePic) || "./../avatar.png"}
          ></PrivateModeImage>
        )}
      </UsersBox>
      {privateMode && <div id="privateMsgUserNick">{privateNick}</div>}
    </Container>
  );
};
