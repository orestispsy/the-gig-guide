import React, { useRef, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { GlobalStyles } from "./../../common/GlobalStyles.style";
import { BanOrBlock } from "./../BanOrBlock/BanOrBlock";
import { Loading } from "./../Loading/Loading";

import {
  LayoutContainer,
  AboutBackground,
  GeneralAppContainer,
  Road,
  Sky,
} from "./AppLayout.style";

import { AppBar } from "../AppBar/AppBar";

const { runDotAnime } = require("./AppLayoutUtils");

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
  roadLoaded: boolean;
  setRoadLoaded: (e: boolean) => void;
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
  finalLoadingCheck: boolean;
  setSkyIsLoaded: (e: boolean) => void;
  skyIsLoaded: boolean;
  loadPercentage: number;
  setAboutBackIsLoaded: (e: boolean) => void;
  aboutBackIsLoaded: boolean;
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
  roadLoaded,
  setRoadLoaded,
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
  finalLoadingCheck,
  setSkyIsLoaded,
  skyIsLoaded,
  loadPercentage,
  aboutBackIsLoaded,
  setAboutBackIsLoaded,
}) => {
  let elemRef = useRef<any>();
  const [dotCounter, setDotCounter] = useState(0);

  useEffect(() => {
    if (elemRef.current) {
      runDotAnime(finalLoadingCheck, elemRef, dotCounter, setDotCounter);
    }
  }, [dotCounter]);

  return (
    <>
      <LayoutContainer loaded={finalLoadingCheck}>
        <GlobalStyles />

        {!finalLoadingCheck && <Loading loadPercentage={loadPercentage} />}

        <Road
          skyIsLoaded={skyIsLoaded}
          gigListOpen={gigListOpen}
          adminControls={adminControls}
          maps={maps}
          timelineMode={timelineMode}
          darkMode={darkMode}
          loaded={finalLoadingCheck}
          onLoad={() => {
            setTimeout(() => {
              setRoadLoaded(true);
            }, 2000);
          }}
          src={`/road.png`}
        />

        <Sky
          loaded={skyIsLoaded}
          src={`/sky.jpg`}
          onLoad={() => {
            setSkyIsLoaded(true);
            if (darkMode) {
              setRoadLoaded(true);
            }
          }}
        />

        <AboutBackground
          aboutBackIsLoaded={aboutBackIsLoaded && aboutMode}
          onLoad={() => {
            setAboutBackIsLoaded(true);
          }}
          src="/about/about1.jpg"
        ></AboutBackground>

        {skyIsLoaded && (
          <GeneralAppContainer
            loaded={finalLoadingCheck}
            aboutMode={aboutMode}
            gigListOpen={gigListOpen}
            adminControls={adminControls}
            maps={maps}
            timelineMode={timelineMode}
            darkMode={darkMode}
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
              ((profileBanned || profileBlocked) && (
                <BanOrBlock
                  profileBanned={profileBanned}
                  profileBlocked={profileBlocked}
                />
              ))}
          </GeneralAppContainer>
        )}
      </LayoutContainer>
    </>
  );
};
