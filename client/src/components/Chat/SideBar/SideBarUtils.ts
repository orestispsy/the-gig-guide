import { socket } from "../../../common/Socket/socket";
import axios from "../../../common/Axios/axios";

module.exports.keyCheck = (
  e: any,
  id: number,
  setConfigTimer: (e: boolean) => void
) => {
  if (e.key === "Enter") {
    if (e.target.value !== "") {
      e.preventDefault();
      setConfigTimer(false);
      socket.emit("forceDisconnect", id);
    }
  }
};

module.exports.changeInfo = (
  ev1: string,
  myNickname: string | undefined,
  setMyNickname: (e: string) => void,
  setErrorDuplicate: (e: boolean) => void,
  setNewPassword: (e: string | boolean) => void,
  setNewNickname: (e: string | boolean) => void,
  errorDuplicate: (e: boolean) => void,
  setUserConfig: (e: boolean) => void,
  myUserId: number | undefined,
  onlineUsers: any,
  setErrorMsg: (e: boolean) => void,
  ev2?: string
) => {
  axios
    .post("/change-nickname", { nickname: ev1 })
    .then(({ data }) => {
      if (data.errorDuplicate) {
        if (myNickname !== ev1) {
          setErrorDuplicate(true);
        } else {
          changePassword();
        }
      }
      if (data.data) {
        if (myNickname !== ev1) {
          setMyNickname(data.data[0].nickname);
          setUserConfig(false);
          setErrorDuplicate(false);
          let updatedNickUsers = onlineUsers;
          updatedNickUsers.forEach((user: any) => {
            if (user.id == myUserId) {
              user.nickname = data.data[0].nickname;
            }
          });
          socket.emit("ONLINE USERS", updatedNickUsers);
          setNewNickname(false);
          changePassword();
        }
      } else {
        setErrorMsg(true);
      }
    })
    .catch((err) => {
      console.log("error", err);
      setErrorMsg(true);
    });

  const changePassword = () => {
    if (ev2 && !errorDuplicate) {
      let emptyMsgChecker = ev2.trim();
      if (emptyMsgChecker !== "") {
        axios
          .post("/change-password", {
            nickname: ev1,
            password: ev2,
          })
          .then(({ data }) => {
            if (data.data) {
              setUserConfig(false);
              setNewPassword(false);
            } else {
              setErrorMsg(true);
            }
          })
          .catch((err) => {
            console.log("error", err);
            setErrorMsg(true);
          });
      }
    }
  };
};
