import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const {
  axiosAddComment,
  dateTimeHandler,
  updateComments,
  keyCheck,
} = require("./CommentsUtils");

const { moveScrollbarToBottom } = require("./../Chat/ChatUtils");

interface Props {
  selectedGigId: string;
  myUserId: number | undefined;
  myNickname: string;
  setOpenComments: (e: boolean) => void;
  openComments: boolean;
  setCommentsTimeline: (e: any) => void;
}

export const Comments: React.FC<Props> = ({
  selectedGigId,
  myUserId,
  myNickname,
  setOpenComments,
  openComments,
  setCommentsTimeline,
}) => {
  const [post, setPost] = useState<string | null>(null);

  const elemRef = useRef<HTMLDivElement>(null);

  const comments = useSelector((state: any) => state && state.comments);

  useEffect(
    function () {
      updateComments(selectedGigId);
    },
    [selectedGigId]
  );

  useEffect(() => {
    if (elemRef.current) {
      moveScrollbarToBottom(elemRef);
    }
  }, [comments]);

  const getPost = (e: any) => {
    setPost(e.target.value);
  };

  return (
    <div className="commentsContainer">
      <div
        className="buttonBack"
        title="Close Comments"
        id="buttonBack"
        style={{
          marginBottom: `-2vmax`,
        }}
        onClick={(e) => setOpenComments(!openComments)}
      >
        X
      </div>
      <div className="commentHead">Comments</div>

      <div className="commentBox" ref={elemRef}>
        {comments && comments.length == 0 && <h1>Nothing here yet .</h1>}
        {comments &&
          comments.map((comment: any) => {
            return (
              <div key={comment.id}>
                {comment.gig_id == selectedGigId && (
                  <div>
                    <div className="comment" id={comment.id}>
                      {comment.comment}
                      <div>
                        {comment.nickname} -{" "}
                        {dateTimeHandler(comment.created_at)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <textarea
        rows={1}
        className="chatTypeLine"
        id="commentsTypeLine"
        onChange={(e) => {
          getPost(e);
        }}
        onKeyDown={(e) =>
          keyCheck(
            e,
            selectedGigId,
            post,
            myNickname,
            myUserId,
            setPost,
            setCommentsTimeline
          )
        }
      ></textarea>
      <div
        className="mainMenuLink"
        id="commentButton"
        onClick={() =>
          axiosAddComment(
            selectedGigId,
            post,
            myNickname,
            myUserId,
            setPost,
            setCommentsTimeline
          )
        }
      >
        Send
      </div>
    </div>
  );
};
