import React, { useState, useEffect, Fragment } from "react";
import axios from "../../common/Axios/axios";
import { Link } from "react-router-dom";

interface Props {
  setAboutMode: (e: boolean) => void;
  aboutMode: boolean;
  superAdmin: boolean;
}

export const About: React.FC<Props> = ({
  setAboutMode,
  aboutMode,
  superAdmin,
}) => {
  const [imgCount, setImgCount] = useState<number>(
    Math.floor(Math.random() * 9 + 2)
  );
  const [userName, setUserName] = useState<string | boolean>(false);
  const [email, setEmail] = useState<string | boolean>(false);
  const [website, setWebsite] = useState<string | boolean>(false);
  const [comment, setComment] = useState<string | boolean>(false);
  const [replyText, setReplyText] = useState<string | boolean>(false);
  const [commentSection, setCommentSection] = useState<boolean>(true);
  const [blogComments, setBlogComments] = useState<any[] | undefined>([]);
  const [reply, setReply] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState(false);

  useEffect(function () {
    setAboutMode(true);
    getAboutComments();
    axios
      .get("/get-about-comments/")
      .then(({ data }) => {
        setBlogComments(data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAboutComments = () => {
    axios
      .get("/get-about-comments/")
      .then(({ data }) => {
        setBlogComments(data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAboutComment = (e: number) => {
    axios
      .post("/delete-about-comment/", {
        id: e,
      })
      .then(({ data }) => {
        getAboutComments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendComment = () => {
    if (comment && userName && email) {
      axios
        .post("/add-about-comment/", {
          comment: comment,
          userName: userName,
          email: email,
          website: website,
          reply: 0,
        })
        .then(({ data }) => {
          setCommentSection(true);
          getAboutComments();
          setComment(false);
          setUserName(false);
          setEmail(false);
          setWebsite("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (replyText && userName && email && reply) {
      axios
        .post("/add-about-comment/", {
          comment: replyText,
          userName: userName,
          email: email,
          website: website,
          reply: selectedComment,
        })
        .then(({ data }) => {
          setReply(false);
          getAboutComments();
          setReplyText(false);
          setUserName(false);
          setEmail(false);
          setWebsite("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      className="aboutContainer"
      onClick={(e) => {
        if (imgCount < 10) {
          setImgCount(imgCount + 1);
        } else {
          setImgCount(2);
        }
      }}
    >
      <div className="aboutDescription">
        <Link
          to="/"
          className="buttonBack"
          id="aboutClose"
          title="Back"
          onClick={(e) => {
            setAboutMode(false);
          }}
        >
          X
        </Link>

        <Link to="/">
          <div className="logo2About"></div>
        </Link>
        <Link to="/">
          <div className="logo2AboutDesc"> The Gig Guide</div>
        </Link>

        <div className="aboutBack">
          <div className="about"> About</div>
          <div className="authWrapper">
            <div className="aboutText">
              <div>
                Friend, fan and brother soul of The Almighty{" "}
                <a href="https://www.1000mods.com" target="_blank">
                  1000mods
                </a>
                . We met back in the early daze, when the universe joined lines
                and brought things together.
              </div>
              <div>
                Some time ago I asked them if there is a concert archive for all
                these years on stage. The answer was: " Yes, the first 500
                concerts are stored in documents or hand-written in lists. As
                for the rest, nowadays they can be found ! ".
              </div>
              <div>
                Lately, after summoning some super-tech-powers up, I started
                building an "archive" website for 1000mods, their fans and all
                these nights of sweat on stage and the floor.
              </div>
              <div>
                The "Thousand Gigs Guide" is a tool for the band to create,
                manage and maintain their own concert history. On the same time,
                it is an online concert agenda for fans to get the past & future
                band's Touring Info, contribute in it and interact with each
                other.
              </div>
            </div>
          </div>
          <div className="author"> The Author</div>
          <div className="authWrapper">
            <div className="authPic"></div>
            <div className="authorText">
              <div>
                Full-Stack Web Developer, Electronic Engineer, Musician,
                Web-Radio Broadcaster, Story Teller from Outer Space.
              </div>

              <div>
                Can be found hitch-hiking the Super Van when on tour, letting
                the dates decide for the day back home...
              </div>
            </div>
          </div>
          <div className="author">{commentSection && "Thoughts"}</div>
          {!commentSection && (
            <div className="sendAboutCommentClose">
              <div
                onClick={(e) => {
                  setCommentSection(!commentSection);
                }}
              >
                Close
              </div>
            </div>
          )}
          {commentSection && (
            <div className="saySomethingBack" id="saySomethingBack">
              {blogComments &&
                blogComments.map((blogEntry: any, index) => {
                  let expBlogComments: any = blogComments.filter(
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
                              <span>
                                {blogEntry.website == "" && blogEntry.name}
                              </span>{" "}
                              {blogEntry.website != "" && superAdmin && (
                                <a href={blogEntry.website} target={"_blank"}>
                                  {blogEntry.name}
                                </a>
                              )}
                            </div>

                            <div className="blogText">{blogEntry.comment}</div>

                            {blogComments &&
                              blogComments.map((reply: any, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    {reply.reply == blogEntry.id &&
                                      reply.reply > 0 && (
                                        <div
                                          className="blogEntryBack"
                                          id="reply"
                                        >
                                          <div className="blogName">
                                            <div className="replyTitle">
                                              <span>Reply:</span>
                                              {superAdmin && (
                                                <span
                                                  className="replyDelete"
                                                  onClick={(e) => {
                                                    setSelectedComment(
                                                      reply.id
                                                    );
                                                    deleteAboutComment(
                                                      reply.id
                                                    );
                                                  }}
                                                >
                                                  DELETE
                                                </span>
                                              )}
                                            </div>{" "}
                                            <span>{reply.name}</span>{" "}
                                          </div>
                                          <div
                                            className="blogText"
                                            id="replyBlogText"
                                          >
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
                                    deleteAboutComment(blogEntry.id);
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
                              <input
                                autoComplete="none"
                                placeholder="Your Name"
                                className="aboutInput"
                                onChange={(e) => {
                                  setUserName(e.target.value);
                                }}
                              ></input>
                              <input
                                className="aboutInput"
                                autoComplete="none"
                                placeholder="Your Email"
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                              ></input>
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
                                  sendComment();
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
          )}
          {!commentSection && (
            <textarea
              placeholder="Write Something..."
              className="saySomethingBack"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></textarea>
          )}

          {commentSection && (
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
          )}
          {!commentSection && (
            <div className="aboutCommentControls">
              <input
                autoComplete="none"
                placeholder="Your Name"
                className="aboutInput"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              ></input>
              <input
                className="aboutInput"
                autoComplete="none"
                placeholder="Your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
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
          {!commentSection && (
            <div className="sendAboutCommentBack">
              <div
                className="sendAboutComment"
                id={
                  ((!comment || !userName || !email) && "sendAboutComment") ||
                  ""
                }
                onClick={(e) => {
                  sendComment();
                }}
              >
                Send
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="aboutCover"
        style={{
          backgroundImage: `url(/about/about${imgCount}.jpg)`,
        }}
      ></div>
    </div>
  );
};
