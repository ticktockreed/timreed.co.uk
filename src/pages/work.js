import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import WorkItem from "../components/WorkItem";
import Slider from "react-slick";
import WorkList from "../components/WorkList";

const WorkPage = ({ data: { prismicWork } }) => {
  const { data } = prismicWork;
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    centerMode: true,
    slidesToScroll: 1
  };
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
      <div className="row justify-content-lg-center">
        <div
          className="col-9 offset-2 offset-lg-0 col-lg-6"
          style={{ position: "static" }}
        >
          <div className="richtext">
            {/* <div dangerouslySetInnerHTML={{ __html: data.page_content.html }} /> */}
          </div>
        </div>
      </div>
      <WorkList items={data.body[0].items}></WorkList>
    </Layout>
  );
};

export default WorkPage;

export const pageQuery = graphql`
  query {
    prismicWork {
      data {
        body {
          slice_type
          items {
            work_item {
              document {
                data {
                  main_image {
                    url
                    alt
                    dimensions {
                      height
                      width
                    }
                  }
                  title {
                    text
                  }
                }
                uid
              }
            }
          }
        }
      }
    }
  }
`;
