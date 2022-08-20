import React from "react";

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
    <div className="typeLine">
      <textarea
        rows={1}
        className="chatTypeLine"
        onKeyDown={(e) => keyCheck(e)}
        onChange={(e) => {
          setChatMSGChange(e, setChatMSG);
        }}
      ></textarea>
      <div
        id={(darkMode && "sendChatMsgDark") || ""}
        title="Send Message"
        className="sendChatMsg"
        onClick={() => sendChatMSGButton(chatMSG, setChatMSG, chatTypeLine)}
      ></div>
      <div className="chatControls">
        {!mute && (
          <div
            title="Mute"
            className="mute"
            onClick={() => {
              setMute(!mute);
            }}
          ></div>
        )}
        {mute && (
          <div
            title="Play"
            className="play"
            onClick={() => setMute(!mute)}
          ></div>
        )}
      </div>
      <div
        title="Emojis!"
        className="emojiBarToggler"
        onClick={(e) => setEmojiBar(!emojiBar)}
      ></div>
    </div>
  );
};
