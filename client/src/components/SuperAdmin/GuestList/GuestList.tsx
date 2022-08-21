import React from "react";

const { handleTime } = require("../../Chat/ChatUtils");

const { deleteGuests, deleteUser } = require("../SuperAdminUtils");

interface Props {
  guestList: any;
  guestUser: any;
  setGuestUser: (e: any) => void;
  setConfirm: (e: boolean) => void;
  confirm: boolean;
  guestDeleteConfirm: boolean;
  setGuestDeleteConfirm: (e: boolean) => void;
  setGuestList: (e: any) => void;
  userList: any;
  setUserList: (e: any) => void;
  setNetworkUsers: (e: any) => void;
}

export const GuestList: React.FC<Props> = ({
  guestList,
  setGuestList,
  guestUser,
  setGuestUser,
  setConfirm,
  guestDeleteConfirm,
  setGuestDeleteConfirm,
  userList,
  setUserList,
  setNetworkUsers,
  confirm,
}) => {
  return (
    <div className="superList">
      <div className="superListItemBack">
        <div className="superListItem">
          <img src={"avatar.png"}></img>
          <div className="superAdminGuestList" id="superAdminGuestsHead">
            Guests
            <span className="superAdminGuestList" id="superAdminGuestList">
              {guestList.length > 0 && guestList.length}
            </span>
          </div>
          {guestList[0] && (
            <>
              <select
                value={guestUser && guestUser}
                name="selectedGig"
                className="selectGuestSuperMode"
                onChange={(e) => {
                  setGuestUser(parseInt(e.target.value));
                  setConfirm(false);
                }}
              >
                <option className="chooseGuestSuperMode" value="">
                  Select
                </option>
                {guestList &&
                  guestList.map((guest: any) => {
                    handleTime(guest.created_at);
                    return (
                      <option
                        style={{
                          color: (guestUser == guest.id && `yellow`) || ``,
                        }}
                        value={guest.id}
                        key={guest.id}
                        className="chooseGuestSuperMode"
                      >
                        {guest.nickname}
                      </option>
                    );
                  })}
              </select>
              {guestUser > 0 && (
                <div
                  title="Reset"
                  className="superUserReset"
                  onClick={(e) => {
                    setGuestUser(0);
                  }}
                >
                  reset
                </div>
              )}
              {(!confirm && guestUser > 0 && (
                <div
                  className="deleteUser"
                  id="deleteUser"
                  onClick={(e) => {
                    setConfirm(!confirm);
                  }}
                >
                  DELETE
                </div>
              )) ||
                (confirm && (
                  <div
                    className="deleteUserConfirm"
                    id="deleteUser"
                    onClick={(e) => {
                      deleteUser(
                        guestUser,
                        userList,
                        setUserList,
                        setNetworkUsers
                      );
                      setGuestList(
                        guestList.filter((guest: any) => guest.id != guestUser)
                      );
                      setConfirm(!confirm);
                    }}
                  >
                    Confirm
                  </div>
                ))}
            </>
          )}

          <span className="superAdminGuestList" id="superAdminGuestList">
            {!guestList[0] && "Nothing here"}
          </span>
          {!guestDeleteConfirm && (
            <span
              id="deleteAllGuests"
              onClick={(e) => {
                setGuestDeleteConfirm(true);
              }}
            >
              {guestList[0] && "delete all"}
            </span>
          )}
          {guestDeleteConfirm && (
            <span
              id="deleteAllGuestsConfirm"
              onClick={(e) => {
                deleteGuests();
                setGuestList(false);
              }}
            >
              {guestList[0] && "confirm"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
