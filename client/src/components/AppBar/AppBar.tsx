import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import radioBroadcasts from "../../common/radioBroadcasts";
import { useSelector } from "react-redux";

import useSound from "use-sound";
import hyperfx from "./../../../public/hyperfx.mp3";

const { chatNewPostNotification } = require("./AppBarUtils");

interface Props {
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
  setAboutMode: (e: boolean) => void;
  adminControls: boolean;

  setTop: (e: number) => void;
  setLeft: (e: number) => void;
}

export const AppBar: React.FC<Props> = ({
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
  setAboutMode,
  adminControls,
  setTop,
  setLeft,
}) => {
  const [playSlideFx] = useSound(hyperfx, { volume: 0.6 });

  const chatBan = useSelector((state: any) => state && state.chat_ban);

  const chatMessages = useSelector((state: any) => state && state.chatMessages);
  useEffect(
    function () {
      if (chatMessages) {
        chatNewPostNotification(
          chatNotification,
          chatMode,
          chatMessages,
          setChatNotification,
          playSlideFx
        );
      } else {
        return;
      }
    },
    [chatMessages]
  );

  return (
    <div className="appBar" id={(maps && "appBar") || ""}>
      {!chatBan && (
        <div className="barLeftSection">
          <Link to={"/"}>
            <img
              src={myChatImg || "../../avatar.png"}
              className="barProfileImage"
              onClick={(e) => {
                mapVisible(false);
                setAboutMode(false);
              }}
            ></img>
          </Link>

          <Link to={(chatMode && "/") || (!chatMode && "/chat") || ""}>
            <div
              title="Chat Room"
              className="chatBar"
              id={(chatNotification && !chatMode && "chatBar") || ""}
              onClick={(e) => {
                mapVisible(false);
                setAboutMode(false);
              }}
            ></div>
          </Link>

          <div className="barProfile">{!maps && myNickname}</div>
        </div>
      )}
      {maps && !chatBan && (
        <a target="_blank" href="https://www.1000mods.com">
          <div className="logo2Back">
            <div className="logo2"></div>
          </div>
        </a>
      )}

      {maps && (
        <Link
          to="/"
          className="barMainLink"
          title="Back"
          onClick={(e) => {
            setGigEntry(null);
            mapVisible(false);
            setAboutMode(false);
          }}
        ></Link>
      )}

      {adminControls && (
        <Link
          to="/"
          className="barMainLink"
          title="Back"
          onClick={(e) => {
            setGigEntry(null);
            mapVisible(false);
            setAboutMode(false);
          }}
        ></Link>
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
            onDragCapture={(e) => {
              setPlayerPosition(
                e.pageY,
                e.screenX + e.screenX * 0.5 - e.screenX * 0.1,
                setTop,
                setLeft
              );
            }}
            onDragEndCapture={(e) => {
              setPlayerPosition(
                e.pageY,
                e.screenX + e.screenX * 0.5 - e.screenX * 0.1,
                setTop,
                setLeft
              );
            }}
            onTouchStart={(e) => {
              setPlayerPosition(
                e.changedTouches[0].pageY,
                e.changedTouches[0].screenX +
                  e.changedTouches[0].screenX * 0.5 -
                  e.changedTouches[0].screenX * 0.1,
                setTop,
                setLeft
              );
            }}
            onTouchMoveCapture={(e) => {
              setPlayerPosition(
                e.changedTouches[0].pageY,
                e.changedTouches[0].pageX,
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
