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

const { handleChatPostDelete } = require("../../ChatUtils");

export const ChatMessages: React.FC<Props> = ({
  admin,
  superAdmin,
  myUserId,
  elemRef,
  setPostScroll,
  chatMessages,
  darkMode,
}) => {
  let fixedTime: string;
  let fixedDate: string;
  let fixedHours: number;
  let timePreFix: string;
  let msgDate;
  let msgTime;
  let diff = new Date().getTimezoneOffset() / -60;

  const handleTime = (e: any) => {
    if (e.created_at) {
      msgDate = e.created_at.slice(0, 10).split("-");
      fixedDate = msgDate[2] + "-" + msgDate[1] + "-" + msgDate[0];
      msgTime = e.created_at.slice(11, 19).split(":");

      if (msgTime[0].startsWith("0")) {
        msgTime[0] = msgTime[0].slice(1, 2);
      }
      fixedHours = Number(msgTime[0]) + 6 + diff;
      // +6 in "fixedHours" applies to my hosting service timezone settings, otherwise it should not be there
      if (fixedHours == 24) {
        fixedHours = 0;
      }
      if (fixedHours > 24) {
        fixedHours = fixedHours - 24;
      }

      if (fixedHours < 10) {
        timePreFix = `0`;
      } else {
        timePreFix = "";
      }

      fixedTime = timePreFix + fixedHours + ":" + msgTime[1] + ":" + msgTime[2];
    }
  };

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
                  {fixedDate}
                </div>
                <div className="time">{fixedTime}</div>
              </div>
            );
          }
        })}
    </>
  );
};
