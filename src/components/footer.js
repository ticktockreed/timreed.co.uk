import PropTypes from "prop-types";
import { Link } from "gatsby";
import React from "react";

import LinkedIn from "../images/LinkedIn.svg";
import Twitter from "../images/Twitter.svg";

const Footer = () => (
  <div className="footer">
    <div className="container">
      <div className="row justify-content-center">
        <p className="sr-only">Find me on: </p>
        <a
          href={"https://twitter.com/ticktockreed"}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-icon"
        >
          <Twitter></Twitter>
        </a>{" "}
        <a
          href={"https://linkedin.com/in/ticktockreed"}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-icon"
        >
          <LinkedIn></LinkedIn>
        </a>
      </div>
      <div className="row justify-content-center pt-2">
        <div className="col-10 col-lg-6 text-center richtext text-color-grey-mid">
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
