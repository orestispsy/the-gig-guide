import React from "react";

import { Container, Arrows, Arrow, Next } from "./ChatControls.style";
const {
  next20ChatMsgs,
  moveScrollbarToTop,
  moveScrollbarToBottom,
} = require("../../ChatUtils");

const { next20PrivateMsgs } = require("../../PrivateMSGS/PrivateMessageUtils");

interface Props {
  chatMessages: any;
  elemRef: any;
  setPostScroll: (e: boolean) => void;
  myUserId?: number | undefined;
  userPrivate?: number | undefined;
}

export const ChatControls: React.FC<Props> = ({
  chatMessages,
  setPostScroll,
  elemRef,
  myUserId,
  userPrivate,
}) => {
  return (
    <Container>
      <Arrows>
        <Arrow
          title="Chat Top"
          className="up"
          onClick={() => moveScrollbarToTop(elemRef)}
        >
          ▲
        </Arrow>
        <Arrow
          title="Chat Bottom"
          down={true}
          onClick={() => moveScrollbarToBottom(elemRef)}
        >
          ▼
        </Arrow>
      </Arrows>
      <Next
        title="Load More Chat Messages"
        onClick={() => {
          !userPrivate
            ? next20ChatMsgs(elemRef, setPostScroll, chatMessages)
            : next20PrivateMsgs(
                elemRef,
                setPostScroll,
                chatMessages,
                myUserId,
                userPrivate
              );
        }}
      >
        ⦿
      </Next>
    </Container>
  );
};
