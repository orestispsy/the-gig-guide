import React, { useState, useEffect, useRef } from "react";

import axios from "../../common/Axios/axios";
import { socket } from "../../common/Socket/socket";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SideBar } from "./SideBar/SideBar";
import { ChatScreen } from "./ChatScreen/ChatScreen";
import { Ticker } from "../Ticker/Ticker";
import { PrivateMSGS } from "./PrivateMSGS/PrivateMSGS";

import {
  Container,
  MobileChat,
  Jukebox,
  TickerToggler,
  ThemeToggler,
} from "./Chat.style";

import useSound from "use-sound";

import chatSfx from "./../../../public/msg.mp3";
import chatEnterSfx from "./../../../public/chatEnter.mp3";
import hornSfx from "./../../../public/horn.mp3";
import privateMSGSfx from "./../../../public/privateMSG.mp3";

const {
  setChatScrollBarPosition,
  checkBrowserCount,
  chatMessageActions,
  chatUserOnlineChecker,
  playNotification,
  setScrollBarBottom,
  next20ChatMsgs,
  toggleTicker,
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
  setPrivateMsgNotification: (e: boolean) => void;
  onlineUsers: any;
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
  setPrivateMsgNotification,
  onlineUsers,
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
  const [playHorn] = useSound(hornSfx, { volume: 0.75 });
  const [playPrivateMsg] = useSound(privateMSGSfx, { volume: 0.75 });

  const elemRef = useRef<HTMLDivElement>(null);

  const chatMessages = useSelector((state: any) => state && state.chatMessages);
  const browserCount = useSelector((state: any) => state && state.count);
  const horn = useSelector((state: any) => state && state.horn);

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
    setPrivateMsgNotification(false);
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
    if (!chatModeClosed) {
      if (browserCount == 1) {
        socket.emit("A CHAT MSG", "--##--left--##--");
        chatUserOnlineChecker(false, onlineUsers, myUserId);
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
      setTimeout((e) => {
        horn.admin_shaked = false;
      }, 500);
    }
  }, [horn]);

  useEffect(() => {
    if (chatModeClosed) {
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
    }
  }, [chatMessages]);

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
    <Container>
      {tickerBar && <Ticker tickerBar={tickerBar} darkMode={darkMode} />}
      <MobileChat>
        {privateMode && (
          <PrivateMSGS
            myUserId={myUserId}
            userPrivate={userPrivate}
            myChatImg={myChatImg}
            privatePic={privatePic}
            myNickname={myNickname}
            privateNick={privateNick}
            setFilteredPrivateMessages={(e: any) =>
              setFilteredPrivateMessages(e)
            }
            darkMode={darkMode}
            playPrivateMsg={() => playPrivateMsg()}
            playNotification={(mute: boolean, playPrivateMsg: () => void) =>
              playNotification(mute, playPrivateMsg)
            }
            mute={mute}
            setPrivateMode={(e: boolean) => setPrivateMode(e)}
          />
        )}

        {!privateMode && (
          <ChatScreen
            superAdmin={superAdmin}
            darkMode={darkMode}
            mute={mute}
            setEmojiBar={(e: boolean) => setEmojiBar(e)}
            shakeUser={shakeUser}
            horn={horn}
            setPostScroll={(e: boolean) => setPostScroll(e)}
            elemRef={elemRef}
            admin={admin}
            chatMessages={chatMessages}
            chatMSG={chatMSG}
            setChatMSG={(e: any) => setChatMSG(e)}
            setMute={(e: boolean) => setMute(e)}
            emojiBar={emojiBar}
            myUserId={myUserId}
            setScrollTop={(e: number) => setScrollTop(e)}
          />
        )}
        <SideBar
          myChatImg={myChatImg}
          myUserId={myUserId}
          emojiBar={emojiBar}
          setEmojiBar={(e: boolean) => setEmojiBar(e)}
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
          horn={horn}
          playNotification={(mute: boolean, playPrivateMsg: () => void) =>
            playNotification(mute, playPrivateMsg)
          }
          playPrivateMsg={() => playPrivateMsg()}
          shakeUser={shakeUser}
          setShakeUser={(e: boolean) => setShakeUser(e)}
          mute={mute}
        />
      </MobileChat>

      <Jukebox
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
      ></Jukebox>

      <TickerToggler
        onClick={(e) => {
          toggleTicker(!tickerBar, setTickerBar);
        }}
      >
        {tickerBar && `Stop Ticker`} {!tickerBar && `Start Ticker`}
      </TickerToggler>

      <ThemeToggler
        dark={darkMode}
        onClick={(e) => {
          changePageMode();
        }}
      ></ThemeToggler>
    </Container>
  );
};
