import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Logo from "../images/LogoMerged.svg";
import Nav from "./nav";

const Header = ({ siteTitle }) => (
  <header className="site-header">
    <h1>
      <Link to="/">
        <Logo className="site-logo"></Logo>
        <div className="sr-only">{siteTitle}</div>
      </Link>
    </h1>
    <Nav></Nav>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
