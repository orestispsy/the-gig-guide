import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { MixCloudPlayer } from "./../MixCloudPlayer/MixCloudPlayer";
import useSound from "use-sound";
import hyperfx from "./../../../public/hyperfx.mp3";
import privateMSGSfx from "./../../../public/privateMSG.mp3";

const {
  chatNewPostNotification,
  appNavigate,
  chatNavigate,
  mainPageNavigate,
} = require("./AppBarUtils");

interface Props {
  myUserId: number | undefined;
  myChatImg: string;
  chatNotification: boolean;
  maps: boolean;
  myNickname: string;
  mapVisible: (e: boolean) => void;
  setNightFlightProg: (e: any) => void;
  nightFlightProg: any;
  setGigEntry: (e: number | null) => void;
  top: number | string;
  left: number | string;
  setPlayerPosition: (
    x: number,
    y: number,
    setTop: (e: number) => void,
    setLeft: (e: number) => void
  ) => void;
  setChatNotification: (e: boolean) => void;
  chatMode: boolean;
  aboutMode: boolean;
  setAboutMode: (e: boolean) => void;
  adminControls: boolean;
  setTop: (e: number) => void;
  setLeft: (e: number) => void;
  addMode: boolean;
  editMode: boolean;
  gigListOpen: boolean;
  animeMode: boolean;
  gigEntryMode: boolean;
  mapMode: boolean;
  gigLocation: string;
  setAnimeMusic: (e: boolean) => void;
  animeMusic: boolean;
  setChatMode: (e: boolean) => void;
  chatModeClosed: boolean;
  setChatModeClosed: (e: boolean) => void;
  privateMode: boolean;
  setPrivateMode: (e: boolean) => void;
  timelineMode: boolean;
  admin: boolean;
  superAdmin: boolean;
  timelineCommentsMode: boolean;
  timelineGigsMode: boolean;
  timelineGalleriesMode: boolean;
  setPrivateMsgNotification: (e: boolean) => void;
  privateMsgNotification: boolean;
  mute: boolean;
}

type LocationProps = {
  state: {
    previousPath: string;
    latest?: boolean;
  };
  pathname: string;
};

export const AppBar: React.FC<Props> = ({
  myUserId,
  myChatImg,
  chatNotification,
  maps,
  myNickname,
  setGigEntry,
  mapVisible,
  setNightFlightProg,
  nightFlightProg,
  top,
  left,
  setPlayerPosition,
  setChatNotification,
  chatMode,
  aboutMode,
  setAboutMode,
  adminControls,
  setTop,
  setLeft,
  addMode,
  editMode,
  gigListOpen,
  animeMode,
  gigEntryMode,
  mapMode,
  gigLocation,
  animeMusic,
  setAnimeMusic,
  setChatMode,
  setChatModeClosed,
  chatModeClosed,
  privateMode,
  setPrivateMode,
  timelineMode,
  admin,
  superAdmin,
  timelineCommentsMode,
  timelineGigsMode,
  timelineGalleriesMode,
  privateMsgNotification,
  setPrivateMsgNotification,
  mute,
}) => {
  const [playSlideFx] = useSound(hyperfx, { volume: 0.6 });
  const [playPrivateMsg] = useSound(privateMSGSfx, { volume: 0.75 });

  const navigate = useNavigate();

  const currentLocation = useLocation() as unknown as LocationProps;
  const { state, pathname } = currentLocation;

  const chatMessages = useSelector((state: any) => state && state.chatMessages);
  const privateMessages = useSelector((state: any) => state && state.messages);

  const [gigUpdatedMode, setGigUpdatedMode] = useState<boolean>(false);

  useEffect(
    function () {
      if (chatMessages) {
        chatNewPostNotification(
          chatNotification,
          chatMode,
          chatMessages,
          setChatNotification,
          setPrivateMsgNotification,
          playSlideFx,
          mute
        );
      } else {
        return;
      }
    },
    [chatMessages]
  );

  useEffect(
    function () {
      if (
        privateMessages &&
        privateMessages[privateMessages.length - 1] &&
        !chatMode
      ) {
        if (
          privateMessages[privateMessages.length - 1].msg_receiver_id ==
          myUserId
        ) {
          setChatNotification(false);
          setPrivateMsgNotification(true);
          if (!mute) {
            playPrivateMsg();
          }
        }
      } else {
        return;
      }
    },
    [privateMessages]
  );

  useEffect(
    function () {
      if (state && state.latest && state.previousPath === "/timeline") {
        setGigUpdatedMode(true);
      }
    },
    [state]
  );

  return (
    <div className="appBar" id={(maps && "appBar") || ""}>
      <div className="barLeftSection">
        <img
          title="Main Page"
          src={myChatImg || "../../avatar.png"}
          className="barProfileImage"
          onClick={(e) => {
            mainPageNavigate(
              setAboutMode,
              mapVisible,
              animeMusic,
              setAnimeMusic,
              setChatModeClosed,
              chatModeClosed,
              navigate,
              pathname
            );
          }}
        ></img>

        <div>
          <div
            title="Chat Room"
            className="chatBar"
            onTransitionEndCapture={() => {
              setPrivateMsgNotification(false);
            }}
            id={
              (privateMsgNotification && "privateChatBar") ||
              (chatNotification && !chatMode && "chatBar") ||
              ""
            }
            onClick={(e) => {
              chatNavigate(
                mapVisible,
                setAboutMode,
                setChatModeClosed,
                chatModeClosed,
                setPrivateMode,
                animeMusic,
                setAnimeMusic,
                navigate,
                pathname
              );
            }}
          ></div>
        </div>

        <div className="barProfile">{!maps && myNickname}</div>
      </div>

      {maps && (
        <a target="_blank" href="https://www.1000mods.com">
          <div className="logo2Back">
            <div className="logo2"></div>
          </div>
        </a>
      )}

      {chatModeClosed &&
        (maps ||
          adminControls ||
          aboutMode ||
          addMode ||
          chatMode ||
          editMode ||
          gigListOpen ||
          animeMode ||
          gigEntryMode ||
          timelineMode) && (
          <div
            className="navButton"
            onClick={(e) => {
              appNavigate(
                setGigEntry,
                mapVisible,
                setAboutMode,
                timelineGigsMode,
                gigUpdatedMode,
                setGigUpdatedMode,
                timelineGalleriesMode,
                timelineCommentsMode,
                timelineCommentsMode,
                maps,
                adminControls,
                editMode,
                animeMode,
                animeMusic,
                setAnimeMusic,
                gigEntryMode,
                privateMode,
                setPrivateMode,
                chatMode,
                setChatModeClosed,
                chatModeClosed,
                addMode,
                gigListOpen,
                gigLocation,
                aboutMode,
                navigate,
                pathname
              );
            }}
          >
            <div title="Back" className="arrowBack">
              <div className="arrow"></div>
            </div>
          </div>
        )}

      {nightFlightProg && (
        <MixCloudPlayer
          top={top}
          left={left}
          setTop={(e: number) => setTop(e)}
          setLeft={(e: number) => setLeft(e)}
          nightFlightProg={nightFlightProg}
          setNightFlightProg={(e: any) => setNightFlightProg(e)}
          setPlayerPosition={(
            x: number,
            y: number,
            setTop: (e1: number) => void,
            setLeft: (e2: number) => void
          ) => setPlayerPosition(x, y, setTop, setLeft)}
        />
      )}
    </div>
  );
};

export default AppBar;
