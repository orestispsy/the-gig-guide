import {
  chatMessages,
  nextChatMessages,
  chatMessage,
  onlineUsers,
  userJoinedAct,
  userLeftAct,
  comments,
  addCommentAct,
  images,
  addImageAct,
  deleteImageAct,
  nextPrivateMessages,
  privateMessagesAct,
  privateMessageAct,
  browserCountAct,
  chatBanAct,
  banTimerAct,
  hornAct,
  visitors,
} from "./../Redux/actions";
import { io } from "socket.io-client";

export let socket;

export const init = (store) => {
  if (!socket) {
    socket = io.connect();

    socket.on("nextChatMessages", (msgs) => {
      store.dispatch(nextChatMessages(msgs));
    });

    socket.on("chatMessages", (msgs) => {
      store.dispatch(chatMessages(msgs));
    });

    socket.on("chatMessage", (msg) => {
      store.dispatch(chatMessage(msg));
    });

    socket.on("usersOnline", (data) => {
      store.dispatch(onlineUsers(data));
    });
    socket.on("userEnters", (data) => {
      store.dispatch(usseerJoinedAct(data));
    });

    socket.on("userLeft", (data) => {
      store.dispatch(userLeftAct(data));
    });

    socket.on("comments", (rows) => {
      store.dispatch(comments(rows));
    });

    socket.on("addComment", (data) => {
      store.dispatch(addCommentAct(data));
    });

    socket.on("images", (rows) => {
      store.dispatch(images(rows));
    });

    socket.on("addImage", (data) => {
      store.dispatch(addImageAct(data));
    });

    socket.on("deleteImage", (data) => {
      store.dispatch(deleteImageAct(data));
    });

    socket.on("nextPrivateMessages", (data) => {
      store.dispatch(nextPrivateMessages(data));
    });

    socket.on("privateMessages", (data) => {
      store.dispatch(privateMessagesAct(data));
    });

    socket.on("privateMessage", (data) => {
      store.dispatch(privateMessageAct(data));
    });

    socket.on("browserCount", (data) => {
      store.dispatch(browserCountAct(data));
    });
    socket.on("disc", (data) => {
      socket.disconnect();
    });
    socket.on("chatBan", (data) => {
      store.dispatch(chatBanAct(data));
    });
    socket.on("banTimer", (data) => {
      store.dispatch(banTimerAct(data));
    });
    socket.on("horn", (data) => {
      store.dispatch(hornAct(data));
    });
    socket.on("visitors", (data) => {
      store.dispatch(visitors(data));
    });
  }
};
