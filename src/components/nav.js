import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = () => (
  <div className="site-navigation-wrapper">
    <nav className="site-navigation">
      <div className="site-navigation-inner">
        <Link
          to={"/about"}
          activeClassName="site-navigation__text--active"
          className="site-navigation__text"
        >
          About
        </Link>
        <Link
          to={"/skills"}
          activeClassName="site-navigation__text--active"
          className="site-navigation__text"
        >
          Skills
        </Link>
        <Link
          to={"/work"}
          activeClassName="site-navigation__text--active"
          className="site-navigation__text"
        >
          Work
        </Link>
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
