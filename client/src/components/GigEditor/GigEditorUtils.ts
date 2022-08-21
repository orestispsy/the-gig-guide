import axios from "../../common/Axios/axios";

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

const handleClick = (
  date: any,
  venue: any,
  lat: string | number,
  lng: string | number,
  tourName: any,
  city: string,
  poster: string,
  selectedGig: any,
  selectedPoster: any,
  setGigsListTimeline: (e: any) => void,
  setError: (e: boolean) => void,
  setDoneUpdate: (e: boolean) => void,
  setFile: (e: any) => void,
  setGigsList: (e: any) => any
) => {
  axios
    .post("/gig-update", {
      selectedGig: selectedGig,
      date: date,
      venue: venue,
      lat: lat,
      lng: lng,
      tourName: tourName,
      city: city,
      poster: poster,
      selectedPoster: selectedPoster,
    })
    .then(({ data }) => {
      if (data.data) {
        updateDatabase(setGigsList);
        setDoneUpdate(true);
        axiosGetGigs(setGigsListTimeline);
      } else {
        setError(true);
        setFile(null);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const gigDelete = (
  setDeleteSuccess: (e: any) => void,
  setDeleteFile: (e: any) => void,
  selectedGig: any,
  setGigsListTimeline: (e: any) => void,
  setGigsList: (e: any) => any,
  setSelectedGig: (e: any) => void,
  setSelectedPoster: (e: any) => void
) => {
  setDeleteSuccess(true);
  setDeleteFile(false);

  axios
    .post("/gig-delete", { selectedGig: selectedGig })
    .then(({ data }) => {
      if (data.deleteSuccess) {
        axiosGetGigs(setGigsListTimeline);
        updateDatabase(setGigsList);
        setSelectedGig(false);
        setSelectedPoster("");
        const timer = setTimeout(() => {
          setDeleteSuccess(false);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        return;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

let selectedGigHelper: any;
const selectedGigUpdater = (e: any, selectedGig: any) => {
  selectedGigHelper = selectedGig;
  if (selectedGigHelper.poster) {
    selectedGigHelper.poster = e[0].poster;
  }
};

const posterSelector = (
  selectedGig: any,
  selectedPoster: any,
  setSelectedGig: (e: any) => void,
  setPoster: (e: any) => void
) => {
  let selectedGigHelper: any = selectedGig;
  if (selectedGigHelper.poster) {
    selectedGigHelper.poster = selectedPoster;

    setSelectedGig(selectedGigHelper);
    setPoster(selectedPoster);
  }
};

const gigSelector = (
  gigToView: string | number,
  setSelectedGig: (e: any) => void
) => {
  axios
    .post("/get-gig-to-edit", { selectedGig: gigToView })
    .then(({ data }) => {
      if (data.data) {
        setSelectedGig(data.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleUploaderClick = (
  elemRef: any,
  setSuccess: (e: boolean) => void,
  file: any,
  selectedGig: any,
  setSelectedPoster: (e: any) => void,
  setGigsListTimeline: (e: any) => void,
  setSelectedGig: (e: any) => void,
  setGigsList: (e: any) => any,
  setDoneUpdate: (e: boolean) => any,
  setFile: (e: any) => void,
  setError2: (e: boolean) => void
) => {
  setSuccess(true);
  const formData = new FormData();
  let ext = file.name.split(".");
  formData.append(
    "file",
    file,
    `${selectedGig.date}G${selectedGig.id}T.${ext[ext.length - 1]}`
  );
  formData.append("data", JSON.stringify(selectedGig));
  axios
    .post("/upload", formData)
    .then(({ data }) => {
      if (data.success) {
        setSelectedPoster(data.data[0].poster);
        axiosGetGigs(setGigsListTimeline);
        selectedGigUpdater(data.data, selectedGig);
        setSelectedGig(selectedGigHelper);

        updateDatabase(setGigsList);
        setDoneUpdate(true);
        setSuccess(false);
        setFile(null);
        elemRef.current.value = "";
      } else {
        setError2(true);
      }
    })
    .catch((err) => {
      setError2(true);
      setSuccess(false);
    });
};

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

const coordinator = (
  e: any,
  selectedGig: any,
  setSelectedGig: (e: any) => void,
  setNewLng: (e: string | number) => void,
  setNewLat: (e: string | number) => void
) => {
  let selectedGigHelper: any = selectedGig;

  selectedGigHelper.lng = parseFloat(e.latLng.lng());
  selectedGigHelper.lat = parseFloat(e.latLng.lat());
  setSelectedGig(selectedGigHelper);
  setNewLng(parseFloat(e.latLng.lng()));
  setNewLat(parseFloat(e.latLng.lat()));
};

module.exports = {
  coordinator,
  gigSelector,
  posterSelector,
  gigDelete,
  handleUploaderClick,
  updateDatabase,
  axiosGetGigs,
  handleClick,
};
