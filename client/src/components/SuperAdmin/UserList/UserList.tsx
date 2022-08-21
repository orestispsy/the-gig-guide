import React from "react";

const { handleTime } = require("../../Chat/ChatUtils");

const {
  setAdmin,
  submitEnter,
  setSuperAdmin,
  setUserBlock,
  setUserBan,
  deleteUser,
  confirmDelete,
} = require("../SuperAdminUtils");

interface Props {
  myUserId: number | undefined;
  editName: boolean;
  setEditName: (e: boolean) => void;
  networkUsers: any;
  selectedUser: any;
  newUserName: string;
  setNewUserName: (e: string) => void;
  setUserList: (e: any) => void;
  userList: any;
  setGuestList: (e: any) => void;
  setNetworkUsers: (e: any) => void;
  guestList: any;
  confirm: boolean;
  setConfirm: (e: boolean) => void;
  setSelectedUser: (e: any) => void;
}

export const UserList: React.FC<Props> = ({
  myUserId,
  editName,
  setEditName,
  networkUsers,
  selectedUser,
  newUserName,
  setNewUserName,
  setUserList,
  userList,
  setGuestList,
  setNetworkUsers,
  guestList,
  confirm,
  setConfirm,
  setSelectedUser,
}) => {
  return (
    <>
      {networkUsers &&
        networkUsers.map((user: any) => {
          handleTime(user);

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
                          onKeyDown={(e) =>
                            submitEnter(
                              e,
                              user.id,
                              newUserName,
                              setUserList,
                              setNetworkUsers,
                              setGuestList,
                              setEditName
                            )
                          }
                          onBlur={() => setEditName(false)}
                          defaultValue={user.nickname}
                          className="superEditName"
                          onChange={(e) => {
                            setNewUserName(e.target.value);
                          }}
                        ></input>
                      )}
                      <div>Last Online</div>
                      <span>{handleTime(user, true)}</span>
                      <span>{handleTime(user)}</span>
                    </div>
                    <div className="superListItem" id="superListItem">
                      {" "}
                      {(user.admin && (
                        <div
                          id={user.id || ""}
                          className="adminYes"
                          onClick={(e) =>
                            setAdmin(
                              e,
                              user.admin,
                              setNetworkUsers,
                              setUserList,
                              setGuestList
                            )
                          }
                        >
                          ADMIN
                        </div>
                      )) ||
                        (!user.admin && (
                          <div
                            id={user.id || ""}
                            className="adminNo"
                            onClick={(e) =>
                              setAdmin(
                                e,
                                user.admin,
                                setNetworkUsers,
                                setUserList,
                                setGuestList
                              )
                            }
                          >
                            ADMIN
                          </div>
                        ))}
                      {(user.super_admin && (
                        <div
                          id={user.id || ""}
                          className="superAdminYes"
                          onClick={(e) =>
                            setSuperAdmin(
                              e,
                              user.super_admin,
                              setNetworkUsers,
                              setUserList,
                              setGuestList
                            )
                          }
                        >
                          SUPER ADMIN
                        </div>
                      )) ||
                        (!user.super_admin && (
                          <div
                            id={user.id || ""}
                            className="superAdminNo"
                            onClick={(e) =>
                              setSuperAdmin(
                                e,
                                user.super_admin,
                                setNetworkUsers,
                                setUserList,
                                setGuestList
                              )
                            }
                          >
                            SUPER ADMIN
                          </div>
                        ))}
                      {(confirm != user.id && (
                        <div
                          id={user.id || ""}
                          className="deleteUser"
                          onClick={(e) => confirmDelete(e, setConfirm)}
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
                              deleteUser(
                                user.id,
                                userList,
                                setUserList,
                                setNetworkUsers,
                                networkUsers,
                                setSelectedUser
                              );
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
                            onClick={(e) =>
                              setUserBan(
                                e,
                                user.id,
                                user.ban,
                                setNetworkUsers,
                                setUserList,
                                setGuestList
                              )
                            }
                          >
                            BAN
                          </div>
                        )) ||
                          (!user.ban && (
                            <div
                              id={user.id || ""}
                              className="adminNo"
                              onClick={(e) =>
                                setUserBan(
                                  e,
                                  user.id,
                                  user.ban,
                                  setNetworkUsers,
                                  setUserList,
                                  setGuestList
                                )
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
                              setUserBlock(
                                e,
                                user.id,
                                user.blocked,
                                setNetworkUsers,
                                setUserList,
                                setGuestList
                              )
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
                                setUserBlock(
                                  e,
                                  user.id,
                                  user.blocked,
                                  setNetworkUsers,
                                  setUserList,
                                  setGuestList
                                )
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
    </>
  );
};
