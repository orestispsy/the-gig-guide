import React, { useEffect, useState } from "react";
import axios from "../../../common/Axios/axios";

interface Props {
  dateTimeHandler: (e: string) => void;
  superAdmin: boolean;
}

export const TimelineUpdates: React.FC<Props> = ({
  dateTimeHandler,
  superAdmin,
}) => {
  const [updateEditor, setUpdateEditor] = useState<boolean>(false);
  const [updateText, setUpdateText] = useState<string>("");
  const [updatesList, setUpdatesList] = useState<any>();
  useEffect(function () {
    axios
      .get("/get-updates")
      .then(({ data }) => {
        setUpdatesList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveUpdate = () => {
    if (updateText.trim() !== "") {
      axios
        .post("/add-update", { update: updateText })
        .then(({ data }) => {
          setUpdateText("");
          setUpdatesList(data.data.concat(updatesList));
          setUpdateEditor(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteUpdate = (e: number) => {
    axios
      .post("/delete-update", { id: e })
      .then(({ data }) => {
        setUpdatesList(updatesList.filter((item: any) => item.id !== e));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="updatesContainer">
      {superAdmin && (
        <div
          className="updatesConfigBox"
          style={{ justifyContent: (updateEditor && "center") || "" }}
        >
          {!updateEditor && (
            <div
              title="Add Update"
              className="addUpdate"
              onClick={(e) => {
                setUpdateEditor(true);
              }}
            >
              +
            </div>
          )}
          {updateEditor && (
            <div
              title="Close Updates Box"
              className="closeUpdateEditor"
              onClick={(e) => {
                setUpdateEditor(false);
              }}
            >
              x
            </div>
          )}
          {updateEditor && (
            <textarea
              defaultValue={updateText || ""}
              placeholder="Insert Update"
              className="updatesTextArea"
              onChange={(e) => {
                setUpdateText(e.target.value);
              }}
            ></textarea>
          )}
          {updateEditor && (
            <div
              className="confirmUpdate"
              title="Confirm"
              onClick={(e) => {
                saveUpdate();
              }}
            >
              OK
            </div>
          )}
        </div>
      )}
      <div className="updatesList">
        {" "}
        {updatesList &&
          updatesList.map((update: any, index: number) => {
            return (
              <div className="updateItem" key={index}>
                <div className="updateItemDate">
                  Added: {dateTimeHandler(update.created_at)}
                </div>
                <div className="updateItemText">{update.update}</div>
                {superAdmin && (
                  <div
                    title="Delete Update"
                    className="removeUpdate"
                    onClick={(e) => {
                      deleteUpdate(update.id);
                    }}
                  >
                    -
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
