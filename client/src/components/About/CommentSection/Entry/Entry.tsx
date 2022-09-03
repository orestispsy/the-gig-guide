import React from "react";

import { Replies } from "../Replies/Replies";

import {
  UserDetails,
  UserName,
  UserLinks,
  GoTo,
  Text,
} from "../CommentSection.style";

import { BlogEntry, EntryCount, Number } from "./Entry.style";

interface Props {
  blogComments: any;
  blogEntry: any;
  superAdmin: boolean;
  expBlogComments: any;
  setSelectedComment: (e: any) => void;
  setBlogComments: (e: any[] | undefined) => void;
}

export const Entry: React.FC<Props> = ({
  blogComments,
  blogEntry,
  superAdmin,
  setSelectedComment,
  setBlogComments,
  expBlogComments,
}) => {
  return (
    <BlogEntry>
      <EntryCount>
        #
        {blogComments.map((com: any, index: number) => {
          if (blogEntry.id == com.id) {
            return (
              <Number key={index}>
                {expBlogComments.findIndex((x: any) => x.id === blogEntry.id) +
                  1}
              </Number>
            );
          } else {
            return;
          }
        })}
      </EntryCount>
      <UserDetails>
        <UserName>{blogEntry.name}</UserName>

        {superAdmin && (
          <UserLinks>
            <GoTo href={`mailto:${blogEntry.email}`}>email</GoTo>
            {blogEntry.website != "" && (
              <GoTo href={blogEntry.website} target={"_blank"}>
                website
              </GoTo>
            )}
          </UserLinks>
        )}
      </UserDetails>

      <Text>{blogEntry.comment}</Text>

      <Replies
        blogComments={blogComments}
        blogEntry={blogEntry}
        superAdmin={superAdmin}
        setSelectedComment={(e: any) => setSelectedComment(e)}
        setBlogComments={(e: any[] | undefined) => setBlogComments(e)}
      />
    </BlogEntry>
  );
};
