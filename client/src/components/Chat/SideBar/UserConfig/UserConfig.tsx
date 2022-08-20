import React, { useEffect } from "react";

interface Props {
  myUserId: number | undefined;
  userConfig: boolean;
  onlineUsers: any;
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
}

const { changeInfo } = require("../SideBarUtils");

export const UserConfig: React.FC<Props> = ({
  myUserId,
  userConfig,
  onlineUsers,
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
}) => {
  useEffect(function () {}, []);

  return (
    <>
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
            <div className="errorNickname">This Nickname Exists Already !</div>
          )}
          {!errorDuplicate && (
            <div className="changeNickBoxThread">Password</div>
          )}
          {!errorDuplicate && (
            <div className="userConfigPwdBack">
              <input
                type={(!pwdReveal && "password") || (pwdReveal && "text") || ""}
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
          </div>
          {errorMsgInfo && (
            <p className="error" id="error">
              Please Enter A Proper Nickname
            </p>
          )}
        </div>
      )}
    </>
  );
};
