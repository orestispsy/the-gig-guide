import { useEffect, useRef } from "react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  gigsListTimeline: any;
  setTimelineGigsMode: (e: boolean) => void;
  setTimelineCommentsMode: (e: boolean) => void;
  setTimelineGalleriesMode: (e: boolean) => void;
  dateTimeHandler: (e: string) => void;
}

export const TimelineGigs: React.FC<Props> = ({
  gigsListTimeline,
  setTimelineGigsMode,
  setTimelineCommentsMode,
  setTimelineGalleriesMode,
  dateTimeHandler,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(function () {
    setTimelineGigsMode(true);
    setTimelineCommentsMode(false);
    setTimelineGalleriesMode(false);
  }, []);

  return (
    <div>
      {gigsListTimeline &&
        gigsListTimeline.map((gig: any, index: number) => {
          return (
            <div className="gigEntryTimelineDetails" key={index}>
              <img
                onClick={(e) => {
                  navigate(`/api/gig/${Number(gig.id)}`, {
                    state: {
                      previousPath: pathname,
                    },
                  });
                }}
                src={(gig.poster && gig.poster) || `./na.jpg`}
              ></img>

              <div className="detailedTimelineEntry">
                {gig.venue && <span>Venue</span>}
                {gig.venue && <h1>{gig.venue}</h1>}
                {gig.city && <span>City</span>}
                {gig.city && <h1> {gig.city}</h1>}
                {gig.tourName && <span>Tour Name</span>}
                {gig.tourName && <h1>{gig.tourName}</h1>}
                <span>Date</span>
                <h1>{gig.date}</h1>
                {gig.updated_at && <span>Updated:</span>}
                {gig.updated_at && (
                  <h1>{gig.updated_at && dateTimeHandler(gig.updated_at)}</h1>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};
