import React from "react";

import {
  GigSortingBox,
  Year,
  Reset,
  YearInputTrigger,
  CloseBox,
  YearInput,
  BoxContent,
  LoadingDotAnimation,
  GigCounterBox,
  GigCounter,
} from "./MapGigShorting.style";

interface Props {
  gigsCounting: boolean;
  isShortingBoxOpen: boolean;
  year: string | number | readonly string[] | undefined;
  setYear: (e: string | number | readonly string[] | undefined) => void;
  setIsShortingBoxOpen: (e: boolean) => void;
  setShownGigMarkers: (e: any) => void;
  setGigsCounting: (e: boolean) => void;
  gigsList: any;
  shownGigMarkers: any;
}

export const MapGigShorting: React.FC<Props> = ({
  gigsCounting,
  isShortingBoxOpen,
  year,
  setYear,
  setIsShortingBoxOpen,
  setShownGigMarkers,
  setGigsCounting,
  gigsList,
  shownGigMarkers,
}) => {
  const onYearInputChange = (e: any) => {
    if (!gigsCounting) {
      const filtered = gigsList?.filter((gig: any) =>
        gig.date.includes(e.target.value)
      );
      setYear(e.target.value);
      setShownGigMarkers([]);
      runAnimation(filtered);
      if (filtered && filtered[0]) {
        setGigsCounting(true);
      }
    }
  };

  let markerCountHelper: any = [];
  let markerItemCounter: number = 0;
  const runAnimation = (list: any) => {
    if (list && markerItemCounter < list.length) {
      markerCountHelper = markerCountHelper.concat(list[markerItemCounter]);
      setShownGigMarkers(markerCountHelper);
      setTimeout(() => {
        markerItemCounter++;
        runAnimation(list);
      }, 0);
    } else {
      setGigsCounting(false);
      markerCountHelper = [];
      markerItemCounter = 0;
    }
  };

  return (
    <>
      {isShortingBoxOpen && (
        <GigCounterBox>
          Total Count:{" "}
          <GigCounter
            onClick={() => {
              if (!gigsCounting) {
                setGigsCounting(true);
                setShownGigMarkers([]);

                markerCountHelper = [];
                markerItemCounter = 0;
                runAnimation(gigsList);
              }
            }}
          >
            {shownGigMarkers.length}
          </GigCounter>
        </GigCounterBox>
      )}

      <GigSortingBox isTriggered={isShortingBoxOpen}>
        {gigsCounting && (
          <LoadingDotAnimation>
            Counting Gigs In <span>{year}</span>
          </LoadingDotAnimation>
        )}
        {(!isShortingBoxOpen && (
          <YearInputTrigger
            title="Options"
            onClick={(e) => setIsShortingBoxOpen(true)}
          ></YearInputTrigger>
        )) || (
          <BoxContent>
            <Year>{(year === "" && "Year") || year}</Year>
            <YearInput
              gigsCounting={gigsCounting}
              value={(year && year) || ""}
              title="Set Year"
              type="range"
              min="2006"
              max="2022"
              onChange={(e) => {
                onYearInputChange(e);
              }}
            ></YearInput>
            {isShortingBoxOpen && year === "" && (
              <CloseBox
                title="Close"
                onClick={() => setIsShortingBoxOpen(false)}
              ></CloseBox>
            )}
            {year !== "" && (
              <Reset
                title="Reset"
                gigsCounting={gigsCounting}
                onClick={() => !gigsCounting && setYear("")}
              >
                Reset
              </Reset>
            )}
          </BoxContent>
        )}
      </GigSortingBox>
    </>
  );
};

export default MapGigShorting;
