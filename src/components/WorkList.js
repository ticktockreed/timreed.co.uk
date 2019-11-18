import React, { useRef, useEffect, useState } from 'react';
import WorkItem from './WorkItem';
import { animateWorkItems } from '../utils/animations';

const WorkList = ({ items }) => {
  let refArray = [];

  for (let i = 0; i <= items.length - 1; i++) {
    refArray.push(React.createRef());
  }

  let workItemRefs = useRef(refArray);

  useEffect(() => {
    const workItems = workItemRefs.current.map((item) => item.current);

    animateWorkItems({ workItems, direction: 'in' });
  }, [workItemRefs]);

  return (
    <div className="row worklist justify-content-center">
      {items.map(({ work_item }, idx) => {
        if (!work_item) {
          return false;
        }

        const { data, uid } = work_item.document[0];

        return (
          <div className={`worklist-item worklist_${idx}`} key={`workItem__${idx}`} ref={workItemRefs.current[idx]}>
            <WorkItem data={data} uid={uid}></WorkItem>
          </div>
        );
      })}
      <div className="work-item__dummy"></div>
    </div>
  );
};

export default WorkList;
