import React from "react";

import {
  User,
  UserInner,
  UserDetails,
  NetworkUser,
  UserImage,
  UserNickName,
  Notification,
} from "../UserList.style";

interface Props {
  user: any;
  myUserId: number | undefined;
  privateMode: boolean;
  onlineUserPic: string;
  chatColor: string;
  privateMessages: any;
  setEmojiBar: (e: boolean) => void;
  setPrivateMode: (e: boolean) => void;
  setUserPrivate: (e: any) => void;
  setPrivatePic: (e: string) => void;
  setPrivateNick: (e: string | boolean) => void;
}

export const PrivateUser: React.FC<Props> = ({
  user,
  myUserId,
  setEmojiBar,
  setPrivateMode,
  setPrivateNick,
  setPrivatePic,
  setUserPrivate,
  privateMode,
  onlineUserPic,
  privateMessages,
  chatColor,
}) => {
  return (
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
              title={(user.id != myUserId && "Send Private Message") || ""}
            >
              {user.nickname}
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
        </UserInner>
      )}
    </User>
  );
};
