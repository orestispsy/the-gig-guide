import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "../../common/Axios/axios";

import { ThemeToggler } from "./../Chat/Chat.style";

import { MainMenu } from "./MainMenu/MainMenu";

import {
  MainContainer,
  Logo,
  LogoWrapper,
  LogoText,
  SuperAdminButton,
  SuperAdminButtonImage,
  TimeLineButton,
  AboutButton,
  TopRightButtons,
  BottomRightMenu,
  BottomRightMenuWrapper,
  VisitorsBox,
  VisitorsCount,
  VisitorsTitle,
  LogOut,
} from "./Main.style";

interface Props {
  superAdmin: boolean;
  admin: boolean;
  visitors: number | boolean;
  darkMode: boolean;
  guest: boolean;
  setDarkMode: (e: boolean) => void;
  setChatMode: (e: boolean) => void;
  setChatNotification: (e: boolean) => void;
  setAboutMode: (e: boolean) => void;
  setMaps: (e: boolean) => void;
  setAdminControls: (e: boolean) => void;
  setGigListOpen: (e: boolean) => void;
  setLoadedMain: (e: boolean) => void;
  setLoadedMainDark: (e: boolean) => void;
  setGigEntry: (e: number | null) => void;
  setUserSelectedMode: (e: boolean) => void;
  userSelectedMode: boolean;
  setEditMode: (e: boolean) => void;
  setAddMode: (e: boolean) => void;
  setAnimeMode: (e: boolean) => void;
  setGigEntryMode: (e: boolean) => void;
  setMapMode: (e: boolean) => void;
  setChatModeClosed: (e: boolean) => void;
  currentVisitors: number;
  setVisitors: (e: number | boolean) => void;
  setTimelineMode: (e: boolean) => void;
  setTimelineCommentsMode: (e: boolean) => void;
  setTimelineGigsMode: (e: boolean) => void;
  setTimelineGalleriesMode: (e: boolean) => void;
  setTimelineScrollTop: (e: number) => void;
  finalLoadingCheck: boolean;
}

export const Main: React.FC<Props> = ({
  superAdmin,
  admin,
  visitors,
  darkMode,
  setDarkMode,
  setChatNotification,
  setChatMode,
  setAboutMode,
  setMaps,
  setAdminControls,
  setGigListOpen,
  setLoadedMain,
  setLoadedMainDark,
  setGigEntry,
  setUserSelectedMode,
  userSelectedMode,
  setEditMode,
  setAddMode,
  setAnimeMode,
  setGigEntryMode,
  setMapMode,
  setChatModeClosed,
  currentVisitors,
  setVisitors,
  setTimelineMode,
  setTimelineCommentsMode,
  setTimelineGalleriesMode,
  setTimelineGigsMode,
  setTimelineScrollTop,
  guest,
  finalLoadingCheck,
}) => {
  const [firstView, setFirstView] = useState<boolean>(true);
  useEffect(function () {
    setChatModeClosed(true);
    setAboutMode(false);
    setChatMode(false);
    setChatNotification(false);
    setMaps(false);
    setAdminControls(false);
    setGigListOpen(false);
    setFirstView(false);
    setGigEntry(null);
    setDarkMode(userSelectedMode);
    setEditMode(false);
    setAddMode(false);
    setAnimeMode(false);
    setGigEntryMode(false);
    setMapMode(false);
    setTimelineMode(false);
    setTimelineCommentsMode(false);
    setTimelineGalleriesMode(false);
    setTimelineGigsMode(false);
    setTimelineScrollTop(0);
  }, []);

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

  return (
    <>
      {" "}
      <MainContainer
        finalLoadingCheck={finalLoadingCheck}
        darkMode={darkMode}
        firstView={firstView}
      >
        {darkMode && (
          <Logo
            darkMode={darkMode}
            src={`stickyLogo.png`}
            onLoad={(e) => {
              setLoadedMainDark(true);
            }}
          ></Logo>
        )}

        <LogoWrapper>
          {!darkMode && (
            <Logo
              src={`logo.png`}
              onLoad={(e) => {
                setLoadedMain(true);
              }}
            ></Logo>
          )}
          <LogoText darkMode={darkMode}>GIG GUIDE</LogoText>
        </LogoWrapper>

        <MainMenu darkMode={darkMode} superAdmin={superAdmin} />

        <ThemeToggler
          dark={darkMode}
          title={(!darkMode && "Dark Mode") || "Light Mode"}
          onClick={() => {
            changePageMode();
          }}
        ></ThemeToggler>

        {superAdmin && (
          <SuperAdminButton to="/super-admin" title="Admin Controls">
            <SuperAdminButtonImage src="superAdmin.png" />
          </SuperAdminButton>
        )}
        {currentVisitors && (
          <BottomRightMenuWrapper>
            <BottomRightMenu>
              <VisitorsBox>
                <VisitorsTitle>Visitors</VisitorsTitle>
                <VisitorsCount
                  visitors={visitors}
                  onAnimationEndCapture={(e) => {
                    setVisitors(false);
                  }}
                >
                  {currentVisitors}
                </VisitorsCount>
              </VisitorsBox>

              <LogOut onClick={() => logOut()}>LogOut</LogOut>
            </BottomRightMenu>
          </BottomRightMenuWrapper>
        )}
        <TopRightButtons>
          {!guest && (
            <Link to="/timeline" title="Timeline">
              <TimeLineButton src="timeline.png" />
            </Link>
          )}
          {superAdmin && (
            <Link to="/about">
              <AboutButton title="About"></AboutButton>
            </Link>
          )}
        </TopRightButtons>
      </MainContainer>
    </>
  );
};
