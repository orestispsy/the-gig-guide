import { socket } from "../../common/Socket/socket";
import axios from "../../common/Axios/axios";

module.exports.handleTime = (e: any, date?: boolean) => {
  let msgDate;
  let msgTime;
  let fixedDate: string;
  let fixedHours: number;
  let timePreFix: string;
  let diff = new Date().getTimezoneOffset() / -60;

  if (e.created_at) {
    if (e.last_online) {
      msgDate = e.last_online.slice(0, 10).split("-");
    } else {
      msgDate = e.created_at.slice(0, 10).split("-");
    }

    fixedDate = msgDate[2] + "-" + msgDate[1] + "-" + msgDate[0];

    msgTime = e.created_at.slice(11, 19).split(":");

    if (msgTime[0].startsWith("0")) {
      msgTime[0] = msgTime[0].slice(1, 2);
    }
    fixedHours = Number(msgTime[0]) + 6 + diff;
    if (fixedHours == 24) {
      fixedHours = 0;
    }
    if (fixedHours > 24) {
      fixedHours = fixedHours - 24;
    }
    if (fixedHours < 10) {
      timePreFix = `0`;
    } else {
      timePreFix = "";
    }

    return date
      ? fixedDate
      : timePreFix + fixedHours + ":" + msgTime[1] + ":" + msgTime[2];
  } else {
    return;
  }
};

module.exports.setChatScrollBarPosition = (elemRef: any) => {
  if (elemRef.current) {
    const newScrollTop =
      elemRef.current.scrollHeight - elemRef.current.clientHeight;
    elemRef.current.scrollTop = newScrollTop;
  }
};

module.exports.checkBrowserCount = (browserCount: any) => {
  if (browserCount < 2) {
    const timer = setTimeout(() => {
      socket.emit("A CHAT MSG", "--##--entered--##--");
    }, 1500);
    return () => clearTimeout(timer);
  } else {
    return;
  }
};

module.exports.chatMessageActions = (
  chatMessages: any,
  myUserId: number | undefined,
  mute: boolean,
  elemRef: any,
  play: () => void,
  playIntro: () => void,
  postScroll: boolean,
  setPostScroll: (e: boolean) => void,
  scrollTop: number
) => {
  if (
    chatMessages &&
    chatMessages.length > 0 &&
    chatMessages[chatMessages.length - 1].chat_msg == "--##--entered--##--" &&
    chatMessages[chatMessages.length - 1].msg_sender_id != myUserId &&
    !mute
  ) {
    playIntro();
  }
  if (!postScroll) {
    setTimeout(() => {
      exports.setChatScrollBarPosition(elemRef);
    }, 100);
  }
  if (!mute && scrollTop > 1) {
    play();
  }
  setPostScroll(false);
};

module.exports.chatUserOnlineChecker = (
  e: boolean,
  onlineUsers: any,
  myUserId: number | undefined
) => {
  if (onlineUsers) {
    let users = onlineUsers;
    users.forEach((element: any) => {
      if (element.id == myUserId) {
        element.online = false;
        axios
          .post("/set-user-status", { online: e })
          .then(({ data }) => {
            socket.emit("ONLINE USERS", users);
          })
          .catch((err) => {
            console.log("error", err);
          });
      }
    });
  }
};

module.exports.playNotification = (
  mute: boolean,
  playPrivateMsg: () => void
) => {
  if (!mute) {
    playPrivateMsg();
  }
};

module.exports.setScrollBarBottom = (elemRef: any, scrollTop: number) => {
  if (elemRef.current) {
    elemRef.current.scrollTop = scrollTop;
  }
};

module.exports.keyCheck = (e: any) => {
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
      socket.emit("A CHAT MSG", e.target.value);
      e.target.value = "";
    }
    e.preventDefault();
  }
};

module.exports.setChatMSGChange = (e: any, setChatMSG: (e: any) => void) => {
  setChatMSG(e.target.value);
};

module.exports.sendChatMSGButton = (
  chatMSG: any,
  setChatMSG: (e: any) => false,
  chatTypeLine: any
) => {
  if (chatMSG) {
    let emptyMsgChecker = chatMSG.trim();
    {
      if (emptyMsgChecker !== "") {
        socket.emit("A CHAT MSG", chatMSG);
        setChatMSG(false);
        chatTypeLine[0].value = "";
      }
    }
  }
};

module.exports.next20ChatMsgs = (
  elemRef: any,
  setPostScroll: (e: boolean) => void,
  chatMessages: any
) => {
  if (elemRef.current && elemRef.current.scrollTop == 0) {
    elemRef.current.scrollTop = elemRef.current.scrollTop + 1;
  }
  setPostScroll(true);
  socket.emit("NEXT MSGS", chatMessages[0].id);
};

module.exports.moveScrollbarToTop = (elemRef: any) => {
  if (elemRef.current) {
    elemRef.current.scrollTop = 3;
  }
};
module.exports.moveScrollbarToBottom = (elemRef: any) => {
  if (elemRef.current) {
    elemRef.current.scrollTop =
      elemRef.current.scrollHeight - elemRef.current.clientHeight;
  }
};

module.exports.sendEmoji = (e: any) => {
  let helper = e.target.attributes[0].value;
  let msg = `<img class="emojis" src=${helper}>`;
  socket.emit("A CHAT MSG", msg);
};

module.exports.toggleTicker = (
  e: boolean,
  setTickerBar: (e: boolean) => void
) => {
  setTickerBar(e);
};

module.exports.handleChatPostDelete = (
  e: any,
  elemRef: any,
  setPostScroll: (e: boolean) => void,
  chatMessages: any
) => {
  if (elemRef.current) {
    if (
      elemRef.current.scrollHeight <=
      elemRef.current.scrollTop + elemRef.current.clientHeight + 100
    ) {
      setPostScroll(false);
    } else {
      setPostScroll(true);
    }

    const position = elemRef.current.scrollTop;

    socket.emit(
      "DELETE MSG",
      chatMessages.reverse().filter((msg: any) => msg.id !== e),
      e
    );

    const timer = setTimeout(() => {
      if (elemRef.current) {
        elemRef.current.scrollTop = position;
      }
    }, 500);
    return () => clearTimeout(timer);
  } else {
    return;
  }
};
