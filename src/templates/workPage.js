import React, { useRef, useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import { TransitionState } from 'gatsby-plugin-transition-link';

import { useMedia } from 'react-use';

import AppRichText from '../components/AppRichText';
import Intro from '../components/slices/Intro';
import ReactPlayer from 'react-player';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  coy
  // dark,
  // atomDark,
  // ghcolors,
  // xonokai
} from 'react-syntax-highlighter/dist/esm/styles/prism';

import { breakpoints } from '../utils/constants';

const WorkItem = ({ data: { prismicWorkItem } }) => {
  const { data } = prismicWorkItem;
  const isSmall = useMedia(`(min-width: ${breakpoints.sm}px)`);
  const isMedium = useMedia(`(min-width: ${breakpoints.md}px)`);
  const isLarge = useMedia(`(min-width: ${breakpoints.lg}px)`);

  const setClip = () => {
    let leftClip = 116;
    if (isSmall) {
      leftClip = 149;
    }
    if (isMedium) {
      leftClip = 200;
    }
    if (isLarge) {
      leftClip = 300;
    }
    return `rect(0px, 1140px, 580px, ${leftClip}px)`;
  };

  const sizeMap = {
    xs: 'col-6 col-md-3',
    sm: 'col-6 col-md-4',
    md: 'col-8 col-md-6',
    lg: 'col-10 col-md-8',
    xl: 'col-10 col-md-10'
  };

  return (
    <Layout>
      <SEO title="Home" keywords={[`Tim Reed`, `web developer`, `web designer`, `react`, `gatsby`]} />
      <TransitionState>
        {({ transitionStatus }) => {
          return (
            <>
              <div className="container workpage">
                <div className="workpage-hero">
                  <div className="row justify-content-lg-center align-items-center">
                    <div className="workpage-hero__titlebox">
                      <h1 className="heading00 workpage-hero__title">{data.title.text}</h1>
                      <div className="workpage-hero__agency">
                        <span className="paragraph02 text-label mb-1">At:</span>{' '}
                        <span className="paragraph03">{data.agency.text}</span>
                      </div>
                    </div>
                    <div
                      className="workpage-hero__box"
                      style={{
                        backgroundColor: data.brand_color ? data.brand_color.text : 'inherit',
                        clip: setClip()
                      }}
                    >
                      <div className="heading00 workpage-hero__title text-color-white">{data.title.text}</div>
                      <div className="workpage-hero__client">
                        <span className="text-label mb-1 paragraph02 text-color-white">For:</span>{' '}
                        <span className="paragraph03 text-color-white">{data.client.text}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="workpage-skills">
                  <div className="workpage-skills__color-block"></div>
                  <div className="row align-items-end">
                    <div className="col offset-1 offset-md-3">
                      <span className="paragraph02 text-label mb-1">Skills: </span>
                      {data.skills.map(({ skill }, idx) => {
                        if (!skill) {
                          return false;
                        }
                        return (
                          <span key={`skill_${idx}`}>
                            <div className="skillitem">{skill.document[0].data.skill_name.text}</div>
                            {idx !== data.skills.length - 1 ? <span className="skillitem__divide">.</span> : ''}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="slices">
                  {!data.body && (
                    <div className="row justify-content-center textslice">
                      <div className={sizeMap.md}>
                        <div className={`textslice__color - block text-center`}>Coming soon...</div>
                      </div>
                    </div>
                  )}

                  {data.body &&
                    data.body.length > 1 &&
                    data.body.map((slice, idx) => {
                      switch (slice.slice_type) {
                        case 'intro':
                          return (
                            <div className="row justify-content-center" key={`slice_${idx}`}>
                              <div className={sizeMap.lg}>
                                <Intro slice={slice} idx={idx}></Intro>
                              </div>
                            </div>
                          );
                        case 'text':
                          return (
                            <div className="row justify-content-center textslice" key={`slice_${idx}`}>
                              <div className={sizeMap.md}>
                                <div className={`textslice__color - block text-${slice.primary.alignment}`}>
                                  <AppRichText text={slice.primary.text}></AppRichText>
                                </div>
                              </div>
                            </div>
                          );
                        case 'spacer':
                          return <div className={`spacer--${slice.primary.spacer_size}`} key={`slice_${idx}`}></div>;
                        case 'video':
                          return (
                            <div className="row justify-content-center" key={`slice_${idx}`}>
                              <div className={sizeMap[slice.primary.column_size]}>
                                <div className="videoslice">
                                  <ReactPlayer
                                    url={slice.primary.video_url.text}
                                    className="react-player"
                                    muted={true}
                                    controls={false}
                                    loop={true}
                                    playing={true}
                                  ></ReactPlayer>
                                </div>
                              </div>
                            </div>
                          );
                        case 'image':
                          return (
                            <div className="row justify-content-center imageslice" key={`slice_${idx}`}>
                              <div className={sizeMap[slice.primary.column_size]}>
                                <Img fluid={slice.primary.image.localFile.childImageSharp.fluid}></Img>
                              </div>
                            </div>
                          );
                        case 'code':
                          return (
                            <div className="row justify-content-center" key={`slice_${idx}`}>
                              <div className={sizeMap.lg}>
                                <figure className="codeslice">
                                  <SyntaxHighlighter wrapLines={true} language={slice.primary.code_type} style={coy}>
                                    {`${slice.primary.content.text.replace('""', '')}`}
                                  </SyntaxHighlighter>
                                  <figcaption className="codeslice__caption text-right">
                                    <p className="paragraph04">{slice.primary.caption.text}</p>
                                  </figcaption>
                                </figure>
                              </div>
                            </div>
                          );
                        default:
                          break;
                      }
                    })}
                </div>
              </div>
              <div
                className="workpage-hero__box-dummy"
                style={{
                  backgroundColor: data.brand_color ? data.brand_color.text : 'inherit'
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
          ... on PrismicWorkItemBodyImage {
            slice_type
            primary {
              column_size
              image {
                localFile {
                  childImageSharp {
                    resolutions(width: 1000) {
                      ...GatsbyImageSharpResolutions_withWebp
                    }
                    fixed(width: 1000) {
                      ...GatsbyImageSharpFixed
                    }
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
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
              alignment
              text {
                html
              }
            }
          }
          ... on PrismicWorkItemBodyVideo {
            slice_type
            primary {
              column_size
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
