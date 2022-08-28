import React from "react";

import {
  Container,
  TypeLine,
  SendMsg,
  ChatControls,
  SoundConfig,
  EmojisToggler,
} from "./ChatScreenBottom.style";

const {
  keyCheck,
  setChatMSGChange,
  sendChatMSGButton,
} = require("../../ChatUtils");

interface Props {
  mute: boolean;
  setMute: (e: boolean) => void;
  darkMode: boolean;
  emojiBar: boolean;
  setEmojiBar: (e: boolean) => void;
  chatMSG: any;
  setChatMSG: (e: any) => void;
}

export const ChatScreenBottom: React.FC<Props> = ({
  mute,
  setMute,
  darkMode,
  emojiBar,
  setEmojiBar,
  chatMSG,
  setChatMSG,
}) => {
  let chatTypeLine: any = document.querySelectorAll(".chatTypeLine");

  return (
    <Container>
      <TypeLine
        rows={1}
        onKeyDown={(e) => keyCheck(e)}
        onChange={(e) => {
          setChatMSGChange(e, setChatMSG);
        }}
      ></TypeLine>
      <SendMsg
        dark={darkMode}
        title="Send Message"
        onClick={() => sendChatMSGButton(chatMSG, setChatMSG, chatTypeLine)}
      ></SendMsg>
      <ChatControls>
        {!mute && (
          <SoundConfig
            mute={true}
            title="Mute"
            onClick={() => {
              setMute(!mute);
            }}
          />
        )}
        {mute && <SoundConfig title="Play" onClick={() => setMute(!mute)} />}
      </ChatControls>
      <EmojisToggler
        title="Emoticons"
        onClick={(e) => setEmojiBar(!emojiBar)}
      ></EmojisToggler>
    </Container>
  );
};
