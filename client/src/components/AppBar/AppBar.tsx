import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import radioBroadcasts from "../../common/radioBroadcasts";
import { useSelector } from "react-redux";

import useSound from "use-sound";
import hyperfx from "./../../../public/hyperfx.mp3";
import privateMSGSfx from "./../../../public/privateMSG.mp3";

const { chatNewPostNotification } = require("./AppBarUtils");

interface Props {
  myUserId: number | undefined;
  myChatImg: string;
  chatNotification: boolean;
  maps: boolean;
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
  aboutMode: boolean;
  setAboutMode: (e: boolean) => void;
  adminControls: boolean;
  setTop: (e: number) => void;
  setLeft: (e: number) => void;
  addMode: boolean;
  editMode: boolean;
  gigListOpen: boolean;
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
  timelineGigsMode: boolean;
  timelineGalleriesMode: boolean;
  setPrivateMsgNotification: (e: boolean) => void;
  privateMsgNotification: boolean;
  mute: boolean;
}

type LocationProps = {
  state: {
    previousPath: string;
    latest?: boolean;
  };
  pathname: string;
};

export const AppBar: React.FC<Props> = ({
  myUserId,
  myChatImg,
  chatNotification,
  maps,
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
  aboutMode,
  setAboutMode,
  adminControls,
  setTop,
  setLeft,
  addMode,
  editMode,
  gigListOpen,
  animeMode,
  gigEntryMode,
  mapMode,
  gigLocation,
  animeMusic,
  setAnimeMusic,
  setChatMode,
  setChatModeClosed,
  chatModeClosed,
  privateMode,
  setPrivateMode,
  timelineMode,
  admin,
  superAdmin,
  timelineCommentsMode,
  timelineGigsMode,
  timelineGalleriesMode,
  privateMsgNotification,
  setPrivateMsgNotification,
  mute,
}) => {
  const [playSlideFx] = useSound(hyperfx, { volume: 0.6 });
  const [playPrivateMsg] = useSound(privateMSGSfx, { volume: 0.75 });

  const navigate = useNavigate();
  const currentLocation = useLocation() as unknown as LocationProps;
  const { state, pathname } = currentLocation;

  const chatMessages = useSelector((state: any) => state && state.chatMessages);
  const privateMessages = useSelector((state: any) => state && state.messages);

  const [gigUpdatedMode, setGigUpdatedMode] = useState<boolean>(false);

  useEffect(
    function () {
      if (chatMessages) {
        chatNewPostNotification(
          chatNotification,
          chatMode,
          chatMessages,
          setChatNotification,
          setPrivateMsgNotification,
          playSlideFx,
          mute
        );
      } else {
        return;
      }
    },
    [chatMessages]
  );

  useEffect(
    function () {
      if (
        privateMessages &&
        privateMessages[privateMessages.length - 1] &&
        !chatMode
      ) {
        if (
          privateMessages[privateMessages.length - 1].msg_receiver_id ==
          myUserId
        ) {
          setChatNotification(false);
          setPrivateMsgNotification(true);
          if (!mute) {
            playPrivateMsg();
          }
        }
      } else {
        return;
      }
    },
    [privateMessages]
  );

  useEffect(
    function () {
      if (state && state.latest && state.previousPath === "/timeline") {
        setGigUpdatedMode(true);
      }
    },
    [state]
  );

  return (
    <div className="appBar" id={(maps && "appBar") || ""}>
      <div className="barLeftSection">
        <>
          <img
            title="Main Page"
            src={myChatImg || "../../avatar.png"}
            className="barProfileImage"
            onClick={(e) => {
              mapVisible(false);
              setAboutMode(false);

              if (pathname === "/gig-list-animation") {
                if (animeMusic) {
                  setAnimeMusic(false);
                }
                setTimeout(() => {
                  navigate("/");
                }, 300);
              } else if (pathname === "/chat") {
                if (chatModeClosed) {
                  setChatModeClosed(false);
                }
                setTimeout(() => {
                  navigate("/");
                }, 300);
              } else {
                navigate("/");
              }
            }}
          ></img>
        </>

        <div>
          <div
            title="Chat Room"
            className="chatBar"
            onTransitionEndCapture={() => {
              setPrivateMsgNotification(false);
            }}
            id={
              (privateMsgNotification && "privateChatBar") ||
              (chatNotification && !chatMode && "chatBar") ||
              ""
            }
            onClick={(e) => {
              mapVisible(false);
              setAboutMode(false);

              if (pathname === "/chat") {
                if (chatModeClosed) {
                  setChatModeClosed(false);
                  setPrivateMode(false);
                }
                setTimeout(() => {
                  navigate("/");
                }, 300);
              } else if (pathname === "/gig-list-animation") {
                if (animeMusic) {
                  setAnimeMusic(false);
                }
                setTimeout(() => {
                  navigate("/chat");
                }, 300);
              } else {
                navigate("/chat");
              }
            }}
          ></div>
        </div>

        <div className="barProfile">{!maps && myNickname}</div>
      </div>

      {maps && (
        <a target="_blank" href="https://www.1000mods.com">
          <div className="logo2Back">
            <div className="logo2"></div>
          </div>
        </a>
      )}

      {chatModeClosed &&
        (maps ||
          adminControls ||
          aboutMode ||
          addMode ||
          chatMode ||
          editMode ||
          gigListOpen ||
          animeMode ||
          gigEntryMode ||
          timelineMode) && (
          <div
            className="navButton"
            onClick={(e) => {
              setGigEntry(null);
              mapVisible(false);
              setAboutMode(false);
              if (timelineGigsMode && location.pathname !== "/timeline") {
                navigate("/timeline", {
                  state: {
                    previousPath: location.pathname,
                    gigs: true,
                    latest: gigUpdatedMode,
                  },
                });
                setGigUpdatedMode(false);
              } else if (
                timelineGalleriesMode &&
                location.pathname !== "/timeline"
              ) {
                navigate("/timeline", {
                  state: {
                    previousPath: location.pathname,
                    galleries: true,
                  },
                });
              } else if (
                timelineCommentsMode &&
                location.pathname !== "/timeline"
              ) {
                navigate("/timeline", {
                  state: {
                    previousPath: location.pathname,
                    comments: true,
                  },
                });
              } else if (timelineMode) {
                navigate("/");
              } else if (maps) {
                navigate(-1);
              } else if (adminControls) {
                navigate(-1);
              } else if (editMode) {
                navigate(-1);
              } else if (animeMode) {
                if (animeMusic) {
                  setAnimeMusic(false);
                }
                setTimeout(() => {
                  navigate("/gig-list");
                }, 300);
              } else if (gigEntryMode) {
                navigate("/gig-list");
              } else if (chatMode) {
                if (privateMode) {
                  setPrivateMode(false);
                } else if (!privateMode && chatModeClosed) {
                  setChatModeClosed(false);
                  setTimeout(() => {
                    navigate("/");
                  }, 300);
                }
              } else if (addMode || gigListOpen || aboutMode || adminControls) {
                navigate("/");
              } else if (gigLocation !== "" && gigLocation !== pathname) {
                navigate(gigLocation.toString());
              } else {
                navigate("/");
              }
            }}
          >
            <div title="Back" className="arrowBack">
              <div className="arrow"></div>
            </div>
          </div>
        )}

      {nightFlightProg && (
        <div
          className="mixCloudPlayerControls"
          style={{
            top: top,
            left: left,
          }}
        >
          <div className="broadcastScroller">
            <div className="radioControlsSymbol">
              <div
                id="broadLeft"
                onClick={(e) => {
                  if (nightFlightProg.id <= 0) {
                    return;
                  } else {
                    setNightFlightProg(
                      radioBroadcasts.radioBroadcasts[nightFlightProg.id - 1]
                    );
                  }
                }}
              ></div>
              <div className="radioControls">prev</div>
            </div>
            <div className="radioControlsSymbol">
              <div
                id="broadRight"
                onClick={(e) => {
                  if (
                    nightFlightProg.id >=
                    radioBroadcasts.radioBroadcasts.length - 1
                  ) {
                    return;
                  } else {
                    setNightFlightProg(
                      radioBroadcasts.radioBroadcasts[nightFlightProg.id + 1]
                    );
                  }
                }}
              ></div>

              <div className="radioControls">next</div>
            </div>
            <div
              className="radioControlsSymbol"
              onClick={(e) => {
                setNightFlightProg(undefined);
              }}
            >
              <div id="broadClose">x</div>

              <div className="radioControls">close</div>
            </div>
          </div>
          <ReactPlayer
            url={nightFlightProg.href}
            controls
            config={{
              mixcloud: {
                options: {
                  mini: true,
                },
              },
            }}
            id="mixCloudPlayer"
            width="100%"
            height="100%"
          />
          <div
            className="dragPlayer"
            draggable
            onDragCapture={(e: any) => {
              if (e.screenX > 0) {
                setPlayerPosition(e.clientY, e.clientX, setTop, setLeft);
              }
            }}
            onDragEndCapture={(e) => {
              setPlayerPosition(e.clientY, e.clientX, setTop, setLeft);
            }}
            onTouchStart={(e) => {
              setPlayerPosition(
                e.changedTouches[0].clientY,
                e.changedTouches[0].clientX,
                setTop,
                setLeft
              );
            }}
            onTouchMoveCapture={(e) => {
              setPlayerPosition(
                e.changedTouches[0].clientY,
                e.changedTouches[0].clientX,
                setTop,
                setLeft
              );
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default AppBar;
