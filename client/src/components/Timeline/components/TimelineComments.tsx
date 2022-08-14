import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  commentsTimeline: any;
  setTimelineCommentsMode: (e: boolean) => void;
  setTimelineGigsMode: (e: boolean) => void;
  setTimelineGalleriesMode: (e: boolean) => void;
  dateTimeHandler: (e: string) => void;
  timelineScrollTop: number;
}

export const TimelineComments: React.FC<Props> = ({
  commentsTimeline,
  setTimelineCommentsMode,
  setTimelineGigsMode,
  setTimelineGalleriesMode,
  dateTimeHandler,
  timelineScrollTop,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(function () {
    setTimelineCommentsMode(true);
    setTimelineGigsMode(false);
    setTimelineGalleriesMode(false);
  }, []);

  return (
    <div>
      {commentsTimeline &&
        commentsTimeline.map((gig: any, index: number) => {
          return (
            <div className="gigEntryTimelineDetails" key={index}>
              <div
                className="detailedTimelineEntry"
                id="timelineEntryComments"
                onClick={(e) => {
                  navigate(`/api/gig/${gig.gigsid}`, {
                    state: {
                      previousPath: pathname,
                      comments: true,
                    },
                  });
                }}
              >
                <span>{gig.city}</span>

                <h1>{gig.date}</h1>
                <span>Comment:</span>
                <h1>{gig.comment}</h1>
                <span>Sent From:</span>
                <h1>{gig.nickname}</h1>
                <span>Date/Time</span>
                <h1>{gig.created_at && dateTimeHandler(gig.created_at)}</h1>
              </div>
            </div>
          );
        })}
    </div>
  );
};
