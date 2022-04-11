import { useEffect } from "react";
import React from "react";

interface Props {
  lastOnlineTimeline: any;
  lastUsersMode: any;
  dateTimeHandler: (e: string) => void;
}

export const TimelineLastOnline: React.FC<Props> = ({
  lastOnlineTimeline,
  lastUsersMode,
  dateTimeHandler,
}) => {
  useEffect(function () {}, []);

  return (
    <div>
      {lastOnlineTimeline &&
        lastOnlineTimeline.map((user: any, index: number) => {
          return (
            <div className="gigEntryTimelineDetails" key={index}>
              <img
                className="timelineOnlineUsersPic"
                src={user.chat_img || "./avatar.png"}
              ></img>
              <div className="detailedTimelineEntry">
                <span>User</span>
                <h1>{user.nickname}</h1>
                <span>{(lastUsersMode && `Joined`) || `Last Online`}</span>
                <h1>
                  {(lastUsersMode && dateTimeHandler(user.created_at)) ||
                    (!lastUsersMode && dateTimeHandler(user.last_online))}
                </h1>
              </div>
            </div>
          );
        })}
    </div>
  );
};
