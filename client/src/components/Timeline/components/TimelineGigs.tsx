import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  gigsListTimeline: any;
  gigsListUpdatedTimeline: any;
  setTimelineGigsMode: (e: boolean) => void;
  setTimelineCommentsMode: (e: boolean) => void;
  setTimelineGalleriesMode: (e: boolean) => void;
  dateTimeHandler: (e: string) => void;
  latestUpdatesMode: boolean;
  timelineScrollTop: number;
}

export const TimelineGigs: React.FC<Props> = ({
  gigsListTimeline,
  gigsListUpdatedTimeline,
  setTimelineGigsMode,
  setTimelineCommentsMode,
  setTimelineGalleriesMode,
  dateTimeHandler,
  latestUpdatesMode,
  timelineScrollTop,
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
      {(!latestUpdatesMode &&
        gigsListTimeline &&
        gigsListTimeline.map((gig: any, index: number) => {
          return (
            <div
              className="gigEntryTimelineDetails"
              key={index}
              onClick={(e) => {
                navigate(`/api/gig/${Number(gig.id)}`, {
                  state: {
                    previousPath: pathname,
                    latest: latestUpdatesMode,
                  },
                });
              }}
            >
              <img src={(gig.poster && gig.poster) || `./na.jpg`}></img>

              <div className="detailedTimelineEntry">
                {gig.venue && <span>Venue</span>}
                {gig.venue && <h1>{gig.venue}</h1>}
                {gig.city && <span>City</span>}
                {gig.city && <h1> {gig.city}</h1>}
                {gig.tourName && <span>Tour Name</span>}
                {gig.tourName && <h1>{gig.tourName}</h1>}
                <span>Date</span>
                <h1>{gig.date}</h1>
                <span>Added:</span>

                <h1>{gig.created_at && dateTimeHandler(gig.created_at)}</h1>
              </div>
            </div>
          );
        })) ||
        (latestUpdatesMode &&
          gigsListUpdatedTimeline &&
          gigsListUpdatedTimeline.map((gig: any, index: number) => {
            return (
              <div className="gigEntryTimelineDetails" key={index}>
                <img
                  onClick={(e) => {
                    navigate(`/api/gig/${Number(gig.id)}`, {
                      state: {
                        previousPath: pathname,
                        latest: latestUpdatesMode,
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
          }))}
    </div>
  );
};
