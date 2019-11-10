import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import AppRichText from "../components/AppRichText";
import ReactPlayer from "react-player";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark, atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const codeExample = `
export function findClosestPoint(e, UI) {
    const mousepointX = (e.pageX - UI.appOffset.x);
    const mousepointY = (e.pageY - UI.appOffset.y);
    const pointDistance = 50;

    // create array of point distances from mouse cursor
    const distArray = UI.pathPoints.map((point, index) => {
        const distX = Math.abs(mousepointX - point.x);
        const distY = Math.abs(mousepointY - point.y);

        // use pythagoras to find the straight-line distance to the point
        const distZ = Math.sqrt((distX ** 2) + (distY ** 2));

        return {
            distZ,
            index,
        };
    });

    // sort in ascending order
    const sortedDistArray = distArray.sort((a, b) => a.distZ - b.distZ);

    // do not return a point if the mouse cursor is too far from the point
    if (sortedDistArray[1].distZ > pointDistance) {
        return false;
    }

    const closestIndex = sortedDistArray[1].index;

    return UI.pathPoints[closestIndex];
}                    `;

const WorkItem = ({ data: { prismicWorkItem } }) => {
  const { data } = prismicWorkItem;

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
      <>
        <div className="container">
          <div className="workpage-hero">
            <div className="row justify-content-lg-center align-items-center">
              <div className="workpage-hero__titlebox">
                <h1 className="heading00 workpage-hero__title">
                  {data.title.text}
                </h1>
                <div className="workpage-hero__agency">
                  <span className="paragraph02">At:</span>{" "}
                  <span className="paragraph03">{data.agency.text}</span>
                </div>
              </div>
              <div
                className="workpage-hero__box"
                style={{
                  backgroundColor: data.brand_color
                    ? data.brand_color.text
                    : "inherit"
                }}
              >
                <div className="heading00 workpage-hero__title text-color-white">
                  {data.title.text}
                </div>
                <div className="workpage-hero__client">
                  <span className="paragraph02 text-color-white">Client:</span>{" "}
                  <span className="paragraph03 text-color-white">
                    {data.client.text}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="workpage-skills">
            <div className="workpage-skills__color-block"></div>
            <div className="row align-items-end">
              <div className="col offset-3">
                <span className="paragraph02">Skills: </span>
                {data.skills.map(({ skill }, idx) => {
                  if (!skill) {
                    return false;
                  }
                  return (
                    <>
                      <div className="skillitem" key={`skill_${idx}`}>
                        {skill.document[0].data.skill_name.text}
                      </div>
                      {idx !== data.skills.length - 1 ? (
                        <span className="skillitem__divide">.</span>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </div>

          {/* <div className="row">
            <div className="col-10 offset-2">
              {data.body &&
                data.body.map((slice, i) => {
                  if (slice.slice_type === "text") {
                    return (
                      <AppRichText text={slice.primary.text}></AppRichText>
                    );
                  }
                  if (slice.slice_type === "video") {
                    return (
                      <ReactPlayer
                        url={slice.primary.video_url.text}
                        muted={true}
                        controls={false}
                        loop={true}
                        playing={true}
                      ></ReactPlayer>
                    );
                  }
                  if (slice.slice_type === "code") {
                    const string = codeExample.replace("\r\n", "\n");
                    return (
                      <>
                        {console.log(slice)}
                        <SyntaxHighlighter
                          wrapLines={true}
                          //   language={slice.code_type}
                          language="javascript"
                          style={atomDark}
                        >
                          {string}
                        </SyntaxHighlighter>
                      </>
                    );
                  }
                })}
            </div>
          </div> */}
        </div>
      </>
    </Layout>
  );
};

export default WorkItem;

export const pageQuery = graphql`
  query WorkItem($id: String!) {
    prismicWorkItem(id: { eq: $id }) {
      data {
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
                category {
                  document {
                    data {
                      skill_category {
                        text
                      }
                    }
                  }
                }
                skill_name {
                  text
                }
              }
            }
          }
        }
        body {
          ... on PrismicWorkItemBodyCode {
            slice_type
            primary {
              caption {
                text
              }
              content {
                text
                html
              }
              code_type
            }
          }
          ... on PrismicWorkItemBodyText {
            slice_type
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicWorkItemBodyVideo {
            slice_type
            primary {
              video_url {
                text
              }
              caption {
                html
              }
            }
          }
        }
      }
    }
  }
`;
