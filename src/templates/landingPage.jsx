import React from "react";
import { graphql } from "gatsby";

const Post = ({ data: { landingPage } }) => {
  const { data } = landingPage;
  console.log("data", data);
  return (
    <>
      <h1>{data.title.text}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content.html }} />
    </>
  );
};

export default Post;

export const pageQuery = graphql`
  query LandingPageByUid($uid: String!) {
    prismicLandingPage(uid: { eq: $uid }) {
      data {
        page_title {
          text
        }
        meta_title {
          text
        }
        page_intro {
          text
        }
        page_content {
          text
        }
      }
    }
  }
`;
