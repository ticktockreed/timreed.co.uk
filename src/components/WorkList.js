import React, { useRef, useEffect, useState } from "react";
import WorkItem from "./WorkItem";

const WorkList = ({ items }) => {
  return (
    <div className="row worklist justify-content-center">
      {items.map(({ work_item }, idx) => {
        if (!work_item) {
          return false;
        }

        const { data, uid } = work_item.document[0];

        return (
          <div
            className={`worklist-item worklist_${idx}`}
            key={`workItem__${idx}`}
          >
            <WorkItem data={data} uid={uid}></WorkItem>
          </div>
        );
      })}
    </div>
  );
};

export default WorkList;
