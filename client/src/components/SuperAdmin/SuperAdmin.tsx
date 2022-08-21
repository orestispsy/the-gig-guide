import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { SuperAdminTop } from "./SuperAdminTop/SuperAdminTop";
import { GuestList } from "./GuestList/GuestList";
import { UserList } from "./UserList/UserList";

const { updateUsers } = require("./SuperAdminUtils");

type LocationProps = {
  state: {
    user: {
      id: number;
    };
  };
  pathname: string;
};

interface Props {
  myUserId: number | undefined;
  superAdmin: boolean;
  setAdminControls: (e: boolean) => void;
}

export const SuperAdmin: React.FC<Props> = ({
  myUserId,
  superAdmin,
  setAdminControls,
}) => {
  const [userList, setUserList] = useState<any>(null);
  const [confirm, setConfirm] = useState<any>(false);
  const [guestList, setGuestList] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>(0);
  const [guestUser, setGuestUser] = useState<any>(0);
  const [guestDeleteConfirm, setGuestDeleteConfirm] = useState<boolean>(false);
  const [networkUsers, setNetworkUsers] = useState<any>(false);
  const [newUserName, setNewUserName] = useState<string>("");
  const [editName, setEditName] = useState<boolean>(false);

  const currentLocation = useLocation() as unknown as LocationProps;
  const { state, pathname } = currentLocation;

  useEffect(function () {
    if (!superAdmin) {
      location.replace("/");
    }
    setAdminControls(true);
    updateUsers(setUserList, setNetworkUsers, setGuestList);
  }, []);

  useEffect(
    function () {
      if (state && state.user) {
        setSelectedUser(state.user.id);
      }
    },
    [state]
  );

  return (
    <div className="superAdminContainer">
      <div className="superAdminContainerInner">
        <SuperAdminTop
          selectedUser={selectedUser}
          setConfirm={(e: boolean) => setConfirm(e)}
          setSelectedUser={(e: any) => setSelectedUser(e)}
          userList={userList}
          myUserId={myUserId}
          networkUsers={networkUsers}
        />
        {!selectedUser && (
          <GuestList
            confirm={confirm}
            guestList={guestList}
            guestUser={guestUser}
            setGuestUser={(e: any) => setGuestUser(e)}
            setConfirm={(e: boolean) => setConfirm(e)}
            guestDeleteConfirm={guestDeleteConfirm}
            setGuestDeleteConfirm={(e: boolean) => setGuestDeleteConfirm(e)}
            setGuestList={(e: any) => setGuestList(e)}
            userList={userList}
            setUserList={(e: any) => setUserList(e)}
            setNetworkUsers={(e: any) => setNetworkUsers(e)}
          />
        )}
        {networkUsers && (
          <UserList
            myUserId={myUserId}
            selectedUser={selectedUser}
            editName={editName}
            networkUsers={networkUsers}
            newUserName={newUserName}
            setNewUserName={(e: string) => setNewUserName(e)}
            setEditName={(e: boolean) => setEditName(e)}
            setGuestList={(e: any) => setGuestList(e)}
            userList={userList}
            setUserList={(e: any) => setUserList(e)}
            setNetworkUsers={(e: any) => setNetworkUsers(e)}
            guestList={guestList}
            confirm={confirm}
            setConfirm={(e: boolean) => setConfirm(e)}
            setSelectedUser={(e: any) => setSelectedUser(e)}
          />
        )}
      </div>
    </div>
  );
};
