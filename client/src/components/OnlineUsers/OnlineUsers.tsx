import { useSelector } from "react-redux";
import { socket } from "../../common/Socket/socket";
import React, { useEffect, useState } from "react";
import axios from "../../common/Axios/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

let emoji = require("./../../common/customEmoj.json");

type LocationProps = {
  state: {
    previousPath: string;
  };
  pathname: string;
};

interface Props {
  myChatImg: string;
  myUserId: number | undefined;
  myChatColor: string;
  superAdmin: boolean;
  setAdmin: (e: boolean) => void;
  setMyChatImg: (e: string) => void;
  myNickname: string;
  setMyNickname: (e: string) => void;
  guest: boolean;
  darkMode: boolean;
  emojiBar: boolean;
  setEmojiBar: (e: boolean) => void;
  sendEmoji: (e: any) => void;
  setPrivatePic: (e: string) => void;
  privatePic: any;
  setPrivateNick: (e: string | boolean) => void;
  privateNick: string | boolean;
  privateMode: boolean;
  setPrivateMode: (e: boolean) => void;
  setUserPrivate: (e: any) => void;
  setFilteredPrivateMessages: (e: any) => void;
  privateMessages: any;
  configTimer: any;
  setConfigTimer: (e: any) => void;
  onlineUsers: any;
  horn: any;
  playNotification: (e: boolean, playPrivateMsg: () => void) => void;
  playPrivateMsg: () => void;
  shakeUser: boolean;
  setShakeUser: (e: boolean) => void;
  mute: boolean;
}

