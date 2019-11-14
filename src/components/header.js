import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Logo from "../images/TR-Logo-Flat.svg";
// import Nav from "./nav";
import { animateNavItem } from "../utils/animations";

const Header = ({ siteTitle }) => {
  return (
    <header className="site-header">
      <div className="container">
        <div className="row align-items-center justify-content-between site-header__row">
          <div className="col">
            <Link to="/" className="site-name">
              Tim Reed
            </Link>
          </div>
          <div className="col text-center">
            <h1>
              <Logo className="site-logo"></Logo>
              <div className="sr-only">Tim Reed</div>
            </h1>
          </div>
          {/* <div className="col">
          <Nav></Nav>
        </div> */}
          <div className="col text-right">
            <Link
              to="/about"
              className="about-link"
              onMouseEnter={e => animateNavItem({ e, direction: "in" })}
              onMouseLeave={e => animateNavItem({ e, direction: "out" })}
            >
              Creative Developer
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
