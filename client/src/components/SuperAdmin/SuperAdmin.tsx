import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../../common/Axios/axios";
import { socket } from "../../common/Socket/socket";

type LocationProps = {
  state: {
    user: {
      id: number;
    };
  };
  pathname: string;
};

interface Props {
  setDarkMode: (e: boolean) => void;
  myUserId: number | undefined;
  superAdmin: boolean;
  setAdminControls: (e: boolean) => void;
}

export const SuperAdmin: React.FC<Props> = ({
  setDarkMode,
  myUserId,
  superAdmin,
  setAdminControls,
}) => {
  const [userList, setUserList] = useState<any>(null);
  const [confirm, setConfirm] = useState<any>(false);
  const [guestList, setGuestList] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>(0);
  const [guestUser, setGuestUser] = useState<any>(0);
  const [guestDeleteConfirm, setGuestDeleteConfirm] = useState<boolean>(false);
  const [networkUsers, setNetworkUsers] = useState<any>(false);
  const [newUserName, setNewUserName] = useState<string>("");
  const [editName, setEditName] = useState<boolean>(false);

  const currentLocation = useLocation() as unknown as LocationProps;
  const { state, pathname } = currentLocation;

  useEffect(function () {
    if (!superAdmin) {
      location.replace("/");
    }
    setAdminControls(true);
    updateUsers();
  }, []);

  useEffect(
    function () {
      if (state && state.user) {
        setSelectedUser(state.user.id);
      }
    },
    [state]
  );

  const updateUsers = () => {
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

  const deleteGuests = () => {
    axios
      .get("/delete-guests")
      .then(({ data }) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const submitEnter = (e: any, id: number) => {
    if (e.keyCode === 13) {
      updateUserNickname(id);
      setEditName(false);
    }
  };

  const updateUserNickname = (id: number) => {
    axios
      .post("/change-super-nickname", { nickname: newUserName, id: id })
      .then(({ data }) => {
        updateUsers();
        socket.emit("UPDATE USERS", { nickname: newUserName, id: id });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (e: any) => {
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

  const confirmDelete = (e: any) => {
    setConfirm(e.target.id);
  };

  const setAdmin = (e: any, boolean: boolean) => {
    for (var x = 0; x < networkUsers.length; x++) {
      if (networkUsers[x].id == e.target.id) {
        let newList = [...networkUsers];
        newList[x].admin = !boolean;
        setUserList(newList);
      }
    }
    axios
      .post("/set-admin", { id: e.target.id, boolean: !boolean })
      .then(({ data }) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  let fixedTime: string;
  let fixedDate: string;
  let msgDate: string[];
  let msgTime: string[];
  let diff = new Date().getTimezoneOffset() / -60;
  const handleTime = (e: string) => {
    if (e) {
      msgDate = e.slice(0, 10).split("-");
      fixedDate = msgDate[2] + "-" + msgDate[1] + "-" + msgDate[0];

      msgTime = e.slice(11, 19).split(":");

      if (msgTime[0].startsWith("0")) {
        msgTime[0] = msgTime[0].slice(1, 2);
      }

      fixedTime =
        JSON.parse(msgTime[0]) + diff + ":" + msgTime[1] + ":" + msgTime[2];
    }
  };

  const setSuperAdmin = (e: any, boolean: boolean) => {
    for (var x = 0; x < networkUsers.length; x++) {
      if (networkUsers[x].id == e.target.id) {
        let newList = [...networkUsers];
        newList[x].super_admin = !boolean;
        setUserList(newList);
      }
    }
    axios
      .post("/set-super-admin", { id: e.target.id, boolean: !boolean })
      .then(({ data }) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const setUserBan = (e: any, id: any, boolean: boolean) => {
    for (var x = 0; x < networkUsers.length; x++) {
      if (networkUsers[x].id == e.target.id) {
        let newBannedList = [...networkUsers];
        newBannedList[x].ban = !boolean;
        setUserList(newBannedList);
      }
    }
    axios
      .post("/ban-user", { id: id, boolean: !boolean })
      .then(({ data }) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const setUserBlock = (e: any, id: any, boolean: boolean) => {
    for (var x = 0; x < networkUsers.length; x++) {
      if (networkUsers[x].id == e.target.id) {
        let newBlockedList = [...networkUsers];
        newBlockedList[x].blocked = !boolean;
        setUserList(newBlockedList);
      }
    }
    axios
      .post("/block-user", { id: id, boolean: !boolean })
      .then(({ data }) => {})
      .catch((err) => {
        console.log(err);
      });

    socket.emit("forceBlock", { id: id, boolean: boolean });
  };

  return (
    <div className="superAdminContainer">
      <div className="superAdminContainerInner">
        <select
          value={selectedUser}
          name="selectedGig"
          className="selectSuperUserMode"
          onChange={(e) => {
            setConfirm(false);
            setSelectedUser(parseInt(e.target.value));
          }}
        >
          <option className="chooseSuperUserMode" value="">
            Select User
          </option>

          {userList &&
            userList.map((user: any) => {
              handleTime(user.last_online || user.created_at);

              return (
                myUserId != user.id &&
                !user.nickname.includes("Guest") && (
                  <option
                    value={user.id}
                    key={user.id}
                    className="chooseSuperUserMode"
                  >
                    {(user.ban && `🔴`) || `❂`} {user.nickname}
                    {" ○ "}
                    {msgDate[2] + "-" + msgDate[1]}
                    {" || "}
                    {JSON.parse(msgTime[0]) + diff + ":" + msgTime[1]}
                  </option>
                )
              );
            })}
          {networkUsers &&
            userList &&
            networkUsers.map((user: any) => {
              handleTime(user.last_online || user.created_at);
              function userExists(id: number) {
                return userList.some(function (user: any) {
                  return user.id === id;
                });
              }

              return (
                myUserId != user.id &&
                !user.nickname.includes("Guest") &&
                !userExists(user.id) && (
                  <option
                    style={{
                      color: (selectedUser == user.id && `white`) || ``,
                    }}
                    value={user.id}
                    key={user.id}
                    className={
                      (!user.last_online && "chooseSuperUserModeOld") ||
                      (user.last_online && "chooseSuperUserModeOldLight")
                    }
                  >
                    {user.last_online && " ◍ "}
                    {!user.last_online && " ◉ "}
                    {user.nickname}
                    {" ○ "}
                    {msgDate[2] + "-" + msgDate[1]}
                    {" || "}
                    {JSON.parse(msgTime[0]) + diff + ":" + msgTime[1]}
                  </option>
                )
              );
            })}
        </select>
        {selectedUser > 0 && (
          <div
            title="Reset"
            className="superUserReset"
            onClick={(e) => {
              setSelectedUser(0);
            }}
          >
            reset
          </div>
        )}
        {!selectedUser && (
          <div className="superList">
            <div className="superListItemBack">
              <div className="superListItem">
                <img src={"avatar.png"}></img>
                <div className="superAdminGuestList" id="superAdminGuestsHead">
                  Guests
                  <span
                    className="superAdminGuestList"
                    id="superAdminGuestList"
                  >
                    {guestList.length > 0 && guestList.length}
                  </span>
                </div>
                {guestList[0] && (
                  <>
                    <select
                      value={guestUser}
                      name="selectedGig"
                      className="selectGuestSuperMode"
                      onChange={(e) => {
                        setGuestUser(parseInt(e.target.value));
                        setConfirm(false);
                      }}
                    >
                      <option className="chooseGuestSuperMode" value="">
                        Select
                      </option>
                      {guestList &&
                        guestList.map((guest: any) => {
                          handleTime(guest.created_at);
                          return (
                            <option
                              style={{
                                color:
                                  (guestUser == guest.id && `yellow`) || ``,
                              }}
                              value={guest.id}
                              key={guest.id}
                              className="chooseGuestSuperMode"
                            >
                              {guest.nickname}
                              {" ○ "}
                              {msgDate[2] + "-" + msgDate[1]}
                              {" || "}
                              {JSON.parse(msgTime[0]) + diff + ":" + msgTime[1]}
                            </option>
                          );
                        })}
                    </select>
                    {guestUser > 0 && (
                      <div
                        title="Reset"
                        className="superUserReset"
                        onClick={(e) => {
                          setGuestUser(0);
                        }}
                      >
                        reset
                      </div>
                    )}
                    {(!confirm && guestUser > 0 && (
                      <div
                        className="deleteUser"
                        id="deleteUser"
                        onClick={(e) => {
                          setConfirm(!confirm);
                        }}
                      >
                        DELETE
                      </div>
                    )) ||
                      (confirm && (
                        <div
                          className="deleteUserConfirm"
                          id="deleteUser"
                          onClick={(e) => {
                            deleteUser(guestUser);
                            setGuestList(
                              guestList.filter(
                                (guest: any) => guest.id != guestUser
                              )
                            );
                            setConfirm(!confirm);
                          }}
                        >
                          Confirm
                        </div>
                      ))}
                  </>
                )}

                <span className="superAdminGuestList" id="superAdminGuestList">
                  {!guestList[0] && "Nothing here"}
                </span>
                {!guestDeleteConfirm && (
                  <span
                    id="deleteAllGuests"
                    onClick={(e) => {
                      setGuestDeleteConfirm(true);
                    }}
                  >
                    {guestList[0] && "delete all"}
                  </span>
                )}
                {guestDeleteConfirm && (
                  <span
                    id="deleteAllGuestsConfirm"
                    onClick={(e) => {
                      deleteGuests();
                      setGuestList(false);
                    }}
                  >
                    {guestList[0] && "confirm"}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        {networkUsers &&
          networkUsers.map((user: any) => {
            var diff = new Date().getTimezoneOffset() / -60;

            handleTime(user.last_online || user.created_at);

            return (
              <React.Fragment key={user.id}>
                {myUserId != user.id && user.id == selectedUser && (
                  <div className="superList">
                    <div className="superListItemBack">
                      <div className="superListItem">
                        <img src={user.chat_img || "avatar.png"}></img>
                        {!editName && (
                          <h1
                            onClick={() => {
                              setEditName(true);
                            }}
                          >
                            {user.nickname}
                          </h1>
                        )}
                        {editName && (
                          <input
                            onKeyDown={(e) => submitEnter(e, user.id)}
                            onBlur={() => setEditName(false)}
                            defaultValue={user.nickname}
                            className="superEditName"
                            onChange={(e) => {
                              setNewUserName(e.target.value);
                            }}
                          ></input>
                        )}
                        <div>Last Online</div>
                        <span>{fixedDate}</span>
                        <span>{fixedTime}</span>
                      </div>
                      <div className="superListItem" id="superListItem">
                        {" "}
                        {(user.admin && (
                          <div
                            id={user.id || ""}
                            className="adminYes"
                            onClick={(e) => setAdmin(e, user.admin)}
                          >
                            ADMIN
                          </div>
                        )) ||
                          (!user.admin && (
                            <div
                              id={user.id || ""}
                              className="adminNo"
                              onClick={(e) => setAdmin(e, user.admin)}
                            >
                              ADMIN
                            </div>
                          ))}
                        {(user.super_admin && (
                          <div
                            id={user.id || ""}
                            className="superAdminYes"
                            onClick={(e) => setSuperAdmin(e, user.super_admin)}
                          >
                            SUPER ADMIN
                          </div>
                        )) ||
                          (!user.super_admin && (
                            <div
                              id={user.id || ""}
                              className="superAdminNo"
                              onClick={(e) =>
                                setSuperAdmin(e, user.super_admin)
                              }
                            >
                              SUPER ADMIN
                            </div>
                          ))}
                        {(confirm != user.id && (
                          <div
                            id={user.id || ""}
                            className="deleteUser"
                            onClick={(e) => confirmDelete(e)}
                          >
                            DELETE
                          </div>
                        )) ||
                          (confirm == user.id && (
                            <div
                              className="deleteUserConfirm"
                              id={user.id || ""}
                              onClick={(e) => {
                                setConfirm(false);
                                setGuestList(
                                  guestList.filter(
                                    (user: any) => user.id != selectedUser
                                  )
                                );
                                deleteUser(user.id);
                              }}
                            >
                              CONFIRM
                            </div>
                          ))}
                        <div className="punishBox">
                          {(user.ban && (
                            <div
                              id={user.id || ""}
                              className="adminYes"
                              onClick={(e) => setUserBan(e, user.id, user.ban)}
                            >
                              BAN
                            </div>
                          )) ||
                            (!user.ban && (
                              <div
                                id={user.id || ""}
                                className="adminNo"
                                onClick={(e) =>
                                  setUserBan(e, user.id, user.ban)
                                }
                              >
                                BAN
                              </div>
                            ))}
                          {(user.blocked && (
                            <div
                              id={user.id || ""}
                              className="adminYes"
                              onClick={(e) =>
                                setUserBlock(e, user.id, user.blocked)
                              }
                            >
                              BLOCK
                            </div>
                          )) ||
                            (!user.blocked && (
                              <div
                                id={user.id || ""}
                                className="adminNo"
                                onClick={(e) =>
                                  setUserBlock(e, user.id, user.blocked)
                                }
                              >
                                BLOCK
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};
