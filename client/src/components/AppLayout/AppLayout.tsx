import React from "react";
import { Outlet } from "react-router-dom";

import { AppBar } from "../AppBar/AppBar";

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
  setPlayerPosition: (x: number, y: number) => void;
  setChatNotification: (e: boolean) => void;
  chatMode: boolean;
  setAboutMode: (e: boolean) => void;
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
}) => {
  return (
    <div
      className={
        (aboutMode && "appContainerAbout") ||
        (maps && "appContainerMap") ||
        (darkMode && "appContainerDark") ||
        (!darkMode && "appContainer") ||
        ""
      }
      style={{
        backgroundImage: (aboutMode && `url(/about/about1.jpg)`) || "",
      }}
    >
      {" "}
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
        setPlayerPosition={(x: number, y: number) => setPlayerPosition(x, y)}
        setChatNotification={(e: boolean) => setChatNotification(e)}
        chatNotification={chatNotification}
        chatMode={chatMode}
        setAboutMode={(e: boolean) => setAboutMode(e)}
      />
      <Outlet />
    </div>
  );
};
