import React, { useEffect, useState } from "react";
import axios from "../../../../common/Axios/axios";
import { socket } from "../../../../common/Socket/socket";
interface Props {
  setErrorMsg: (e: boolean) => void;
  setMyChatImg: (e: string) => void;
  errorMsg: boolean;
  setOnlineUserPic: (e: string) => void;
  setUserPicBar: (e: boolean) => void;
  setcloseTag: (e: boolean) => void;
  userPicBar: boolean;
  closeTag: boolean;
  myUserId: number | undefined;
  onlineUsers: any;
  myChatImg: string;
  toggleUploader: () => void;
}

export const UserPic: React.FC<Props> = ({
  setMyChatImg,
  setOnlineUserPic,
  setUserPicBar,
  setcloseTag,
  errorMsg,
  setErrorMsg,
  userPicBar,
  closeTag,
  myUserId,
  onlineUsers,
  myChatImg,
  toggleUploader,
}) => {
  useEffect(function () {}, []);
  const [file, setFile] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);
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

  return (
    <div className="fileUploaderChat">
      <img src={myChatImg || "./../avatar.png"} id="privateUserImage"></img>
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
  );
};
