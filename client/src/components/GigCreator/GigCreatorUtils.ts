import axios from "../../common/Axios/axios";

const updateDatabase = (setGigsList: (e: any) => void) => {
  axios
    .get("/get-gigs")
    .then(({ data }) => {
      setGigsList(data.data.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
};

const axiosGetGigs = (setGigsListTimeline: (e: any) => void) => {
  axios
    .get("/get-gigs-timeline")
    .then(({ data }) => {
      setGigsListTimeline(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createGigEntry = (
  date: any,
  venue: any,
  lat: string | number,
  lng: string | number,
  tourName: any,
  city: string,
  setGigsListTimeline: (e: any) => void,
  setGigsList: (e: any) => void,
  setSuccess: (e: boolean) => void,
  setTaskDone: (e: boolean) => void,
  setError: (e: boolean) => void
) => {
  axios
    .post("/gig-creator", { date, venue, lat, lng, tourName, city })
    .then(({ data }) => {
      if (data.success) {
        axiosGetGigs(setGigsListTimeline);
        updateDatabase(setGigsList);
        setSuccess(true);
        const timer = setTimeout(() => {
          setTaskDone(true);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        setError(true);
        return;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { createGigEntry, axiosGetGigs };
