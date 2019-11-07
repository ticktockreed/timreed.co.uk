import PropTypes from "prop-types";
import React from "react";

const getSkillsFromList = skills => {
  return skills.map(({ name, category }) => {
    return (
      <div className="skill" key={`skill_${name}`}>
        {name}
      </div>
    );
  });
};

function getSkillsByCategory(categories, skills) {
  return categories.map(category => {
    const cat = category.category;
    const skillsByCat = skills.filter(skill => {
      return skill.category === cat;
    });

    if (skillsByCat.length === 0) {
      return false;
    }
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
      <h2>Skills</h2>

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
