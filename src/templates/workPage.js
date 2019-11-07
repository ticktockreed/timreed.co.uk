import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const WorkItem = ({ data: { prismicWorkItem } }) => {
  const { data } = prismicWorkItem;

  console.log("props", data);
  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[
          `Tim Reed`,
          `web developer`,
          `web designer`,
          `react`,
          `gatsby`
        ]}
      />
      <>
        <div className="container">
          <div className="row justify-content-lg-center align-items-center hero">
            <h1>{data.title.text}</h1>
            {/* {data.body.map((slice, i) => {
              if (slice.slice_type === "text") {
                console.log(slice);
                return (
                  <div
                  // dangerouslySetInnerHTML={{ __html: slice.html }}
                  />
                );
              }
            })} */}
          </div>
        </div>
      </>
    </Layout>
  );
};

export default WorkItem;

export const pageQuery = graphql`
  query WorkItem($id: String!) {
    prismicWorkItem(id: { eq: $id }) {
      data {
        title {
          text
        }
        body {
          ... on PrismicWorkItemBodyText {
            slice_type
            primary {
              text {
                html
              }
            }
          }
        }
      }
    }
  }
`;
