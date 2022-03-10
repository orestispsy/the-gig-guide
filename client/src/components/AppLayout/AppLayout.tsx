import React, { useRef, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { AppBar } from "../AppBar/AppBar";

const { runDotAnime } = require("./AppLayoutUtils");

interface Props {
  aboutMode: boolean;
  darkMode: boolean;
  maps: boolean;
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
  chatMode: boolean;
  setAboutMode: (e: boolean) => void;
  adminControls: boolean;
  gigListOpen: boolean;
  loaded: boolean;
  setLoaded: (e: boolean) => void;
  setTop: (e: number) => void;
  setLeft: (e: number) => void;
}

export const AppLayout: React.FC<Props> = ({
  maps,
  aboutMode,
  darkMode,
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
}) => {
  let elemRef = useRef<any>();
  const [dotCounter, setDotCounter] = useState(0);

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
      <div
        className={
          (aboutMode && "appContainerAbout") ||
          (gigListOpen && "appContainerDark") ||
          (adminControls && "appContainerDark") ||
          (maps && "appContainerMap") ||
          (darkMode && "appContainerDark") ||
          (!darkMode && "appContainer") ||
          ""
        }
        style={{
          justifyContent: (!loaded && `center`) || ``,
          visibility: (loaded && `visible`) || `hidden`,
          animation: (loaded && `fadeAbout 1s ease-in-out`) || ``,
          height: (!loaded && `0`) || `100vh`,
          backgroundImage:
            (aboutMode && `url(/about/about1.jpg)`) ||
            (!aboutMode &&
              !gigListOpen &&
              !adminControls &&
              !maps &&
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
          setAboutMode={(e: boolean) => setAboutMode(e)}
          adminControls={adminControls}
        />
        <Outlet />
      </div>
    </div>
  );
};