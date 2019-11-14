import React, { useEffect, useRef } from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import { transitionPage } from "../utils/animations";

const WorkLink = ({ children, to, ...props }) => {
  return (
    <TransitionLink
      activeClassName="worklink--active"
      className="worklink"
      partiallyActive={true}
      to={to}
      exit={{
        length: 1,
        trigger: ({ exit, node, e, entry }) => {
          transitionPage({ exit, node, e, entry, direction: "out" });
        }
      }}
      entry={{
        length: 0.35,
        delay: 1,
        trigger: ({ exit, node, e, entry }) => {
          transitionPage({ exit, node, e, entry, direction: "in" });
        }
      }}
      {...props}
    >
      {children}
    </TransitionLink>
  );
};

const WorkItem = ({ data, uid, sliderPosition }) => {
  return (
    <>
      <WorkLink to={`/work/${uid}`} className="work-item">
        <div className="work-item__shadow"></div>
        <div className="work-item__image-wrapper">
          <div
            className="work-item__image"
            style={{
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
      </WorkLink>
    </>
  );
};

export default WorkItem;
