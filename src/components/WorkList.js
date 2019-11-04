import React, { useRef, useEffect, useState } from "react";
import WorkItem from "./WorkItem";
import Hammer from "hammerjs";

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
        if (!sliderPosition.isDragging) {
          isDragging = true;
          lastPosX = sliderPosition._x;
        }

        let posX = e.deltaX + lastPosX;

        if (e.isFinal) {
          isDragging = false;
        }

        console.log(lastPosX);
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
