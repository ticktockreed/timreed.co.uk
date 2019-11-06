import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import Work from "../images/work.svg";
import Person from "../images/person.svg";
import Stars from "../images/stars.svg";

const Header = () => (
  <div className="site-navigation-wrapper">
    <nav className="site-navigation">
      <div className="site-navigation-inner">
        <Link to={"/about"}>
          <div className="sr-only">About</div>
          <Person />
        </Link>
        <Link to={"/skills"}>
          <div className="sr-only">Skills</div>
          <Stars />
        </Link>
        <Link to={"/work"}>
          <div className="sr-only">Work</div>
          <Work />
        </Link>
        {/* <Link to={"/contact"}>
          <div className="sr-only">Contact</div>

          <Email />
        </Link> */}
      </div>
    </nav>
  </div>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
