import React, { useRef, useEffect, useState } from "react";
import WorkItem from "./WorkItem";
import Hammer from "hammerjs";
import { WSAEINVALIDPROVIDER } from "constants";

function decelerate(startDist, velocity) {
  console.log("decelerate");
}

const WorkList = ({ items }) => {
  const sliderRef = useRef(null);
  const [sliderPosition, setSliderPositon] = useState({
    isDragging: false,
    _x: 0, // previousX
    x: 0
  });

  useEffect(() => {
    const newHammer = Hammer(sliderRef.current);
    let isDragging = false;
    let lastPosX = 0;

    newHammer.on("pan", e =>
      setSliderPositon(sliderPosition => {
        const sliderLength = sliderRef.current.getBoundingClientRect().width;

        if (!sliderPosition.isDragging) {
          isDragging = true;
          lastPosX = sliderPosition._x;
        }

        let posX = e.deltaX + lastPosX;

        // Set limits for scroll
        if (posX > 0) {
          posX = 0;
        }
        const endOfPane = -sliderLength + window.innerWidth;
        if (posX <= endOfPane) {
          posX = endOfPane;
        }

        if (e.isFinal) {
          isDragging = false;
        }

        console.log(e);
        return {
          isDragging: isDragging,
          _x: posX,
          x: posX
        };
      })
    );
  }, [sliderRef]);

  return (
    <>
      <div className="helper">
        <div>Xpos: {sliderPosition.x}</div>
        <div>lastPosX: {sliderPosition._x}</div>
        <div>Dragging: {sliderPosition.isDragging && "isDragging"}</div>
      </div>
      <div className="work-items">
        <div
          className="work-items__slider"
          ref={sliderRef}
          style={{
            transform: `translate3d(${sliderPosition.x}px,0,0)`
          }}
        >
          {items.map(({ work_item }) => {
            if (!work_item) {
              return false;
            }

            const { data, uid } = work_item.document[0];
            return (
              <WorkItem
                data={data}
                uid={uid}
                sliderPosition={sliderPosition}
                key={`workItem__${uid}`}
              ></WorkItem>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WorkList;
