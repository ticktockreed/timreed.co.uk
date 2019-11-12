import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import AppRichText from "../components/AppRichText";
import ImageGrid from "../components/ImageGrid";

const AboutPage = ({
  data: { prismicAbout },
  transitionStatus,
  entry,
  exit
}) => {
  const {
    data: { body }
  } = prismicAbout;

  console.log(body);
  return (
    <Layout className={`${transitionStatus}`}>
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
      <div className={`container`}>
        <div className="row justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <div className="richtext">
              <h1 className="heading01">About</h1>
            </div>
          </div>
        </div>
        {body.map((slice, idx) => {
          if (slice.slice_type === "text") {
            return (
              <div className="row justify-content-center align-items-center">
                <div className="col-10 col-md-8 col-lg-6">
                  <div
                    className={slice.slice_type}
                    key={`${slice.slice_type}_${idx}`}
                  >
                    <AppRichText text={slice.primary.text}></AppRichText>
                  </div>
                </div>
              </div>
            );
          }
          if (slice.slice_type === "spacer") {
            return (
              <div className={`spacer--${slice.primary.spacer_size}`}></div>
            );
          }
          if (slice.slice_type === "image_grid") {
            return (
              <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-10 col-lg-8">
                  <ImageGrid
                    slice={slice}
                    idx={idx}
                    key={`slice__${idx}`}
                  ></ImageGrid>
                </div>
              </div>
            );
          }
        })}
      </div>
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query {
    prismicAbout {
      data {
        body {
          __typename
          ... on PrismicAboutBodyText {
            slice_type
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicAboutBodySpacer {
            slice_type
            id
            primary {
              spacer_size
            }
          }
          ... on PrismicAboutBodyImageGrid {
            slice_type
            id
            primary {
              title {
                text
              }
            }
            items {
              image {
                dimensions {
                  height
                  width
                }
                url
                alt
              }
            }
          }
        }
      }
    }
  }
`;
