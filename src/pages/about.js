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
        <div className="row justify-content-lg-center  align-items-center hero">
          <div className="col-9 offset-2 offset-lg-0 col-lg-6">
            <div className="richtext">
              <h2 className="heading01">About</h2>
            </div>
            {body.map((slice, idx) => {
              if (slice.slice_type === "text") {
                return (
                  <div
                    className={slice.slice_type}
                    key={`${slice.slice_type}_${idx}`}
                  >
                    <AppRichText text={slice.primary.text}></AppRichText>
                  </div>
                );
              }
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
          ... on PrismicAboutBodyImageGrid {
            slice_type
            id
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
