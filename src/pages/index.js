import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";

// import AnimationExample from "../components/AnimationExample";
// import ChartExample from "../components/ChartExample";
import AnimationExample from "../components/AnimationExample";
import Logomask from "../images/Logomask.svg";
import ImageGrid from "../components/ImageGrid";

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
      <div className="container"></div>
      <div className="container">
        <div className="hero">
          <div className="row justify-content-lg-center text-right">
            <div className="col-9 offset-2 offset-lg-0 col-lg-10">
              <div className="logomask__wrapper">
                <div className="logomask__tilt">
                  <AnimationExample
                    name="logo-anim"
                    className="logo-anim"
                    background="#111"
                    pause={false}
                  />
                  <Logomask
                    className="logomask"
                    preserveAspectRatio="xMinYMin slice"
                  ></Logomask>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-lg-center">
            <div className="col-9 offset-2 offset-lg-0 col-lg-8">
              <div className="richtext">
                <h2>
                  Welcome to the portfolio of <br />
                  Tim Reed, <span className="text-red">Creative Developer</span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row justify-content-lg-center">
          <div className="col-9 offset-2 offset-lg-0 col-lg-8 ">
            {data.body.map((slice, i) => {
              if (slice.slice_type === "image_grid") {
                return <ImageGrid slice={slice} idx={i}></ImageGrid>;
              }
            })}
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    prismicLandingPage {
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
        body {
          slice_type
          primary {
            title {
              text
            }
          }
          items {
            image {
              url
              copyright
              dimensions {
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;
