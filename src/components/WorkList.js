import React, { useRef, useEffect, useState } from "react";
import WorkItem from "./WorkItem";

const WorkList = ({ items }) => {
  return (
    <div className="row justify-content-lg-center worklist">
      {items.map(({ work_item }) => {
        if (!work_item) {
          return false;
        }

        const { data, uid } = work_item.document[0];
        return (
          <div className="col-6">
            <WorkItem data={data} uid={uid} key={`workItem__${uid}`}></WorkItem>
          </div>
        );
      })}
    </div>
  );
};

export default WorkList;
