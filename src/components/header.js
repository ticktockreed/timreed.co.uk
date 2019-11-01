import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Logo from "../images/LogoMerged.svg";
import Nav from "./nav";

const Header = ({ siteTitle }) => (
  <header className="site-header">
    <div className="container">
      <div className="row">
        <div className="col-10 col-md-1">
          <h1>
            <Link to="/">
              <Logo className="site-logo"></Logo>
              <div className="sr-only">{siteTitle}</div>
            </Link>
            <Nav></Nav>
          </h1>
        </div>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
