import React, { useEffect, useState, useRef } from "react";

import { ChatControls } from "../ChatScreen/ChatControls/ChatControls";

const {
  getPrivateMessages,
  addPrivateMsg,
  checkForNew,
  next20PrivateMsgs,
  keyCheck,
} = require("./PrivateMessageUtils");

const { setChatScrollBarPosition, handleTime } = require("./../ChatUtils");

import { useSelector } from "react-redux";

interface Props {
  myUserId: number | undefined;
  userPrivate: number | undefined;
  myChatImg: string;
  privatePic: any;
  myNickname: string;
  privateNick: any;
  setFilteredPrivateMessages: (e: any) => void;
  darkMode: boolean;
  playNotification: (e: boolean, playPrivateMsg: () => void) => void;
  playPrivateMsg: () => void;
  mute: boolean;
  setPrivateMode: (e: boolean) => void;
}

export const PrivateMSGS: React.FC<Props> = ({
  myUserId,
  userPrivate,
  myChatImg,
  privatePic,
  myNickname,
  privateNick,
  setFilteredPrivateMessages,
  darkMode,
  playNotification,
  playPrivateMsg,
  mute,
  setPrivateMode,
}) => {
  const [scrollTop, setScrollTop] = useState<number>(2);
  const [postScroll, setPostScroll] = useState<boolean>(false);
  const [firstMsg, setFirstMsg] = useState<any>(null);

  const messages = useSelector((state: any) => state && state.messages);

  const elemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!postScroll) {
      setTimeout(() => {
        setChatScrollBarPosition(elemRef);
      }, 100);
    }
    setFirstMsg(messages[messages.length - 1]);
    setPostScroll(false);
  }, [messages]);

  useEffect(() => {
    if (messages && elemRef.current) {
      if (scrollTop < 1) {
        elemRef.current.scrollTop = 1000;
        next20PrivateMsgs(
          elemRef,
          setPostScroll,
          messages,
          myUserId,
          userPrivate
        );
      }
    }
  }, [scrollTop]);

  useEffect(() => {
    setPrivateMode(true);
    getPrivateMessages(
      myUserId,
      userPrivate,
      privatePic,
      setFirstMsg,
      setFilteredPrivateMessages
    );
    setChatScrollBarPosition(elemRef);
  }, []);

  useEffect(() => {
    if (firstMsg) {
      if (!mute && firstMsg.msg_seen) {
        playNotification(mute, playPrivateMsg);
      }
      checkForNew(myUserId, userPrivate, privatePic, messages, firstMsg);
    }
  }, [firstMsg]);

  const elem: any = document.querySelectorAll(".chatTypeLine");
  var chatMSG = "";
  const chat = (e: any) => {
    chatMSG = e.target.value;
  };

  return (
    <div className="chatContainer" id={(darkMode && "chatContainerDark") || ""}>
      <ChatControls
        elemRef={elemRef}
        setPostScroll={(e: boolean) => setPostScroll(e)}
        chatMessages={messages}
        myUserId={myUserId}
        userPrivate={userPrivate}
      />
      <h1 id="chatTitlePriv">Private Chat</h1>
      <div className="chatScreenBack">
        <div
          className="chatScreen"
          id={(darkMode && "chatScreenDark") || ""}
          ref={elemRef}
          onScrollCapture={() =>
            elemRef.current && setScrollTop(elemRef.current.scrollTop)
          }
        >
          {messages &&
            messages.map((msg: any, index: number) => {
              return (
                <div key={index}>
                  {(msg.msg_receiver_id == userPrivate ||
                    msg.msg_sender_id == userPrivate) &&
                    (msg.msg_receiver_id == myUserId ||
                      msg.msg_sender_id == myUserId) && (
                      <div className="chatPost">
                        <div className="post">
                          <div className="userChatDetails">
                            <img
                              className="postImg"
                              src={
                                (msg.msg_sender_id == myUserId && myChatImg) ||
                                (msg.msg_sender_id != myUserId && privatePic) ||
                                "./../avatar.png"
                              }
                            ></img>
                            <div id="nickname">
                              {(msg.msg_sender_id == myUserId && myNickname) ||
                                privateNick}
                            </div>
                          </div>
                          <div
                            className="finalMessage"
                            id="finalMessage"
                            dangerouslySetInnerHTML={{
                              __html: msg.private_msg,
                            }}
                          ></div>

                          <div
                            className="date"
                            id={
                              (darkMode && "datePrivDark") ||
                              (!darkMode && "date") ||
                              ""
                            }
                          >
                            {handleTime(msg, true)}
                          </div>
                          <div className="time" id="time">
                            {handleTime(msg)}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              );
            })}
        </div>
        <div className="typeLine" id="typeline">
          <textarea
            rows={1}
            className="chatTypeLine"
            onKeyDown={(e) =>
              keyCheck(e, myUserId, userPrivate, elem, myChatImg)
            }
            onChange={(e) => {
              chat(e);
            }}
          ></textarea>
          <div
            title="Send Private Message"
            className="sendChatMsg"
            onClick={(e) =>
              addPrivateMsg(chatMSG, myUserId, userPrivate, elem, myChatImg)
            }
          ></div>
        </div>
      </div>
    </div>
  );
};
