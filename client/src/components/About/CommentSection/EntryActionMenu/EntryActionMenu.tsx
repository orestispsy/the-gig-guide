import React from "react";

import { ReplyButtonBack, ReplyButton } from "../CommentSection.style";

import {
  Container,
  UserActions,
  DeleteEntry,
  ArrowUp,
  ButtonText,
} from "./EntryActionMenu.style";

const { deleteAboutComment } = require("./../../AboutUtils");

interface Props {
  reply: boolean;
  blogEntry: any;
  superAdmin: boolean;
  setReply: (e: any) => void;
  setSelectedComment: (e: any) => void;
  setBlogComments: (e: any[] | undefined) => void;
  selectedComment: any;
}

export const EntryActionMenu: React.FC<Props> = ({
  reply,
  blogEntry,
  superAdmin,
  setSelectedComment,
  setBlogComments,
  setReply,

  selectedComment,
}) => {
  return (
    <Container>
      <UserActions>
        {!reply && superAdmin && (
          <DeleteEntry
            onClick={(e) => {
              setSelectedComment(blogEntry.id);
              deleteAboutComment(blogEntry.id, setBlogComments);
            }}
          >
            DELETE
          </DeleteEntry>
        )}

        <ReplyButtonBack
          onClick={(e) => {
            setReply(!reply);
            setSelectedComment(blogEntry.id);
          }}
        >
          {(!reply && (
            <ReplyButton>
              <ArrowUp />
              <ButtonText>REPLY</ButtonText>
            </ReplyButton>
          )) ||
            (reply && selectedComment == blogEntry.id && "Close") ||
            "REPLY"}
        </ReplyButtonBack>
      </UserActions>
    </Container>
  );
};
