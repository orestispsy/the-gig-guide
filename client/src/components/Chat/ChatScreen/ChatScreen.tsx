import React, { useEffect } from "react";
import { ChatScreenBottom } from "./ChatScreenBottom/ChatScreenBottom";
import { ChatControls } from "./ChatControls/ChatControls";
import { ChatMessages } from "./ChatMessages/ChatMessages";

interface Props {
  darkMode: boolean;
  superAdmin: boolean;
  setEmojiBar: (e: boolean) => void;
  mute: boolean;
  setMute: (e: boolean) => void;
  horn: boolean;
  shakeUser: boolean;
  elemRef: any;
  setPostScroll: (e: boolean) => void;
  admin: boolean;
  chatMessages: any;
  chatMSG: any;
  setChatMSG: (e: any) => void;
  emojiBar: boolean;
  myUserId: number | undefined;
  setScrollTop: (e: number) => void;
}

const {} = require("../ChatUtils");

export const ChatScreen: React.FC<Props> = ({
  darkMode,
  superAdmin,
  setEmojiBar,
  mute,
  horn,
  shakeUser,
  setPostScroll,
  elemRef,
  admin,
  chatMessages,
  chatMSG,
  setChatMSG,
  setMute,
  setScrollTop,
  emojiBar,
  myUserId,
}) => {
  useEffect(function () {}, []);

  return (
    <div className="chatContainer" id={(darkMode && "chatContainerDark") || ""}>
      <ChatControls
        elemRef={elemRef}
        setPostScroll={(e: boolean) => setPostScroll(e)}
        chatMessages={chatMessages}
      />

      <div className="chatHeadline" id={(darkMode && "chatHeadlineDark") || ""}>
        <div id="chatTitle">Chat Room</div>
      </div>

      <div
        className="chatScreenBack"
        id={(shakeUser && horn && "hornShake") || ""}
      >
        <div
          className="chatScreen"
          id={(darkMode && "chatScreenDark") || ""}
          ref={elemRef}
          onScrollCapture={() =>
            elemRef.current && setScrollTop(elemRef.current.scrollTop)
          }
        >
          <ChatMessages
            chatMessages={chatMessages}
            admin={admin}
            superAdmin={superAdmin}
            darkMode={darkMode}
            elemRef={elemRef}
            myUserId={myUserId}
            setPostScroll={(e: boolean) => setPostScroll(e)}
          />
        </div>
      </div>
      <ChatScreenBottom
        mute={mute}
        setMute={(e: boolean) => setMute(e)}
        darkMode={darkMode}
        emojiBar={emojiBar}
        setEmojiBar={(e: boolean) => setEmojiBar(e)}
        chatMSG={chatMSG}
        setChatMSG={(e: any) => setChatMSG(e)}
      />
    </div>
  );
};
