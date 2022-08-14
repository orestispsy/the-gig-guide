import React, { useRef, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import useSound from "use-sound";
import { AppBar } from "../AppBar/AppBar";
import kickedOut from "./../../../public/kickedOut.mp3";

const { runDotAnime, banCountDown } = require("./AppLayoutUtils");

interface Props {
  aboutMode: boolean;
  darkMode: boolean;
  maps: boolean;
  myUserId: number | undefined;
  myChatImg: string;
  chatNotification: boolean;
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
  setPrivateMsgNotification: (e: boolean) => void;
  privateMsgNotification: boolean;
  chatMode: boolean;
  setAboutMode: (e: boolean) => void;
  adminControls: boolean;
  gigListOpen: boolean;
  loaded: boolean;
  setLoaded: (e: boolean) => void;
  setTop: (e: number) => void;
  setLeft: (e: number) => void;
  addMode: boolean;
  editMode: boolean;
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
  setTimelineCommentsMode: (e: boolean) => void;
  timelineGigsMode: boolean;
  setTimelineGigsMode: (e: boolean) => void;
  timelineGalleriesMode: boolean;
  setTimelineGalleriesMode: (e: boolean) => void;
  profileBlocked: boolean;
  profileBanned: boolean;
  mute: boolean;
}

export const AppLayout: React.FC<Props> = ({
  maps,
  aboutMode,
  darkMode,
  myUserId,
  myChatImg,
  chatNotification,
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
  setAboutMode,
  adminControls,
  gigListOpen,
  loaded,
  setLoaded,
  setTop,
  setLeft,
  addMode,
  editMode,
  animeMode,
  gigEntryMode,
  mapMode,
  gigLocation,
  animeMusic,
  setAnimeMusic,
  setChatMode,
  chatModeClosed,
  setChatModeClosed,
  privateMode,
  setPrivateMode,
  timelineMode,
  admin,
  superAdmin,
  timelineCommentsMode,
  setTimelineCommentsMode,
  timelineGigsMode,
  setTimelineGigsMode,
  timelineGalleriesMode,
  setTimelineGalleriesMode,
  profileBlocked,
  profileBanned,
  privateMsgNotification,
  setPrivateMsgNotification,
  mute,
}) => {
  let elemRef = useRef<any>();
  const [dotCounter, setDotCounter] = useState(0);
  const [aboutBackIsLoaded, setAboutBackIsLoaded] = useState(false);

  const banTimer = useSelector((state: any) => state && state.ban_timer);

  const timerRef = useRef<HTMLDivElement>(null);

  const [playKickedOut] = useSound(kickedOut, { volume: 0.75 });
  useEffect(() => {
    if (profileBanned) {
      banCountDown(timerRef, playKickedOut, banTimer);
    }
  }, [profileBanned]);

  useEffect(() => {
    if (elemRef.current) {
      runDotAnime(loaded, elemRef, dotCounter, setDotCounter);
    }
  }, [dotCounter]);

  return (
    <div
      className="layoutContainer"
      style={{
        animation:
          (loaded && `fadeIntroColorRewind 1.5s ease-in-out`) ||
          `fadeIntroColor 1.5s ease-in-out`,
        backgroundColor: (loaded && `transparent `) || `rgba(0, 0, 0, 0.418)`,
      }}
    >
      {!loaded && (
        <div className="loadingIntro">
          <div> Loading</div>
          <div className="dots" ref={elemRef}>
            <div className="dot">.</div>
            <div className="dot">.</div>
            <div className="dot">.</div>
          </div>
        </div>
      )}
      {aboutMode && (
        <img
          onLoad={() => {
            setAboutBackIsLoaded(true);
          }}
          src="/about/about1.jpg"
          className="aboutBackground"
        ></img>
      )}
      <div
        className={
          (aboutMode && "appContainerAbout") ||
          (gigListOpen && "appContainerDark") ||
          (adminControls && "appContainerDark") ||
          (timelineMode && "appContainerDark") ||
          (maps && "appContainerMap") ||
          (darkMode && "appContainerDark") ||
          (!darkMode && "appContainer") ||
          ""
        }
        style={{
          justifyContent: (!loaded && `center`) || ``,
          visibility: (loaded && `visible`) || `hidden`,
          animation: (loaded && `fadeAbout 1s ease-in-out`) || ``,
          height: (!loaded && `0`) || `100%`,
          backgroundImage:
            (aboutMode && "none") ||
            (!aboutMode &&
              !gigListOpen &&
              !adminControls &&
              !maps &&
              !timelineMode &&
              !darkMode &&
              "url('/road.png')") ||
            "",
        }}
        onLoad={(e) =>
          setTimeout((e) => {
            setLoaded(true);
          }, 2000)
        }
      >
        <AppBar
          myUserId={myUserId}
          myChatImg={myChatImg}
          myNickname={myNickname}
          setNightFlightProg={(e: any) => setNightFlightProg(e)}
          nightFlightProg={nightFlightProg}
          maps={maps}
          setGigEntry={(e: number | null) => setGigEntry(e)}
          mapVisible={(e: boolean) => mapVisible(e)}
          top={top}
          left={left}
          setTop={(e: number) => setTop(e)}
          setLeft={(e: number) => setLeft(e)}
          setPlayerPosition={(
            x: number,
            y: number,
            setTop: (e1: number) => void,
            setLeft: (e2: number) => void
          ) => setPlayerPosition(x, y, setTop, setLeft)}
          setChatNotification={(e: boolean) => setChatNotification(e)}
          chatNotification={chatNotification}
          chatMode={chatMode}
          aboutMode={aboutMode}
          setAboutMode={(e: boolean) => setAboutMode(e)}
          adminControls={adminControls}
          editMode={editMode}
          addMode={addMode}
          gigListOpen={gigListOpen}
          animeMode={animeMode}
          gigEntryMode={gigEntryMode}
          mapMode={mapMode}
          gigLocation={gigLocation}
          animeMusic={animeMusic}
          setAnimeMusic={(e: boolean) => setAnimeMusic(e)}
          setChatMode={(e: boolean) => setAnimeMusic(e)}
          setChatModeClosed={(e: boolean) => setChatModeClosed(e)}
          chatModeClosed={chatModeClosed}
          privateMode={privateMode}
          setPrivateMode={(e: boolean) => setPrivateMode(e)}
          timelineMode={timelineMode}
          admin={admin}
          superAdmin={superAdmin}
          timelineCommentsMode={timelineCommentsMode}
          timelineGigsMode={timelineGigsMode}
          timelineGalleriesMode={timelineGalleriesMode}
          privateMsgNotification={privateMsgNotification}
          setPrivateMsgNotification={(e: boolean) =>
            setPrivateMsgNotification(e)
          }
          mute={mute}
        />
        {(!profileBlocked && !profileBanned && <Outlet />) ||
          (profileBanned && (
            <div className="banContainer">
              <div className="chatBanCover">
                YOU'VE BEEN BANNED !<span>Take a Deep Breath,</span>{" "}
                <span>and Try Again </span>
                <h1>Seconds Remaining</h1>
                <div id="timer" ref={timerRef}>
                  {banTimer && banTimer}
                </div>
              </div>
            </div>
          )) ||
          (profileBlocked && (
            <div className="blockContainer">
              <div>YOU'VE BEEN BLOCKED</div>
            </div>
          ))}
      </div>
    </div>
  );
};
