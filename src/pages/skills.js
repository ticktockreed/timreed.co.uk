import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import SkillsList from "../components/SkillsList";

// import AnimationExample from "../components/AnimationExample";
// import ChartExample from "../components/ChartExample";
// import AnimationExample from "../components/AnimationExample";

const Skills = ({ data: { allPrismicSkill, allPrismicSkillCategories } }) => {
  const skills = allPrismicSkill.edges;
  const categories = allPrismicSkillCategories.edges;

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
            <SkillsList skills={skills} categories={categories} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Skills;

export const pageQuery = graphql`
  query {
    allPrismicSkillCategories {
      edges {
        node {
          data {
            skill_category {
              raw {
                text
                type
              }
              text
            }
          }
        }
      }
    }
    allPrismicSkill {
      edges {
        node {
          data {
            category {
              document {
                data {
                  skill_category {
                    text
                    raw {
                      text
                      type
                    }
                  }
                }
              }
            }
            skill_name {
              text
              raw {
                text
                type
              }
            }
          }
        }
      }
    }
  }
`;