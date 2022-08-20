import React, { useEffect } from "react";

interface Props {
  privateMode: boolean;
  darkMode: boolean;
  superAdmin: boolean;
  setEmojiBar: (e: boolean) => void;
  mute: boolean;
  setMute: (e: boolean) => void;
  horn: boolean;
  shakeUser: boolean;
  elemRef: any;
  setPostScroll: (e: boolean) => void;
  admin: boolean;
  chatMessages: any;
  chatTypeLine: any;
  chatMSG: any;
  setChatMSG: (e: any) => void;
  emojiBar: boolean;
  myUserId: number | undefined;
  setScrollTop: (e: number) => void;
}

const {
  keyCheck,
  setChatMSGChange,
  sendChatMSGButton,
  next20ChatMsgs,
  moveScrollbarToTop,
  moveScrollbarToBottom,
  handleChatPostDelete,
} = require("../ChatUtils");

export const ChatScreen: React.FC<Props> = ({
  privateMode,
  darkMode,
  superAdmin,
  setEmojiBar,
  mute,
  horn,
  shakeUser,
  setPostScroll,
  elemRef,
  admin,
  chatMessages,
  chatTypeLine,
  chatMSG,
  setChatMSG,
  setMute,
  setScrollTop,
  emojiBar,
  myUserId,
}) => {
  useEffect(function () {}, []);

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
      {!privateMode && (
        <div
          className="chatContainer"
          id={(darkMode && "chatContainerDark") || ""}
        >
          <div className="chatNextControls">
            <div className="chatNextArrows">
              <div
                title="Chat Top"
                className="up"
                onClick={() => moveScrollbarToTop(elemRef)}
              >
                ▲
              </div>
              <div
                title="Chat Bottom"
                className="down"
                onClick={() => moveScrollbarToBottom(elemRef)}
              >
                ▼
              </div>
            </div>
            <div
              title="Load More Chat Messages"
              className="next"
              onClick={() =>
                next20ChatMsgs(elemRef, setPostScroll, chatMessages)
              }
            >
              ⦿
            </div>
          </div>

          <div
            className="chatHeadline"
            id={(darkMode && "chatHeadlineDark") || ""}
          >
            <div id="chatTitle">Chat Room</div>
          </div>

          <div
            className="chatScreenBack"
            id={(shakeUser && horn && "hornShake") || ""}
          >
            <div
              className="chatScreen"
              id={(darkMode && "chatScreenDark") || ""}
              ref={elemRef}
              onScrollCapture={() =>
                elemRef.current && setScrollTop(elemRef.current.scrollTop)
              }
            >
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
                          {admin &&
                            !superAdmin &&
                            myUserId == msg.msg_sender_id && (
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

                        <div
                          className="date"
                          id={(darkMode && "dateDark") || ""}
                        >
                          {fixedDate}
                        </div>
                        <div className="time">{fixedTime}</div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>

          <div className="typeLine">
            <textarea
              rows={1}
              className="chatTypeLine"
              onKeyDown={(e) => keyCheck(e)}
              onChange={(e) => {
                setChatMSGChange(e, setChatMSG);
              }}
            ></textarea>
            <div
              id={(darkMode && "sendChatMsgDark") || ""}
              title="Send Message"
              className="sendChatMsg"
              onClick={() =>
                sendChatMSGButton(chatMSG, setChatMSG, chatTypeLine)
              }
            ></div>
            <div className="chatControls">
              {!mute && (
                <div
                  title="Mute"
                  className="mute"
                  onClick={() => {
                    setMute(!mute);
                  }}
                ></div>
              )}
              {mute && (
                <div
                  title="Play"
                  className="play"
                  onClick={() => setMute(!mute)}
                ></div>
              )}
            </div>
            <div
              title="Emojis!"
              className="emojiBarToggler"
              onClick={(e) => setEmojiBar(!emojiBar)}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};
