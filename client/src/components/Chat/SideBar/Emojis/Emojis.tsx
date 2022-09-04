import React from "react";
const { sendEmoji } = require("./../../ChatUtils");
let emoji = require("../../../../common/customEmoj.json");

import { Container, Wrapper, Emoticon } from "./Emojis.style";

interface Props {
  darkMode: boolean;
}

export const Emojis: React.FC<Props> = ({ darkMode }) => {
  return (
    <Container dark={darkMode}>
      {emoji &&
        emoji.map((emoj: any) => (
          <Wrapper key={emoj.id}>
            <Emoticon src={emoj.url} onClick={(e) => sendEmoji(e)}></Emoticon>
          </Wrapper>
        ))}
    </Container>
  );
};
