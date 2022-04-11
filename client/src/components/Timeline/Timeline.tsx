import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import { TimelineGigs } from "./components/TimelineGigs";
import { TimelineImages } from "./components/TimelineImages";
import { TimelineComments } from "./components/TimelineComments";
import { TimelineLastOnline } from "./components/TimelineLastOnline";

const {
  axiosGetGigs,
  axiosGetNextGigs,
  axiosGetNextUpdatedGigs,
  axiosGetImages,
  axiosGetNextImages,
  axiosGetComments,
  axiosGetLastOnline,
  axiosGetNextComments,

  dateTimeHandler,
} = require("./TimelineUtils");

interface Props {
  setTimelineMode: (e: boolean) => void;

  setTimelineCommentsMode: (e: boolean) => void;

  setTimelineGigsMode: (e: boolean) => void;
  setTimelineGalleriesMode: (e: boolean) => void;
  gigsListTimeline: any;
  commentsTimeline: any;
  imagesTimeline: any;
  setGigsListTimeline: (e: any) => void;
  setCommentsTimeline: (e: any) => void;
  setImagesTimeline: (e: any) => void;
  timelineScrollTop: number;
  setTimelineScrollTop: (e: number) => void;
}

type LocationProps = {
  state: {
    previousPath: string;
    gigs?: boolean;
    comments?: boolean;
    galleries?: boolean;
  };
};

