import PropTypes from "prop-types";
import React from "react";

const getSkillsFromList = skills => {
  return skills.map(({ node: data }) => {
    const skill = data.data.skill_name.text;

    return (
      <div className="skill" key={`skill_${data.data.skill_name.text}`}>
        {skill}
      </div>
    );
  });
};

function getSkillsByCategory(categories, skills) {
  return categories.map(category => {
    const cat = category.node.data.skill_category.text;
    const skillsByCat = skills.filter(
      ({
        node: {
          data: {
            category: { document }
          }
        }
      }) => {
        const skillCat = document[0].data.skill_category.text;
        return skillCat === cat;
      }
    );

    return (
      <>
        <h3>{cat}</h3>
        {getSkillsFromList(skillsByCat)}
      </>
    );
  });
}

const Skills = ({ skills, categories }) => {
  return (
    <>
      <h2>A List of skillz</h2>

      {/* for each category go get the skills for that cat */}
      {getSkillsByCategory(categories, skills)}
    </>
  );
};

Skills.propTypes = {
  siteTitle: PropTypes.string
};

Skills.defaultProps = {
  siteTitle: ``
};

export default Skills;
