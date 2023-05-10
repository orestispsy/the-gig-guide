import React, { useEffect, useState, useRef, Fragment } from "react";

import { ChatControls } from "../ChatScreen/ChatControls/ChatControls";

import {
  MainChatBack,
  MainChat,
  Container,
} from "./../ChatScreen/ChatScreen.style";

import {
  Container as TypelineWrapper,
  TypeLine,
  SendMsg,
} from "./../ChatScreen/ChatScreenBottom/ChatScreenBottom.style";
import {
  PostContainer,
  Wrapper,
  Message,
  UserDetails,
  Avatar,
  Nickname,
  Date,
  Time,
} from "./../ChatScreen/ChatMessages/ChatMessages.style";

import { Title } from "./../ChatScreen/ChatScreen.style";

const {
  getPrivateMessages,
  addPrivateMsg,
  checkForNew,
  next20PrivateMsgs,
  keyCheck,
} = require("./PrivateMessageUtils");

const { setChatScrollBarPosition, handleTime } = require("./../ChatUtils");

import { useSelector } from "react-redux";

interface Props {
  myUserId: number | undefined;
  userPrivate: number | undefined;
  myChatImg: string;
  privatePic: any;
  myNickname: string;
  privateNick: any;
  setFilteredPrivateMessages: (e: any) => void;
  darkMode: boolean;
  playNotification: (e: boolean, playPrivateMsg: () => void) => void;
  playPrivateMsg: () => void;
  mute: boolean;
  setPrivateMode: (e: boolean) => void;
  privateMode: boolean;
}

export const PrivateMSGS: React.FC<Props> = ({
  myUserId,
  userPrivate,
  myChatImg,
  privatePic,
  myNickname,
  privateNick,
  setFilteredPrivateMessages,
  darkMode,
  playNotification,
  playPrivateMsg,
  mute,
  setPrivateMode,
  privateMode,
}) => {
  const [scrollTop, setScrollTop] = useState<number>(2);
  const [postScroll, setPostScroll] = useState<boolean>(false);
  const [firstMsg, setFirstMsg] = useState<any>(null);

  const messages = useSelector((state: any) => state && state.messages);

  const elemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!postScroll) {
      setTimeout(() => {
        setChatScrollBarPosition(elemRef);
      }, 100);
    }
    setFirstMsg(messages[messages.length - 1]);
    setPostScroll(false);
  }, [messages]);

  useEffect(() => {
    if (messages && elemRef.current) {
      if (scrollTop < 1) {
        elemRef.current.scrollTop = 1000;
        next20PrivateMsgs(
          elemRef,
          setPostScroll,
          messages,
          myUserId,
          userPrivate
        );
      }
    }
  }, [scrollTop]);

  useEffect(() => {
    setPrivateMode(true);
    getPrivateMessages(
      myUserId,
      userPrivate,
      privatePic,
      setFirstMsg,
      setFilteredPrivateMessages
    );
    setChatScrollBarPosition(elemRef);
  }, []);

  useEffect(() => {
    if (firstMsg) {
      if (!mute && firstMsg.msg_seen) {
        playNotification(mute, playPrivateMsg);
      }
      checkForNew(myUserId, userPrivate, privatePic, messages, firstMsg);
    }
  }, [firstMsg]);

  const elem: any = document.querySelectorAll(".chatTypeline");
  var chatMSG = "";
  const chat = (e: any) => {
    chatMSG = e.target.value;
  };

  return (
    <Container dark={darkMode}>
      <ChatControls
        elemRef={elemRef}
        setPostScroll={(e: boolean) => setPostScroll(e)}
        chatMessages={messages}
        myUserId={myUserId}
        userPrivate={userPrivate}
      />
      <Title private={true}>Private Chat</Title>
      <MainChatBack>
        <MainChat
          private={privateMode}
          dark={darkMode}
          ref={elemRef}
          onScrollCapture={() =>
            elemRef.current && setScrollTop(elemRef.current.scrollTop)
          }
        >
          {messages &&
            messages.map((msg: any, index: number) => {
              return (
                <Fragment key={index}>
                  {(msg.msg_receiver_id == userPrivate ||
                    msg.msg_sender_id == userPrivate) &&
                    (msg.msg_receiver_id == myUserId ||
                      msg.msg_sender_id == myUserId) && (
                      <Wrapper>
                        <PostContainer>
                          <UserDetails>
                            <Avatar
                              src={
                                (msg.msg_sender_id == myUserId && myChatImg) ||
                                (msg.msg_sender_id != myUserId && privatePic) ||
                                "./../avatar.png"
                              }
                            ></Avatar>
                            <Nickname>
                              {(msg.msg_sender_id == myUserId && myNickname) ||
                                privateNick}
                            </Nickname>
                          </UserDetails>
                          <Message
                            className="finalMessage"
                            private={true}
                            dangerouslySetInnerHTML={{
                              __html: msg.private_msg,
                            }}
                          ></Message>

                          <Date private={true} dark={darkMode}>
                            {handleTime(msg, true)}
                          </Date>
                          <Time private={true}>{handleTime(msg)}</Time>
                        </PostContainer>
                      </Wrapper>
                    )}
                </Fragment>
              );
            })}
        </MainChat>
        <TypelineWrapper private={true}>
          <TypeLine
            rows={1}
            onKeyDown={(e: any) =>
              keyCheck(e, myUserId, userPrivate, elem, myChatImg)
            }
            onChange={(e: any) => {
              chat(e);
            }}
          ></TypeLine>
          <SendMsg
            dark={darkMode}
            title="Send Private Message"
            onClick={(e) =>
              addPrivateMsg(chatMSG, myUserId, userPrivate, elem, myChatImg)
            }
          ></SendMsg>
        </TypelineWrapper>
      </MainChatBack>
    </Container>
  );
};
