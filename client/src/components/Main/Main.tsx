import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "../../common/Axios/axios";

interface Props {
  superAdmin: boolean;
  admin: boolean;
  visitors: number | null;
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
            className={
              (darkMode && "DarkMode") || (!darkMode && "lightMode") || ""
            }
            onClick={() => {
              changePageMode();
            }}
          ></div>
          {superAdmin && (
            <Link to="/about">
              <div className="aboutButton"></div>
            </Link>
          )}
          {superAdmin && (
            <Link to="/super-admin">
              <div className="superAdminButton">
                <img src="superAdmin.png"></img>
              </div>
            </Link>
          )}
          {visitors && (
            <div className="visitors">
              Visitors<div>{visitors}</div>
              <div className="logout" onClick={() => logOut()}>
                LogOut
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
