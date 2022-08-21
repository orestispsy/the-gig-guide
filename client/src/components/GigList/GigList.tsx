import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

import { FullList } from "./FullList/FullList";
import { RetroList } from "./RetroList/RetroList";
import { SearchResults } from "./SearchResults/SearchResults";
import { SortedList } from "./SortedList/SortedList";
import { GigListTopBar } from "./GigListTopBar/GigListTopBar";

const {
  dateModifier,
  filterGigs,
  gigListFiltering,
} = require("./GigListUtils");

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
  const [shownGigs, setShownGigs] = useState<any>(11);

  const elemRef = useRef<HTMLDivElement>(null);

  useEffect(function () {
    setAnimeMode(false);
    setGigListOpen(true);
    mapVisible(false);
    setMapMode(false);
    setGigEntryMode(false);
    if (year) {
      gigListFiltering(year, gigsList, setSortedGigs, setSortedMonths);
    }
  }, []);

  var sortedGigsHelper: any = [];
  useEffect(
    function () {
      if (sortedGigs) {
        filterGigs(sortedGigsHelper, sortedGigs, setSortedMonths);
      }
    },
    [sortedGigs]
  );

  return (
    <div className="gigListContainer">
      {retroList && (
        <RetroList
          reverseList={reverseList}
          setReverseList={(e: boolean) => setReverseList(e)}
          gigsList={gigsList}
        />
      )}

      {!retroList && (
        <GigListTopBar
          year={year}
          setYear={(e: string | number | readonly string[] | undefined) =>
            setYear(e)
          }
          searchResults={searchResults}
          setSearchResults={(e: any) => setSearchResults(e)}
          setSearchFieldOpen={(e: boolean) => setSearchFieldOpen(e)}
          searchFieldOpen={searchFieldOpen}
          gigsList={gigsList}
          setSortedGigs={(e: any) => setSortedGigs(e)}
          setSortedMonths={(e: any) => setSortedMonths(e)}
          sortedGigs={sortedGigs}
        />
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
              <SortedList
                sortedGigs={sortedGigs}
                sortedMonths={sortedMonths}
                months={months}
                year={year}
                setYear={(e: string | number | readonly string[] | undefined) =>
                  setYear(e)
                }
              />
            )}
            {gigsList &&
              !searchResults &&
              !searchFieldOpen &&
              !year &&
              !sortedGigs && (
                <FullList gigsList={gigsList} shownGigs={shownGigs} />
              )}
            {searchResults && <SearchResults searchResults={searchResults} />}
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
