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
  return categories.map((category, idx) => {
    const cat = category.category;
    const skillsByCat = skills.filter(skill => {
      return skill.category === cat;
    });

    if (skillsByCat.length === 0) {
      return false;
    }
    return (
      <div key={`skill-category__${idx}`} className="skills-category">
        {/* <span>{cat}</span> */}

        {getSkillsFromList(skillsByCat)}
      </div>
    );
  });
}

const Skills = ({ skills, categories }) => {
  return (
    <div className="skills">
      <div className="skills-inner">
        {/* for each category go get the skills for that cat */}
        {getSkillsByCategory(categories, skills)}
      </div>
    </div>
  );
};

Skills.propTypes = {
  siteTitle: PropTypes.string
};

Skills.defaultProps = {
  siteTitle: ``
};

export default Skills;
