import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";

const IndexPage = ({ data: { prismicWork } }) => {
  const { data } = prismicWork;

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
      <div className="row justify-content-center">
        <div className="col-10 col-lg-6">
          <div className="richtext">
            {console.log("data.body[0].items)", data.body[0].items)}

            {data.body[0].items.map(({ work_item }) => {
              if (!work_item) {
                return false;
              }

              const { data, uid } = work_item.document[0];
              return (
                <div className="work-item" key={`work-item_${uid}`}>
                  {/* work item */}
                  {data.title.text}
                  <img src={data.main_image.url} alt={data.main_image.alt} />
                </div>
              );
            })}
            {/* <div dangerouslySetInnerHTML={{ __html: data.page_content.html }} /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

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
