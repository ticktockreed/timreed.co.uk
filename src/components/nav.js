import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = () => (
  <nav className="site-navigation">
    <Link to={"/about"}>About</Link>
    <Link to={"/skills"}>Skills</Link>
    <Link to={"/work"}>Work</Link>
    <Link to={"/contact"}>Contact</Link>
  </nav>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
