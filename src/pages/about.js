import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import AppRichText from "../components/AppRichText";

const AboutPage = ({ data: { prismicAbout } }) => {
  const {
    data: { body }
  } = prismicAbout;
  console.log(prismicAbout);

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
      <div class="container">
        <div className="row justify-content-lg-center  align-items-center hero">
          <div className="col-9 offset-2 offset-lg-0 col-lg-6">
            {/* <div dangerouslySetInnerHTML={{ __html: data.page_content.html }} /> */}
            <div className="richtext">
              <h2 className="heading01">About</h2>
            </div>
            {body.map((slice, i) => {
              if (slice.slice_type === "text") {
                return (
                  <div
                    className={slice.slice_type}
                    key={`${slice.slice_type}_${i}`}
                  >
                    <AppRichText text={slice.primary.text}></AppRichText>
                  </div>
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
          slice_type
          primary {
            text {
              html
              text
            }
          }
        }
      }
    }
  }
`;
