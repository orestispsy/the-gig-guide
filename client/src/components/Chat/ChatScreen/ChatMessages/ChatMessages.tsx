import React from "react";

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
                <p className="userLeaves" key={msg.id}>
                  {msg.nickname} has left the chat
                </p>
              );
            }
          } else if (msg.chat_msg === "--##--entered--##--") {
            return (
              <p className="userEnters" key={msg.id}>
                {msg.nickname} joined the chat !
              </p>
            );
          } else if (msg.chat_msg === "--##--left-the-network--##--") {
            return (
              <p className="userLeavesNetwork" key={msg.id}>
                {msg.nickname} left The Network
              </p>
            );
          } else {
            return (
              <div className="chatPost" key={msg.id}>
                <div className="post">
                  <div className="userChatDetails">
                    <img
                      className="postImg"
                      src={msg.chat_img || "./../avatar.png"}
                    ></img>
                    <h1>{msg.nickname}</h1>
                  </div>
                  {admin && !superAdmin && myUserId == msg.msg_sender_id && (
                    <div
                      title="Delete"
                      className="deleteChatMsg"
                      onClick={(e) =>
                        handleChatPostDelete(
                          msg.id,
                          elemRef,
                          setPostScroll,
                          chatMessages
                        )
                      }
                    ></div>
                  )}
                  {superAdmin && (
                    <div
                      title="Delete"
                      className="deleteChatMsg"
                      onClick={(e) =>
                        handleChatPostDelete(
                          msg.id,
                          elemRef,
                          setPostScroll,
                          chatMessages
                        )
                      }
                    ></div>
                  )}
                  <div
                    className="finalMessage"
                    style={{
                      color: msg.chat_color || `yellow`,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: msg.chat_msg,
                    }}
                  ></div>
                </div>

                <div className="date" id={(darkMode && "dateDark") || ""}>
                  {handleTime(msg, true)}
                </div>
                <div className="time">{handleTime(msg)}</div>
              </div>
            );
          }
        })}
    </>
  );
};
