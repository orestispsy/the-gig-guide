import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import axios from "../../../../common/Axios/axios";
import { socket } from "../../../../common/Socket/socket";

import {
  Container,
  UserImage,
  Headline,
  ImageUploader,
  Option,
  OptionsWrapper,
  Rocket,
  Error,
} from "./UserPic.style";
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

  myChatImg,
  toggleUploader,
}) => {
  const onlineUsers = useSelector((state: any) => state && state.onlineUsers);
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
    <Container>
      <UserImage src={myChatImg || "./../avatar.png"}></UserImage>
      <Headline>Chat Image</Headline>

      <ImageUploader
        type="file"
        name="file"
        accept="image/*"
        onChange={(e) => handleUploaderChange(e)}
        onClick={(e) => setErrorMsg(false)}
      />

      <OptionsWrapper>
        {!uploading && (
          <Fragment>
            <Option
              animation={file && true}
              onClick={() => {
                handleUploaderClick();
                setUploading(true);
              }}
            >
              UPDATE
            </Option>
            {closeTag && (
              <Option
                close={true}
                onClick={() => {
                  setErrorMsg(false);
                  toggleUploader();
                  setFile(null);
                }}
              >
                CLOSE
              </Option>
            )}
          </Fragment>
        )}
        {uploading && <Rocket></Rocket>}
      </OptionsWrapper>

      {errorMsg && <Error>Select an Image [Max Size: 10MB]</Error>}
    </Container>
  );
};
