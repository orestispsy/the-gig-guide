import React, { useEffect } from "react";

const { deleteAboutComment } = require("./../AboutUtils");

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
    <>
      <div className="saySomethingBack" id="saySomethingBack">
        {blogComments &&
          blogComments.map((blogEntry: any, index) => {
            expBlogComments = blogComments.filter(
              (comment: any) => comment.reply == 0
            );
            return (
              <React.Fragment key={index}>
                {blogEntry.reply == 0 && (
                  <div className="blogEntryBack">
                    <div className="blogEntry">
                      <div className="blogMsgTitle">
                        #
                        {blogComments.map((com: any, index) => {
                          if (blogEntry.id == com.id) {
                            return (
                              <span key={index}>
                                {expBlogComments.findIndex(
                                  (x: any) => x.id === blogEntry.id
                                ) + 1}
                              </span>
                            );
                          } else {
                            return;
                          }
                        })}
                      </div>
                      <div className="blogName">
                        <span>{blogEntry.name}</span>

                        {superAdmin && (
                          <div className="blogUserExtLinks">
                            <a
                              className="blogEmail"
                              href={`mailto:${blogEntry.email}`}
                            >
                              email
                            </a>
                            {blogEntry.website != "" && (
                              <a
                                className="blogWebsite"
                                href={blogEntry.website}
                                target={"_blank"}
                              >
                                website
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="blogText">{blogEntry.comment}</div>

                      {blogComments &&
                        blogComments.map((reply: any, index) => {
                          return (
                            <React.Fragment key={index}>
                              {reply.reply == blogEntry.id && reply.reply > 0 && (
                                <div className="blogEntryBack" id="reply">
                                  <div className="replyName">
                                    <div className="replyTitle">
                                      <span>Reply:</span>
                                      {superAdmin && (
                                        <span
                                          className="replyDelete"
                                          onClick={(e) => {
                                            setSelectedComment(reply.id);
                                            deleteAboutComment(
                                              reply.id,
                                              setBlogComments
                                            );
                                          }}
                                        >
                                          DELETE
                                        </span>
                                      )}
                                    </div>{" "}
                                    <div className="replyNameBox">
                                      <span>{reply.name}</span>

                                      {superAdmin && (
                                        <div className="blogUserExtLinks">
                                          <a
                                            className="blogEmail"
                                            href={`mailto:${blogEntry.email}`}
                                          >
                                            email
                                          </a>
                                          {blogEntry.website != "" && (
                                            <a
                                              className="blogWebsite"
                                              href={blogEntry.website}
                                              target={"_blank"}
                                            >
                                              website
                                            </a>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="blogText" id="replyBlogText">
                                    {reply.comment}
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                    </div>
                    <div className="blogReplyBack">
                      <div className="blogReplyOptions">
                        {!reply && superAdmin && (
                          <div
                            className="blogDelete"
                            onClick={(e) => {
                              setSelectedComment(blogEntry.id);
                              deleteAboutComment(blogEntry.id, setBlogComments);
                            }}
                          >
                            DELETE
                          </div>
                        )}

                        <div
                          className="blogReply"
                          onClick={(e) => {
                            setReply(!reply);
                            setSelectedComment(blogEntry.id);
                          }}
                        >
                          {(!reply && (
                            <div className="commentReplyOption">
                              <div className="commentPointer"></div>
                              <span>REPLY</span>
                            </div>
                          )) ||
                            (reply &&
                              selectedComment == blogEntry.id &&
                              "Close") ||
                            "REPLY"}
                        </div>
                      </div>
                      {reply && selectedComment == blogEntry.id && (
                        <textarea
                          placeholder="Write Something..."
                          className="replyArea"
                          maxLength={1500}
                          onChange={(e) => {
                            setReplyText(e.target.value);
                          }}
                        ></textarea>
                      )}
                    </div>
                    {reply && selectedComment == blogEntry.id && (
                      <div
                        className="aboutCommentControls"
                        id="aboutReplyControls"
                      >
                        <div className="aboutInputBack">
                          <input
                            autoComplete="none"
                            placeholder="Your Name"
                            maxLength={20}
                            className="aboutInput"
                            onChange={(e) => {
                              setUserName(e.target.value);
                            }}
                          ></input>
                          <div>*required</div>
                        </div>
                        <div className="aboutInputBack">
                          <input
                            className="aboutInput"
                            autoComplete="none"
                            placeholder="Your Email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          ></input>
                          <div>*required</div>
                        </div>
                        <input
                          className="aboutInput"
                          autoComplete="none"
                          placeholder="Website"
                          onChange={(e) => {
                            setWebsite(e.target.value);
                          }}
                        ></input>
                      </div>
                    )}
                    {reply && selectedComment == blogEntry.id && (
                      <div className="sendAboutCommentBack">
                        <div
                          className="sendAboutComment"
                          id={
                            ((!replyText || !userName || !email) &&
                              "sendAboutComment") ||
                            "sendReply"
                          }
                          onClick={(e) => {
                            commentChecker();
                          }}
                        >
                          Send Reply
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>
      <div
        className="sendAboutCommentToggler"
        onClick={(e) => {
          setCommentSection(!commentSection);
          setReply(false);
          setUserName(false);
          setEmail(false);
          setWebsite("");
        }}
      >
        Leave A Message
      </div>
    </>
  );
};
