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
        <h1>{data.title.text}</h1>
        {/* 
      <div dangerouslySetInnerHTML={{ __html: data.content.html }} /> */}
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
      }
    }
  }
`;
