import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";

import AnimatedLogo from "../components/AnimatedLogo";
// import ChartExample from "../components/ChartExample";
// import AnimationExample from "../components/AnimationExample";

let chartData = [];

function mockData(variance) {
  let gaussian = x => {
    let mean = 0;
    return (
      (1 / Math.sqrt(2 * Math.PI * variance)) *
      Math.exp((-(x - mean) * (x - mean)) / (2 * variance))
    );
  };

  chartData = [];
  for (let i = -5; i < 5; i += 0.1) {
    chartData.push(gaussian(i));
  }
}

const IndexPage = ({ data: { prismicLandingPage } }) => {
  const { data } = prismicLandingPage;
  const [variance] = useState(0.2);
  // const [paused, pauseAnimation] = useState(false);

  useEffect(() => {
    mockData(variance);
  }, [variance]);

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
        {/* <ChartExample
          name="pts_chart"
          background="#0c9"
          play={false}
          data={chartData}
          variance={variance}
        ></ChartExample>

        <AnimationExample
          name="pts_anim"
          background="#fe3"
          pause={pauseAnimation}
        /> */}

        <AnimatedLogo name="logo_anim" background="#111" />

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
