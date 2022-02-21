import React, { useState, useEffect, useRef } from "react";
import axios from "../../common/Axios/axios";
import { socket } from "../../common/Socket/socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { OnlineUsers } from "../OnlineUsers/OnlineUsers";
import { Ticker } from "../Ticker/Ticker";
import { PrivateMSGS } from "../PrivateMSGS/PrivateMSGS";

import useSound from "use-sound";

import chatSfx from "./../../../public/msg.mp3";
import chatEnterSfx from "./../../../public/chatEnter.mp3";
import kickedOut from "./../../../public/kickedOut.mp3";
import hornSfx from "./../../../public/horn.mp3";
import privateMSGSfx from "./../../../public/privateMSG.mp3";

interface Props {
  myChatImg: string;
  myUserId: number | undefined;
  myChatColor: string;
  admin: boolean;
  superAdmin: boolean;
  setAdmin: (e: boolean) => void;
  setMyChatImg: (e: string) => void;
  myNickname: string;
  setMyNickname: (e: string) => void;
  guest: boolean;
  darkMode: boolean;
  setDarkMode: (e: boolean) => void;
  setNightFlightProg: (e: any) => void;
  nightFlightProg: any;
  setChatMode: (e: boolean) => void;
  radioBroadcasts: any;
  setMaps: (e: boolean) => void;
}

