import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

import { graphql } from "gatsby";

const IndexPage = ({ data: { prismicLandingPage } }) => {
  const { data } = prismicLandingPage;
  console.log("data", data);
  return (
    <Layout>
      <SEO
        title={data.meta_title.text}
        keywords={[
          `Tim Reed`,
          `web developer`,
          `web designer`,
          `react`,
          `gatsby`
        ]}
      />
      <div>
        <h1>{data.page_title.text}</h1>
        <p>{data.page_intro.text}</p>

        <div dangerouslySetInnerHTML={{ __html: data.page_content.html }} />
      </div>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    prismicLandingPage(uid: {}, data: {}) {
      prismicId
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
          html
        }
      }
    }
  }
`;
