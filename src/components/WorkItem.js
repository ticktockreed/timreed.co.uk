import React, { useEffect, useState, useRef } from "react";

const WorkItem = ({ data, uid }) => {
  const [mousePointer, setMousePointer] = useState({
    active: false,
    _x: 0,
    _y: 0,
    x: 0,
    y: 0
  });
  const workItemWrapper = useRef(null);

  useEffect(() => {
    console.log("onload");
  }, []);

  const handleMouseMove = (evt, workItemWrapper) => {
    const _x = workItemWrapper.offsetLeft + workItemWrapper.offsetWidth / 2;
    const _y = workItemWrapper.offsetTop + workItemWrapper.offsetHeight / 2;
    setMousePointer({
      active: true,
      _x,
      _y,
      x: evt.clientX - _x,
      y: evt.clientY - _y
    });
  };

  const handleMouseOut = evt => {
    const _x = workItemWrapper.offsetLeft + workItemWrapper.offsetWidth / 2;
    const _y = workItemWrapper.offsetTop + workItemWrapper.offsetHeight / 2;
    setMousePointer({
      active: false,
      _x,
      _y,
      x: evt.clientX - _x,
      y: evt.clientY - _y
    });
  };

  return (
    <>
      <div
        className="work-item"
        key={`work-item_${uid}`}
        onMouseLeave={handleMouseOut}
        onMouseMove={evt => handleMouseMove(evt, workItemWrapper.current)}
        ref={workItemWrapper}
      >
        <div
          style={{
            position: "fixed",
            display: mousePointer.active ? "block" : "none",
            right: 0,
            top: 0,
            backgroundColor: "rgba(0,0,0, 1)",
            padding: 10
          }}
        >
          X: {mousePointer.x}, Y: {mousePointer.y}
        </div>
        {/* work item */}
        {data.title.text}
        <img src={data.main_image.url} alt={data.main_image.alt} />
      </div>
      <div
        style={{
          position: "absolute",
          top: mousePointer._y,
          left: mousePointer._x,
          border: "solid 5px red"
        }}
      ></div>
    </>
  );
};

export default WorkItem;
