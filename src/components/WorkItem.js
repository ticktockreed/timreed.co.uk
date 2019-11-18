import React, { useEffect, useRef, useState } from 'react';
import TransitionLink from 'gatsby-plugin-transition-link';
import { transitionToWorkPage, workItemHover } from '../utils/animations';

const WorkLink = ({ children, to, brand_color, workItemRef, ...props }) => {
  return (
    <TransitionLink
      activeClassName="worklink--active"
      className="worklink"
      partiallyActive={true}
      to={to}
      entry={{
        length: 2,
        delay: 2,
        trigger: ({ exit, node, e, entry }) => {
          transitionToWorkPage({ exit, node, e, entry, direction: 'in', brand_color, workItemRef });
        }
      }}
      exit={{
        length: 2,
        trigger: ({ exit, node, e, entry }) => {
          transitionToWorkPage({ exit, node, e, entry, direction: 'out', brand_color, workItemRef });
        }
      }}
      {...props}
    >
      {children}
    </TransitionLink>
  );
};

const WorkItem = ({ data, uid, sliderPosition }) => {
  const workItemRef = useRef(null);
  const workItemTextRef = useRef(null);

  return (
    <WorkLink
      to={`/work/${uid}`}
      className="work-item"
      brand_color={data.brand_color.text}
      onMouseOver={(e) => workItemHover({ e, workItemTextRef, workItemRef })}
      workItemRef={workItemRef}
    >
      <div
        className="work-item__block"
        style={{
          backgroundColor: data.brand_color.text
        }}
        data-text={data.title.text}
        ref={workItemRef}
      ></div>
      <div className="work-item__info">
        <div className="work-item__text" ref={workItemTextRef}>
          {data.title.text}{' '}
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
  );
};

export default WorkItem;
