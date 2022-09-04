import React, { Fragment } from "react";

import { UserActions, ReplyBox, Delete, ReplyTitle } from "./Replies.style";

import {
    UserDetails,
    BlogReplyContainer,
    UserName,
    UserLinks,
    GoTo,
    Text,
} from "../CommentSection.style";

const { deleteAboutComment } = require("./../../AboutUtils");

interface Props {
  blogComments: any;
  blogEntry: any;
  superAdmin: boolean;
  setSelectedComment: (e: any) => void;
  setBlogComments: (e: any[] | undefined) => void;
}

export const Replies: React.FC<Props> = ({
  blogComments,
  blogEntry,
  superAdmin,
  setSelectedComment,
  setBlogComments,
}) => {
  return (
    <Fragment>
      {blogComments &&
        blogComments.map((reply: any, index: number) => {
          return (
            <Fragment key={index}>
              {reply.reply == blogEntry.id && reply.reply > 0 && (
                <UserActions>
                  <UserDetails reply={true}>
                    <ReplyBox>
                      <ReplyTitle>Reply:</ReplyTitle>
                      {superAdmin && (
                        <Delete
                          onClick={(e) => {
                            setSelectedComment(reply.id);
                            deleteAboutComment(reply.id, setBlogComments);
                          }}
                        >
                          DELETE
                        </Delete>
                      )}
                    </ReplyBox>
                    <BlogReplyContainer>
                      <UserName>{reply.name}</UserName>

                      {superAdmin && (
                        <UserLinks>
                          <GoTo href={`mailto:${blogEntry.email}`}>email</GoTo>
                          {blogEntry.website != "" && (
                            <GoTo
                              className="blogWebsite"
                              href={blogEntry.website}
                              target={"_blank"}
                            >
                              website
                            </GoTo>
                          )}
                        </UserLinks>
                      )}
                    </BlogReplyContainer>
                  </UserDetails>
                  <Text reply={true}>{reply.comment}</Text>
                </UserActions>
              )}
            </Fragment>
          );
        })}
    </Fragment>
  );
};
