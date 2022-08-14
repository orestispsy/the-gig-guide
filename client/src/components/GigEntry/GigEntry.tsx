import React, { useEffect, useState, useRef } from "react";
import axios from "../../common/Axios/axios";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

import { Community } from "../Community/Community";
import { Comments } from "../Comments/Comments";

interface Props {
  darkMode: boolean;
  gigsList: any;
  myUserId: number | undefined;
  superAdmin: boolean;
  myNickname: string;
  setDarkMode: (e: boolean) => void;
  setLoaded: (e: boolean) => void;
  setGigEntry: (e: number | null) => void;
  selectedGigEntry: number | null;
  guest: boolean;
  setGigEntryMode: (e: boolean) => void;
  setMapMode: (e: boolean) => void;
  mapVisible: (e: boolean) => void;
  imagesTimeline: any;
  setImagesTimeline: (e: any) => void;
  commentsTimeline: any;
  setCommentsTimeline: (e: any) => void;
}

type LocationProps = {
  state: {
    previousPath: string;
    comments: boolean;
    gig: number;
  };
  pathname: string;
};

export const GigEntry: React.FC<Props> = ({
  darkMode,
  gigsList,
  myUserId,
  superAdmin,
  myNickname,
  setDarkMode,
  setLoaded,
  setGigEntry,
  setGigEntryMode,
  selectedGigEntry,
  guest,
  setMapMode,
  mapVisible,
  imagesTimeline,
  commentsTimeline,
  setCommentsTimeline,
  setImagesTimeline,
}) => {
  const [city, setCity] = useState<string>("");
  const [gigId, setGigId] = useState<string>("");
  const [venue, setVenue] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [fullDate, setFullDate] = useState<string>("");
  const [tourName, setTourName] = useState<string>("");
  const [poster, setPoster] = useState<string>("");
  const [selectedGig, setSelectedGig] = useState<any>("");
  const [openComments, setOpenComments] = useState<boolean>(false);
  const [resize, setResize] = useState<boolean>(false);
  const [posterZoom, setPosterZoom] = useState<boolean>(false);
  const [months, setMonths] = useState([
    { month: "January" },
    { month: "February" },
    { month: "March" },
    { month: "April" },
    { month: "May" },
    { month: "June" },
    { month: "July" },
    { month: "August" },
    { month: "September" },
    { month: "October" },
    { month: "November" },
    { month: "December" },
  ]);
  const [days, setDays] = useState([
    { day: "Sunday" },
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
  ]);

  let navigate = useNavigate();
  let { id } = useParams();

  const location = useLocation() as unknown as LocationProps;
  const { state, pathname } = location;

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(
    function () {
      if (state && state.previousPath === "/timeline" && state.comments) {
        setTimeout((e) => {
          setOpenComments(true);
        }, 500);
      }
    },
    [state]
  );

  useEffect(
    function () {
      setTimeout(() => {
        setGigEntryMode(true);
        setMapMode(true);
        mapVisible(false);
      }, 300);
      axios
        .get("/gig/" + id)
        .then(({ data }) => {
          setCity(data.data.city);
          setGigId(data.data.id);
          setVenue(data.data.venue);
          setDate(data.data.date);
          setTourName(data.data.tour_name);
          setPoster(data.data.poster);
          setSelectedGig(data.data.date);
          setGigEntry(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [pathname]
  );

  useEffect(
    function () {
      if (!poster) {
        setPosterZoom(false);
      }
      setResize(false);
      setTimeout((e) => {
        if (
          poster &&
          imgRef.current &&
          imgRef.current.naturalHeight < imgRef.current.naturalWidth
        ) {
          setResize(true);
        }
      }, 300);
    },
    [poster]
  );

  useEffect(
    function () {
      if (date) {
        dateModifier();
      }
    },
    [date]
  );

  useEffect(
    function () {
      if (!darkMode) {
        setDarkMode(true);
      }
    },
    [darkMode]
  );

  useEffect(
    function () {
      gigSelector();
    },
    [selectedGig]
  );

  const gigSelector = () => {
    axios
      .post("/get-gig-to-edit", { selectedGig: selectedGig })
      .then(({ data }) => {
        if (data.data) {
          setCity(data.data.city);
          setGigId(data.data.id);
          setVenue(data.data.venue);
          setDate(data.data.date);
          setTourName(data.data.tour_name);
          setPoster(data.data.poster);

          navigate(`/api/gig/${data.data.id}`);

          setGigEntry(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dateModifier = () => {
    let full_date = new Date(date);
    let fullday = full_date.getUTCDay();
    let fullNumberday = full_date.getDate();
    let fullMonth = full_date.getMonth();
    let fullYear = full_date.getUTCFullYear();

    setFullDate(
      `${days[fullday].day}, ${fullNumberday} ${months[fullMonth].month} ${fullYear}`
    );
  };

  return (
    <div className="gigEntryContainer">
      <form>
        <Link to="/map" className="gigEntryMapLink" title="Map"></Link>
        <select
          name="selectedGig"
          className="selectGigEntry"
          onChange={(e) => setSelectedGig(e.target.value)}
        >
          <option className="chooseGig" value="">
            Select Gig
          </option>
          {gigsList &&
            gigsList
              .map((gig: any) => (
                <option
                  value={gig.date}
                  key={gig.id}
                  style={{
                    color: (id == gig.id && `orangered`) || ``,
                  }}
                >
                  {gig.date} {gig.venue}
                </option>
              ))
              .reverse()}
        </select>
        {superAdmin && (
          <div
            className="editGigButton"
            onClick={() => {
              navigate("/gig-editor", {
                state: {
                  previousPath: pathname,
                  gig: selectedGigEntry,
                },
              });
            }}
          >
            EDIT
          </div>
        )}
      </form>

      <div
        className="gigEntryDetailsBack"
        style={{
          overflowY: (posterZoom && `auto`) || `unset`,
        }}
      >
        {posterZoom && (
          <img
            className="gigEntryZoomedImg"
            onClick={(e) => setPosterZoom(false)}
            src={poster}
          ></img>
        )}
        {!posterZoom && (
          <div className="gigEntryDetails">
            {poster && (
              <img
                onClick={(e) => setPosterZoom(true)}
                src={poster}
                ref={imgRef}
                style={{
                  height: (resize && "unset") || "",
                }}
              ></img>
            )}
            <div className="detailedEntry">
              <div>
                {" "}
                <span>Venue</span>
                <h1>{venue || " "}</h1>
              </div>
              <div>
                {" "}
                <span>City</span>
                <h1>{city || " "}</h1>
              </div>
              <div>
                {" "}
                <span>Tour Name</span>
                <h1>{tourName || " "}</h1>
              </div>
              <div>
                {" "}
                <span>Date</span>
                <h1>{fullDate}</h1>
              </div>
            </div>
          </div>
        )}
        {!openComments && !posterZoom && (
          <Community
            selectedGigId={gigId}
            myUserId={myUserId}
            superAdmin={superAdmin}
            myNickname={myNickname}
            setOpenComments={(e: boolean) => setOpenComments(e)}
            openComments={openComments}
            guest={guest}
            imagesTimeline={imagesTimeline}
            setImagesTimeline={(e: boolean) => setImagesTimeline(e)}
          />
        )}
        {openComments && !posterZoom && (
          <Comments
            selectedGigId={gigId}
            myUserId={myUserId}
            superAdmin={superAdmin}
            myNickname={myNickname}
            setOpenComments={(e: boolean) => setOpenComments(e)}
            openComments={openComments}
            commentsTimeline={commentsTimeline}
            setCommentsTimeline={(e: boolean) => setCommentsTimeline(e)}
          />
        )}
      </div>
    </div>
  );
};
