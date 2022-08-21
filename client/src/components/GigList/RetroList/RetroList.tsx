import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
interface Props {
  reverseList: boolean;
  setReverseList: (e: boolean) => void;
  gigsList: any;
}

const { dateModifier } = require("./../GigListUtils");

export const RetroList: React.FC<Props> = ({
  reverseList,
  setReverseList,
  gigsList,
}) => {
  const retroListRef = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      if (retroListRef.current) {
        retroListRef.current.scrollTop = -retroListRef.current.scrollHeight;
      }
    },
    [reverseList]
  );
  return (
    <>
      <div className="retroListHead">
        <div className="retroTitle">Gig Entries</div>
      </div>
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
    </>
  );
};
