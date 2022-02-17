import React, { useState, useEffect } from "react";
import axios from "../../common/Axios/axios";

interface Props {
  setSelectedPoster: (e: any) => void;
}

export const Posters: React.FC<Props> = ({ setSelectedPoster }) => {
  const [posters, setPosters] = useState<any>(null);

  useEffect(function () {
    axios
      .get("/get-images")
      .then(({ data }) => {
        setPosters(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="posterEdit">
      {posters &&
        posters.rows.map((poster: any) => (
          <img
            title={poster.poster || ""}
            src={poster.poster}
            key={poster.id}
            className="posterEditPreview"
            onClick={(e) => setSelectedPoster(poster.poster)}
          ></img>
        ))}
    </div>
  );
};
