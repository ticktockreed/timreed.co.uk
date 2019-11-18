import React from "react";

const AppRichText = ({ text }) => {
  return (
    <div
      className="richtext"
      dangerouslySetInnerHTML={text.html && { __html: text.html }}
    ></div>
  );
};

export default AppRichText;
