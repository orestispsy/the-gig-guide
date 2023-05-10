import { useSelector } from "react-redux";
import { socket } from "../../../common/Socket/socket";
import React, { useEffect, useState } from "react";
import axios from "../../../common/Axios/axios";
import { UserList } from "./UserList/UserList";
import { UserConfig } from "./UserConfig/UserConfig";
import { UserPic } from "./UserPic/UserPic";
import { SideBarBottom } from "./SideBarBottom/SideBarBottom";
import { Emojis } from "./Emojis/Emojis";

import { Container, Wrapper } from "./SideBar.style";

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

  horn: any;
  playNotification: (e: boolean, playPrivateMsg: () => void) => void;
  playPrivateMsg: () => void;
  shakeUser: boolean;
  setShakeUser: (e: boolean) => void;
  mute: boolean;
  mobileConfigOpen: boolean;
}

export const SideBar: React.FC<Props> = ({
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

  setEmojiBar,
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
  mobileConfigOpen,
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

  const onlineUsers = useSelector((state: any) => state && state.onlineUsers);
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

  const toggleUploader = () => {
    setUserPicBar(!userPicBar);
    setcloseTag(!closeTag);
    setEmojiBar(false);
    setUserConfig(!userConfig);
  };

  return (
    <Wrapper
      emojiBar={emojiBar}
      private={privateMode}
      mobileConfigOpen={mobileConfigOpen}
    >
      <Container
        dark={darkMode}
        private={privateMode}
        mobileConfigOpen={mobileConfigOpen}
      >
        {!userPicBar && !userConfig && (
          <UserList
            privateMode={privateMode}
            darkMode={darkMode}
            superAdmin={superAdmin}
            horn={horn}
            shakeUser={shakeUser}
            setEmojiBar={(e: boolean) => setEmojiBar(e)}
            myUserId={myUserId}
            userPicBar={userPicBar}
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
            setPrivatePic={(e: string) => setPrivatePic(e)}
            onlineUserPic={onlineUserPic}
          />
        )}
        {userConfig && (
          <UserConfig
            myUserId={myUserId}
            myNickname={myNickname}
            setNewNickname={(e: any) => setNewNickname(e)}
            setNewPassword={(e: any) => setNewPassword(e)}
            setErrorMsg={(e: boolean) => setErrorMsg(e)}
            setErrorMsgInfo={(e: boolean) => setErrorMsgInfo(e)}
            setErrorDuplicate={(e: boolean) => setErrorDuplicate(e)}
            errorDuplicate={errorDuplicate}
            pwdReveal={pwdReveal}
            setPwdReveal={(e: boolean) => setPwdReveal(e)}
            setUserConfig={(e: boolean) => setUserConfig(e)}
            newPassword={newPassword}
            newNickname={newNickname}
            setMyNickname={(e: string) => setMyNickname(e)}
            errorMsgInfo={errorMsgInfo}
            setAdmin={(e: boolean) => setAdmin(e)}
          />
        )}
        {userPicBar && (
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
            myChatImg={myChatImg}
            toggleUploader={() => toggleUploader()}
          />
        )}

        {!closeTag && !privateMode && (
          <SideBarBottom
            setErrorMsg={(e: boolean) => setErrorMsg(e)}
            toggleUploader={() => toggleUploader()}
            setUserConfig={(e: boolean) => setUserConfig(e)}
            userConfig={userConfig}
            setEmojiBar={(e: boolean) => setEmojiBar(e)}
            guest={guest}
            setConfigTimer={(e: boolean) => setConfigTimer(e)}
            chatColor={chatColor}
            myChatColor={myChatColor}
            myUserId={myUserId}
            setChatColor={(e: string) => setChatColor(e)}
            setErrorMsgInfo={(e: boolean) => setErrorMsgInfo(e)}
            setErrorDuplicate={(e: boolean) => setErrorDuplicate}
            networkList={networkList}
            setNetworkList={(e: boolean) => setNetworkList(e)}
          />
        )}
      </Container>
      {emojiBar && !mobileConfigOpen && <Emojis darkMode={darkMode} />}
    </Wrapper>
  );
};
