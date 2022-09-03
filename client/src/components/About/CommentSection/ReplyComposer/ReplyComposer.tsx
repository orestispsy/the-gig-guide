import React from "react";

import {
  Required,
  InputBack,
  Input,
  Controls,
} from "../../AddComment/AddComment.style";

import { ReplyButtonBack, ReplyButton } from "../CommentSection.style";

import { ReplyTextArea } from "./ReplyComposer.style";

interface Props {
  reply: boolean;

  setUserName: (e: string | boolean) => void;
  setEmail: (e: string | boolean) => void;
  setWebsite: (e: string | boolean) => void;
  setReplyText: (e: string | boolean) => void;
  commentChecker: () => void;
  replyText: string | boolean;
  userName: string | boolean;
  email: string | boolean;
}

export const ReplyComposer: React.FC<Props> = ({
  setEmail,
  setUserName,
  setWebsite,
  commentChecker,
  replyText,
  setReplyText,
  userName,
  email,
}) => {
  return (
    <>
      <ReplyTextArea
        placeholder="Write Something..."
        maxLength={1500}
        onChange={(e) => {
          setReplyText(e.target.value);
        }}
      ></ReplyTextArea>
      <Controls>
        <InputBack>
          <Input
            autoComplete="none"
            placeholder="Your Name"
            maxLength={20}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></Input>
          <Required>*requizzzred</Required>
        </InputBack>
        <InputBack>
          <Input
            autoComplete="none"
            placeholder="Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Input>
          <Required>*required</Required>
        </InputBack>
        <Input
          autoComplete="none"
          placeholder="Website"
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
        ></Input>
      </Controls>
      <ReplyButtonBack>
        <ReplyButton
          block={(!replyText || !userName || !email) && true}
          onClick={(e) => {
            commentChecker();
          }}
        >
          Send Reply
        </ReplyButton>
      </ReplyButtonBack>
    </>
  );
};
