import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";

// import AnimationExample from "../components/AnimationExample";
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
        title="Home"
        keywords={[
          `Tim Reed`,
          `web developer`,
          `web designer`,
          `react`,
          `gatsby`
        ]}
      />
      {/* <AnimationExample
        name="logo-anim"
        className="logo-anim"
        background="#111"
        pause={false}
      /> */}

      <div className="hero">
        <div className="row justify-content-center">
          <div className="col-10 col-lg-6 ">
            <div className="richtext">
              <h2>
                That sweet spot where design and development converge to give
                you a tickle of excitement
              </h2>
            </div>
          </div>
        </div>
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
