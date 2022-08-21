import React from "react";
import { Link } from "react-router-dom";
interface Props {
  gigsList: any;
  shownGigs: any;
}
const { dateModifier } = require("./../GigListUtils");

export const FullList: React.FC<Props> = ({ gigsList, shownGigs }) => {
  return (
    <>
      {gigsList &&
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
    </>
  );
};
