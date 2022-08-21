import axios from "../../common/Axios/axios";
import { socket } from "../../common/Socket/socket";

const deleteGuests = () => {
  axios
    .get("/delete-guests")
    .then(({ data }) => {})
    .catch((err) => {
      console.log(err);
    });
};

const deleteUser = (
  e: any,
  userList: any,
  setUserList: (e: any) => void,
  setNetworkUsers: (e: any) => void,
  networkUsers: any,
  setSelectedUser: (e: any) => void
) => {
  axios
    .post("/delete-user", { id: e })
    .then(({ data }) => {
      setUserList(userList.filter((user: any) => user.id != e));
      setNetworkUsers(networkUsers.filter((user: any) => user.id != e));
      setSelectedUser(0);
    })
    .catch((err) => {
      console.log(err);
    });
};

const confirmDelete = (e: any, setConfirm: (e: any) => void) => {
  setConfirm(e.target.id);
};

const submitEnter = (
  e: any,
  id: number,
  newUserName: string,
  setUserList: (e: any) => void,
  setNetworkUsers: (e: any) => void,
  setGuestList: (e: any) => void,
  setEditName: (e: boolean) => void
) => {
  if (e.keyCode === 13) {
    updateUserNickname(
      id,
      newUserName,
      setUserList,
      setNetworkUsers,
      setGuestList
    );
    setEditName(false);
  }
};

const updateUserNickname = (
  id: number,
  newUserName: string,
  setUserList: (e: any) => void,
  setNetworkUsers: (e: any) => void,
  setGuestList: (e: any) => void
) => {
  axios
    .post("/change-super-nickname", { nickname: newUserName, id: id })
    .then(({ data }) => {
      updateUsers(setUserList, setNetworkUsers, setGuestList);
      socket.emit("UPDATE USERS", {
        nickname: newUserName,
        id: id,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateUsers = (
  setUserList: (e: any) => void,
  setNetworkUsers: (e: any) => void,
  setGuestList: (e: any) => void
) => {
  axios
    .get("/get-all-users")
    .then(({ data }) => {
      setUserList(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  axios
    .get("/get-network-users")
    .then(({ data }) => {
      setNetworkUsers(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  axios
    .get("/get-guests")
    .then(({ data }) => {
      setGuestList(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const setAdmin = (
  e: any,
  boolean: boolean,
  setNetworkUsers: (e: any) => void,
  setUserList: (e: any) => void,
  setGuestList: (e: any) => void
) => {
  axios
    .post("/set-admin", { id: e.target.id, boolean: !boolean })
    .then(({ data }) => {
      updateUsers(setUserList, setNetworkUsers, setGuestList);
    })
    .catch((err) => {
      console.log(err);
    });
};

const setSuperAdmin = (
  e: any,
  boolean: boolean,
  setNetworkUsers: (e: any) => void,
  setUserList: (e: any) => void,
  setGuestList: (e: any) => void
) => {
  axios
    .post("/set-super-admin", { id: e.target.id, boolean: !boolean })
    .then(({ data }) => {
      updateUsers(setUserList, setNetworkUsers, setGuestList);
    })
    .catch((err) => {
      console.log(err);
    });
};

const setUserBlock = (
  e: any,
  id: any,
  boolean: boolean,
  setNetworkUsers: (e: any) => void,
  setUserList: (e: any) => void,
  setGuestList: (e: any) => void
) => {
  axios
    .post("/block-user", { id: id, boolean: !boolean })
    .then(({ data }) => {
      updateUsers(setUserList, setNetworkUsers, setGuestList);
    })
    .catch((err) => {
      console.log(err);
    });

  socket.emit("forceBlock", { id: id, boolean: boolean });
};

const setUserBan = (
  e: any,
  id: any,
  boolean: boolean,
  setNetworkUsers: (e: any) => void,
  setUserList: (e: any) => void,
  setGuestList: (e: any) => void
) => {
  axios
    .post("/ban-user", { id: id, boolean: !boolean })
    .then(({ data }) => {
      updateUsers(setUserList, setNetworkUsers, setGuestList);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  submitEnter,
  setAdmin,
  confirmDelete,
  deleteUser,
  deleteGuests,
  updateUserNickname,
  updateUsers,
  setSuperAdmin,
  setUserBlock,
  setUserBan,
};
