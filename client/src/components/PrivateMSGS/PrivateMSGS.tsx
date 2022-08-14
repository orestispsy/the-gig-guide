import React, { useEffect, useState, useRef } from "react";
import axios from "../../common/Axios/axios";

import { socket } from "../../common/Socket/socket";
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
  privateMode: boolean;
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
  privateMode,
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

        next20ChatMsgs(elemRef, setPostScroll, messages);
      }
    }
  }, [scrollTop]);

  useEffect(() => {
    setPrivateMode(true);
    if (myUserId && userPrivate) {
      axios
        .post("/get-private-messages", {
          myUserId,
          userPrivate,
          privatePic,
        })
        .then(({ data }) => {
          socket.emit("PRIVATE MESSAGES", data.data);
          if (data.data[0] && data.data[data.data.length - 1]) {
            setFirstMsg(data.data[data.data.length - 1]);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
      axios
        .get("/filtered-private")
        .then(({ data }) => {
          setFilteredPrivateMessages(data.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
    setChatScrollBarPosition(elemRef);
  }, []);

  useEffect(() => {
    if (firstMsg) {
      if (!mute && firstMsg.msg_seen) {
        playNotification(mute, playPrivateMsg);
      }

      axios
        .post("/get-private-messages", {
          myUserId,
          userPrivate,
          privatePic,
        })
        .then(({ data }) => {
          if (
            data.data[data.data.length - 1].id == messages[messages.length - 1]
          ) {
            if (
              firstMsg.msg_receiver_id == myUserId &&
              firstMsg.id == messages[messages.length - 1]
            ) {
              setPrivateMsgsIfSeen(firstMsg.id);
            }
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
      if (firstMsg.msg_sender_id == userPrivate) {
        setPrivateMsgsIfSeen(firstMsg.id);
      }
    }
  }, [firstMsg]);

  const next20ChatMsgs = (
    elemRef: any,
    setPostScroll: (e: boolean) => void,
    chatMessages: any
  ) => {
    if (elemRef.current && elemRef.current.scrollTop == 0) {
      elemRef.current.scrollTop = elemRef.current.scrollTop + 1;
    }

    setPostScroll(true);
    socket.emit("NEXT PRIVATE MSGS", {
      sender_id: myUserId,
      receiver_id: userPrivate,

      id: chatMessages[0].id,
    });
  };
  const setChatScrollBarPosition = (elemRef: any) => {
    if (elemRef.current) {
      const newScrollTop =
        elemRef.current.scrollHeight - elemRef.current.clientHeight;
      elemRef.current.scrollTop = newScrollTop;
    }
  };

  const moveScrollbarToTop = (elemRef: any) => {
    if (elemRef.current) {
      elemRef.current.scrollTop = 3;
    }
  };
  const moveScrollbarToBottom = (elemRef: any) => {
    if (elemRef.current) {
      elemRef.current.scrollTop =
        elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }
  };

  const setPrivateMsgsIfSeen = (e: any) => {
    axios
      .post("/seen-private-messages", {
        firstMsg: e,
      })
      .then(({ data }) => {})
      .catch((err) => {
        console.log("error", err);
      });
  };

  const addPrivateMsg = (e: string) => {
    let emptyMsgChecker = e.trim();
    if (emptyMsgChecker !== "") {
      axios
        .post("/add-private-message/", {
          myUserId,
          userPrivate,
          message: e,
        })
        .then(({ data }) => {
          socket.emit("PRIVATE MESSAGE", {
            ...data.data[0],
            chat_img: myChatImg,
          });
          elem[0].value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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

  const elem: any = document.querySelectorAll(".chatTypeLine");
  var chatMSG = "";
  const chat = (e: any) => {
    chatMSG = e.target.value;
  };

  const keyCheck = (e: any) => {
    if (e.key === "Enter") {
      let emptyMsgChecker = e.target.value.trim();
      if (emptyMsgChecker !== "") {
        e.preventDefault();
        var msgLink = e.target.value.split(/\s+/);
        msgLink.forEach((element: any, index: number) => {
          if (element.startsWith("http") || element.startsWith("www.")) {
            let url = element;
            if (element.startsWith("www.")) {
              url = `https://` + url;
            }
            msgLink[index] = `<a href=${url} target="_blank">${element}</a>`;
            e.target.value = msgLink.join(" ");
          }
        }, msgLink);
        addPrivateMsg(e.target.value);
        e.target.value = "";
      }
      e.preventDefault();
    }
  };

  return (
    <>
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
            onClick={() => next20ChatMsgs(elemRef, setPostScroll, messages)}
          >
            ⦿
          </div>
        </div>
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
                handleTime(msg);
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
                                  (msg.msg_sender_id == myUserId &&
                                    myChatImg) ||
                                  (msg.msg_sender_id != myUserId &&
                                    privatePic) ||
                                  "./../avatar.png"
                                }
                              ></img>
                              <div id="nickname">
                                {(msg.msg_sender_id == myUserId &&
                                  myNickname) ||
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
                              {fixedDate}
                            </div>
                            <div className="time" id="time">
                              {fixedTime}
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
              onKeyDown={(e) => keyCheck(e)}
              onChange={(e) => {
                chat(e);
              }}
            ></textarea>
            <div
              title="Send Private Message"
              className="sendChatMsg"
              onClick={(e) => addPrivateMsg(chatMSG)}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
