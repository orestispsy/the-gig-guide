import React from "react";

const { handleTime } = require("../../Chat/ChatUtils");

interface Props {
  selectedUser: any;
  setConfirm: (e: boolean) => void;
  setSelectedUser: (e: any) => void;
  userList: any;
  myUserId: number | undefined;
  networkUsers: any;
}

export const SuperAdminTop: React.FC<Props> = ({
  selectedUser,
  setConfirm,
  setSelectedUser,
  userList,
  myUserId,
  networkUsers,
}) => {
  return (
    <>
      <select
        value={selectedUser}
        name="selectedGig"
        className="selectSuperUserMode"
        onChange={(e) => {
          setConfirm(false);
          setSelectedUser(parseInt(e.target.value));
        }}
      >
        <option className="chooseSuperUserMode" value="">
          Select User
        </option>

        {userList &&
          userList.map((user: any) => {
            handleTime(user.last_online || user.created_at);

            return (
              myUserId != user.id &&
              !user.nickname.includes("Guest") && (
                <option
                  value={user.id}
                  key={user.id}
                  className="chooseSuperUserMode"
                >
                  {(user.ban && `🔴`) || `❂`} {user.nickname}
                </option>
              )
            );
          })}
        {networkUsers &&
          userList &&
          networkUsers.map((user: any) => {
            handleTime(user.last_online || user.created_at);
            function userExists(id: number) {
              return userList.some(function (user: any) {
                return user.id === id;
              });
            }

            return (
              myUserId != user.id &&
              !user.nickname.includes("Guest") &&
              !userExists(user.id) && (
                <option
                  style={{
                    color: (selectedUser == user.id && `white`) || ``,
                  }}
                  value={user.id}
                  key={user.id}
                  className={
                    (!user.last_online && "chooseSuperUserModeOld") ||
                    (user.last_online && "chooseSuperUserModeOldLight")
                  }
                >
                  {!user.last_online && " ◉ "}
                  {(user.ban && `🔴`) || `❂`} {user.nickname}
                </option>
              )
            );
          })}
      </select>
      {selectedUser > 0 && (
        <div
          title="Reset"
          className="superUserReset"
          onClick={(e) => {
            setSelectedUser(0);
          }}
        >
          reset
        </div>
      )}
    </>
  );
};
