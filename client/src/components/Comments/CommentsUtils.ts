import axios from "../../common/Axios/axios";
import { socket } from "../../common/Socket/socket";

const updateComments = (selectedGigId: string) => {
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
};

const axiosAddComment = (
  selectedGigId: string,
  post: string | null,
  myNickname: string,
  myUserId: number | undefined,
  setPost: (e: string | null) => void,
  setCommentsTimeline: (e: any) => void
) => {
  if (!post) {
    return;
  } else {
    const elem: any = document.querySelectorAll("#commentsTypeLine");
    let emptyMsgChecker = post.trim();
    if (emptyMsgChecker !== "") {
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
          axiosGetComments(setCommentsTimeline);
          elem[0].value = "";
          setPost(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};

const axiosGetComments = (setTimelineComments: (e: any) => void) => {
  axios
    .get("/get-comments-timeline")
    .then(({ data }) => {
      setTimelineComments(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const dateTimeHandler = (e: string) => {
  let newDate = new Date(e);
  let day: string | number = newDate.getDate();
  let month: string | number = newDate.getMonth() + 1;
  let year: any = newDate.getFullYear();
  let hours: any = newDate.getHours() + 6;
  //hours + 6 as local configuration for my domain
  let minutes: string | number = newDate.getMinutes();
  let timePreFix: string;
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours == 24) {
    hours = 0;
  }
  if (hours > 24) {
    hours = hours - 24;
  }

  if (hours < 10) {
    timePreFix = `0`;
  } else {
    timePreFix = "";
  }

  let fixedDateTime: string =
    year + "-" + month + "-" + day + " • " + timePreFix + hours + ":" + minutes;

  return fixedDateTime;
};

const keyCheck = (
  e: any,
  selectedGigId: string,
  post: string | null,
  myNickname: string,
  myUserId: number | undefined,
  setPost: (e: string | null) => void,
  setCommentsTimeline: (e: any) => void
) => {
  if (e.key === "Enter") {
    let emptyMsgChecker = e.target.value.trim();
    if (emptyMsgChecker !== "") {
      e.preventDefault();
      axiosAddComment(
        selectedGigId,
        post,
        myNickname,
        myUserId,
        setPost,
        setCommentsTimeline
      );
      e.target.value = "";
    }
    e.preventDefault();
  }
};

module.exports = {
  dateTimeHandler,
  axiosGetComments,
  axiosAddComment,
  updateComments,
  keyCheck,
};
