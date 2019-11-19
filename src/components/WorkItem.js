import React, { useEffect, useRef, useState } from 'react';
import TransitionLink from 'gatsby-plugin-transition-link';
import { transitionToWorkPage, workItemHover } from '../utils/animations';

const WorkLink = ({ children, to, brand_color, ...props }) => {
  return (
    <TransitionLink
      activeClassName="worklink--active"
      className="worklink"
      partiallyActive={true}
      to={to}
      entry={{
        length: 1.5,
        delay: 1.5
      }}
      exit={{
        length: 1.5
      }}
      trigger={async (pages) => {
        const exit = await pages.exit;

        // Collect animateable elements
        const workItems = [].slice.call(exit.node.querySelectorAll('.work-item'));
        const activeWorkItem = exit.node.querySelector('.worklink--active');
        const exitDummy = exit.node.querySelector('.work-item__dummy');

        // Get measureable elements
        const activeItemPosition = activeWorkItem.getBoundingClientRect();

        transitionToWorkPage({
          direction: 'out',
          brand_color,
          activeWorkItem,
          activeItemPosition,
          exitDummy,
          workItems
        });

        const entry = await pages.entry;

        const entryDummy = entry.node.querySelector('.workpage-hero__box-dummy');
        const workPage = entry.node.querySelector('.workpage');
        workPage.style.opacity = 0;
        // start exit animation based on measurements if you want
        // wait for the entering page to become visible
        await entry.visible;

        transitionToWorkPage({
          direction: 'in',
          brand_color,
          activeItemPosition,
          exitDummy,
          entryDummy,
          workPage
        });
        // the entering page is visible here.
        // if you want you can animate it now!
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
