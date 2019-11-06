import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import SkillsList from "../components/SkillsList";

const cleanupSkillsList = skills => {
  return skills.map(({ node: { data, uid } }) => {
    const skill = data.skill_name.text;
    const category = data.category.document[0].data.skill_category.text;
    return {
      uid,
      name: skill,
      category
    };
  });
};
const cleanupCategoriesList = categories => {
  return categories.map(cat => {
    const category = cat.node.data.skill_category.text;
    return {
      category
    };
  });
};

const Skills = ({ data: { allPrismicSkill, allPrismicSkillCategories } }) => {
  const skills = cleanupSkillsList(allPrismicSkill.edges);
  const categories = cleanupCategoriesList(allPrismicSkillCategories.edges);

  console.log(skills);
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
      <div className="container">
        <div className="row justify-content-lg-center">
          <div className="col-9 offset-2 offset-lg-0 col-lg-6  ">
            <div className="richtext">
              <SkillsList skills={skills} categories={categories} />
            </div>
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
          uid
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
