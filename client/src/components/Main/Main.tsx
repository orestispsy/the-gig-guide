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
}) => {
  const [firstView, setFirstView] = useState<boolean>(true);
  useEffect(function () {
    setAboutMode(false);
    setChatMode(false);
    setChatNotification(false);
    setMaps(false);
    setAdminControls(false);
    setGigListOpen(false);
    setFirstView(false);
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
              {!admin && (
                <div className="easterEgg" title="Map">
                  <Link to="/map">
                    <img
                      id={(darkMode && "globeDark") || ""}
                      src="globe.gif"
                    ></img>
                  </Link>
                </div>
              )}
              {admin && (
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
              <Link to="/gig-list" className="mainMenuLink">
                Entries
              </Link>
            </div>
          </div>
          <div
            className={
              (darkMode && "DarkMode") || (!darkMode && "lightMode") || ""
            }
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          ></div>
          <Link to="/about">
            <div className="aboutButton"></div>
          </Link>
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
