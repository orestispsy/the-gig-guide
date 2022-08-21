import React from "react";

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
      </div>
    </div>
  );
};
