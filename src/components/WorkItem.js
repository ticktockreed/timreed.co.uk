import React, { useState, useRef } from "react";

const WorkItem = ({ data, uid }) => {
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

    updateRotateDeg(inner, mousePointer);

    // set cursor position from center
    const x = evt.pageX - mouseOrigin.x;
    const y = (evt.pageY - mouseOrigin.y) * -1;

    setMousePointer({
      active: true,
      x,
      y
    });
  };

  const handleMouseMove = (evt, container, inner) => {
    updateMousePosition(evt, container, inner);
  };

  //   const handleMouseLeave = () => {
  //     setMousePointer({
  //       ...mousePointer,
  //       ...{ active: false, rotateX: 0, rotateY: 0 }
  //     });
  //   };

  return (
    <>
      <div
        className="work-item"
        key={`work-item_${uid}`}
        onMouseEnter={evt =>
          handleMouseMove(evt, container.current, inner.current)
        }
        // onMouseLeave={handleMouseLeave}
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
            transform: `rotateX(${rotateDeg.x}deg) rotateY(${rotateDeg.y}deg) translate3d(0, -30px, 30px`
          }}
        >
          {data.title.text}
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
    </>
  );
};

export default WorkItem;
