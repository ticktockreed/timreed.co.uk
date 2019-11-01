import React from "react";
import { RichText } from "prismic-reactjs";

import { linkResolver } from "../utils/linkResolver";

console.log(RichText.asHtml);

const AppRichText = ({ text }) => {
  return (
    <div
      className="richtext"
      // dangerouslySetInnerHTML={{ __html: text.html }}
    >
      {RichText.render(text.raw, linkResolver)}
    </div>
  );
};

export default AppRichText;
