import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Logo from "../images/Logo.svg";

const Header = ({ siteTitle }) => (
  <header>
    <div>
      <h1>
        <div>
          <Link to="/">
            <Logo></Logo>
            <div className="sr-only">{siteTitle}</div>
          </Link>
        </div>
      </h1>
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
