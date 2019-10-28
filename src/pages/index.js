import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";

import AnimatedCanvas from "../components/AnimatedCanvas";

let chartData = [];

function mockData(variance) {
  let gaussian = x => {
    let mean = 0;
    return (
      (1 / Math.sqrt(2 * Math.PI * variance)) *
      Math.exp((-(x - mean) * (x - mean)) / (2 * variance))
    );
  };

  for (let i = -5; i < 5; i += 0.1) {
    chartData.push(gaussian(i));
  }
}

const IndexPage = ({ data: { prismicLandingPage } }) => {
  let [variance, setVariance] = useState(0.2);
  const { data } = prismicLandingPage;

  useEffect(() => {
    mockData(variance);
  }, []);

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

        <AnimatedCanvas
          name="pts_chart"
          background="#0c9"
          play={false}
          data={chartData}
          variance={variance}
        ></AnimatedCanvas>

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
