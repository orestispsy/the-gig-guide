import React from "react";
const { sendEmoji } = require("./../../ChatUtils");
let emoji = require("../../../../common/customEmoj.json");
interface Props {
  darkMode: boolean;
}

export const Emojis: React.FC<Props> = ({ darkMode }) => {
  return (
    <div className="emoticons" id={(darkMode && "emoticonsDark") || ""}>
      {emoji &&
        emoji.map((emoj: any) => (
          <div key={emoj.id}>
            <img src={emoj.url} onClick={(e) => sendEmoji(e)}></img>
          </div>
        ))}
    </div>
  );
};
