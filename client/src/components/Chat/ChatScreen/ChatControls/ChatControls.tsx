import React from "react";

const {
  next20ChatMsgs,
  moveScrollbarToTop,
  moveScrollbarToBottom,
} = require("../../ChatUtils");

interface Props {
  chatMessages: any;
  elemRef: any;
  setPostScroll: (e: boolean) => void;
}

export const ChatControls: React.FC<Props> = ({
  chatMessages,
  setPostScroll,
  elemRef,
}) => {
  return (
    <div className="chatNextControls">
      <div className="chatNextArrows">
        <div
          title="Chat Top"
          className="up"
          onClick={() => moveScrollbarToTop(elemRef)}
        >
          ▲
        </div>
        <div
          title="Chat Bottom"
          className="down"
          onClick={() => moveScrollbarToBottom(elemRef)}
        >
          ▼
        </div>
      </div>
      <div
        title="Load More Chat Messages"
        className="next"
        onClick={() => next20ChatMsgs(elemRef, setPostScroll, chatMessages)}
      >
        ⦿
      </div>
    </div>
  );
};
