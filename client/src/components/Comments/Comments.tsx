import React, { useState, useEffect, useRef } from "react";
import axios from "../../common/Axios/axios";
import { socket } from "../../common/Socket/socket";
import { useSelector } from "react-redux";

interface Props {
  selectedGigId: string;
  myUserId: number | undefined;
  superAdmin: boolean;
  myNickname: string;
  setOpenComments: (e: boolean) => void;
  openComments: boolean;
}

export const Comments: React.FC<Props> = ({
  selectedGigId,
  myUserId,
  superAdmin,
  myNickname,
  setOpenComments,
  openComments,
}) => {
  const [post, setPost] = useState<string | null>(null);

  const elemRef = useRef<HTMLDivElement>(null);

  const comments = useSelector((state: any) => state && state.comments);

  useEffect(
    function () {
      axios
        .post("/get-comments/", {
          selectedGigId: selectedGigId,
        })
        .then(({ data }) => {
          socket.emit("COMMENTS", data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [selectedGigId]
  );

  useEffect(() => {
    if (elemRef.current) {
      const newScrollTop =
        elemRef.current.scrollHeight - elemRef.current.clientHeight;
      elemRef.current.scrollTop = newScrollTop;
    }
  }, [comments]);

  const getPost = (e: any) => {
    setPost(e.target.value);
  };

  const elem: any = document.querySelectorAll("#commentsTypeLine");

  const addComment = () => {
    if (!post) {
      return;
    } else {
      axios
        .post("/add-comment/", {
          selectedGigId: selectedGigId,
          myUserId: myUserId,
          comment: post,
        })
        .then(({ data }) => {
          socket.emit("ADD COMMENT", {
            ...data.data[0],
            nickname: myNickname,
          });
          elem[0].value = "";
          setPost(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const keyCheck = (e: any) => {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        e.preventDefault();
        addComment();
        e.target.value = "";
      }
      e.preventDefault();
    }
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
          comments.map((comment: any) => (
            <div key={comment.id}>
              {comment.gig_id == selectedGigId && (
                <div>
                  <div className="comment" id={comment.id}>
                    {comment.comment}
                    <div>{comment.nickname}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
      <textarea
        rows={1}
        className="chatTypeLine"
        id="commentsTypeLine"
        onChange={(e) => {
          getPost(e);
        }}
        onKeyDown={(e) => keyCheck(e)}
      ></textarea>
      <div
        className="mainMenuLink"
        id="commentButton"
        onClick={() => addComment()}
      >
        Send
      </div>
    </div>
  );
};
