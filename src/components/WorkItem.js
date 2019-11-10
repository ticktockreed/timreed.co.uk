import React, { useState, useRef, useEffect } from "react";
import { Link } from "gatsby";

const WorkItem = ({ data, uid, sliderPosition }) => {
  return (
    <>
      <Link to={`work/${uid}`} className="work-item" key={`work-item_${uid}`}>
        <div className="work-item__shadow"></div>
        <div className="work-item__image-wrapper">
          <div
            className="work-item__image"
            style={{
              // backgroundImage: `url("${data.main_image.url}")`
              backgroundColor: data.brand_color.text
            }}
          ></div>
          <div className="work-item__info">
            <div className="work-item__title">{data.title.text}</div>
            {/* <div className="work-item__skills">
              {data.skills.map(({ skill }, idx) => {
                if (!skill) {
                  return false;
                }
                return (
                  <div className="skillitem" key={`skill_${idx}`}>
                    {skill.document[0].data.skill_name.text}
                  </div>
                );
              })}
            </div> */}
          </div>
        </div>
      </Link>
      {/* <div
        className="work-item__center-dot"
        style={{
          // display: mousePointer.active ? "block" : "none",
          top: mouseOrigin.y,
          left: mouseOrigin.x,
          zIndex: 10000
        }}
      ></div> */}
    </>
  );
};

export default WorkItem;
