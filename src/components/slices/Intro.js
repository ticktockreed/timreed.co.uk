import React from "react";

const Intro = ({ slice, idx }) => {
  return (
    <div className="intro " key={`slice-intro_${idx}`}>
      <div
        className="pb-5"
        dangerouslySetInnerHTML={{ __html: slice.primary.text.html }}
      ></div>
    </div>
  );
};
export default Intro;
