import { useSelector } from "react-redux";
import { socket } from "../../../common/Socket/socket";
import React, { useEffect, useState } from "react";
import axios from "../../../common/Axios/axios";
import { UserList } from "./UserList/UserList";
import { UserConfig } from "./UserConfig/UserConfig";
import { UserPic } from "./UserPic/UserPic";

let emoji = require("../../../common/customEmoj.json");

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

  const [selectUserToKick, setSelectUserToKick] = useState<number | boolean>(
    false
  );

  const statePrivateMsgs = useSelector((state: any) => state && state.messages);

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
          <UserList
            privateMode={privateMode}
            darkMode={darkMode}
            superAdmin={superAdmin}
            horn={horn}
            shakeUser={shakeUser}
            setEmojiBar={(e: boolean) => setEmojiBar(e)}
            myUserId={myUserId}
            userPicBar={userPicBar}
            userConfig={userConfig}
            networkList={networkList}
            onlineUsers={onlineUsers}
            setPrivateMode={(e: boolean) => setPrivateMode(e)}
            privateMessages={privateMessages}
            selectUserToKick={selectUserToKick}
            networkUsers={networkUsers}
            privateNick={privateNick}
            privatePic={privatePic}
            configTimer={configTimer}
            myNickname={myNickname}
            chatColor={chatColor}
            setConfigTimer={(e: boolean) => setConfigTimer(e)}
            setSelectUserToKick={(e: number | boolean) =>
              setSelectUserToKick(e)
            }
            guest={guest}
            setShakeUser={(e: boolean) => setShakeUser(e)}
            setUserPrivate={(e: any) => setUserPrivate(e)}
            setPrivateNick={(e: string | boolean) => setPrivateNick(e)}
            setPrivatePic={(e: string) => setPrivateNick(e)}
            onlineUserPic={onlineUserPic}
          />
          <UserConfig
            myUserId={myUserId}
            myNickname={myNickname}
            userConfig={userConfig}
            onlineUsers={onlineUsers}
            setNewNickname={(e: any) => setNewNickname(e)}
            setNewPassword={(e: any) => setNewPassword(e)}
            setErrorMsg={(e: boolean) => setErrorMsg(e)}
            setErrorMsgInfo={(e: boolean) => setErrorMsgInfo(e)}
            setErrorDuplicate={(e: boolean) => setErrorDuplicate}
            errorDuplicate={errorDuplicate}
            pwdReveal={pwdReveal}
            setPwdReveal={(e: boolean) => setPwdReveal(e)}
            setUserConfig={(e: boolean) => setUserConfig(e)}
            newPassword={newPassword}
            newNickname={newNickname}
            setMyNickname={(e: string) => setMyNickname(e)}
            errorMsgInfo={errorMsgInfo}
          />
          <UserPic
            errorMsg={errorMsg}
            setErrorMsg={(e: boolean) => setErrorMsg(e)}
            setOnlineUserPic={(e: string) => setOnlineUserPic(e)}
            setUserPicBar={(e: boolean) => setUserPicBar(e)}
            setcloseTag={(e: boolean) => setcloseTag(e)}
            setMyChatImg={(e: string) => setMyChatImg(e)}
            userPicBar={userPicBar}
            closeTag={closeTag}
            myUserId={myUserId}
            onlineUsers={onlineUsers}
            myChatImg={myChatImg}
            toggleUploader={() => toggleUploader()}
          />

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
