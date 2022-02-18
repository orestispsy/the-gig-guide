import React, { useEffect, useState } from "react";
import axios from "../../common/Axios/axios";
import {
  HashRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

import { AppLayout } from "../AppLayout/AppLayout";
import { Main } from "../Main/Main";
import AppBar from "../AppBar/AppBar";
import MyMap from "../Map/Map";
import { GigCreator } from "../GigCreator/GigCreator";
import { GigEditor } from "../GigEditor/GigEditor";
import { GigList } from "../GigList/GigList";
import { Chat } from "../Chat/Chat";
import { GigListAnimation } from "../GigListAnimation/GigListAnimation";
import { GigEntry } from "../GigEntry/GigEntry";
import { SuperAdmin } from "../SuperAdmin/SuperAdmin";
import { About } from "../About/About";

import "./../../../public/style.css";

import radioBroadcasts from "../../common/radioBroadcasts";

interface Props {}

export const App: React.FC<Props> = ({}) => {
  const [myUserId, setMyUserId] = useState<number | undefined>();
  const [myChatImg, setMyChatImg] = useState<string>("");
  const [myChatColor, setMyChatColor] = useState<string>("");
  const [guest, setGuest] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const [superAdmin, setSuperAdmin] = useState<boolean>(false);
  const [maps, setMaps] = useState<boolean>(false);

  const [visitors, setVisitors] = useState<number | null>(null);

  const [top, setTop] = useState<number | string>("1%");
  const [left, setLeft] = useState<number | string>("35%");
  const [selectedGigEntry, setSelectedGigEntry] = useState<number | null>(0);

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [year, setYear] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [nightFlightProg, setNightFlightProg] = useState<
    boolean | any[] | string
  >(false);
  const [chatNotification, setChatNotification] = useState<boolean>(false);
  const [chatMode, setChatMode] = useState<boolean>(false);
  const [aboutMode, setAboutMode] = useState<boolean>(false);

  const [myNickname, setMyNickname] = useState<string>("");

  const [gigsList, setGigsList] = useState<any>();

  let { id } = useParams();

  useEffect(function () {
    setMaps(false);
    axios
      .get("/user-details")
      .then(({ data }) => {
        if (!data.data) {
          location.replace("/");
        }

        setMyUserId(data.data.id);
        setMyNickname(data.data.nickname);
        setAdmin(data.data.admin);
        setSuperAdmin(data.data.super_admin);
        setMyChatImg(data.data.chat_img);
        setMyChatColor(data.data.chat_color);

        if (data.data.nickname) {
          if (data.data.nickname.includes("Guest")) {
            setGuest(true);
            setAdmin(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/get-gigs")
      .then(({ data }) => {
        setGigsList(data.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/counter")
      .then(({ data }) => {
        setVisitors(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setPlayerPosition = (x: number, y: number) => {
    setTop(x), setLeft(y);
  };

  return (
    <Router>
      <Routes>
        <Route
          element={
            <AppLayout
              darkMode={darkMode}
              aboutMode={aboutMode}
              myChatImg={myChatImg}
              myNickname={myNickname}
              setNightFlightProg={(e: any) => setNightFlightProg(e)}
              nightFlightProg={nightFlightProg}
              maps={maps}
              setGigEntry={(e: number | null) => setSelectedGigEntry(e)}
              mapVisible={(e: boolean) => setMaps(e)}
              top={top}
              left={left}
              setPlayerPosition={(x: number, y: number) =>
                setPlayerPosition(x, y)
              }
              setChatNotification={(e: boolean) => setChatNotification(e)}
              chatNotification={chatNotification}
              chatMode={chatMode}
              setAboutMode={(e: boolean) => setAboutMode(e)}
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
              />
            }
          ></Route>
          <Route
            path="/gig-list-animation"
            element={
              <GigListAnimation
                gigsList={gigsList}
                setDarkMode={(e: boolean) => setDarkMode(e)}
              />
            }
          ></Route>

          <Route
            path="/api/gig/:id"
            element={
              <GigEntry
                gigsList={gigsList}
                myUserId={myUserId}
                superAdmin={superAdmin}
                myNickname={myNickname}
                setDarkMode={(e: boolean) => setDarkMode(e)}
                setGigEntry={(e: number | null) => setSelectedGigEntry(e)}
                selectedGigEntry={selectedGigEntry}
                guest={guest}
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
              />
            }
          ></Route>

          <Route
            path="/super-admin"
            element={
              <SuperAdmin
                superAdmin={superAdmin}
                myUserId={myUserId}
                setDarkMode={(e: boolean) => setDarkMode(e)}
              />
            }
          ></Route>

          <Route
            path="/about"
            element={
              <About
                aboutMode={aboutMode}
                setAboutMode={(e: boolean) => setAboutMode(e)}
                superAdmin={superAdmin}
              />
            }
          ></Route>
        </Route>

        {/* 
       

       
      
 */}
      </Routes>
    </Router>
  );
};
