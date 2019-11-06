import React, { useRef, useEffect, useState } from "react";
import WorkItem from "./WorkItem";
import Hammer from "hammerjs";

// const Helper = ({ sliderPosition }) => {
//   return (
//     <div className="helper">
//       <div>Xpos: {sliderPosition.x}</div>
//       <div>lastPosX: {sliderPosition._x}</div>
//       <div>Dragging: {sliderPosition.isDragging && "isDragging"}</div>
//       <div>
//         Decelerating: {sliderPosition.isDecelerating && "isDecelerating"}
//       </div>
//       <div>Drag Direction: {sliderPosition.dragDirection}</div>
//     </div>
//   );
// };

const WorkList = ({ items }) => {
  let pageWidth = 0;
  if (typeof window !== `undefined`) {
    pageWidth = window.innerWidth;
  }

  const buffer = 0.2 * pageWidth;
  const sliderRef = useRef(null);
  const [sliderPosition, setSliderPositon] = useState({
    isDragging: false,
    isDecelerating: false,
    dragDirection: 0,
    dragVelocity: 0,
    _x: buffer, // previousX
    x: buffer
  });

  useEffect(() => {
    const newHammer = Hammer(sliderRef.current);
    let isDragging = false;
    let isDecelerating = false;
    let lastPosX = 0;
    const sliderLength = sliderRef.current.getBoundingClientRect().width;
    const xMin = -sliderLength + window.innerWidth - buffer;
    const xMax = buffer;

    newHammer.on("pan", e =>
      setSliderPositon(sliderPosition => {
        if (sliderPosition.isDecelerating) {
          return sliderPosition;
        }
        if (!sliderPosition.isDragging) {
          isDragging = true;
          lastPosX = sliderPosition._x;
        }

        let posX = e.deltaX + lastPosX;

        // Set limits for scroll
        if (posX > xMax) {
          posX = xMax;
        }
        const endOfPane = xMin;
        if (posX <= endOfPane) {
          posX = endOfPane;
        }

        if (e.isFinal) {
          isDragging = false;
          isDecelerating = true;
        }

        if (isDecelerating) {
          const updateInterval = 16;
          const scaleFactor = 200;

          const amplitude = e.overallVelocityX * scaleFactor;
          const targetPosition = posX + amplitude;
          const timestamp = Date.now();
          const timeConstant = 100;

          const ticker = setInterval(function() {
            var elapsed = Date.now() - timestamp;
            let position =
              targetPosition -
              parseInt(amplitude * Math.exp(-elapsed / timeConstant));

            // Set limits for scroll
            if (position > xMax) {
              position = xMax;
            }
            const endOfPane = xMin;
            if (position <= endOfPane) {
              position = endOfPane;
            }

            if (elapsed > 6 * timeConstant) {
              clearInterval(ticker);
              isDecelerating = false;
            }
            setSliderPositon({
              isDragging: isDragging,
              isDecelerating: isDecelerating,
              _x: position,
              x: position
            });
          }, updateInterval);
        }

        return {
          isDragging: isDragging,
          isDecelerating: isDecelerating,
          dragDirection: e.direction,
          _x: posX,
          x: posX
        };
      })
    );
  }, [sliderRef]);

  return (
    <>
      {/* <Helper sliderPosition={sliderPosition}></Helper> */}
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
