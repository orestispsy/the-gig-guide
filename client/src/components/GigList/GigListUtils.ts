import axios from "../../common/Axios/axios";
module.exports.dateModifier = (e: string, retro?: boolean) => {
  if (!retro) {
    let dateFull = e.split("-");
    return dateFull[2] + ` • ` + dateFull[1] + ` • ` + dateFull[0];
  } else {
    let dateFull = e.split("-");
    return dateFull[2] + `.` + dateFull[1] + `.` + dateFull[0];
  }
};

module.exports.gigFinder = (e: string, setSearchResults: (e: any) => void) => {
  axios
    .post("/find-gig", { keyword: e })
    .then(({ data }) => {
      if (data.data) {
        setSearchResults(data.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.filterGigs = (
  sortedGigsHelper: any,
  sortedGigs: any,
  setSortedMonths: (e: any) => void
) => {
  sortedGigs.map((gig: any) => {
    var dateSplit = gig.date.split("-");
    if (!sortedGigsHelper.includes(dateSplit[1])) {
      sortedGigsHelper = sortedGigsHelper.concat(dateSplit[1]);
      setSortedMonths(sortedGigsHelper);
    } else {
      return;
    }
  });
};

module.exports.gigListFiltering = (
  e: any,
  gigsList: any,
  setSortedGigs: (e: any) => void,
  setSortedMonths: (e: any) => void
) => {
  setSortedGigs(gigsList.filter((gig: any) => gig.date.includes(e)));
  setSortedMonths([]);
};

module.exports.gigsReset = (
  setYear: (e: string | number | readonly string[] | undefined) => void,
  setSortedGigs: (e: any) => void,
  setSearchResults: (e: any) => void,
  setSearchFieldOpen: (e: boolean) => void
) => {
  setYear(undefined);
  setSortedGigs(false);
  setSearchResults(false);
  setSearchFieldOpen(false);
};
