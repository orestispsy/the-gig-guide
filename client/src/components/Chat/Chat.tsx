import React, { useState, useEffect, useRef } from "react";

import axios from "../../common/Axios/axios";
import { socket } from "../../common/Socket/socket";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { OnlineUsers } from "../OnlineUsers/OnlineUsers";
import { Ticker } from "../Ticker/Ticker";
import { PrivateMSGS } from "../PrivateMSGS/PrivateMSGS";

import useSound from "use-sound";

import chatSfx from "./../../../public/msg.mp3";
import chatEnterSfx from "./../../../public/chatEnter.mp3";
import kickedOut from "./../../../public/kickedOut.mp3";
import hornSfx from "./../../../public/horn.mp3";
import privateMSGSfx from "./../../../public/privateMSG.mp3";

const {
  setChatScrollBarPosition,
  checkBrowserCount,
  chatMessageActions,
  chatUserOnlineChecker,
  playNotification,
  setScrollBarBottom,
  keyCheck,
  setChatMSGChange,
  sendChatMSGButton,
  banCountDown,
  next20ChatMsgs,
  moveScrollbarToTop,
  moveScrollbarToBottom,
  sendEmoji,
  toggleTicker,
  handleChatPostDelete,
} = require("./ChatUtils");

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
  setAdminControls: (e: boolean) => void;
  setGigListOpen: (e: boolean) => void;
  userSelectedMode: boolean;
  setUserSelectedMode: (e: boolean) => void;
  setMapMode: (e: boolean) => void;
  setGigEntryMode: (e: boolean) => void;
  privateMode: boolean;
  setPrivateMode: (e: boolean) => void;
  chatMode: boolean;
  chatModeClosed: boolean;
  setChatModeClosed: (e: boolean) => void;
  mute: boolean;
  setMute: (e: boolean) => void;
  setTimelineMode: (e: boolean) => void;
  setTimelineScrollTop: (e: number) => void;
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
  setAdminControls,
  setGigListOpen,
  userSelectedMode,
  setUserSelectedMode,
  setMapMode,
  setGigEntryMode,
  privateMode,
  setPrivateMode,
  chatMode,
  chatModeClosed,
  setChatModeClosed,
  setMute,
  mute,
  setTimelineMode,
  setTimelineScrollTop,
}) => {
  const [emojiBar, setEmojiBar] = useState<boolean>(false);
  const [tickerBar, setTickerBar] = useState<boolean>(false);

  const [postScroll, setPostScroll] = useState<boolean>(false);
  const [scrollTop, setScrollTop] = useState<number>(2);

  const [userPrivate, setUserPrivate] = useState<number | undefined>();
  const [privatePic, setPrivatePic] = useState<any>(false);
  const [privateNick, setPrivateNick] = useState(false);
  const [privateMessages, setFilteredPrivateMessages] = useState(false);
  const [configTimer, setConfigTimer] = useState(false);
  const [shakeUser, setShakeUser] = useState(false);
  const [chatMSG, setChatMSG] = useState<any>(false);

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

  let chatTypeLine: any = document.querySelectorAll(".chatTypeLine");
  let fixedTime: string;
  let fixedDate: string;
  let fixedHours: number;
  let timePreFix: string;
  let msgDate;
  let msgTime;
  let diff = new Date().getTimezoneOffset() / -60;

  let navigate = useNavigate();

  useEffect(() => {
    setGigListOpen(false);
    setAdminControls(false);
    setMaps(false);
    setChatMode(true);
    setMapMode(false);
    setGigEntryMode(false);
    setChatScrollBarPosition(elemRef);
    setDarkMode(userSelectedMode);
    setPrivateMode(false);
    setTimelineMode(false);
    setTimelineScrollTop(0);
  }, []);

  useEffect(() => {
    if (myUserId) {
      setTimeout(() => {
        axios
          .post("/set-mute", { mute: mute })
          .then(({ data }) => {})
          .catch((err) => {
            console.log(err);
          });
      }, 300);
    }
  }, [mute]);

  useEffect(() => {
    if (chatBan) {
      setPrivateMode(false);
      banCountDown(timerRef, playKickedOut, banTimer);
    }
  }, [chatBan]);

  useEffect(() => {
    if (!chatModeClosed) {
      {
        if (browserCount == 1) {
          socket.emit("A CHAT MSG", "--##--left--##--");
          chatUserOnlineChecker(false, onlineUsers, myUserId);
        }
      }
      setTimeout(() => {
        navigate("/");
      }, 300);
    }
  }, [chatModeClosed]);

  useEffect(() => {
    if (chatMessages && elemRef.current) {
      if (scrollTop < 1) {
        elemRef.current.scrollTop = 100;
        next20ChatMsgs(elemRef, setPostScroll, chatMessages);
      }
    }
  }, [scrollTop]);

  useEffect(() => {
    checkBrowserCount(browserCount);
  }, [browserCount]);

  useEffect(() => {
    if (elemRef.current) {
      setScrollBarBottom(elemRef, scrollTop);
    }
  }, [privateMode]);

  useEffect(() => {
    if (horn && horn.horn && !mute) {
      playHorn();

      horn.admin_shaked = false;
    }
  }, [horn]);

  useEffect(() => {
    chatMessageActions(
      chatMessages,
      myUserId,
      mute,
      elemRef,
      play,
      playIntro,
      postScroll,
      setPostScroll,
      scrollTop
    );
  }, [chatMessages]);

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

  const changePageMode = () => {
    axios
      .post("/set-page-mode", { darkMode: !darkMode })
      .then(({ data }) => {
        setUserSelectedMode(!darkMode);
        setDarkMode(!darkMode);
      })
      .catch((err) => {
        console.log(err);
      });
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
          playPrivateMsg={() => playPrivateMsg()}
          playNotification={(mute: boolean, playPrivateMsg: () => void) =>
            playNotification(mute, playPrivateMsg)
          }
          mute={mute}
          privateMode={privateMode}
          setPrivateMode={(e: boolean) => setPrivateMode(e)}
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
            {!chatBan && (
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
            )}
            <div
              className="chatHeadline"
              id={(darkMode && "chatHeadlineDark") || ""}
            >
              {!chatBan && <div id="chatTitle">Chat Room</div>}
            </div>

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
                    <span>Chill Your Ass and.. </span>
                    <a onClick={() => location.replace("/")}>Try Again</a>
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
            {!chatBan && (
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
          setUserPrivate={(e: any) => setUserPrivate(e)}
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
          playNotification={(mute: boolean, playPrivateMsg: () => void) =>
            playNotification(mute, playPrivateMsg)
          }
          playPrivateMsg={() => playPrivateMsg()}
          shakeUser={shakeUser}
          setShakeUser={(e: boolean) => setShakeUser(e)}
          mute={mute}
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
            toggleTicker(!tickerBar, setTickerBar);
          }}
        >
          {tickerBar && `Stop Ticker`} {!tickerBar && `Start Ticker`}
        </div>
      )}
      {!chatBan && (
        <div
          className={(darkMode && "DarkMode") || "lightMode"}
          onClick={(e) => {
            changePageMode();
          }}
        ></div>
      )}
    </div>
  );
};
