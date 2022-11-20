import React from "react";
import { useSelector } from "react-redux";

import {
  Container,
  Title,
  SubTitle,
  Input,
  Error,
  PasswordWrapper,
  EyeIcon,
  Confirm,
} from "./UserConfig.style";

interface Props {
  myUserId: number | undefined;
  myNickname: string;
  setNewNickname: (e: any) => void;
  setNewPassword: (e: any) => void;
  setErrorMsg: (e: boolean) => void;
  setErrorMsgInfo: (e: boolean) => void;
  setErrorDuplicate: (e: boolean) => void;
  errorDuplicate: boolean;
  pwdReveal: boolean;
  setUserConfig: (e: boolean) => void;
  newPassword: any;
  setPwdReveal: (e: boolean) => void;
  newNickname: any;
  setMyNickname: (e: string) => void;
  errorMsgInfo: boolean;
  setAdmin: (e: boolean) => void;
}

const { changeInfo } = require("../SideBarUtils");

export const UserConfig: React.FC<Props> = ({
  myUserId,
  myNickname,
  setErrorDuplicate,
  setErrorMsg,
  setErrorMsgInfo,
  setNewNickname,
  setNewPassword,
  setUserConfig,
  errorDuplicate,
  newPassword,
  pwdReveal,
  setPwdReveal,
  newNickname,
  setMyNickname,
  errorMsgInfo,
  setAdmin,
}) => {
     const onlineUsers = useSelector(
         (state: any) => state && state.onlineUsers
     );

  return (
    <Container>
      <Title>Edit Profile</Title>
      <SubTitle>Nickname</SubTitle>
      <Input
        type="text"
        placeholder="nickname"
        maxLength={20}
        defaultValue={myNickname}
        onChange={(e) => setNewNickname(e.target.value)}
        onClick={(e) => {
          setErrorMsgInfo(false);
          setErrorDuplicate(false);
        }}
      />
      {errorDuplicate && <Error>This Nickname Exists Already !</Error>}
      {!errorDuplicate && <SubTitle>Password</SubTitle>}
      {!errorDuplicate && (
        <PasswordWrapper>
          <Input
            type={(!pwdReveal && "password") || (pwdReveal && "text") || ""}
            placeholder="password"
            onChange={(e) => setNewPassword(e.target.value)}
          ></Input>
          <EyeIcon
            reveal={pwdReveal}
            className={
              (pwdReveal && "pwdNOTvisible") ||
              (!pwdReveal && "pwdVisibility") ||
              ""
            }
            onClick={(e) => {
              setPwdReveal(!pwdReveal);
            }}
          ></EyeIcon>
        </PasswordWrapper>
      )}
      <Confirm
        onClick={(e) => {
          if (myNickname === newNickname && newPassword === "") {
            return;
          }

          // if (!newNickname.includes("Guest")) {
          //   setAdmin(true);
          // }
          else if (!newNickname) {
            if (newPassword && newPassword !== "") {
              changeInfo(
                myNickname,
                myNickname,
                setMyNickname,
                setErrorDuplicate,
                setNewPassword,
                setNewNickname,
                errorDuplicate,
                setUserConfig,
                myUserId,
                onlineUsers,
                setErrorMsg,
                newPassword
              );
            }
          } else if (newNickname) {
            if (newPassword) {
              changeInfo(
                newNickname,
                myNickname,
                setMyNickname,
                setErrorDuplicate,
                setNewPassword,
                setNewNickname,
                errorDuplicate,
                setUserConfig,
                myUserId,
                onlineUsers,
                setErrorMsg,
                newPassword
              );
            } else {
              changeInfo(
                newNickname,
                myNickname,
                setMyNickname,
                setErrorDuplicate,
                setNewPassword,
                setNewNickname,
                errorDuplicate,
                setUserConfig,
                myUserId,
                onlineUsers,
                setErrorMsg
              );
            }
          } else {
            setErrorMsgInfo(true);
          }
        }}
      >
        Confirm
      </Confirm>
      {errorMsgInfo && (
        <Error wide={true}>Please Enter A Proper Nickname</Error>
      )}
    </Container>
  );
};
