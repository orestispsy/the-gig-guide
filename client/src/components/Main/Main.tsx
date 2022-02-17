import { Link } from "react-router-dom";
import React, { useEffect } from "react";
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
}) => {
  useEffect(function () {
    setAboutMode(false);
    setChatMode(false);
    setChatNotification(false);
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
    <div className="mainContainer">
      <div id={(darkMode && "logoBoxDark") || ""}>
        <div className="logoBack">
          {!darkMode && (
            <div className="logo" id={(darkMode && "logoDark") || ""}></div>
          )}
          <p id={(darkMode && "logoDarkP") || ""}>GIG GUIDE</p>
        </div>

        <div className="mainMenu" id={(darkMode && "mainMenuDark") || ""}>
          {!admin && (
            <div className="easterEgg" title="Map">
              <Link to="/map">
                <img id={(darkMode && "globeDark") || ""} src="globe.gif"></img>
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
        className={(darkMode && "DarkMode") || (!darkMode && "lightMode") || ""}
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
  );
};
