import React, { useEffect, useState } from "react";
import axios from "../../common/Axios/axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { AppLayout } from "../AppLayout/AppLayout";
import { Main } from "../Main/Main";
import MyMap from "../Map/Map";
import { GigCreator } from "../GigCreator/GigCreator";
import { GigEditor } from "../GigEditor/GigEditor";
import { GigList } from "../GigList/GigList";
import { Chat } from "../Chat/Chat";
import { GigListAnimation } from "../GigListAnimation/GigListAnimation";
import { GigEntry } from "../GigEntry/GigEntry";
import { SuperAdmin } from "../SuperAdmin/SuperAdmin";
import { About } from "../About/About";
import { Timeline } from "../Timeline/Timeline";

import "./../../../public/style.css";

import radioBroadcasts from "../../common/radioBroadcasts";

const {
  axiosGetUserDetails,
  axiosGetGigs,
  axiosGetCounter,
  setPlayerPosition,
} = require("./AppUtils");

interface Props {}

export const App: React.FC<Props> = ({}) => {
  const [myUserId, setMyUserId] = useState<number | undefined>();
  const [myNickname, setMyNickname] = useState<string>("");
  const [myChatImg, setMyChatImg] = useState<string>("");
  const [myChatColor, setMyChatColor] = useState<string>("");
  const [guest, setGuest] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const [superAdmin, setSuperAdmin] = useState<boolean>(false);
  const [maps, setMaps] = useState<boolean>(false);
  const [adminControls, setAdminControls] = useState<boolean>(false);
  const [gigListOpen, setGigListOpen] = useState<boolean>(false);
  const [visitors, setVisitors] = useState<number | boolean>(false);
  const [top, setTop] = useState<number | string>("1%");
  const [left, setLeft] = useState<number | string>("35%");
  const [selectedGigEntry, setSelectedGigEntry] = useState<number | null>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [userSelectedMode, setUserSelectedMode] = useState<boolean>(false);
  const [year, setYear] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [nightFlightProg, setNightFlightProg] = useState<
    boolean | any[] | string
  >(false);
  const [chatNotification, setChatNotification] = useState<boolean>(false);
  const [privateMsgNotification, setPrivateMsgNotification] =
    useState<boolean>(false);
  const [chatMode, setChatMode] = useState<boolean>(false);
  const [aboutMode, setAboutMode] = useState<boolean>(false);
  const [addMode, setAddMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [gigsList, setGigsList] = useState<any>();
  const [roadLoaded, setRoadLoaded] = useState<boolean>(false);
  const [loadedMain, setLoadedMain] = useState<boolean>(false);
  const [loadedMainDark, setLoadedMainDark] = useState<boolean>(false);
  const [profileBanned, setProfileBanned] = useState<boolean>(false);
  const [profileBlocked, setProfileBlocked] = useState<boolean>(false);
  const [animeMode, setAnimeMode] = useState<boolean>(false);
  const [gigEntryMode, setGigEntryMode] = useState<boolean>(false);
  const [mapMode, setMapMode] = useState<boolean>(false);
  const [privateMode, setPrivateMode] = useState<boolean>(false);
  const [gigLocation, setGigLocation] = useState<string>("");
  const [animeMusic, setAnimeMusic] = useState<boolean>(true);
  const [chatModeClosed, setChatModeClosed] = useState<boolean>(true);
  const [mute, setMute] = useState<boolean>(false);
  const [timelineMode, setTimelineMode] = useState<boolean>(false);
  const [timelineCommentsMode, setTimelineCommentsMode] =
    useState<boolean>(false);
  const [timelineGigsMode, setTimelineGigsMode] = useState<boolean>(false);
  const [timelineGalleriesMode, setTimelineGalleriesMode] =
    useState<boolean>(false);
  const [gigsListTimeline, setGigsListTimeline] = useState<any>();
  const [gigsListUpdatedTimeline, setGigsListUpdatedTimeline] = useState<any>();
  const [imagesTimeline, setImagesTimeline] = useState<any>();
  const [commentsTimeline, setCommentsTimeline] = useState<any>();
  const currentVisitors = useSelector((state: any) => state && state.visitors);
  const onlineUsers = useSelector((state: any) => state && state.onlineUsers);
  const chatBan = useSelector((state: any) => state && state.chat_ban);
  const blocked = useSelector((state: any) => state && state.block);
  const [timelineScrollTop, setTimelineScrollTop] = useState<number>(0);
  const [latestUpdatesMode, setLatestUpdatesMode] = useState<boolean>(false);
  const [retroList, setRetroList] = useState<boolean>(false);
  const [skyIsLoaded, setSkyIsLoaded] = useState<boolean>(false);
  const [finalLoadingCheck, setFinalLoadingCheck] = useState<boolean>(false);

  useEffect(function () {
    setMaps(false);
    axiosGetUserDetails(
      setMyUserId,
      setMyNickname,
      setAdmin,
      setSuperAdmin,
      setMyChatImg,
      setMyChatColor,
      setGuest,
      setDarkMode,
      setUserSelectedMode,
      setProfileBanned,
      setProfileBlocked,
      setMute
    );
    axiosGetGigs(setGigsList);
    axiosGetCounter(setVisitors);
  }, []);

  useEffect(
    function () {
      if (onlineUsers) {
        onlineUsers.forEach((user: any) => {
          if (user.id === myUserId && myNickname !== user.nickname) {
            setMyNickname(user.nickname);
          }
        });
      }
    },
    [onlineUsers]
  );

  useEffect(
    function () {
      if (!visitors) {
        axiosGetCounter(setVisitors);
        setVisitors(true);
      }
    },
    [currentVisitors]
  );
  const logOut = () => {
    axios
      .get("/logout")
      .then(() => {
        location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(
    function () {
      setProfileBlocked(blocked);
      if (blocked) {
        setTimeout(() => {
          logOut();
        }, 8000);
      }
    },
    [blocked]
  );

  useEffect(
    function () {
      setProfileBanned(chatBan);
    },
    [chatBan]
  );

  const checkOnLoad = () => {
    if (location.pathname && location.pathname === "/") {
      let logoLoader;
      logoLoader = darkMode ? loadedMainDark : loadedMain;
      if (roadLoaded && logoLoader && skyIsLoaded) {
        setFinalLoadingCheck(true);
      }
    } else {
      setTimeout(() => {
        setFinalLoadingCheck(true);
      }, 2000);
    }
  };

  useEffect(
    function () {
      checkOnLoad();
    },
    [roadLoaded, loadedMain, loadedMainDark, skyIsLoaded]
  );

  return (
    <Router>
      <Routes>
        <Route
          element={
            <AppLayout
              finalLoadingCheck={finalLoadingCheck}
              darkMode={darkMode}
              aboutMode={aboutMode}
              myUserId={myUserId}
              myChatImg={myChatImg}
              myNickname={myNickname}
              setNightFlightProg={(e: any) => setNightFlightProg(e)}
              nightFlightProg={nightFlightProg}
              maps={maps}
              setGigEntry={(e: number | null) => setSelectedGigEntry(e)}
              mapVisible={(e: boolean) => setMaps(e)}
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
              privateMsgNotification={privateMsgNotification}
              setPrivateMsgNotification={(e: boolean) =>
                setPrivateMsgNotification(e)
              }
              chatMode={chatMode}
              setAboutMode={(e: boolean) => setAboutMode(e)}
              adminControls={adminControls}
              gigListOpen={gigListOpen}
              roadLoaded={roadLoaded}
              setRoadLoaded={(e) => {
                setRoadLoaded(e);
              }}
              addMode={addMode}
              editMode={editMode}
              animeMode={animeMode}
              gigEntryMode={gigEntryMode}
              mapMode={mapMode}
              gigLocation={gigLocation}
              setAnimeMusic={(e: boolean) => setAnimeMusic(e)}
              animeMusic={animeMusic}
              setChatMode={(e: boolean) => setChatMode(e)}
              setChatModeClosed={(e: boolean) => setChatModeClosed(e)}
              chatModeClosed={chatModeClosed}
              privateMode={privateMode}
              setPrivateMode={(e: boolean) => setPrivateMode(e)}
              timelineMode={timelineMode}
              admin={admin}
              superAdmin={superAdmin}
              timelineCommentsMode={timelineCommentsMode}
              setTimelineCommentsMode={(e: boolean) =>
                setTimelineCommentsMode(e)
              }
              timelineGigsMode={timelineGigsMode}
              setTimelineGigsMode={(e: boolean) => setTimelineGigsMode(e)}
              timelineGalleriesMode={timelineGalleriesMode}
              setTimelineGalleriesMode={(e: boolean) =>
                setTimelineGalleriesMode(e)
              }
              profileBlocked={profileBlocked}
              profileBanned={profileBanned}
              mute={mute}
              setSkyIsLoaded={(e: boolean) => setSkyIsLoaded(e)}
              skyIsLoaded={skyIsLoaded}
            />
          }
        >
          <Route
            path="/"
            element={
              <Main
                superAdmin={superAdmin}
                admin={admin}
                visitors={visitors}
                darkMode={darkMode}
                setDarkMode={(e: boolean) => setDarkMode(e)}
                setChatNotification={(e: boolean) => setChatNotification(e)}
                setChatMode={(e: boolean) => setChatMode(e)}
                setAboutMode={(e: boolean) => setAboutMode(e)}
                setMaps={(e: boolean) => setMaps(e)}
                setAdminControls={(e: boolean) => setAdminControls(e)}
                setGigListOpen={(e: boolean) => setGigListOpen(e)}
                setLoadedMain={(e: boolean) => setLoadedMain(e)}
                setLoadedMainDark={(e: boolean) => setLoadedMainDark(e)}
                setGigEntry={(e: number | null) => setSelectedGigEntry(e)}
                userSelectedMode={userSelectedMode}
                setUserSelectedMode={(e: boolean) => setUserSelectedMode(e)}
                setEditMode={(e: boolean) => setEditMode(e)}
                setAddMode={(e: boolean) => setAddMode(e)}
                setAnimeMode={(e: boolean) => setAnimeMode(e)}
                setGigEntryMode={(e: boolean) => setGigEntryMode(e)}
                setMapMode={(e: boolean) => setMapMode(e)}
                setChatModeClosed={(e: boolean) => setChatModeClosed(e)}
                currentVisitors={currentVisitors}
                setVisitors={(e: number | boolean) => setVisitors(e)}
                setTimelineMode={(e: boolean) => setTimelineMode(e)}
                setTimelineCommentsMode={(e: boolean) =>
                  setTimelineCommentsMode(e)
                }
                setTimelineGigsMode={(e: boolean) => setTimelineGigsMode(e)}
                setTimelineGalleriesMode={(e: boolean) =>
                  setTimelineGalleriesMode(e)
                }
                setTimelineScrollTop={(e: number) => setTimelineScrollTop(e)}
                guest={guest}
                finalLoadingCheck={finalLoadingCheck}
              />
            }
          ></Route>

          <Route
            path="/gig-creator"
            element={
              <GigCreator
                admin={admin}
                darkMode={darkMode}
                setGigsList={(e: any) => setGigsList(e)}
                setAddMode={(e: boolean) => setAddMode(e)}
                setGigsListTimeline={(e: boolean) => setGigsListTimeline(e)}
              />
            }
          ></Route>
          <Route
            path="/gig-editor"
            element={
              <GigEditor
                gigsList={gigsList}
                admin={admin}
                darkMode={darkMode}
                setGigsList={(e: any) => setGigsList(e)}
                setEditMode={(e: boolean) => setEditMode(e)}
                setGigsListTimeline={(e: boolean) => setGigsListTimeline(e)}
              />
            }
          ></Route>
          <Route
            path="/map"
            element={
              <MyMap
                gigsList={gigsList}
                mapVisible={(e: boolean) => setMaps(e)}
                selectedGigEntry={selectedGigEntry}
                setGigEntry={(e: number | null) => setSelectedGigEntry(e)}
                setDarkMode={(e: boolean) => setDarkMode(e)}
                setMapMode={(e: boolean) => setMapMode(e)}
                setGigLocation={(e: string) => setGigLocation(e)}
              />
            }
          ></Route>
          <Route
            path="/gig-list"
            element={
              <GigList
                gigsList={gigsList}
                setDarkMode={(e: boolean) => setDarkMode(e)}
                year={year}
                setYear={(e: string | number | readonly string[] | undefined) =>
                  setYear(e)
                }
                setGigListOpen={(e: boolean) => setGigListOpen(e)}
                setAnimeMode={(e: boolean) => setAnimeMode(e)}
                mapVisible={(e: boolean) => setMaps(e)}
                setGigEntryMode={(e: boolean) => setGigEntryMode(e)}
                setMapMode={(e: boolean) => setMapMode(e)}
                retroList={retroList}
                setRetroList={(e: boolean) => setRetroList(e)}
              />
            }
          ></Route>
          <Route
            path="/gig-list-animation"
            element={
              <GigListAnimation
                gigsList={gigsList}
                setDarkMode={(e: boolean) => setDarkMode(e)}
                setAnimeMode={(e: boolean) => setAnimeMode(e)}
                setGigListOpen={(e: boolean) => setGigListOpen(e)}
                setAnimeMusic={(e: boolean) => setAnimeMusic(e)}
                animeMusic={animeMusic}
              />
            }
          ></Route>

          <Route
            path="/api/gig/:id"
            element={
              <GigEntry
                darkMode={darkMode}
                gigsList={gigsList}
                myUserId={myUserId}
                superAdmin={superAdmin}
                myNickname={myNickname}
                setDarkMode={(e: boolean) => setDarkMode(e)}
                setGigEntry={(e: number | null) => setSelectedGigEntry(e)}
                selectedGigEntry={selectedGigEntry}
                guest={guest}
                setGigEntryMode={(e: boolean) => setGigEntryMode(e)}
                setMapMode={(e: boolean) => setMapMode(e)}
                mapVisible={(e: boolean) => setMaps(e)}
                imagesTimeline={imagesTimeline}
                setImagesTimeline={(e: boolean) => setImagesTimeline(e)}
                commentsTimeline={commentsTimeline}
                setCommentsTimeline={(e: boolean) => setCommentsTimeline(e)}
              />
            }
          ></Route>

          <Route
            path="/chat"
            element={
              <Chat
                myChatImg={myChatImg}
                myUserId={myUserId}
                myChatColor={myChatColor}
                admin={admin}
                setAdmin={(e: boolean) => setAdmin(e)}
                superAdmin={superAdmin}
                setMyChatImg={(e: string) => setMyChatImg(e)}
                myNickname={myNickname}
                guest={guest}
                setMyNickname={(e: string) => setMyNickname(e)}
                darkMode={darkMode}
                setDarkMode={(e: boolean) => setDarkMode(e)}
                setNightFlightProg={(e: boolean | any[] | string) =>
                  setNightFlightProg(e)
                }
                radioBroadcasts={radioBroadcasts}
                nightFlightProg={nightFlightProg}
                setChatMode={(e: boolean) => setChatMode(e)}
                setMaps={(e: boolean) => setMaps(e)}
                setAdminControls={(e: boolean) => setAdminControls(e)}
                setGigListOpen={(e: boolean) => setGigListOpen(e)}
                userSelectedMode={userSelectedMode}
                setUserSelectedMode={(e: boolean) => setUserSelectedMode(e)}
                setMapMode={(e: boolean) => setMapMode(e)}
                setGigEntryMode={(e: boolean) => setGigEntryMode(e)}
                privateMode={privateMode}
                setPrivateMode={(e: boolean) => setPrivateMode(e)}
                chatMode={chatMode}
                setChatModeClosed={(e: boolean) => setChatModeClosed(e)}
                chatModeClosed={chatModeClosed}
                setMute={(e: boolean) => setMute(e)}
                mute={mute}
                setTimelineMode={(e: boolean) => setTimelineMode(e)}
                setTimelineScrollTop={(e: number) => setTimelineScrollTop(e)}
                setPrivateMsgNotification={(e: boolean) =>
                  setPrivateMsgNotification(e)
                }
              />
            }
          ></Route>

          <Route
            path="/super-admin"
            element={
              <SuperAdmin
                superAdmin={superAdmin}
                myUserId={myUserId}
                setAdminControls={(e: boolean) => setAdminControls(e)}
              />
            }
          ></Route>

          <Route
            path="/about"
            element={
              <About
                setAboutMode={(e: boolean) => setAboutMode(e)}
                superAdmin={superAdmin}
              />
            }
          ></Route>
          <Route
            path="/timeline"
            element={
              <Timeline
                setTimelineMode={(e: boolean) => setTimelineMode(e)}
                setTimelineCommentsMode={(e: boolean) =>
                  setTimelineCommentsMode(e)
                }
                setTimelineGigsMode={(e: boolean) => setTimelineGigsMode(e)}
                setTimelineGalleriesMode={(e: boolean) =>
                  setTimelineGalleriesMode(e)
                }
                gigsListTimeline={gigsListTimeline}
                setGigsListTimeline={(e: boolean) => setGigsListTimeline(e)}
                gigsListUpdatedTimeline={gigsListUpdatedTimeline}
                setGigsListUpdatedTimeline={(e: boolean) =>
                  setGigsListUpdatedTimeline(e)
                }
                commentsTimeline={commentsTimeline}
                setCommentsTimeline={(e: boolean) => setCommentsTimeline(e)}
                imagesTimeline={imagesTimeline}
                setImagesTimeline={(e: boolean) => setImagesTimeline(e)}
                timelineScrollTop={timelineScrollTop}
                setTimelineScrollTop={(e: number) => setTimelineScrollTop(e)}
                latestUpdatesMode={latestUpdatesMode}
                setLatestUpdatesMode={(e: boolean) => setLatestUpdatesMode(e)}
                superAdmin={superAdmin}
                guest={guest}
              />
            }
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
};
