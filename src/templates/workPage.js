import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import AppRichText from "../components/AppRichText";

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
          </div>
          <div className="row">
            <div className="col-10 offset-2">
              {data.body &&
                data.body.map((slice, i) => {
                  if (slice.slice_type === "text") {
                    return (
                      <AppRichText text={slice.primary.text}></AppRichText>
                    );
                  }
                })}
            </div>
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
