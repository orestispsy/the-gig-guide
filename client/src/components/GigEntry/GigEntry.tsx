import React, { useEffect, useState } from "react";
import axios from "../../common/Axios/axios";
import { Link } from "react-router-dom";

import { Community } from "../Community/Community";
import { Comments } from "../Comments/Comments";

interface Props {
  match: any;
  gigsList: any;
  myUserId: number | undefined;
  superAdmin: boolean;
  myNickname: string;
  setDarkMode: (e: boolean) => void;
  history: any;
  setGigEntry: (e: number | null) => void;
  selectedGigEntry: number | null;
  guest: boolean;
}

export const GigEntry: React.FC<Props> = ({
  match,
  gigsList,
  myUserId,
  superAdmin,
  myNickname,
  setDarkMode,
  history,
  setGigEntry,
  selectedGigEntry,
  guest,
}) => {
  const [city, setCity] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [venue, setVenue] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [tourName, setTourName] = useState<string>("");
  const [poster, setPoster] = useState<string>("");
  const [selectedGig, setSelectedGig] = useState<any>("");
  const [openComments, setOpenComments] = useState<boolean>(false);

  useEffect(function () {
    setDarkMode(true);

    axios
      .get("/gig/" + match.params.id)
      .then(({ data }) => {
        setCity(data.data.city);
        setId(data.data.id);
        setVenue(data.data.venue);
        setDate(data.data.date);
        setTourName(data.data.tour_name);
        setPoster(data.data.poster);
        setSelectedGig(data.data.date), setGigEntry(data.data);
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
          setId(data.data.id);
          setVenue(data.data.venue);
          setDate(data.data.date);
          setTourName(data.data.tour_name);
          setPoster(data.data.poster);

          history.push(`/api/gig/${id}`);
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
            gigsList.map((gig: any) => (
              <option value={gig.date} key={gig.id}>
                {gig.date} {gig.venue}
              </option>
            ))}
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
            selectedGigId={id}
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
            selectedGigId={id}
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
