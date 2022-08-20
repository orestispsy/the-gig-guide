import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { socket } from "../../../../common/Socket/socket";

interface Props {
  privateMode: boolean;
  darkMode: boolean;
  superAdmin: boolean;
  setEmojiBar: (e: boolean) => void;
  horn: any;
  shakeUser: boolean;
  myUserId: number | undefined;
  userPicBar: boolean;
  networkList: any;
  onlineUsers: any;
  networkUsers: any;
  setPrivateMode: (e: boolean) => void;
  privateMessages: any;
  selectUserToKick: number | boolean;
  privatePic: any;
  privateNick: string | boolean;
  configTimer: any;
  setShakeUser: (e: boolean) => void;
  myNickname: string;
  chatColor: string;
  setConfigTimer: (e: boolean) => void;
  setSelectUserToKick: (e: boolean | number) => void;
  guest: boolean;
  setUserPrivate: (e: any) => void;
  setPrivateNick: (e: string | boolean) => void;
  setPrivatePic: (e: string) => void;
  onlineUserPic: string;
}

type LocationProps = {
  state: {
    previousPath: string;
  };
  pathname: string;
};

const { keyCheck } = require("../SideBarUtils");

export const UserList: React.FC<Props> = ({
  privateMode,
  darkMode,
  superAdmin,
  setEmojiBar,
  horn,
  shakeUser,
  myUserId,
  onlineUsers,
  networkUsers,
  networkList,
  selectUserToKick,
  setPrivateMode,
  privateMessages,
  privatePic,
  privateNick,
  configTimer,
  chatColor,
  setConfigTimer,
  setSelectUserToKick,
  setShakeUser,
  myNickname,
  setPrivateNick,
  setPrivatePic,
  setUserPrivate,
  onlineUserPic,
  guest,
}) => {
  useEffect(function () {}, []);

  const navigate = useNavigate();
  const location = useLocation() as unknown as LocationProps;
  const { pathname } = location;

  return (
    <div className="mobileOnlineUsers">
      {!privateMode && !networkList && (
        <div className="chatUserHeadline">{!networkList && "Online"}</div>
      )}

      {!privateMode && networkList && (
        <div
          className="chatUserHeadline"
          style={{
            fontFamily: (networkList && '"Black Ops One", cursive') || "",
          }}
        >
          Network
        </div>
      )}
      {!privateMode && (
        <span className="onlineUserCounter">
          {!networkList && onlineUsers && onlineUsers.length}
          {networkList &&
            networkUsers.filter((user: any) => !user.nickname.includes("Guest"))
              .length}
        </span>
      )}
      <div
        className="usersBack"
        id={(darkMode && "usersBackDark") || ""}
        style={{
          marginTop: (privateMode && `-0.2vmax`) || "",
          boxShadow: (privateMode && `none`) || "",
          border: (privateMode && `none`) || "",
          backgroundColor: (!privateMode && `rgba(255, 255, 255, 0.027)`) || "",
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
                        (user.id != myUserId && "Send Private Message") || ""
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
                            <div className="notification" key={msg.id}></div>
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
                  (shakeUser && user.id == selectUserToKick && "hornShake") ||
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
                      (user.online && "online") || (!user.online && "offline")
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
                      (user.id != myUserId && "Send Private Message") || ""
                    }
                    style={{
                      color:
                        (myUserId == user.id && chatColor) ||
                        user.chat_color ||
                        `lime`,
                    }}
                  >
                    {(user.id == myUserId && myNickname) || user.nickname}
                  </span>
                  {privateMessages &&
                    privateMessages.map((msg: any) => {
                      if (!msg.receiver_seen && msg.msg_sender_id == user.id) {
                        return (
                          <div className="notification" key={msg.id}></div>
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
                          onKeyDown={(e) =>
                            keyCheck(e, user.id, setConfigTimer)
                          }
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
  );
};
