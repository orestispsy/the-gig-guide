import React from "react";
import { useSelector } from "react-redux";

import { OnlineUser } from "./OnlineUser/OnlineUser";
import { PrivateUser } from "./PrivateUser/PrivateUser";

import {
  Container,
  Headline,
  Counter,
  UsersBox,
  PrivateModeImage,
} from "./UserList.style";

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

export const UserList: React.FC<Props> = ({
  privateMode,
  darkMode,
  superAdmin,
  setEmojiBar,
  horn,
  shakeUser,
  myUserId,
  // onlineUsers,
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
  const onlineUsers = useSelector((state: any) => state && state.onlineUsers);
  return (
    <Container private={privateMode}>
      {!privateMode && !networkList && (
        <Headline>{!networkList && "Online"}</Headline>
      )}

      {!privateMode && networkList && (
        <Headline network={true}>Network</Headline>
      )}
      {!privateMode && (
        <Counter>
          {!networkList && onlineUsers && onlineUsers.length}
          {networkList &&
            networkUsers.filter((user: any) => !user.nickname.includes("Guest"))
              .length}
        </Counter>
      )}
      <UsersBox dark={darkMode} private={privateMode}>
        {!privateMode &&
          networkList &&
          networkUsers &&
          networkUsers.map((user: any) => (
            <PrivateUser
              key={user.id}
              user={user}
              myUserId={myUserId}
              privateMode={privateMode}
              onlineUserPic={onlineUserPic}
              chatColor={chatColor}
              privateMessages={privateMessages}
              setEmojiBar={(e: boolean) => setEmojiBar(e)}
              setPrivateMode={(e: boolean) => setPrivateMode(e)}
              setUserPrivate={(e: any) => setUserPrivate(e)}
              setPrivatePic={(e: string) => setPrivatePic(e)}
              setPrivateNick={(e: string | boolean) => setPrivateNick(e)}
            />
          ))}

        {onlineUsers &&
          !networkList &&
          !privateMode &&
          onlineUsers.map((user: any) => (
            <OnlineUser
              key={user.id}
              guest={guest}
              user={user}
              horn={horn}
              shakeUser={shakeUser}
              myUserId={myUserId}
              myNickname={myNickname}
              privateMode={privateMode}
              onlineUserPic={onlineUserPic}
              chatColor={chatColor}
              selectUserToKick={selectUserToKick}
              privateMessages={privateMessages}
              setUserPrivate={(e: any) => setUserPrivate(e)}
              setPrivateNick={(e: string | boolean) => setPrivateNick(e)}
              setPrivatePic={(e: string) => setPrivatePic(e)}
              setPrivateMode={(e: boolean) => setPrivateMode(e)}
              setEmojiBar={(e: boolean) => setEmojiBar(e)}
              configTimer={configTimer}
              superAdmin={superAdmin}
              setShakeUser={(e: boolean) => setShakeUser(e)}
              setConfigTimer={(e: boolean) => setConfigTimer(e)}
              setSelectUserToKick={(e: number | boolean) =>
                setSelectUserToKick(e)
              }
            />
          ))}

        {privateMode && (
          <PrivateModeImage
            onClick={(e) => {
              setPrivateMode(false);
            }}
            src={(privatePic && privatePic) || "./../avatar.png"}
          ></PrivateModeImage>
        )}
      </UsersBox>
      {privateMode && <div id="privateMsgUserNick">{privateNick}</div>}
    </Container>
  );
};
