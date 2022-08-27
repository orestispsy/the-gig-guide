import React from "react";
import ReactPlayer from "react-player";
import radioBroadcasts from "../../common/radioBroadcasts";
const { moveBack, moveForward } = require("./MixCloudPlayerUtils");

interface Props {
  top: number | string;
  left: number | string;
  setTop: (e: number) => void;
  setLeft: (e: number) => void;
  setPlayerPosition: (
    x: number,
    y: number,
    setTop: (e: number) => void,
    setLeft: (e: number) => void
  ) => void;
  setNightFlightProg: (e: any) => void;
  nightFlightProg: any;
}

export const MixCloudPlayer: React.FC<Props> = ({
  top,
  left,
  setLeft,
  setTop,
  setNightFlightProg,
  nightFlightProg,
  setPlayerPosition,
}) => {
  
  return (
    <div
      className="mixCloudPlayerControls"
      style={{
        top: top,
        left: left,
      }}
    >
      <div className="broadcastScroller">
        <div className="radioControlsSymbol">
          <div
            id="broadLeft"
            onClick={(e) => {
             moveBack(nightFlightProg,setNightFlightProg,radioBroadcasts)
            }}
          ></div>
          <div className="radioControls">prev</div>
        </div>
        <div className="radioControlsSymbol">
          <div
            id="broadRight"
            onClick={(e) => {
             moveForward(nightFlightProg, setNightFlightProg, radioBroadcasts);
            }}
          ></div>

          <div className="radioControls">next</div>
        </div>
        <div
          className="radioControlsSymbol"
          onClick={(e) => {
            setNightFlightProg(undefined);
          }}
        >
          <div id="broadClose">x</div>

          <div className="radioControls">close</div>
        </div>
      </div>
      <ReactPlayer
        url={nightFlightProg.href}
        controls
        config={{
          mixcloud: {
            options: {
              mini: true,
            },
          },
        }}
        id="mixCloudPlayer"
        width="100%"
        height="100%"
      />
      <div
        className="dragPlayer"
        draggable
        onDragCapture={(e: any) => {
          if (e.screenX > 0) {
            setPlayerPosition(e.clientY, e.clientX, setTop, setLeft);
          }
        }}
        onDragEndCapture={(e) => {
          setPlayerPosition(e.clientY, e.clientX, setTop, setLeft);
        }}
        onTouchStart={(e) => {
          setPlayerPosition(
            e.changedTouches[0].clientY,
            e.changedTouches[0].clientX,
            setTop,
            setLeft
          );
        }}
        onTouchMoveCapture={(e) => {
          setPlayerPosition(
            e.changedTouches[0].clientY,
            e.changedTouches[0].clientX,
            setTop,
            setLeft
          );
        }}
      ></div>
    </div>
  );
};
