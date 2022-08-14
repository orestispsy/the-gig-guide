import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  imagesTimeline: any;
  setTimelineGigsMode: (e: boolean) => void;
  setTimelineCommentsMode: (e: boolean) => void;
  setTimelineGalleriesMode: (e: boolean) => void;
  dateTimeHandler: (e: string) => void;
  timelineScrollTop: number;
}

export const TimelineImages: React.FC<Props> = ({
  imagesTimeline,
  setTimelineCommentsMode,
  setTimelineGalleriesMode,
  setTimelineGigsMode,
  dateTimeHandler,
  timelineScrollTop,
}) => {
  const navigate = useNavigate();
  useEffect(function () {
    setTimelineGigsMode(false);
    setTimelineCommentsMode(false);
    setTimelineGalleriesMode(true);
  }, []);

  return (
    <div>
      {imagesTimeline &&
        imagesTimeline.map((gig: any, index: number) => {
          return (
            <div
              className="gigEntryTimelineDetails"
              key={index}
              onClick={(e) => {
                navigate(`/api/gig/${Number(gig.id)}`);
              }}
            >
              <img src={gig.img_url}></img>
              <div className="detailedTimelineEntry">
                <span>{gig.date}</span>
                <h1>{gig.city}</h1>

                <span>Sent From:</span>
                <h1>{gig.nickname}</h1>
                <span>Time/Date</span>
                <h1>{gig.created_at && dateTimeHandler(gig.created_at)}</h1>
              </div>
            </div>
          );
        })}
    </div>
  );
};
