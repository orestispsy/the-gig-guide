import React from "react";

import {
  UserStatus,
  PostContainer,
  Wrapper,
  Message,
  UserDetails,
  Avatar,
  Nickname,
  Delete,
  Date,
  Time,
} from "./ChatMessages.style";

interface Props {
  admin: boolean;
  superAdmin: boolean;
  myUserId: number | undefined;
  elemRef: any;
  setPostScroll: (e: boolean) => void;
  chatMessages: any;
  darkMode: boolean;
}

const { handleChatPostDelete, handleTime } = require("../../ChatUtils");

export const ChatMessages: React.FC<Props> = ({
  admin,
  superAdmin,
  myUserId,
  elemRef,
  setPostScroll,
  chatMessages,
  darkMode,
}) => {
  return (
    <>
      {chatMessages &&
        chatMessages.map((msg: any) => {
          handleTime(msg);

          if (msg.chat_msg === "--##--left--##--") {
            {
              return (
                <UserStatus key={msg.id}>
                  {msg.nickname} has left the chat
                </UserStatus>
              );
            }
          } else if (msg.chat_msg === "--##--entered--##--") {
            return (
              <UserStatus left={true} key={msg.id}>
                {msg.nickname} joined the chat !
              </UserStatus>
            );
          } else if (msg.chat_msg === "--##--left-the-network--##--") {
            return (
              <UserStatus exit={true} key={msg.id}>
                {msg.nickname} left The Network
              </UserStatus>
            );
          } else {
            return (
              <Wrapper key={msg.id}>
                <PostContainer>
                  <UserDetails>
                    <Avatar src={msg.chat_img || "./avatar.png"}></Avatar>
                    <Nickname>{msg.nickname}</Nickname>
                  </UserDetails>
                  {admin && !superAdmin && myUserId == msg.msg_sender_id && (
                    <Delete
                      title="Delete"
                      onClick={(e) =>
                        handleChatPostDelete(
                          msg.id,
                          elemRef,
                          setPostScroll,
                          chatMessages
                        )
                      }
                    ></Delete>
                  )}
                  {superAdmin && (
                    <Delete
                      title="Delete"
                      onClick={(e) =>
                        handleChatPostDelete(
                          msg.id,
                          elemRef,
                          setPostScroll,
                          chatMessages
                        )
                      }
                    ></Delete>
                  )}
                  <Message
                    style={{
                      color: msg.chat_color || `yellow`,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: msg.chat_msg,
                    }}
                  ></Message>
                </PostContainer>

                <Date dark={darkMode}>{handleTime(msg, true)}</Date>
                <Time>{handleTime(msg)}</Time>
              </Wrapper>
            );
          }
        })}
    </>
  );
};
