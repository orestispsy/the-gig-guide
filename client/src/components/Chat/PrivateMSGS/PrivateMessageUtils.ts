import axios from "../../../common/Axios/axios";
import { socket } from "../../../common/Socket/socket";

const checkForNew = (
  myUserId: number | undefined,
  userPrivate: number | undefined,
  privatePic: any,
  messages: any,
  firstMsg: any
) => {
  axios
    .post("/get-private-messages", {
      myUserId,
      userPrivate,
      privatePic,
    })
    .then(({ data }) => {
      if (data.data[data.data.length - 1].id == messages[messages.length - 1]) {
        if (
          firstMsg.msg_receiver_id == myUserId &&
          firstMsg.id == messages[messages.length - 1]
        ) {
          setPrivateMsgsIfSeen(firstMsg.id);
        }
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
  if (firstMsg.msg_sender_id == userPrivate) {
    setPrivateMsgsIfSeen(firstMsg.id);
  }
};

const getPrivateMessages = (
  myUserId: number | undefined,
  userPrivate: number | undefined,
  privatePic: any,
  setFirstMsg: (e: any) => void,
  setFilteredPrivateMessages: (e: any) => void
) => {
  if (myUserId && userPrivate) {
    axios
      .post("/get-private-messages", {
        myUserId,
        userPrivate,
        privatePic,
      })
      .then(({ data }) => {
        socket.emit("PRIVATE MESSAGES", data.data);
        if (data.data[0] && data.data[data.data.length - 1]) {
          setFirstMsg(data.data[data.data.length - 1]);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
    axios
      .get("/filtered-private")
      .then(({ data }) => {
        setFilteredPrivateMessages(data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
};

const addPrivateMsg = (
  message: string,
  myUserId: number | undefined,
  userPrivate: number | undefined,
  elem: any,
  myChatImg: string
) => {
  let emptyMsgChecker = message.trim();
  if (emptyMsgChecker !== "") {
    axios
      .post("/add-private-message/", {
        myUserId,
        userPrivate,
        message: message,
      })
      .then(({ data }) => {
        socket.emit("PRIVATE MESSAGE", {
          ...data.data[0],
          chat_img: myChatImg,
        });
        elem[0].value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const next20PrivateMsgs = (
  elemRef: any,
  setPostScroll: (e: boolean) => void,
  chatMessages: any,
  myUserId: number | undefined,
  userPrivate: number | undefined
) => {
  if (elemRef.current && elemRef.current.scrollTop == 0) {
    elemRef.current.scrollTop = elemRef.current.scrollTop + 1;
  }

  setPostScroll(true);
  socket.emit("NEXT PRIVATE MSGS", {
    sender_id: myUserId,
    receiver_id: userPrivate,

    id: chatMessages[0].id,
  });
};

const setPrivateMsgsIfSeen = (e: any) => {
  axios
    .post("/seen-private-messages", {
      firstMsg: e,
    })
    .then(({ data }) => {})
    .catch((err) => {
      console.log("error", err);
    });
};

const keyCheck = (
  e: any,
  myUserId: number | undefined,
  userPrivate: number | undefined,
  elem: any,
  myChatImg: string
) => {
  if (e.key === "Enter") {
    let emptyMsgChecker = e.target.value.trim();
    if (emptyMsgChecker !== "") {
      e.preventDefault();
      var msgLink = e.target.value.split(/\s+/);
      msgLink.forEach((element: any, index: number) => {
        if (element.startsWith("http") || element.startsWith("www.")) {
          let url = element;
          if (element.startsWith("www.")) {
            url = `https://` + url;
          }
          msgLink[index] = `<a href=${url} target="_blank">${element}</a>`;
          e.target.value = msgLink.join(" ");
        }
      }, msgLink);
      addPrivateMsg(e.target.value, myUserId, userPrivate, elem, myChatImg);
      e.target.value = "";
    }
    e.preventDefault();
  }
};

module.exports = {
  checkForNew,
  next20PrivateMsgs,
  setPrivateMsgsIfSeen,
  addPrivateMsg,
  getPrivateMessages,
  keyCheck,
};
