import React from "react";

interface Props {
  year: string | number | readonly string[] | undefined;
  setYear: (e: string | number | readonly string[] | undefined) => void;
  searchResults: any;
  setSearchResults: (e: any) => void;
  setSearchFieldOpen: (e: boolean) => void;
  searchFieldOpen: boolean;
  gigsList: any;
  setSortedGigs: (e: any) => void;
  setSortedMonths: (e: any) => void;
  sortedGigs: any;
}

const { gigListFiltering, gigFinder, gigsReset } = require("./../GigListUtils");

export const GigListTopBar: React.FC<Props> = ({
  year,
  setYear,
  searchFieldOpen,
  searchResults,
  setSearchFieldOpen,
  setSearchResults,
  setSortedGigs,
  setSortedMonths,
  gigsList,
  sortedGigs,
}) => {
  return (
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
              gigListFiltering(
                e.target.value,
                gigsList,
                setSortedGigs,
                setSortedMonths
              );
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
              gigsReset(
                setYear,
                setSortedGigs,
                setSearchResults,
                setSearchFieldOpen
              );
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
            onChange={(e) => gigFinder(e.target.value, setSearchResults)}
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
        {!searchResults && !searchFieldOpen && sortedGigs && sortedGigs.length}
        {(searchFieldOpen && !searchResults.length && "0") ||
          searchResults.length}
      </div>
    </div>
  );
};
