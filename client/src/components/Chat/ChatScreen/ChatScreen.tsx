import React, { useEffect } from "react";
import { ChatScreenBottom } from "./ChatScreenBottom/ChatScreenBottom";
import { ChatControls } from "./ChatControls/ChatControls";
import { ChatMessages } from "./ChatMessages/ChatMessages";

import {
  Container,
  Headline,
  Title,
  MainChatBack,
  MainChat,
} from "./ChatScreen.style";

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
  mobileConfigOpen: boolean;
  privateMode: boolean;
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
  mobileConfigOpen,
  privateMode,
}) => {
  useEffect(
    function () {
      console.log(privateMode);
    },
    [privateMode]
  );

  return (
    <Container dark={darkMode} mobileConfigOpen={mobileConfigOpen}>
      <ChatControls
        elemRef={elemRef}
        setPostScroll={(e: boolean) => setPostScroll(e)}
        chatMessages={chatMessages}
      />
      <Headline dark={darkMode}>
        <Title private={privateMode} dark={darkMode}>
          Chat Room
        </Title>
      </Headline>

      <MainChatBack shake={shakeUser} horn={horn}>
        <MainChat
          emojiBar={emojiBar}
          dark={darkMode}
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
        </MainChat>
      </MainChatBack>
      <ChatScreenBottom
        mute={mute}
        setMute={(e: boolean) => setMute(e)}
        darkMode={darkMode}
        emojiBar={emojiBar}
        setEmojiBar={(e: boolean) => setEmojiBar(e)}
        chatMSG={chatMSG}
        setChatMSG={(e: any) => setChatMSG(e)}
      />
    </Container>
  );
};
