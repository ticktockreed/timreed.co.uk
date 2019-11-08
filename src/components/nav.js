import PropTypes from "prop-types";
import React from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import { transitionPage } from "../utils/animations";

const NavLink = ({ children, to, ...props }) => {
  return (
    <TransitionLink
      activeClassName="site-navigation__text--active"
      className="site-navigation__text"
      partiallyActive={true}
      to={to}
      exit={{
        length: 1,
        trigger: ({ exit, node, e, entry }) => {
          transitionPage({ exit, node, e, entry, direction: "out" });
        }
        //   someCustomDefinedAnimation({ exit, node, direction: "out" })
      }}
      entry={{
        length: 0,
        trigger: ({ exit, node, e, entry }) => {
          transitionPage({ exit, node, e, entry, direction: "in" });
        }
        //   someCustomDefinedAnimation({ exit, node, direction: "in" })
      }}
      {...props}
    >
      {children}
    </TransitionLink>
  );
};

const Header = () => {
  return (
    <nav className="site-navigation">
      <div className="site-navigation-inner">
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/skills"}>Skills</NavLink>
        <NavLink to={"/work"}>Work</NavLink>
      </div>
    </nav>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
