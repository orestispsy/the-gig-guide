import React from "react";
import { Link } from "react-router-dom";
interface Props {
  searchResults: any;
}

const { dateModifier } = require("./../GigListUtils");

export const SearchResults: React.FC<Props> = ({ searchResults }) => {
  return (
    <>
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
    </>
  );
};
