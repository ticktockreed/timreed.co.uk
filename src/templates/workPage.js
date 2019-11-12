import React, { useRef, useState, useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { TransitionState } from "gatsby-plugin-transition-link";

import AppRichText from "../components/AppRichText";
import Intro from "../components/slices/Intro";
import ReactPlayer from "react-player";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark, atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const WorkItem = ({ data: { prismicWorkItem } }) => {
  const { data } = prismicWorkItem;
  const herobox = useRef(null);
  const [heroBoxPosition, setHeroBoxPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });

  useEffect(() => {
    setHeroBoxPosition(herobox.current.getBoundingClientRect());
  }, [herobox]);

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
      <TransitionState>
        {({ transitionStatus }) => {
          return (
            <>
              <div
                className="container workpage"
                style={{ opacity: transitionStatus === "entered" ? 1 : 0 }}
              >
                <div className="workpage-hero">
                  <div className="row justify-content-lg-center align-items-center">
                    <div className="workpage-hero__titlebox">
                      <h1 className="heading00 workpage-hero__title">
                        {data.title.text}
                      </h1>
                      <div className="workpage-hero__agency">
                        <span className="paragraph02 text-label mb-1">At:</span>{" "}
                        <span className="paragraph03">{data.agency.text}</span>
                      </div>
                    </div>
                    <div
                      className="workpage-hero__box"
                      ref={herobox}
                      style={{
                        backgroundColor: data.brand_color
                          ? data.brand_color.text
                          : "inherit",
                        clip: `rect(0px, 1140px, 580px, 300px)`
                      }}
                    >
                      <div className="heading00 workpage-hero__title text-color-white">
                        {data.title.text}
                      </div>
                      <div className="workpage-hero__client">
                        <span className="text-label mb-1 paragraph02 text-color-white">
                          For:
                        </span>{" "}
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
                    <div className="col offset-1 offset-md-3">
                      <span className="paragraph02 text-label mb-1">
                        Skills:{" "}
                      </span>
                      {data.skills.map(({ skill }, idx) => {
                        if (!skill) {
                          return false;
                        }
                        return (
                          <span key={`skill_${idx}`}>
                            <div className="skillitem">
                              {skill.document[0].data.skill_name.text}
                            </div>
                            {idx !== data.skills.length - 1 ? (
                              <span className="skillitem__divide">.</span>
                            ) : (
                              ""
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="slices">
                  {data.body &&
                    data.body.map((slice, i) => {
                      if (slice.slice_type === "intro") {
                        return (
                          <div className="row justify-content-center">
                            <div className="col-10 col-md-8">
                              <Intro slice={slice} idx={i}></Intro>
                            </div>
                          </div>
                        );
                      }
                      if (slice.slice_type === "text") {
                        return (
                          <div className="row justify-content-center textslice">
                            <div className="col-8 col-md-6">
                              <div className="textslice__color-block"></div>
                              <AppRichText
                                text={slice.primary.text}
                              ></AppRichText>
                            </div>
                          </div>
                        );
                      }
                      if (slice.slice_type === "spacer") {
                        return (
                          <div
                            className={`spacer--${slice.primary.spacer_size}`}
                          ></div>
                        );
                      }
                      if (slice.slice_type === "video") {
                        return (
                          <div className="row justify-content-center">
                            <div className="col-10 col-md-8">
                              <ReactPlayer
                                url={slice.primary.video_url.text}
                                muted={true}
                                controls={false}
                                loop={true}
                                playing={true}
                              ></ReactPlayer>
                            </div>
                          </div>
                        );
                      }
                      if (slice.slice_type === "code") {
                        return (
                          <div className="row justify-content-center">
                            <div className="col-10 col-md-8">
                              <SyntaxHighlighter
                                wrapLines={true}
                                language={slice.primary.code_type}
                                style={atomDark}
                              >
                                {slice.primary.content.text}
                              </SyntaxHighlighter>
                            </div>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
              <div
                className="workpage-hero__box-dummy"
                style={{
                  backgroundColor: data.brand_color
                    ? data.brand_color.text
                    : "inherit"
                }}
              />
            </>
          );
        }}
      </TransitionState>
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
          ... on PrismicWorkItemBodyIntro {
            slice_type
            primary {
              text {
                html
              }
            }
          }
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
