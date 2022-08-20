import React, { useEffect } from "react";
import axios from "../../../../common/Axios/axios";
import { socket } from "../../../../common/Socket/socket";
interface Props {
  setErrorMsg: (e: boolean) => void;
  onlineUsers: any;
  toggleUploader: () => void;
  setUserConfig: (e: boolean) => void;
  userConfig: boolean;
  setEmojiBar: (e: boolean) => void;
  guest: boolean;
  setConfigTimer: (e: boolean) => void;
  chatColor: string;
  myChatColor: string;
  myUserId: number | undefined;
  setChatColor: (e: string) => void;
  setErrorMsgInfo: (e: boolean) => void;
  setErrorDuplicate: (e: boolean) => void;
  networkList: boolean;
  setNetworkList: (e: boolean) => void;
}

export const SideBarBottom: React.FC<Props> = ({
  setErrorDuplicate,
  setErrorMsgInfo,
  setErrorMsg,
  onlineUsers,
  toggleUploader,
  userConfig,
  setConfigTimer,
  setEmojiBar,
  setUserConfig,
  chatColor,
  myChatColor,
  myUserId,
  setChatColor,
  guest,
  networkList,
  setNetworkList,
}) => {
  useEffect(function () {}, []);

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
  return (
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
  );
};
