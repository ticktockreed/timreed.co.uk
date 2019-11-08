import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import Make3d from "../components/Make3d";

// import AnimationExample from "../components/AnimationExample";
// import ChartExample from "../components/ChartExample";
import AnimationExample from "../components/AnimationExample";
import Logomask from "../images/Logomask.svg";
import ImageGrid from "../components/ImageGrid";

const IndexPage = ({ data: { prismicLandingPage } }) => {
  const { data } = prismicLandingPage;
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

      <div className="container">
        <div className="row justify-content-lg-center align-items-center hero">
          <div className="logomask__wrapper">
            <div className="logomask__tilt">
              <Make3d>
                <>
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
                </>
              </Make3d>
            </div>
          </div>
          <div className="col-9 offset-2 offset-lg-0 col-lg-8">
            <div className="hero__content">
              <div className="richtext">
                <h2>
                  Welcome to the portfolio of <br />
                  Tim Reed, <span className="text-red">Creative Developer</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-lg-center">
          <div className="col-9 offset-2 offset-lg-0 col-lg-8 ">
            {data.body.map((slice, idx) => {
              if (slice.slice_type === "image_grid") {
                return (
                  <ImageGrid
                    slice={slice}
                    idx={idx}
                    key={`slice__${idx}`}
                  ></ImageGrid>
                );
              }
            })}
          </div>
        </div>
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
