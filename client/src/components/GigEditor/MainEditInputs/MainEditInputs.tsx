import React from "react";

interface Props {
  date: any;
  venue: any;
  tourName: any;
  city: string;
  setCity: (e: string) => void;
  setDate: (e: any) => void;
  setVenue: (e: any) => void;
  setTourName: (e: any) => void;
  setDoneUpdate: (e: boolean) => void;
  selectedGig: any;
  setError: (e: boolean) => void;
  setError2: (e: boolean) => void;
  setDeleteFile: (e: any) => void;
}

export const MainEditInputs: React.FC<Props> = ({
  date,
  venue,
  city,
  tourName,
  selectedGig,
  setDoneUpdate,
  setError,
  setError2,
  setDeleteFile,
  setCity,
  setDate,
  setTourName,
  setVenue,
}) => {
  return (
    <div className="gigMainDetails">
      <div className="inputBack">
        <span>Date</span>
        <input
          value={date || selectedGig.date || ""}
          autoComplete="none"
          name="date"
          placeholder="Date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
          onClick={(e) => {
            setError(false);
            setError2(false);
            setDeleteFile(false);
            setDoneUpdate(false);
          }}
        />
      </div>

      <div className="inputBack">
        <span>City</span>
        <input
          value={city || selectedGig.city || ""}
          autoComplete="none"
          name="city"
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
          onClick={(e) => {
            setError(false);
            setError2(false);
            setDeleteFile(false);
            setDoneUpdate(false);
          }}
        />
      </div>

      <div className="inputBack">
        <span>Tour</span>
        <input
          value={tourName || selectedGig.tour_name || ""}
          autoComplete="none"
          name="tour_name"
          placeholder="Tour Name"
          onChange={(e) => setTourName(e.target.value)}
          onClick={(e) => {
            setError(false);
            setError2(false);
            setDeleteFile(false);
            setDoneUpdate(false);
          }}
        />
      </div>

      <div className="inputBack">
        <span>Venue</span>
        <input
          value={venue || selectedGig.venue || ""}
          autoComplete="none"
          name="venue"
          placeholder="Venue"
          onChange={(e) => setVenue(e.target.value)}
          onClick={(e) => {
            setError(false);
            setError2(false);
            setDeleteFile(false);
            setDoneUpdate(false);
          }}
        />
      </div>
    </div>
  );
};
