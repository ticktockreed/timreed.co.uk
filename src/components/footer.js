import PropTypes from "prop-types";
import { Link } from "gatsby";
import React from "react";

import LinkedIn from "../images/LinkedIn.svg";
import Twitter from "../images/Twitter.svg";

const Footer = () => (
  <div className="footer">
    <div className="container">
      <div className="row justify-content-center">
        <p className="sr-only">Social</p>
        <a
          href={"https://twitter.com/ticktockreed"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter></Twitter>
        </a>
        <a
          href={"https://linkedin.com/in/ticktockreed"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn></LinkedIn>
        </a>
      </div>
      <div className="row justify-content-center">
        <div className="col-10 col-lg-6 text-center richtext">
          © {new Date().getFullYear()} Timothy Reed
        </div>
      </div>
    </div>
  </div>
);

Footer.propTypes = {
  siteTitle: PropTypes.string
};

Footer.defaultProps = {
  siteTitle: ``
};

export default Footer;
