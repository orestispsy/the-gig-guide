import React from "react";
import { useSelector } from "react-redux";
import axios from "../../../../common/Axios/axios";
import { socket } from "../../../../common/Socket/socket";

import {
  Container,
  ConfigButton,
  NetworkButton,
  ImageUploaderButton,
  ColorSelector,
} from "./SideBarBottom.style";

interface Props {
  setErrorMsg: (e: boolean) => void;
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
     const onlineUsers = useSelector(
         (state: any) => state && state.onlineUsers
     );

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
    <Container>
      <ConfigButton
        title={(!userConfig && "Edit Account") || "Close"}
        onClick={(e) => {
          setUserConfig(!userConfig);
          setEmojiBar(false);
          setErrorMsgInfo(false);
          setConfigTimer(false);
          setErrorDuplicate(false);
        }}
      ></ConfigButton>
      {!guest && !userConfig && (
        <NetworkButton
          title="User Network"
          onClick={() => {
            setNetworkList(!networkList);
            setConfigTimer(false);
          }}
        ></NetworkButton>
      )}

      {userConfig && (
        <ImageUploaderButton
          title="Change Chat Image"
          onClick={() => {
            toggleUploader();
            setErrorMsgInfo(false);
            setConfigTimer(false);
            setErrorDuplicate(false);
            setErrorMsg(false);
          }}
        ></ImageUploaderButton>
      )}
      {!userConfig && (
        <ColorSelector
          title="Change Chat Color"
          color={chatColor}
          type="color"
          defaultValue={chatColor || myChatColor || `#00f01c`}
          onChange={(e) => {
            handleColorChange(e);
          }}
        />
      )}
    </Container>
  );
};