export const OnlineUsers: React.FC<Props> = ({
  myUserId,
  myNickname,
  setMyNickname,
  myChatImg,
  setMyChatImg,
  emojiBar,
  myChatColor,
  privatePic,
  setPrivatePic,
  privateNick,
  setPrivateNick,
  onlineUsers,
  setEmojiBar,
  sendEmoji,
  privateMode,
  setPrivateMode,
  privateMessages,
  setFilteredPrivateMessages,
  configTimer,
  setConfigTimer,

  horn,
  playNotification,
  playPrivateMsg,
  shakeUser,
  setShakeUser,
  guest,
  setAdmin,
  superAdmin,
  darkMode,
  mute,
  setUserPrivate,
}) => {
  const [userPicBar, setUserPicBar] = useState<boolean>(false);
  const [onlineUserPic, setOnlineUserPic] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [closeTag, setcloseTag] = useState<boolean>(false);
  const [chatColor, setChatColor] = useState<string>("");
  const [networkList, setNetworkList] = useState<boolean>(false);
  const [networkUsers, setNetworkUsers] = useState<any>([]);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const [errorMsgInfo, setErrorMsgInfo] = useState<boolean>(false);
  const [errorDuplicate, setErrorDuplicate] = useState<boolean>(false);
  const [userConfig, setUserConfig] = useState<boolean>(false);
  const [newNickname, setNewNickname] = useState<any>(false);
  const [newPassword, setNewPassword] = useState<any>(false);
  const [pwdReveal, setPwdReveal] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectUserToKick, setSelectUserToKick] = useState<number | boolean>(
    false
  );

  const statePrivateMsgs = useSelector((state: any) => state && state.messages);

  const navigate = useNavigate();
  const location = useLocation() as unknown as LocationProps;
  const { state, pathname } = location;

  useEffect(() => {
    axios
      .get("/get-network-users")
      .then(({ data }) => {
        setNetworkUsers(data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });

    if (!statePrivateMsgs) {
      axios

        .get("/filtered-private")
        .then(({ data }) => {
          setFilteredPrivateMessages(data.data);
          socket.emit("PRIVATE MESSAGES", data.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, []);

  useEffect(() => {
    if (horn) {
      setShakeUser(true);
      setSelectUserToKick(Number(myUserId));
    }
  }, [horn]);

  useEffect(() => {
    if (!privateMode) {
      setPrivateMode(false);
      setEmojiBar(false);
      axios
        .get("/filtered-private")
        .then(({ data }) => {
          setFilteredPrivateMessages(data.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [privateMode]);

  useEffect(() => {
    if (shakeUser) {
      const timer = setTimeout(() => {
        setShakeUser(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      return;
    }
  }, [shakeUser]);

  useEffect(() => {
    axios
      .get("/filtered-private")
      .then(({ data }) => {
        setFilteredPrivateMessages(data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });

    if (
      statePrivateMsgs &&
      statePrivateMsgs.length - 1 >= 0 &&
      !statePrivateMsgs[statePrivateMsgs.length - 1].receiver_seen &&
      statePrivateMsgs[statePrivateMsgs.length - 1].msg_receiver_id == myUserId
    ) {
      playNotification(mute, playPrivateMsg);
    }
  }, [statePrivateMsgs]);

  useEffect(() => {
    if (onlineUsers) {
      let users = onlineUsers;

      users.forEach((element: any) => {
        if (element.id == myUserId) {
          element.online = true;
          socket.emit("ONLINE USERS", users);
          axios
            .post("/set-user-status", { online: true })
            .then(({ data }) => {})
            .catch((err) => {
              console.log("error", err);
            });
        }
      });
    }
  }, []);

  const keyCheck = (e: any, id: number) => {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        e.preventDefault();
        setConfigTimer(false);
        socket.emit("forceDisconnect", id);
      }
    }
  };

  const handleUploaderChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUploaderClick = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("/addChatPic", formData)
      .then(({ data }) => {
        if (data.data[0]) {
          setUploading(false);
          setOnlineUserPic(data.data[0].chat_img);
          setUserPicBar(!userPicBar);
          setcloseTag(!closeTag);
          setMyChatImg(data.data[0].chat_img);
          setFile(null);
          let updatedUsers = onlineUsers;
          updatedUsers.forEach((user: any) => {
            if (user.id == myUserId) {
              user.chat_img = data.data[0].chat_img;
            }
          });
          socket.emit("ONLINE USERS", updatedUsers);
        } else {
          setErrorMsg(true);
          setUploading(false);
          setFile(null);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setErrorMsg(true);
        setUploading(false);
        setFile(null);
      });
  };

  const handleColorChange = (e: any) => {
    setChatColor(e.target.value);
    axios
      .post("/changeColor", e.target.value)
      .then(({ data }) => {
        let updatedColorUsers = onlineUsers;
        updatedColorUsers.forEach((user: any) => {
          if (user.id == myUserId) {
            user.chat_color = data.data.chat_color;
          }
          socket.emit("ONLINE USERS", updatedColorUsers);
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const toggleUploader = () => {
    setUserPicBar(!userPicBar);
    setcloseTag(!closeTag);
    setEmojiBar(false);
    setUserConfig(!userConfig);
  };

  const changeInfo = (ev1: string, ev2?: string) => {
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

  return (
    <>
      <div
        className="onlineUsersBack"
        style={{
          marginBottom:
            (emojiBar && `-3vmax`) || (privateMode && `-2vmax`) || "",
          marginLeft: (privateMode && `1vmax`) || "",
        }}
      >
        <div
          className="onlineUsers"
          id={(darkMode && "onlineUsersDark") || ""}
          style={{
            boxShadow:
              (privateMode &&
                `-0 0 10px rgba(0, 0, 0, 0.308), 0 -0 10px rgba(0, 0, 0, 0.308),
        -0 -0 10px rgba(0, 0, 0, 0.308), -0 -0 10px rgba(0, 0, 0, 0.308)`) ||
              "",
          }}
        >
          {!userPicBar && !userConfig && (
            <div className="mobileOnlineUsers">
              {!privateMode && !networkList && (
                <div className="chatUserHeadline">
                  {!networkList && "Online"}
                </div>
              )}

              {!privateMode && networkList && (
                <div
                  className="chatUserHeadline"
                  style={{
                    fontFamily:
                      (networkList && '"Black Ops One", cursive') || "",
                  }}
                >
                  Network
                </div>
              )}
              {!privateMode && (
                <span className="onlineUserCounter">
                  {!networkList && onlineUsers && onlineUsers.length}
                  {networkList &&
                    networkUsers.filter(
                      (user: any) => !user.nickname.includes("Guest")
                    ).length}
                </span>
              )}
              <div
                className="usersBack"
                id={(darkMode && "usersBackDark") || ""}
                style={{
                  marginTop: (privateMode && `-0.2vmax`) || "",
                  boxShadow: (privateMode && `none`) || "",
                  border: (privateMode && `none`) || "",
                  backgroundColor:
                    (!privateMode && `rgba(255, 255, 255, 0.027)`) || "",
                }}
              >
                {!privateMode &&
                  networkList &&
                  networkUsers &&
                  networkUsers.map((user: any) => (
                    <div key={user.id}>
                      {!user.nickname.includes("Guest") && (
                        <div>
                          <div
                            className="onlineList"
                            onClick={(e) => {
                              if (user.id != myUserId) {
                                setEmojiBar(false);
                                setPrivateMode(!privateMode);
                                setUserPrivate(user.id);
                                setPrivatePic(user.chat_img);
                                setPrivateNick(user.nickname);
                              }
                            }}
                          >
                            <div id="networkUser">
                              <img
                                className="onlineListImg"
                                alt={user.nickname}
                                src={
                                  (myUserId == user.id && onlineUserPic) ||
                                  (user.chat_img && user.chat_img) ||
                                  "./../avatar.png"
                                }
                              ></img>
                            </div>

                            <span
                              title={
                                (user.id != myUserId &&
                                  "Send Private Message") ||
                                ""
                              }
                              style={{
                                color:
                                  (myUserId == user.id && chatColor) ||
                                  user.chat_color ||
                                  `yellow`,
                              }}
                            >
                              {user.nickname}
                            </span>
                            {privateMessages &&
                              privateMessages.map((msg: any) => {
                                if (
                                  !msg.receiver_seen &&
                                  msg.msg_sender_id == user.id
                                ) {
                                  return (
                                    <div
                                      className="notification"
                                      key={msg.id}
                                    ></div>
                                  );
                                } else {
                                  return;
                                }
                              })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                {onlineUsers &&
                  !networkList &&
                  !privateMode &&
                  onlineUsers.map((user: any) => (
                    <div key={user.id}>
                      <div
                        style={{
                          backgroundColor:
                            horn && horn.admin_shaked == user.id && `#fbff0413`,
                        }}
                        className="onlineList"
                        id={
                          (shakeUser &&
                            user.id == selectUserToKick &&
                            "hornShake") ||
                          ""
                        }
                      >
                        <div
                          className="onlineListDetails"
                          onClick={(e) => {
                            if (user.id != myUserId) {
                              setEmojiBar(false);
                              setPrivateMode(!privateMode);
                              setUserPrivate(user.id);
                              setPrivatePic(user.chat_img);
                              setPrivateNick(user.nickname);
                            }
                          }}
                        >
                          <div
                            id={
                              (user.online && "online") ||
                              (!user.online && "offline")
                            }
                          >
                            <img
                              className="onlineListImg"
                              alt={user.nickname}
                              src={
                                (myUserId == user.id && onlineUserPic) ||
                                (user.chat_img && user.chat_img) ||
                                "./../avatar.png"
                              }
                            ></img>
                          </div>
                          {user.super_admin && <div id="OnlineListImg"></div>}

                          <span
                            title={
                              (user.id != myUserId && "Send Private Message") ||
                              ""
                            }
                            style={{
                              color:
                                (myUserId == user.id && chatColor) ||
                                user.chat_color ||
                                `lime`,
                            }}
                          >
                            {(user.id == myUserId && myNickname) ||
                              user.nickname}
                          </span>
                          {privateMessages &&
                            privateMessages.map((msg: any) => {
                              if (
                                !msg.receiver_seen &&
                                msg.msg_sender_id == user.id
                              ) {
                                return (
                                  <div
                                    className="notification"
                                    key={msg.id}
                                  ></div>
                                );
                              } else {
                                return;
                              }
                            })}
                        </div>

                        {configTimer && selectUserToKick == user.id && (
                          <div className="timerConfig">
                            <div id="timerConfigBox">
                              <div>BAN TIME</div>
                              <div className="banInputBox">
                                <input
                                  type="number"
                                  onKeyDown={(e) => keyCheck(e, user.id)}
                                  onChange={(e) =>
                                    socket.emit("BAN TIMER", {
                                      time: e.target.value,
                                      id: user.id,
                                      nickname: user.nickname,
                                    })
                                  }
                                ></input>
                                <div>sec</div>
                              </div>
                            </div>

                            <div
                              className="kickOut"
                              title={`Kick User ${user.nickname}`}
                              style={{
                                animation: `1.1s linear infinite blinker2`,
                              }}
                              onClick={(e) => {
                                setConfigTimer(false);
                                if (user.id != myUserId) {
                                  socket.emit("forceDisconnect", user.id);
                                }
                              }}
                            ></div>
                          </div>
                        )}
                        {user.id != myUserId && !configTimer && superAdmin && (
                          <div
                            className="kickOut"
                            title={`Ban Settings`}
                            onClick={(e) => {
                              setConfigTimer(true);
                              setSelectUserToKick(user.id);
                            }}
                          ></div>
                        )}
                        {user.id != myUserId && !guest && (
                          <div
                            className="horn"
                            title={`Hit a Horn to ${user.nickname}`}
                            onClick={(e) => {
                              setSelectUserToKick(user.id);
                              setShakeUser(true);
                              socket.emit("HORN", {
                                user: user.id,
                                horn: true,
                                admin_shaked: myUserId,
                              });
                            }}
                          ></div>
                        )}
                        {user.id != myUserId && superAdmin && (
                          <div
                            title={`Edit User ${user.nickname}`}
                            className="editSuperMode"
                            onClick={() => {
                              navigate("/super-admin", {
                                state: {
                                  previousPath: pathname,
                                  user: user,
                                },
                              });
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                  ))}

                {privateMode && (
                  <div>
                    <img
                      onClick={(e) => {
                        setPrivateMode(false);
                      }}
                      src={(privatePic && privatePic) || "./../avatar.png"}
                      id="privateUserImage"
                    ></img>
                  </div>
                )}
              </div>
              {privateMode && <div id="privateMsgUserNick">{privateNick}</div>}
            </div>
          )}

          {userConfig && (
            <div className="changeNickBox">
              <div className="changeNickInstructions">Edit Profile</div>
              <div className="changeNickBoxThread">Nickname</div>
              <input
                type="text"
                placeholder="nickname"
                maxLength={20}
                defaultValue={myNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                onClick={(e) => {
                  setErrorMsgInfo(false);
                  setErrorDuplicate(false);
                }}
              ></input>
              {errorDuplicate && (
                <div className="errorNickname">
                  This Nickname Exists Already !
                </div>
              )}
              {!errorDuplicate && (
                <div className="changeNickBoxThread">Password</div>
              )}
              {!errorDuplicate && (
                <div className="userConfigPwdBack">
                  <input
                    type={
                      (!pwdReveal && "password") || (pwdReveal && "text") || ""
                    }
                    placeholder="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></input>
                  <div
                    className={
                      (pwdReveal && "pwdNOTvisible") ||
                      (!pwdReveal && "pwdVisibility") ||
                      ""
                    }
                    onClick={(e) => {
                      setPwdReveal(!pwdReveal);
                    }}
                  ></div>
                </div>
              )}
              <div
                className="changeNickButton"
                onClick={(e) => {
                  if (myNickname === newNickname && newPassword === "") {
                    return;
                  }

                  // if (!newNickname.includes("Guest")) {
                  //   setAdmin(true);
                  // }
                  else if (!newNickname) {
                    if (newPassword && newPassword !== "") {
                      changeInfo(myNickname, newPassword);
                    }
                  } else if (newNickname) {
                    if (newPassword) {
                      changeInfo(newNickname, newPassword);
                    } else {
                      changeInfo(newNickname);
                    }
                  } else {
                    setErrorMsgInfo(true);
                  }
                }}
              >
                Confirm
              </div>
              {errorMsgInfo && (
                <p className="error" id="error">
                  Please Enter A Proper Nickname
                </p>
              )}
            </div>
          )}

          {userPicBar && (
            <div className="fileUploaderChat">
              <img
                src={myChatImg || "./../avatar.png"}
                id="privateUserImage"
              ></img>
              <h1>Chat Image</h1>

              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={(e) => handleUploaderChange(e)}
                onClick={(e) => setErrorMsg(false)}
              />

              {!uploading && (
                <div className="uploadChat">
                  <h1
                    style={{
                      animation: file && `2s linear infinite blinkerAvatar`,
                    }}
                    onClick={() => {
                      handleUploaderClick();
                      setUploading(true);
                    }}
                  >
                    UPDATE
                  </h1>
                  {closeTag && (
                    <h1
                      className="toggleChatUploader"
                      onClick={() => {
                        setErrorMsg(false);
                        toggleUploader();
                        setFile(null);
                      }}
                    >
                      CLOSE
                    </h1>
                  )}
                </div>
              )}
              {uploading && (
                <div className="uploadChat">
                  <div className="uploadSuccess"></div>
                </div>
              )}
              {errorMsg && (
                <p className="error" id="error">
                  Select an Image [Max Size: 10MB]
                </p>
              )}
            </div>
          )}
          {!closeTag && !privateMode && (
            <div className="chatMenuOptions">
              <div
                className="chatMenuConfigButton"
                title={(!userConfig && "Edit Account") || "Close"}
                onClick={(e) => {
                  setUserConfig(!userConfig);
                  setEmojiBar(false);
                  setErrorMsgInfo(false);
                  setConfigTimer(false);
                  setErrorDuplicate(false);
                }}
              ></div>
              {!guest && !userConfig && (
                <div
                  title="User Network"
                  className="networkList"
                  onClick={() => {
                    setNetworkList(!networkList);
                    setConfigTimer(false);
                  }}
                ></div>
              )}

              {userConfig && (
                <div
                  className="uploaderTogglerImg"
                  title="Change Chat Image"
                  onClick={() => {
                    toggleUploader();
                    setErrorMsgInfo(false);
                    setConfigTimer(false);
                    setErrorDuplicate(false);
                    setErrorMsg(false);
                  }}
                ></div>
              )}
              {!userConfig && (
                <input
                  className="colorSelector"
                  title="Change Chat Color"
                  type="color"
                  defaultValue={chatColor || myChatColor || `#00f01c`}
                  style={{
                    boxShadow:
                      (chatColor &&
                        `-0 0 10px ${chatColor}, 0 -0 10px ${chatColor},
        -0 -0 10px ${chatColor}, -0 -0 10px ${chatColor}`) ||
                      "",
                  }}
                  onChange={(e) => {
                    handleColorChange(e);
                  }}
                ></input>
              )}
            </div>
          )}
        </div>
        {emojiBar && (
          <div className="emoticons" id={(darkMode && "emoticonsDark") || ""}>
            {emoji &&
              emoji.map((emoj: any) => (
                <div key={emoj.id}>
                  <img src={emoj.url} onClick={(e) => sendEmoji(e)}></img>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
