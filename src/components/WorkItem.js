import React, { useEffect, useRef } from 'react';
import TransitionLink from 'gatsby-plugin-transition-link';
import { transitionToWorkPage } from '../utils/animations';

const WorkLink = ({ children, to, brand_color, ...props }) => {
  return (
    <TransitionLink
      activeClassName="worklink--active"
      className="worklink"
      partiallyActive={true}
      to={to}
      entry={{
        length: 2,
        delay: 5,
        trigger: ({ exit, node, e, entry }) => {
          transitionToWorkPage({ exit, node, e, entry, direction: 'in', brand_color });
        }
      }}
      exit={{
        length: 5,
        trigger: ({ exit, node, e, entry }) => {
          transitionToWorkPage({ exit, node, e, entry, direction: 'out', brand_color });
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
      <WorkLink to={`/work/${uid}`} className="work-item" brand_color={data.brand_color.text}>
        <div className="work-item__shadow"></div>
        <div className="work-item__wrapper">
          <div
            className="work-item__block"
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
