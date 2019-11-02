import React, { useState, useRef } from "react";

const WorkItem = ({ data, uid }) => {
  const [mousePointer, setMousePointer] = useState({
    active: false,
    _x: 0,
    _y: 0,
    x: 0,
    y: 0
  });
  const workItemWrapper = useRef(null);
  const inner = useRef(null);

  const handleMouseMove = (evt, workItemWrapper, inner) => {
    // debugger;

    const _x = workItemWrapper.offsetLeft + workItemWrapper.offsetWidth / 2;
    const _y = workItemWrapper.offsetTop + workItemWrapper.offsetHeight / 2;
    const x = evt.pageX - _x;
    const y = evt.pageY - _y;

    const rotateX = (x / (inner.offsetWidth / 4)).toFixed(2);
    const rotateY = (y / (inner.offsetHeight / 4)).toFixed(2);

    setMousePointer({
      active: true,
      _x,
      _y,
      x,
      y,
      rotateX,
      rotateY
    });
  };

  const handleMouseOut = () => {
    setMousePointer({
      active: false,
      _x: 0,
      _y: 0,
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0
    });
  };

  return (
    <>
      <div
        className="work-item"
        key={`work-item_${uid}`}
        onMouseLeave={handleMouseOut}
        onMouseMove={evt =>
          handleMouseMove(evt, workItemWrapper.current, inner.current)
        }
        ref={workItemWrapper}
      >
        <div
          className="work-item__image-wrapper"
          ref={inner}
          style={{
            transform: `rotateX(${mousePointer.rotateX}deg) rotateY(${mousePointer.rotateY}deg)`,
            backgroundImage: `url("${data.main_image.url}")`
          }}
        ></div>
        <div
          className="work-item__title"
          style={{
            transform: `rotateX(${mousePointer.rotateX}deg) rotateY(${mousePointer.rotateY}deg) translate3d(0, -30px, 30px`
          }}
        >
          {data.title.text}
        </div>
        <div
          className="work-item__center-dot"
          style={{
            // display: mousePointer.active ? "block" : "none",
            top: mousePointer._y,
            left: mousePointer._x,
            zIndex: 10000
          }}
        ></div>
      </div>
    </>
  );
};

export default WorkItem;
