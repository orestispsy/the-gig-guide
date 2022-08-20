import React from "react";

interface Props {
  email: string | boolean;
  setEmail: (e: string | boolean) => void;
  setUserName: (e: string | boolean) => void;
  userName: string | boolean;
  commentSection: boolean;
  commentChecker: () => void;
  setComment: (e: string | boolean) => void;
  comment: string | boolean;
  setWebsite: (e: string | boolean) => void;
}

export const AddComment: React.FC<Props> = ({
  commentSection,
  commentChecker,
  email,
  setEmail,
  setUserName,
  userName,
  setComment,
  comment,
  setWebsite,
}) => {
  return (
    <>
      <textarea
        placeholder="Write Something..."
        className="saySomethingBack"
        maxLength={1500}
        style={{
          minHeight: (!commentSection && `40vh`) || "",
        }}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></textarea>

      <div className="aboutCommentControls">
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

      <div className="sendAboutCommentBack">
        <div
          className="sendAboutComment"
          id={((!comment || !userName || !email) && "sendAboutComment") || ""}
          onClick={(e) => {
            commentChecker();
          }}
        >
          Send
        </div>
      </div>
    </>
  );
};
