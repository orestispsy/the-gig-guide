import React, { useState, useEffect, Fragment } from "react";
import axios from "../../common/Axios/axios";
import { Link } from "react-router-dom";
import { CommentSection } from "./CommentSection/CommentSection";
import { AddComment } from "./AddComment/AddComment";
import { AboutText } from "./AboutText/AboutText";

const { sendComment, axiosGetAboutComments } = require("./AboutUtils");

interface Props {
  setAboutMode: (e: boolean) => void;
  superAdmin: boolean;
}

export const About: React.FC<Props> = ({ setAboutMode, superAdmin }) => {
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
  const [selectedComment, setSelectedComment] = useState<any>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  let expBlogComments: any;

  useEffect(function () {
    setAboutMode(true);
    axiosGetAboutComments(setBlogComments);
  }, []);

  const commentChecker = () => {
    let userCheck: string;
    let comCheck: string;
    let emailCheck: string;
    let replyCheck: string;
    if (
      typeof comment === "string" &&
      typeof userName === "string" &&
      typeof email === "string"
    ) {
      comCheck = comment.trim();
      userCheck = userName.trim();
      emailCheck = email.trim();
      if (comCheck !== "" && userCheck !== "" && emailCheck !== "") {
        sendComment(
          comment,
          userName,
          email,
          website,
          replyText,
          reply,
          selectedComment,
          setCommentSection,
          setBlogComments,
          setComment,
          setUserName,
          setEmail,
          setWebsite,
          setReplyText,
          setReply
        );
      }
    } else if (
      typeof replyText === "string" &&
      typeof userName === "string" &&
      typeof email === "string"
    ) {
      replyCheck = replyText.trim();
      userCheck = userName.trim();
      emailCheck = email.trim();
      if (replyCheck !== "" && userCheck !== "" && emailCheck !== "") {
        sendComment(
          comment,
          userName,
          email,
          website,
          replyText,
          reply,
          selectedComment,
          setCommentSection,
          setBlogComments,
          setComment,
          setUserName,
          setEmail,
          setWebsite,
          setReplyText,
          setReply
        );
      }
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
        setIsLoaded(false);
      }}
    >
      <div className="aboutDescription">
        <div className="aboutDescriptionTop">
          <Link to="/">
            <div className="logo2About"></div>
          </Link>
          <Link to="/">
            <div className="logo2AboutDesc"> The Gig Guide</div>
          </Link>
        </div>
        <div className="aboutBack">
          {commentSection && <AboutText />}
          {commentSection && (
            <CommentSection
              blogComments={blogComments}
              superAdmin={superAdmin}
              expBlogComments={expBlogComments}
              setSelectedComment={(e: any) => setSelectedComment(e)}
              reply={reply}
              setReply={(e: boolean) => setReply(e)}
              setBlogComments={(e: any[] | undefined) => setBlogComments(e)}
              selectedComment={selectedComment}
              replyText={replyText}
              setReplyText={(e: string | boolean) => setReplyText(e)}
              setWebsite={(e: string | boolean) => setWebsite(e)}
              setEmail={(e: string | boolean) => setEmail(e)}
              setUserName={(e: string | boolean) => setUserName(e)}
              userName={userName}
              email={email}
              commentSection={commentSection}
              setCommentSection={(e: boolean) => setCommentSection(e)}
              commentChecker={() => commentChecker()}
            />
          )}

          {!commentSection && (
            <AddComment
              commentSection={commentSection}
              commentChecker={() => commentChecker()}
              setEmail={(e: string | boolean) => setEmail(e)}
              setUserName={(e: string | boolean) => setUserName(e)}
              userName={userName}
              email={email}
              setWebsite={(e: string | boolean) => setWebsite(e)}
              comment={comment}
              setComment={(e: string | boolean) => setComment(e)}
            />
          )}
        </div>
      </div>
      <div
        className="aboutCoverBack"
        id={(!isLoaded && "blurred") || "unblurred"}
      >
        <img
          className="aboutCover"
          src={`/about/about${imgCount}.jpg`}
          onLoad={() => {
            setIsLoaded(true);
          }}
          id={(isLoaded && "coverVisible") || "coverHidden"}
        ></img>
      </div>
    </div>
  );
};
