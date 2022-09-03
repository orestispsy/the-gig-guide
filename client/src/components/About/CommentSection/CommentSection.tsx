import React, { useEffect, Fragment } from "react";

const { deleteAboutComment } = require("./../AboutUtils");

import {
    Container,
    BlogEntryContainer,
    BlogEntry,
    EntryCount,
    Number,
    UserDetails,
    UserName,
    UserLinks,
    GoTo,
    UserActions,
    Text,
    ReplyBox,
    ReplyTitle,
    Delete,
    WriteReply,
    ReplyUserActions,
    DeleteEntry,
    ReplyButtonBack,
    ReplyButton,
    ArrowUp,
    ButtonText,
    ReplyTextArea,
    NewEntryToggler,
} from "./CommentSection.style";


import { Required, InputBack, Input, Controls } from "../AddComment/AddComment.style";


interface Props {
  blogComments: any[] | undefined;
  setBlogComments: (e: any[] | undefined) => void;
  expBlogComments: any;
  superAdmin: boolean;
  setSelectedComment: (e: any) => void;
  reply: boolean;
  setReply: (e: boolean) => void;
  selectedComment: any;
  replyText: string | boolean;
  setReplyText: (e: string | boolean) => void;
  setWebsite: (e: string | boolean) => void;
  email: string | boolean;
  setEmail: (e: string | boolean) => void;
  setUserName: (e: string | boolean) => void;
  userName: string | boolean;
  setCommentSection: (e: boolean) => void;
  commentSection: boolean;
  commentChecker: () => void;
}

