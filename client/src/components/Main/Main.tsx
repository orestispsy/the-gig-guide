import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "../../common/Axios/axios";

interface Props {
  superAdmin: boolean;
  admin: boolean;
  visitors: number | boolean;
  darkMode: boolean;
  setDarkMode: (e: boolean) => void;
  setChatMode: (e: boolean) => void;
  setChatNotification: (e: boolean) => void;
  setAboutMode: (e: boolean) => void;
  setMaps: (e: boolean) => void;
  setAdminControls: (e: boolean) => void;
  setGigListOpen: (e: boolean) => void;
  loaded: boolean;
  setLoadedMain: (e: boolean) => void;
  loadedMain: boolean;
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
  loaded,
  setLoadedMain,
  loadedMain,
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
      {loaded && (
        <div
          className="mainContainer"
          id={(firstView && `mainContainerIntro`) || ``}
          style={{ visibility: (loaded && `visible`) || `hidden` }}
        >
          <div id={(darkMode && "logoBoxDark") || ""}>
            <div className="logoBack">
              {!darkMode && (
                <img
                  src={"logo.png"}
                  className="logo"
                  id={(darkMode && "logoDark") || ""}
                  onLoad={(e) => setLoadedMain(true)}
                ></img>
              )}
              <p id={(darkMode && "logoDarkP") || ""}>GIG GUIDE</p>
            </div>

            <div className="mainMenu" id={(darkMode && "mainMenuDark") || ""}>
              {superAdmin && (
                <div className="mainMenuEditOptions">
                  <Link to="/gig-creator" className="mainMenuLink">
                    {" "}
                    Add
                  </Link>
                  <div className="easterEgg" title="Map">
                    <Link to="/map">
                      <img
                        id={(darkMode && "globeDark") || ""}
                        src="globe.gif"
                      ></img>
                    </Link>
                  </div>
                  <Link to="/gig-editor" className="mainMenuLink">
                    {" "}
                    Edit
                  </Link>
                </div>
              )}
              {!superAdmin && (
                <div className="mainMenuEditOptions">
                  <Link to="/gig-list" className="mainMenuLink">
                    Gigs
                  </Link>
                  <div className="easterEgg" title="Map">
                    <Link to="/map">
                      <img
                        id={(darkMode && "globeDark") || ""}
                        src="globe.gif"
                      ></img>
                    </Link>
                  </div>
                  <Link to="/chat" className="mainMenuLink">
                    Chat
                  </Link>
                </div>
              )}
              {!superAdmin && (
                <Link to="/about" className="mainMenuLink">
                  About
                </Link>
              )}
              {superAdmin && (
                <Link to="/gig-list" className="mainMenuLink">
                  Entries
                </Link>
              )}
            </div>
          </div>
          <div
            title={(!darkMode && "Dark Mode") || "Light Mode"}
            className={
              (darkMode && "DarkMode") || (!darkMode && "lightMode") || ""
            }
            onClick={() => {
              changePageMode();
            }}
          ></div>

          {superAdmin && (
            <Link to="/super-admin">
              <div className="superAdminButton" title="Admin Controls">
                <img src="superAdmin.png"></img>
              </div>
            </Link>
          )}
          {currentVisitors && (
            <div className="mainOptionsBox">
              <div className="visitors_lougout_box">
                <div className="visitors">
                  <div className="visitorsTitle">Visitors</div>{" "}
                  <div
                    onAnimationEndCapture={(e) => {
                      setVisitors(false);
                    }}
                    style={{
                      animation:
                        (visitors && "blinkerTextCyan 3s ease-in-out") || "",
                    }}
                  >
                    {currentVisitors}
                  </div>
                </div>

                <div className="logout" onClick={() => logOut()}>
                  LogOut
                </div>
              </div>
            </div>
          )}
          <div className="mainTopRightButtons">
            <Link to="/timeline" className="timeline" title="Timeline">
              <div>
                <img src="timeline.png"></img>
              </div>
            </Link>
            {superAdmin && (
              <Link to="/about">
                <div className="aboutButton" title="About"></div>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};
