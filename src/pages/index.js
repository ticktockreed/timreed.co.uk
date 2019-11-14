import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import WorkList from "../components/WorkList";

const WorkPage = ({ data: { prismicWork } }) => {
  const { data } = prismicWork;
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimateIn(true);
    }, 0);
  }, []);

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
      <div className={`container ${animateIn ? "animate-in" : ""}`}>
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
      </div>
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
                    dimensions {
                      height
                      width
                    }
                    alt
                  }
                  title {
                    text
                  }
                  brand_color {
                    text
                  }
                  client {
                    text
                  }
                  agency {
                    text
                  }
                  skills {
                    skill {
                      document {
                        data {
                          skill_name {
                            text
                          }
                          category {
                            document {
                              data {
                                skill_category {
                                  text
                                }
                              }
                            }
                          }
                        }
                      }
                    }
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