export const CommentSection: React.FC<Props> = ({
  setCommentSection,
  commentSection,
  blogComments,
  expBlogComments,
  superAdmin,
  setSelectedComment,
  reply,
  setReply,
  setBlogComments,
  selectedComment,
  setReplyText,
  setWebsite,
  setEmail,
  email,
  userName,
  setUserName,
  replyText,
  commentChecker,
}) => {
  useEffect(function () {}, []);

  return (
      <Fragment>
          <Container>
              {blogComments &&
                  blogComments.map((blogEntry: any, index) => {
                      expBlogComments = blogComments.filter(
                          (comment: any) => comment.reply == 0
                      );
                      return (
                          <Fragment key={index}>
                              {blogEntry.reply == 0 && (
                                  <BlogEntryContainer>
                                      <BlogEntry>
                                          <EntryCount>
                                              #
                                              {blogComments.map(
                                                  (com: any, index) => {
                                                      if (
                                                          blogEntry.id == com.id
                                                      ) {
                                                          return (
                                                              <Number
                                                                  key={index}
                                                              >
                                                                  {expBlogComments.findIndex(
                                                                      (
                                                                          x: any
                                                                      ) =>
                                                                          x.id ===
                                                                          blogEntry.id
                                                                  ) + 1}
                                                              </Number>
                                                          );
                                                      } else {
                                                          return;
                                                      }
                                                  }
                                              )}
                                          </EntryCount>
                                          <UserDetails>
                                              <UserName>
                                                  {blogEntry.name}
                                              </UserName>

                                              {superAdmin && (
                                                  <UserLinks>
                                                      <GoTo
                                                          href={`mailto:${blogEntry.email}`}
                                                      >
                                                          email
                                                      </GoTo>
                                                      {blogEntry.website !=
                                                          "" && (
                                                          <GoTo
                                                              href={
                                                                  blogEntry.website
                                                              }
                                                              target={"_blank"}
                                                          >
                                                              website
                                                          </GoTo>
                                                      )}
                                                  </UserLinks>
                                              )}
                                          </UserDetails>

                                          <Text>{blogEntry.comment}</Text>

                                          {blogComments &&
                                              blogComments.map(
                                                  (reply: any, index) => {
                                                      return (
                                                          <Fragment key={index}>
                                                              {reply.reply ==
                                                                  blogEntry.id &&
                                                                  reply.reply >
                                                                      0 && (
                                                                      <UserActions>
                                                                          <UserDetails
                                                                              reply={
                                                                                  true
                                                                              }
                                                                          >
                                                                              <ReplyBox>
                                                                                  <ReplyTitle>
                                                                                      Reply:
                                                                                  </ReplyTitle>
                                                                                  {superAdmin && (
                                                                                      <Delete
                                                                                          onClick={(
                                                                                              e
                                                                                          ) => {
                                                                                              setSelectedComment(
                                                                                                  reply.id
                                                                                              );
                                                                                              deleteAboutComment(
                                                                                                  reply.id,
                                                                                                  setBlogComments
                                                                                              );
                                                                                          }}
                                                                                      >
                                                                                          DELETE
                                                                                      </Delete>
                                                                                  )}
                                                                              </ReplyBox>
                                                                              <BlogEntryContainer
                                                                                  reply={
                                                                                      true
                                                                                  }
                                                                              >
                                                                                  <UserName>
                                                                                      {
                                                                                          reply.name
                                                                                      }
                                                                                  </UserName>

                                                                                  {superAdmin && (
                                                                                      <UserLinks>
                                                                                          <GoTo
                                                                                              href={`mailto:${blogEntry.email}`}
                                                                                          >
                                                                                              email
                                                                                          </GoTo>
                                                                                          {blogEntry.website !=
                                                                                              "" && (
                                                                                              <GoTo
                                                                                                  className="blogWebsite"
                                                                                                  href={
                                                                                                      blogEntry.website
                                                                                                  }
                                                                                                  target={
                                                                                                      "_blank"
                                                                                                  }
                                                                                              >
                                                                                                  website
                                                                                              </GoTo>
                                                                                          )}
                                                                                      </UserLinks>
                                                                                  )}
                                                                              </BlogEntryContainer>
                                                                          </UserDetails>
                                                                          <Text
                                                                              reply={
                                                                                  true
                                                                              }
                                                                          >
                                                                              {
                                                                                  reply.comment
                                                                              }
                                                                          </Text>
                                                                      </UserActions>
                                                                  )}
                                                          </Fragment>
                                                      );
                                                  }
                                              )}
                                      </BlogEntry>
                                      <WriteReply>
                                          <ReplyUserActions>
                                              {!reply && superAdmin && (
                                                  <DeleteEntry
                                                      onClick={(e) => {
                                                          setSelectedComment(
                                                              blogEntry.id
                                                          );
                                                          deleteAboutComment(
                                                              blogEntry.id,
                                                              setBlogComments
                                                          );
                                                      }}
                                                  >
                                                      DELETE
                                                  </DeleteEntry>
                                              )}

                                              <ReplyButtonBack
                                                  onClick={(e) => {
                                                      setReply(!reply);
                                                      setSelectedComment(
                                                          blogEntry.id
                                                      );
                                                  }}
                                              >
                                                  {(!reply && (
                                                      <ReplyButton>
                                                          <ArrowUp />
                                                          <ButtonText>
                                                              REPLY
                                                          </ButtonText>
                                                      </ReplyButton>
                                                  )) ||
                                                      (reply &&
                                                          selectedComment ==
                                                              blogEntry.id &&
                                                          "Close") ||
                                                      "REPLY"}
                                              </ReplyButtonBack>
                                          </ReplyUserActions>
                                          {reply &&
                                              selectedComment ==
                                                  blogEntry.id && (
                                                  <ReplyTextArea
                                                      placeholder="Write Something..."
                                                      maxLength={1500}
                                                      onChange={(e) => {
                                                          setReplyText(
                                                              e.target.value
                                                          );
                                                      }}
                                                  ></ReplyTextArea>
                                              )}
                                      </WriteReply>
                                      {reply &&
                                          selectedComment == blogEntry.id && (
                                              <Controls>
                                                  <InputBack>
                                                      <Input
                                                          autoComplete="none"
                                                          placeholder="Your Name"
                                                          maxLength={20}
                                                          onChange={(e) => {
                                                              setUserName(
                                                                  e.target.value
                                                              );
                                                          }}
                                                      ></Input>
                                                      <Required>
                                                          *required
                                                      </Required>
                                                  </InputBack>
                                                  <InputBack>
                                                      <Input
                                                          autoComplete="none"
                                                          placeholder="Your Email"
                                                          onChange={(e) => {
                                                              setEmail(
                                                                  e.target.value
                                                              );
                                                          }}
                                                      ></Input>
                                                      <Required>
                                                          *required
                                                      </Required>
                                                  </InputBack>
                                                  <Input
                                                      autoComplete="none"
                                                      placeholder="Website"
                                                      onChange={(e) => {
                                                          setWebsite(
                                                              e.target.value
                                                          );
                                                      }}
                                                  ></Input>
                                              </Controls>
                                          )}
                                      {reply &&
                                          selectedComment == blogEntry.id && (
                                              <ReplyButtonBack>
                                                  <ReplyButton
                                                      block={
                                                          (!replyText ||
                                                              !userName ||
                                                              !email) &&
                                                          true
                                                      }
                                                      onClick={(e) => {
                                                          commentChecker();
                                                      }}
                                                  >
                                                      Send Reply
                                                  </ReplyButton>
                                              </ReplyButtonBack>
                                          )}
                                  </BlogEntryContainer>
                              )}
                          </Fragment>
                      );
                  })}
          </Container>
          <NewEntryToggler
              onClick={(e) => {
                  setCommentSection(!commentSection);
                  setReply(false);
                  setUserName(false);
                  setEmail(false);
                  setWebsite("");
              }}
          >
              Leave A Message
          </NewEntryToggler>
      </Fragment>
  );
};