export const Timeline: React.FC<Props> = ({
  setTimelineMode,
  setTimelineCommentsMode,
  setTimelineGigsMode,
  setTimelineGalleriesMode,
  gigsListTimeline,
  commentsTimeline,
  imagesTimeline,

  setGigsListTimeline,
  setCommentsTimeline,
  setImagesTimeline,

  timelineScrollTop,
  setTimelineScrollTop,
}) => {
  const [updatesOn, setUpdatesOn] = useState<boolean>(false);
  const [gigEntriesOn, setGigEntriesOn] = useState<boolean>(true);
  const [gigGalleryOn, setGigGalleryOn] = useState<boolean>(false);
  const [gigCommentsOn, setGigCommentsOn] = useState<boolean>(false);
  const [lastOnlineOn, setLastOnlineOn] = useState<boolean>(false);
  const [lastOnlineTimeline, setLastOnlineTimeline] = useState<any>();
  const elemRef = useRef<HTMLDivElement>(null);
  const [lastUsersMode, setLastUsersMode] = useState<boolean>(false);
  const [latestUpdatesMode, setLatestUpdatesMode] = useState<boolean>(false);

  const location = useLocation() as unknown as LocationProps;
  const { state } = location;

  useEffect(function () {
    setTimelineMode(true);
    setTimelineCommentsMode(false);
    setTimelineGigsMode(true);
    setTimelineGalleriesMode(false);
    if (elemRef && elemRef.current) {
      elemRef.current.scrollTo({
        top: timelineScrollTop + 1,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(
    function () {
      if (state && state.gigs) {
        setGigEntriesOn(true);
        setGigCommentsOn(false);
        setGigGalleryOn(false);
      } else if (
        state &&
        state.comments &&
        state.previousPath.includes("/api/gig/")
      ) {
        setGigEntriesOn(false);
        setGigCommentsOn(true);
        setGigGalleryOn(false);
      } else if (
        state &&
        state.galleries &&
        state.previousPath.includes("/api/gig/")
      ) {
        setGigEntriesOn(false);
        setGigCommentsOn(false);
        setGigGalleryOn(true);
      }
    },
    [state]
  );

  useEffect(
    function () {
      if (elemRef.current) {
        elemRef.current.scrollTop = 0;
      }
      if (gigEntriesOn && !gigsListTimeline) {
        axiosGetGigs(setGigsListTimeline, false);
      }
    },
    [gigEntriesOn]
  );

  useEffect(
    function () {
      if (elemRef.current && gigGalleryOn) {
        elemRef.current.scrollTop = 0;
      }
      if (gigGalleryOn && !imagesTimeline) {
        axiosGetImages(setImagesTimeline);
      }
    },
    [gigGalleryOn]
  );

  useEffect(
    function () {
      if (elemRef.current && gigCommentsOn) {
        elemRef.current.scrollTop = 0;
      }
      if (gigCommentsOn && !commentsTimeline) {
        axiosGetComments(setCommentsTimeline);
      }
    },
    [gigCommentsOn]
  );

  useEffect(
    function () {
      if (elemRef.current) {
        elemRef.current.scrollTop = 0;
      }
      if (lastOnlineOn && !lastOnlineTimeline) {
        axiosGetLastOnline(setLastOnlineTimeline, lastUsersMode);
      }
    },
    [lastOnlineOn]
  );

  useEffect(
    function () {
      if (elemRef.current) {
        elemRef.current.scrollTop = 0;
      }
      if (lastUsersMode) {
        axiosGetLastOnline(setLastOnlineTimeline, false);
      } else {
        axiosGetLastOnline(setLastOnlineTimeline, true);
      }
    },
    [lastUsersMode]
  );

  useEffect(
    function () {
      if (elemRef.current) {
        elemRef.current.scrollTop = 0;
      }
      if (latestUpdatesMode) {
        axiosGetGigs(setGigsListTimeline, false);
      } else {
        axiosGetGigs(setGigsListTimeline, true);
      }
    },
    [latestUpdatesMode]
  );

  useEffect(() => {
    if (gigEntriesOn && gigsListTimeline && elemRef.current) {
      if (
        elemRef.current.scrollHeight <=
        elemRef.current.scrollTop + elemRef.current.offsetHeight + 1
      ) {
        elemRef.current.scrollTop =
          elemRef.current.scrollTop + elemRef.current.offsetHeight - 100;
        if (!latestUpdatesMode) {
          axiosGetNextGigs(
            gigsListTimeline,
            setGigsListTimeline,
            gigsListTimeline[gigsListTimeline.length - 1].id
          );
        } else {
          axiosGetNextUpdatedGigs(
            gigsListTimeline,
            setGigsListTimeline,
            gigsListTimeline[gigsListTimeline.length - 1].updated_at
          );
        }
      }
    } else if (gigCommentsOn && commentsTimeline && elemRef.current) {
      if (
        elemRef.current.scrollHeight <=
        elemRef.current.scrollTop + elemRef.current.offsetHeight + 1
      ) {
        elemRef.current.scrollTop =
          elemRef.current.scrollTop + elemRef.current.offsetHeight - 100;
        axiosGetNextComments(
          commentsTimeline,
          setCommentsTimeline,
          commentsTimeline[commentsTimeline.length - 1].id
        );
      }
    } else if (gigGalleryOn && imagesTimeline && elemRef.current) {
      if (
        elemRef.current.scrollHeight <=
        elemRef.current.scrollTop + elemRef.current.offsetHeight + 1
      ) {
        elemRef.current.scrollTop =
          elemRef.current.scrollTop + elemRef.current.offsetHeight - 100;
        axiosGetNextImages(
          imagesTimeline,
          setImagesTimeline,
          imagesTimeline[imagesTimeline.length - 1].created_at
        );
      }
    }
  }, [timelineScrollTop]);

  return (
      <div className="timelineContainer">
          <div className="timelineBox">
              <div className="timelineCategory">
                  <div>
                      {" "}
                      <img src="timeline.png"></img>
                  </div>
                  <div
                      className="categoryTitle"
                      id={(gigEntriesOn && "categoryTitleFocus") || ""}
                      onClick={(e) => {
                          setGigEntriesOn(!gigEntriesOn);
                          setUpdatesOn(false);
                          setGigGalleryOn(false);
                          setGigCommentsOn(false);
                          setLastOnlineOn(false);
                      }}
                  >
                      Gigs
                  </div>
                  <div
                      className="categoryTitle"
                      id={(gigGalleryOn && "categoryTitleFocus") || ""}
                      onClick={(e) => {
                          setGigGalleryOn(!gigGalleryOn);
                          setUpdatesOn(false);
                          setGigEntriesOn(false);
                          setGigCommentsOn(false);
                          setLastOnlineOn(false);
                      }}
                  >
                      Galleries
                  </div>
                  <div
                      className="categoryTitle"
                      id={(gigCommentsOn && "categoryTitleFocus") || ""}
                      onClick={(e) => {
                          setGigCommentsOn(!gigCommentsOn);
                          setUpdatesOn(false);
                          setGigEntriesOn(false);
                          setGigGalleryOn(false);
                          setLastOnlineOn(false);
                      }}
                  >
                      Comments
                  </div>{" "}
                  <div
                      className="categoryTitle"
                      id={(lastOnlineOn && "categoryTitleFocus") || ""}
                      onClick={(e) => {
                          setLastOnlineOn(!lastOnlineOn);
                          setUpdatesOn(false);
                          setGigEntriesOn(false);
                          setGigGalleryOn(false);
                          setGigCommentsOn(false);
                      }}
                  >
                      Users
                  </div>
                  <div
                      className="categoryTitle"
                      id={(updatesOn && "categoryTitleFocus") || ""}
                      onClick={(e) => {
                          setUpdatesOn(!updatesOn);
                          setGigEntriesOn(false);
                          setGigGalleryOn(false);
                          setGigCommentsOn(false);
                          setLastOnlineOn(false);
                      }}
                  >
                      Updates
                  </div>
              </div>

              <div className="categoryContent">
                  <div className="categoryContentHead">Timeline</div>
                  <div
                      className="categoryContentMain"
                      ref={elemRef}
                      onScrollCapture={() =>
                          elemRef.current &&
                          setTimelineScrollTop(elemRef.current.scrollTop)
                      }
                  >
                      {lastOnlineOn && (
                          <div
                              className="timelineToggler"
                              onClick={(e) => {
                                  setLastUsersMode(!lastUsersMode);
                              }}
                          >
                              {(lastUsersMode && "Newest Users") ||
                                  "Last Online"}
                          </div>
                      )}
                      {gigEntriesOn && (
                          <div
                              className="timelineToggler"
                              onClick={(e) => {
                                  setLatestUpdatesMode(!latestUpdatesMode);
                              }}
                          >
                              {(latestUpdatesMode && "Last Updated") ||
                                  "Latest Entries"}
                          </div>
                      )}
                      {gigsListTimeline && gigEntriesOn && (
                          <TimelineGigs
                              gigsListTimeline={gigsListTimeline}
                              setTimelineGigsMode={(e: boolean) =>
                                  setTimelineGigsMode(e)
                              }
                              setTimelineCommentsMode={(e: boolean) =>
                                  setTimelineCommentsMode(e)
                              }
                              setTimelineGalleriesMode={(e: boolean) =>
                                  setTimelineGalleriesMode(e)
                              }
                              dateTimeHandler={(e: string) =>
                                  dateTimeHandler(e)
                              }
                          />
                      )}
                      {imagesTimeline && gigGalleryOn && (
                          <TimelineImages
                              setTimelineCommentsMode={(e: boolean) =>
                                  setTimelineCommentsMode(e)
                              }
                              setTimelineGigsMode={(e: boolean) =>
                                  setTimelineGigsMode(e)
                              }
                              setTimelineGalleriesMode={(e: boolean) =>
                                  setTimelineGalleriesMode(e)
                              }
                              imagesTimeline={imagesTimeline}
                              dateTimeHandler={(e: string) =>
                                  dateTimeHandler(e)
                              }
                          />
                      )}
                      {commentsTimeline && gigCommentsOn && (
                          <TimelineComments
                              commentsTimeline={commentsTimeline}
                              setTimelineCommentsMode={(e: boolean) =>
                                  setTimelineCommentsMode(e)
                              }
                              setTimelineGigsMode={(e: boolean) =>
                                  setTimelineGigsMode(e)
                              }
                              setTimelineGalleriesMode={(e: boolean) =>
                                  setTimelineGalleriesMode(e)
                              }
                              dateTimeHandler={(e: string) =>
                                  dateTimeHandler(e)
                              }
                          />
                      )}
                      {lastOnlineTimeline && lastOnlineOn && (
                          <TimelineLastOnline
                              lastOnlineTimeline={lastOnlineTimeline}
                              lastUsersMode={lastUsersMode}
                              dateTimeHandler={(e: string) =>
                                  dateTimeHandler(e)
                              }
                          />
                      )}
                  </div>
              </div>
          </div>
      </div>
  );
};