export const Chat: React.FC<Props> = ({
  myChatImg,
  myUserId,
  myChatColor,
  admin,
  setAdmin,
  superAdmin,
  setMyChatImg,
  myNickname,
  setMyNickname,
  guest,
  darkMode,
  setDarkMode,
  setChatMode,
  radioBroadcasts,
  setNightFlightProg,
  nightFlightProg,
  setMaps,
}) => {
  const [emojiBar, setEmojiBar] = useState<boolean>(false);
  const [tickerBar, setTickerBar] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [postScroll, setPostScroll] = useState<boolean>(false);
  const [scrollTop, setScrollTop] = useState<number>(2);
  const [privateMode, setPrivateMode] = useState<boolean>(false);
  const [userPrivate, setUserPrivate] = useState<boolean | undefined>();
  const [privatePic, setPrivatePic] = useState<any>(false);
  const [privateNick, setPrivateNick] = useState(false);
  const [privateMessages, setFilteredPrivateMessages] = useState(false);
  const [configTimer, setConfigTimer] = useState(false);
  const [shakeUser, setShakeUser] = useState(false);

  const [play] = useSound(chatSfx, { volume: 0.75 });
  const [playIntro] = useSound(chatEnterSfx, { volume: 0.5 });

  const [playKickedOut] = useSound(kickedOut, { volume: 0.75 });
  const [playHorn] = useSound(hornSfx, { volume: 0.75 });
  const [playPrivateMsg] = useSound(privateMSGSfx, { volume: 0.75 });

  const elemRef = useRef<HTMLDivElement>(null);

  const timerRef = useRef<HTMLDivElement>(null);

  const chatMessages = useSelector((state: any) => state && state.chatMessages);

  const browserCount = useSelector((state: any) => state && state.count);

  const onlineUsers = useSelector((state: any) => state && state.onlineUsers);

  const chatBan = useSelector((state: any) => state && state.chat_ban);

  const banTimer = useSelector((state: any) => state && state.ban_timer);

  const horn = useSelector((state: any) => state && state.horn);

  useEffect(() => {
    setMaps(false);
    setChatMode(true);
    setDarkMode(darkMode);
    if (elemRef.current) {
      const newScrollTop =
        elemRef.current.scrollHeight - elemRef.current.clientHeight;
      elemRef.current.scrollTop = newScrollTop;
    }
  }, []);

  useEffect(() => {
    if (chatBan) {
      setPrivateMode(false);
      countDown();
    }
  }, [chatBan]);

  useEffect(() => {
    if (chatMessages && elemRef.current) {
      if (scrollTop < 1) {
        elemRef.current.scrollTop = 100;
        next20ChatMsgs();
      }
    }
  }, [scrollTop]);

  useEffect(() => {
    if (browserCount < 2) {
      const timer = setTimeout(() => {
        socket.emit("A CHAT MSG", "--##--entered--##--");
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      return;
    }
  }, [browserCount]);

  useEffect(() => {
    if (elemRef.current) {
      setScrollBarBottom();
    }
  }, [privateMode]);

  useEffect(() => {
    if (horn && horn.horn && !mute) {
      playHorn();

      horn.admin_shaked = false;
    }
  }, [horn]);

  useEffect(() => {
    if (
      chatMessages &&
      chatMessages.length > 0 &&
      chatMessages[chatMessages.length - 1].chat_msg == "--##--entered--##--" &&
      chatMessages[chatMessages.length - 1].msg_sender_id != myUserId &&
      !mute
    ) {
      playIntro();
    }
    if (!postScroll) {
      if (elemRef.current) {
        const newScrollTop =
          elemRef.current.scrollHeight - elemRef.current.clientHeight;
        elemRef.current.scrollTop = newScrollTop;
      }
    }
    if (!mute && scrollTop > 1) {
      play();
    }
    setPostScroll(false);
  }, [chatMessages]);

  const playNotification = () => {
    if (!mute) {
      playPrivateMsg();
    }
  };

  const setScrollBarBottom = () => {
    if (elemRef.current) {
      elemRef.current.scrollTop = scrollTop;
    }
  };

  const run = (e: boolean) => {
    if (onlineUsers) {
      let users = onlineUsers;
      users.forEach((element: any) => {
        if (element.id == myUserId) {
          element.online = false;
          axios
            .post("/set-user-status", { online: e })
            .then(({ data }) => {
              socket.emit("ONLINE USERS", users);
            })
            .catch((err) => {
              console.log("error", err);
            });
        }
      });
    }
  };

  const keyCheck = (e: any) => {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
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
        socket.emit("A CHAT MSG", e.target.value);
        e.target.value = "";
      }
      e.preventDefault();
    }
  };

  let elem: any = document.querySelectorAll(".chatTypeLine");
  var chatMSG = false;
  const chat = (e: any) => {
    chatMSG = e.target.value;
  };

  const sendChatMsgButton = () => {
    if (chatMSG) {
      socket.emit("A CHAT MSG", chatMSG);
      chatMSG = false;
      elem[0].value = "";
    }
  };

  const countDown = () => {
    if (timerRef.current) {
      playKickedOut();
      let counter = banTimer;

      const interval = setInterval(() => {
        if (timerRef.current) {
          counter--;
          timerRef.current.innerHTML = counter;
          if (counter < 0) {
            timerRef.current.innerHTML = "B O O M !";
          }
        }
      }, 1000);

      const clientReset = setTimeout(() => {
        location.replace("/");
      }, banTimer * 1000 + 2000);

      return () => clearTimeout(clientReset);
    } else {
      return;
    }
  };

  const next20ChatMsgs = () => {
    if (elemRef.current && elemRef.current.scrollTop == 0) {
      elemRef.current.scrollTop = elemRef.current.scrollTop + 1;
    }
    setPostScroll(true);
    socket.emit("NEXT MSGS", chatMessages[0].id);
  };

  const getBack2Top = () => {
    if (elemRef.current) {
      elemRef.current.scrollTop = -elemRef.current.scrollTop;
    }
  };
  const getBack2Bottom = () => {
    if (elemRef.current) {
      elemRef.current.scrollTop =
        elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }
  };
  const sendEmoji = (e: any) => {
    chatMSG = e.target.attributes[0].value;
    var msg = `<img class="emojis" src=${chatMSG}>`;
    socket.emit("A CHAT MSG", msg);
  };

  const toggleTicker = (e: boolean) => {
    setTickerBar(e);
  };

  const openPrivate = (e: any, img?: any) => {
    setUserPrivate(e);
    setPrivatePic(img);
  };

  let fixedTime: string;
  let fixedDate: string;
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
      fixedTime =
        JSON.parse(msgTime[0]) + diff + ":" + msgTime[1] + ":" + msgTime[2];
    }
  };

  const handleChatPostDelete = (e: any) => {
    if (elemRef.current) {
      if (
        elemRef.current.scrollHeight <=
        elemRef.current.scrollTop + elemRef.current.clientHeight + 100
      ) {
        setPostScroll(false);
      } else {
        setPostScroll(true);
      }

      const position = elemRef.current.scrollTop;

      socket.emit(
        "DELETE MSG",
        chatMessages.reverse().filter((msg: any) => msg.id !== e),
        e
      );

      const timer = setTimeout(() => {
        if (elemRef.current) {
          elemRef.current.scrollTop = position;
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      return;
    }
  };

  if (!chatMessages) {
    return <div className="loading"></div>;
  }

  return (
    <div className="chatContainerBack">
      {tickerBar && <Ticker tickerBar={tickerBar} darkMode={darkMode} />}
      {privateMode && (
        <PrivateMSGS
          myUserId={myUserId}
          userPrivate={userPrivate}
          myChatImg={myChatImg}
          privatePic={privatePic}
          myNickname={myNickname}
          privateNick={privateNick}
          setFilteredPrivateMessages={(e: any) => setFilteredPrivateMessages(e)}
          darkMode={darkMode}
          playNotification={() => playNotification()}
          mute={mute}
        />
      )}

      <div className="mobileChat">
        {!privateMode && (
          <div
            className={
              (!chatBan && "chatContainer") || (chatBan && "chatContainerBan")
            }
            id={(darkMode && "chatContainerDark") || ""}
          >
            <div
              className="chatHeadline"
              id={(darkMode && "chatHeadlineDark") || ""}
            >
              {!chatBan && (
                <Link
                  to="/"
                  className="buttonBack"
                  onClick={(e) => {
                    setChatMode(false);
                    {
                      if (browserCount == 1) {
                        socket.emit("A CHAT MSG", "--##--left--##--");
                        run(false);
                      }
                    }
                  }}
                >
                  X
                </Link>
              )}

              {!chatBan && <div id="chatTitle">Chat Room</div>}
            </div>

            {!chatBan && (
              <div className="chatNextControls">
                <div
                  title="Chat Top"
                  className="up"
                  onClick={() => getBack2Top()}
                >
                  ▲
                </div>
                <div
                  title="Chat Bottom"
                  className="down"
                  onClick={() => getBack2Bottom()}
                >
                  ▼
                </div>
                <div
                  title="Load More Chat Messages"
                  className="next"
                  onClick={() => next20ChatMsgs()}
                >
                  ⦿
                </div>
              </div>
            )}
            <div
              className="chatScreenBack"
              id={(shakeUser && horn && "hornShake") || ""}
            >
              <div
                className="chatScreen"
                style={{
                  margin: chatBan && `4vmax`,
                }}
                id={(darkMode && "chatScreenDark") || ""}
                ref={elemRef}
                onScrollCapture={() =>
                  elemRef.current && setScrollTop(elemRef.current.scrollTop)
                }
              >
                {chatBan && (
                  <div className="chatBanCover">
                    YOU'VE BEEN BANNED !<span>Take a Deep Breath,</span>{" "}
                    <span>or Chill Your Ass and.. </span>
                    <a href="https://thousandgigs.herokuapp.com">Try Again</a>
                    {chatBan && (
                      <div id="timer" ref={timerRef}>
                        {banTimer && banTimer}
                      </div>
                    )}
                  </div>
                )}

                {!chatBan &&
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
                    } else if (
                      msg.chat_msg === "--##--left-the-network--##--"
                    ) {
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
                                src={myChatImg || "./../na.jpg"}
                              ></img>
                              <h1>{msg.nickname}</h1>
                            </div>
                            {admin &&
                              !superAdmin &&
                              myUserId == msg.msg_sender_id && (
                                <div
                                  title="Delete"
                                  className="deleteChatMsg"
                                  onClick={(e) => handleChatPostDelete(msg.id)}
                                ></div>
                              )}
                            {superAdmin && (
                              <div
                                title="Delete"
                                className="deleteChatMsg"
                                onClick={(e) => handleChatPostDelete(msg.id)}
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
            {!chatBan && (
              <div className="typeLine">
                <textarea
                  rows={1}
                  className="chatTypeLine"
                  onKeyDown={(e) => keyCheck(e)}
                  onChange={(e) => {
                    chat(e);
                  }}
                ></textarea>
                <div
                  id={(darkMode && "sendChatMsgDark") || ""}
                  title="Send Message"
                  className="sendChatMsg"
                  onClick={() => sendChatMsgButton()}
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
            )}
          </div>
        )}
        <OnlineUsers
          myChatImg={myChatImg}
          myUserId={myUserId}
          emojiBar={emojiBar}
          setEmojiBar={(e: boolean) => setEmojiBar(e)}
          sendEmoji={(e: any) => sendEmoji(e)}
          myChatColor={myChatColor}
          setMyChatImg={(e: string) => setMyChatImg(e)}
          openPrivate={(e: any, img: any) => openPrivate(e, img)}
          setPrivatePic={(e: any) => setPrivatePic(e)}
          setPrivateNick={(e: any) => setPrivateNick(e)}
          setPrivateMode={(e: boolean) => setPrivateMode(e)}
          privateMode={privateMode}
          privateNick={privateNick}
          privatePic={privatePic}
          privateMessages={privateMessages}
          setFilteredPrivateMessages={(e: any) => setFilteredPrivateMessages(e)}
          guest={guest}
          myNickname={myNickname}
          setMyNickname={(e: string) => setMyNickname(e)}
          setAdmin={(e: boolean) => setAdmin(e)}
          onlineUsers={onlineUsers}
          darkMode={darkMode}
          superAdmin={superAdmin}
          configTimer={configTimer}
          setConfigTimer={(e: any) => setConfigTimer(e)}
          chatBan={chatBan}
          horn={horn}
          playNotification={() => playNotification()}
          shakeUser={shakeUser}
          setShakeUser={(e: boolean) => setShakeUser(e)}
        />
      </div>
      {!chatBan && (
        <div
          className="jukeBox"
          onClick={(e) => {
            if (!nightFlightProg) {
              setNightFlightProg(
                radioBroadcasts.radioBroadcasts[
                  radioBroadcasts.radioBroadcasts.length - 1
                ]
              );
            } else {
              setNightFlightProg(false);
            }
          }}
        ></div>
      )}
      {!chatBan && (
        <div
          className="tickerButton"
          onClick={(e) => {
            toggleTicker(!tickerBar);
          }}
        >
          {tickerBar && `Stop Ticker`} {!tickerBar && `Start Ticker`}
        </div>
      )}
      {!chatBan && (
        <div
          className={(darkMode && "DarkMode") || "lightMode"}
          onClick={(e) => {
            setDarkMode(!darkMode);
          }}
        ></div>
      )}
    </div>
  );
};
