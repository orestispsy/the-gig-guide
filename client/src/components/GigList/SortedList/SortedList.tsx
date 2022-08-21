import React from "react";
import { Link } from "react-router-dom";
interface Props {
  months: any;
  sortedMonths: any;
  sortedGigs: any;
  year: string | number | readonly string[] | undefined;
  setYear: (e: string | number | readonly string[] | undefined) => void;
}

export const SortedList: React.FC<Props> = ({
  months,
  sortedGigs,
  sortedMonths,
  setYear,
  year,
}) => {
  return (
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
  );
};
