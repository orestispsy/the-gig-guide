import React, { useEffect, Fragment } from "react";

import { EntryActionMenu } from "./EntryActionMenu/EntryActionMenu";
import { ReplyComposer } from "./ReplyComposer/ReplyComposer";
import { Entry } from "./Entry/Entry";

import {
  Container,
  BlogEntryContainer,
  NewEntryToggler,
} from "./CommentSection.style";

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
                    <Entry
                      blogComments={blogComments}
                      blogEntry={blogEntry}
                      superAdmin={superAdmin}
                      expBlogComments={expBlogComments}
                      setSelectedComment={(e: any) => setSelectedComment(e)}
                      setBlogComments={(e: any[] | undefined) =>
                        setBlogComments(e)
                      }
                    />
                    <EntryActionMenu
                      reply={reply}
                      blogEntry={blogEntry}
                      superAdmin={superAdmin}
                      setSelectedComment={(e: any) => setSelectedComment(e)}
                      setBlogComments={(e: any[] | undefined) =>
                        setBlogComments(e)
                      }
                      selectedComment={selectedComment}
                      setReply={(e: any) => setReply(e)}
                    />
                    {reply && selectedComment == blogEntry.id && (
                      <ReplyComposer
                        reply={reply}
                        setUserName={(e: string | boolean) => setUserName(e)}
                        setEmail={(e: string | boolean) => setEmail(e)}
                        setWebsite={(e: string | boolean) => setWebsite(e)}
                        commentChecker={() => commentChecker()}
                        replyText={replyText}
                        userName={userName}
                        email={email}
                        setReplyText={(e: string | boolean) => setReplyText(e)}
                      />
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
