import React, { useEffect } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";

import AnimatedLogo from "../components/AnimatedLogo";

const IndexPage = ({ data: { prismicLandingPage } }) => {
  const { data } = prismicLandingPage;

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
        <AnimatedLogo></AnimatedLogo>

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
