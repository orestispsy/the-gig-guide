import React, { useEffect, useState } from "react";
import axios from "../../common/Axios/axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Community } from "../Community/Community";
import { Comments } from "../Comments/Comments";

interface Props {
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
}

export const GigEntry: React.FC<Props> = ({
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
}) => {
  const [city, setCity] = useState<string>("");
  const [gigId, setGigId] = useState<string>("");
  const [venue, setVenue] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [tourName, setTourName] = useState<string>("");
  const [poster, setPoster] = useState<string>("");
  const [selectedGig, setSelectedGig] = useState<any>("");
  const [openComments, setOpenComments] = useState<boolean>(false);

  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(function () {
    setTimeout(() => {
      setDarkMode(true);
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
  }, []);

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
      </form>
      <div className="gigEntryDetailsBack">
        <div className="gigEntryDetails">
          {poster && <img src={poster}></img>}
          <div className="detailedEntry">
            <span>Venue</span>
            <h1>{venue}</h1>
            <span>City</span>
            <h1> {(selectedGig && selectedGig.city) || city}</h1>
            <span>Tour Name</span>
            <h1>{tourName}</h1>
            <span>Date</span>
            <h1>{date}</h1>
          </div>
        </div>
        {!openComments && (
          <Community
            selectedGigId={gigId}
            myUserId={myUserId}
            superAdmin={superAdmin}
            myNickname={myNickname}
            setOpenComments={(e: boolean) => setOpenComments(e)}
            openComments={openComments}
            guest={guest}
          />
        )}
        {openComments && (
          <Comments
            selectedGigId={gigId}
            myUserId={myUserId}
            superAdmin={superAdmin}
            myNickname={myNickname}
            setOpenComments={(e: boolean) => setOpenComments(e)}
            openComments={openComments}
          />
        )}
      </div>
    </div>
  );
};
