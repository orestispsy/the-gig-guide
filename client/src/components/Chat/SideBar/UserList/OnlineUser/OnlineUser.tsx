import React from "react";

import { UserOptions } from "./UserOptions/UserOptions";

import {
  User,
  UserInner,
  UserDetails,
  UserStatus,
  UserImage,
  UserNickName,
  Crown,
  Notification,
} from "../UserList.style";

interface Props {
  guest: boolean;
  user: any;
  horn: any;
  shakeUser: boolean;
  selectUserToKick: number | boolean;
  myUserId: number | undefined;
  myNickname: string;
  privateMode: boolean;
  onlineUserPic: string;
  chatColor: string;
  privateMessages: any;
  configTimer: any;
  superAdmin: boolean;
  setEmojiBar: (e: boolean) => void;
  setPrivateMode: (e: boolean) => void;
  setUserPrivate: (e: any) => void;
  setPrivatePic: (e: string) => void;
  setPrivateNick: (e: string | boolean) => void;
  setShakeUser: (e: boolean) => void;
  setConfigTimer: (e: any) => void;
  setSelectUserToKick: (e: boolean | number) => void;
}

export const OnlineUser: React.FC<Props> = ({
  guest,
  user,
  horn,
  shakeUser,
  myUserId,
  myNickname,
  privateMode,
  onlineUserPic,
  chatColor,
  selectUserToKick,
  privateMessages,
  configTimer,
  superAdmin,
  setEmojiBar,
  setPrivateMode,
  setPrivateNick,
  setPrivatePic,
  setUserPrivate,
  setSelectUserToKick,
  setConfigTimer,
  setShakeUser,
}) => {
  return (
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
            title={(user.id != myUserId && "Send Private Message") || ""}
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
        <UserOptions
          guest={guest}
          user={user}
          configTimer={configTimer}
          myUserId={myUserId}
          selectUserToKick={selectUserToKick}
          superAdmin={superAdmin}
          setShakeUser={(e: boolean) => setShakeUser(e)}
          setConfigTimer={(e: boolean) => setConfigTimer(e)}
          setSelectUserToKick={(e: number | boolean) => setSelectUserToKick(e)}
        />
      </UserInner>
    </User>
  );
};
