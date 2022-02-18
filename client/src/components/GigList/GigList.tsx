import { Link } from "react-router-dom";
import React, { useState, useEffect, Fragment, useRef } from "react";

interface Props {
  gigsList: any;
  setDarkMode: (e: boolean) => void;
  year: string | number | readonly string[] | undefined;
  setYear: (e: string | number | readonly string[] | undefined) => void;
}

export const GigList: React.FC<Props> = ({
  gigsList,
  setDarkMode,
  year,
  setYear,
}) => {
  const [sortedGigs, setSortedGigs] = useState<any>(false);
  const [sortedMonths, setSortedMonths] = useState<any>([]);
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

  useEffect(function () {
    setDarkMode(true);

    if (year) {
      gigListFiltering(year);
    }
  }, []);

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
  };

  return (
    <div
      className="gigListContainer"
      style={{
        marginTop: (year && `4vmax`) || "",
      }}
    >
      <div className="gigEntriesBox">
        <div id="gigListCloseTab">
          <Link to="/" className="buttonBack">
            X
          </Link>
        </div>
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
            reset
          </div>
        )}
        <div className="year"> {(year && year) || "Total"}</div>
      </div>
      <div className="gigEntriesCounter">
        {gigsList && !sortedGigs && gigsList.length}
        {sortedGigs && sortedGigs.length}
      </div>
      <div className="gigEntriesBack">
        {!year && <div className="latestEntries">Latest</div>}
        <div
          id={(!year && "gigEntries") || ""}
          className="gigEntries"
          style={{
            height: (year && `48vh`) || "",
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
          {sortedGigs && year && (
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
                                      <div className="gigBox">
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
                        textDecoration: `underline`,
                      }}
                    >
                      {gig.date}
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
      <Link to="/gig-list-animation" className="gigAnimationLink">
        Animate
      </Link>
    </div>
  );
};
