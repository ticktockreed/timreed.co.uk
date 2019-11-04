import React, { useRef, useEffect, useState } from "react";
import WorkItem from "./WorkItem";
import Hammer from "hammerjs";

const WorkList = ({ items }) => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [status, setStatus] = useState("just here");
  const [blockText, setBlockText] = useState("I'm a slider");
  const [sliderPosition, setSliderPositon] = useState({
    isDragging: false,
    x: 0
  });

  useEffect(() => {
    const newHammer = Hammer(containerRef.current);
    newHammer.add(
      new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 })
    );
    newHammer.on("pan", handleDrag);

    // poor choice here, but to keep it simple
    // setting up a few vars to keep track of things.
    // at issue is these values need to be encapsulated
    // in some scope other than global.
    let lastPosX = 0;

    let isDragging = false;
    function handleDrag(ev) {
      // for convience, let's get a reference to our object
      let elem = sliderRef.current;

      // DRAG STARTED
      // here, let's snag the current position
      // and keep track of the fact that we're dragging
      if (!isDragging) {
        isDragging = true;
        lastPosX = elem.offsetLeft;

        setStatus("You, sir, are dragging me...");

        setBlockText("WOAH");
      }

      // we simply need to determine where the x,y of this
      // object is relative to where it's "last" known position is
      // NOTE:
      //    deltaX and deltaY are cumulative
      // Thus we need to always calculate 'real x and y' relative
      // to the "lastPosX/Y"
      let posX = ev.deltaX + lastPosX;

      // move our element to that position
      elem.style.left = posX + "px";

      // DRAG ENDED
      // this is where we simply forget we are dragging
      if (ev.isFinal) {
        isDragging = false;
        setStatus("Much better. It's nice here.");
        setBlockText("Thanks");
      }
    }
  }, [sliderRef]);

  return (
    <div className="work-items" ref={containerRef}>
      <div className="helper">
        <div>Xpos: {sliderPosition.x}</div>
        <div>Dragging: {sliderPosition.isDragging && "isDragging"}</div>
        <div>status: {status}</div>
        <div>blockText: {blockText}</div>
      </div>

      <div className="work-items__slider" ref={sliderRef}>
        {items.map(({ work_item }) => {
          if (!work_item) {
            return false;
          }

          const { data, uid } = work_item.document[0];
          return (
            <WorkItem data={data} uid={uid} key={`workItem__${uid}`}></WorkItem>
          );
        })}
      </div>
    </div>
  );
};

export default WorkList;
