import React, { useState, useRef } from "react";

const WorkItem = ({ data, uid, sliderPosition }) => {
  const [mousePointer, setMousePointer] = useState({
    active: false,
    x: 0,
    y: 0
  });
  const [mouseOrigin, setMouseOrigin] = useState({
    x: 0,
    y: 0
  });
  const [rotateDeg, setRotateDeg] = useState({
    x: 0,
    y: 0
  });

  const container = useRef(null);
  const inner = useRef(null);

  const updateMouseOrigin = container => {
    setMouseOrigin({
      x: container.offsetLeft + Math.floor(container.offsetWidth / 2),
      y: container.offsetTop + Math.floor(container.offsetHeight / 2)
    });
  };

  const updateRotateDeg = inner => {
    // get the rotation angle for the transform (note X and Y are reversed)
    setRotateDeg({
      x: (mousePointer.y / (inner.offsetHeight / 2)).toFixed(2),
      y: (mousePointer.x / (inner.offsetWidth / 2)).toFixed(2)
    });
  };

  const updateMousePosition = (evt, container, inner) => {
    //   set origin position of card
    updateMouseOrigin(container);

    updateRotateDeg(container, mousePointer);

    // set cursor position from center
    const x = evt.clientX - sliderPosition.x - mouseOrigin.x;
    const y = (evt.clientY - mouseOrigin.y) * -1;

    setMousePointer({
      active: true,
      x,
      y
    });
  };

  const handleMouseMove = (evt, container, inner) => {
    updateMousePosition(evt, container, inner);
  };

  const handleMouseLeave = () => {
    setMousePointer({
      active: false,
      x: 0,
      y: 0
    });
    setRotateDeg({ x: 0, y: 0 });
  };

  return (
    <div className="work-item__wrapper">
      <div
        className="work-item"
        key={`work-item_${uid}`}
        onMouseEnter={evt =>
          handleMouseMove(evt, container.current, inner.current)
        }
        onMouseLeave={handleMouseLeave}
        onMouseMove={evt =>
          handleMouseMove(evt, container.current, inner.current)
        }
        ref={container}
      >
        <div
          className="work-item__image-wrapper"
          ref={inner}
          style={{
            transform: `rotateX(${rotateDeg.x}deg) rotateY(${rotateDeg.y}deg)`,
            backgroundImage: `url("${data.main_image.url}")`
          }}
        ></div>
        <div
          className="work-item__title"
          style={{
            transform: `rotateX(${rotateDeg.x}deg) rotateY(${rotateDeg.y}deg) translate3d(0, -60px, 20px`
          }}
        >
          {data.title.text}
        </div>
      </div>
      <div
        className="work-item__center-dot"
        style={{
          // display: mousePointer.active ? "block" : "none",
          top: mouseOrigin.y,
          left: mouseOrigin.x,
          zIndex: 10000
        }}
      ></div>
    </div>
  );
};

export default WorkItem;
