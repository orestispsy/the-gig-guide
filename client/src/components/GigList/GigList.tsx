import { Link } from "react-router-dom";
import React, { useState, useEffect, Fragment, useRef } from "react";
import axios from "../../common/Axios/axios";

interface Props {
  gigsList: any;
  setDarkMode: (e: boolean) => void;
  year: string | number | readonly string[] | undefined;
  setYear: (e: string | number | readonly string[] | undefined) => void;
  setGigListOpen: (e: boolean) => void;
  setAnimeMode: (e: boolean) => void;
  mapVisible: (e: boolean) => void;
  setGigEntryMode: (e: boolean) => void;
  setMapMode: (e: boolean) => void;
  setRetroList: (e: boolean) => void;
  retroList: boolean;
}

export const GigList: React.FC<Props> = ({
  retroList,
  setRetroList,
  gigsList,
  setDarkMode,
  year,
  setYear,
  setGigListOpen,
  setAnimeMode,
  mapVisible,
  setGigEntryMode,
  setMapMode,
}) => {
  const [searchFieldOpen, setSearchFieldOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any>(false);
  const [sortedGigs, setSortedGigs] = useState<any>(false);
  const [sortedMonths, setSortedMonths] = useState<any>([]);
  const [reverseList, setReverseList] = useState<boolean>(false);

  const [months, setMonths] = useState([
    { id: "01", month: "January" },
    { id: "02", month: "February" },
    { id: "03", month: "March" },
    { id: "04", month: "April" },
    { id: "05", month: "May" },
    { id: "06", month: "June" },
    { id: "07", month: "July" },
    { id: "08", month: "August" },
    { id: "09", month: "September" },
    { id: "10", month: "October" },
    { id: "11", month: "November" },
    { id: "12", month: "December" },
  ]);
  const [shownGigs, setShownGigs] = useState(11);

  const elemRef = useRef<HTMLDivElement>(null);

  const retroListRef = useRef<HTMLDivElement>(null);

  useEffect(function () {
    setAnimeMode(false);
    setGigListOpen(true);
    mapVisible(false);
    setMapMode(false);
    setGigEntryMode(false);
    if (year) {
      gigListFiltering(year);
    }
  }, []);

  useEffect(
    function () {
      if (retroListRef.current) {
        retroListRef.current.scrollTop = -retroListRef.current.scrollHeight;
      }
    },
    [reverseList]
  );

  var sortedGigsHelper: any = [];
  useEffect(
    function () {
      if (sortedGigs) {
        sortedGigs.map((gig: any) => {
          var dateSplit = gig.date.split("-");
          if (!sortedGigsHelper.includes(dateSplit[1])) {
            sortedGigsHelper = sortedGigsHelper.concat(dateSplit[1]);
            setSortedMonths(sortedGigsHelper);
          } else {
            return;
          }
        });
      }
    },
    [sortedGigs]
  );

  const gigListFiltering = (e: any) => {
    setSortedGigs(gigsList.filter((gig: any) => gig.date.includes(e)));
    setSortedMonths([]);
  };

  const gigsReset = () => {
    setYear(undefined);
    setSortedGigs(false);
    setSearchResults(false);
    setSearchFieldOpen(false);
  };

  const gigFinder = (e: string) => {
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

  const dateModifier = (e: string, retro?: boolean) => {
    if (!retro) {
      let dateFull = e.split("-");
      return dateFull[2] + ` • ` + dateFull[1] + ` • ` + dateFull[0];
    } else {
      let dateFull = e.split("-");
      return dateFull[2] + `.` + dateFull[1] + `.` + dateFull[0];
    }
  };

  return (
    <div className="gigListContainer">
      {retroList && (
        <div className="retroListHead">
          <div className="retroTitle">Gig Entries</div>
        </div>
      )}
      {retroList && (
        <div className="retroListCategories">
          <div
            title={"Reverse List"}
            onClick={(e) => {
              setReverseList(!reverseList);
            }}
          >
            #
          </div>
          <div>Date</div>
          <div>Venue</div>
          <div>City</div>
          <div>Tour Name</div>
        </div>
      )}
      {retroList && (
        <div
          className="retroList"
          ref={retroListRef}
          style={{
            flexDirection: (reverseList && "column-reverse") || "column",
          }}
        >
          {gigsList &&
            gigsList.map((gig: any, index: number) => (
              <Link to={`/api/gig/${gig.id}`} key={gig.id}>
                <div>{index + 1}</div>
                <div>{dateModifier(gig.date, true)} </div>
                <div> {gig.venue}</div>
                <div> {gig.city}</div>
                <div> {gig.tour_name}</div>
              </Link>
            ))}
        </div>
      )}
      {!retroList && (
        <div className="gigEntriesBoxBack">
          <div className="gigEntriesBox">
            <h1>Gig Entries</h1>
            <div className="gigListControls">
              <div className="sortedGigRange">2006</div>
              <input
                value={(year && year) || ""}
                title="Set Year"
                type="range"
                min="2006"
                max="2022"
                className="selectGigEntry"
                onChange={(e) => {
                  gigListFiltering(e.target.value);
                  setYear(e.target.value);
                  setSearchResults(false);
                  setSearchFieldOpen(false);
                }}
              ></input>
              <div className="sortedGigRange">2022</div>
            </div>
            {year && (
              <div
                title="Reset"
                className="sortedGigReset"
                onClick={() => {
                  gigsReset();
                }}
              >
                show all
              </div>
            )}
            <div
              className="gigListSearch"
              onClick={(e) => {
                setSearchFieldOpen(!searchFieldOpen);
                setSearchResults(false);
              }}
            ></div>
            {searchFieldOpen && (
              <input
                placeholder="Search for City or Venue"
                type="text"
                className="searchFieldGigList"
                onChange={(e) => gigFinder(e.target.value)}
              ></input>
            )}
            <div className="year">
              {" "}
              {(year && !searchFieldOpen && year) || "Total"}
            </div>
          </div>
          <div className="gigEntriesCounter">
            {!searchResults &&
              !searchFieldOpen &&
              gigsList &&
              !sortedGigs &&
              gigsList.length}
            {!searchResults &&
              !searchFieldOpen &&
              sortedGigs &&
              sortedGigs.length}
            {(searchFieldOpen && !searchResults.length && "0") ||
              searchResults.length}
          </div>
        </div>
      )}
      {!retroList && (
        <div className="gigEntriesBack">
          {!year && !searchResults && !searchFieldOpen && (
            <div className="latestEntries">Latest</div>
          )}

          {searchResults && <div className="latestEntries">Gigs Found</div>}
          <div
            id={(!year && "gigEntries") || ""}
            className="gigEntries"
            style={{
              height: (year && `54vh`) || "",
              marginTop: (!year && `1vmax`) || "",
            }}
            ref={elemRef}
            onScrollCapture={() => {
              if (
                elemRef.current &&
                elemRef.current.scrollTop + elemRef.current.clientHeight + 1 >=
                  elemRef.current.scrollHeight
              ) {
                if (shownGigs >= gigsList.length - 1) {
                  setShownGigs(gigsList.length);
                  return;
                } else {
                  const timer = setTimeout(() => {
                    setShownGigs(shownGigs + 4);
                  }, 200);
                  return () => clearTimeout(timer);
                }
              } else {
                return;
              }
            }}
          >
            {sortedGigs && !searchResults && !searchFieldOpen && year && (
              <div className="gigListMonths">
                {months &&
                  months.map((month: any) => (
                    <React.Fragment key={month.id}>
                      {sortedMonths.includes(month.id) && (
                        <div className="exactMonth">
                          <div className="exactMonthTitle">{month.month}</div>

                          <div className="monthInnerBox">
                            {sortedGigs &&
                              sortedGigs.map((gig: any) => {
                                var splitDate = gig.date.split("-");

                                return (
                                  <React.Fragment key={gig.id}>
                                    {splitDate[1] == month.id && (
                                      <Link
                                        onClick={(e) => {
                                          setYear(year);
                                        }}
                                        to={`/api/gig/${gig.id}`}
                                      >
                                        <div className="gigBox" id="gigBox">
                                          <div id="gigBoxDateSorted">
                                            {gig.date.split("-")[2]}
                                          </div>
                                          <div
                                            style={{
                                              color: `lime`,
                                            }}
                                          >
                                            {gig.venue}
                                          </div>
                                          <div
                                            style={{
                                              color: `white`,
                                            }}
                                          >
                                            {gig.city}
                                          </div>
                                        </div>
                                      </Link>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}{" "}
              </div>
            )}
            {gigsList &&
              !searchResults &&
              !searchFieldOpen &&
              !year &&
              !sortedGigs &&
              gigsList
                .slice(gigsList.length - shownGigs, gigsList.length)
                .reverse()
                .map((gig: any) => (
                  <Link to={`/api/gig/${gig.id}`} key={gig.id}>
                    <div className="gigBox">
                      <div
                        style={{
                          color: `yellow`,
                        }}
                      >
                        {dateModifier(gig.date)}
                      </div>
                      <div
                        style={{
                          color: `lime`,
                        }}
                      >
                        {gig.venue}
                      </div>
                      <div
                        style={{
                          color: `white`,
                        }}
                      >
                        {gig.city}
                      </div>
                    </div>
                  </Link>
                ))}
            {searchResults &&
              searchResults.map((gig: any) => (
                <Link to={`/api/gig/${gig.id}`} key={gig.id}>
                  <div className="gigBox">
                    <div
                      style={{
                        color: `yellow`,
                      }}
                    >
                      {dateModifier(gig.date)}
                    </div>
                    <div
                      style={{
                        color: `lime`,
                      }}
                    >
                      {gig.venue}
                    </div>
                    <div
                      style={{
                        color: `white`,
                      }}
                    >
                      {gig.city}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
      <div className="gigListOptions">
        <div
          title={(!retroList && "Full List View") || "Gig Entries"}
          className={(retroList && "listBoxes") || "listLines"}
          onClick={(e) => setRetroList(!retroList)}
        ></div>
        <Link
          title="Animated List"
          to="/gig-list-animation"
          className="gigAnimationLink"
        ></Link>
      </div>
    </div>
  );
};
