import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div>
      <p>
        Broad knowledge front end developer with design background and business
        mindset.
      </p>
      <p>
        Standards compliant web developer and designer. I’m big on Design
        Systems. As happy in Sketch as I am in Code.{" "}
      </p>

      <p>I write fast, accessible, maintainable and understandable code.</p>
      <p>
        I believe that the user engagement devil really is in the detail and
        always strive to bring purposeful movement to my work to surprise and
        delight. In a time where every brand has similar levels of visual
        sophistication motion can be a differentiator.
      </p>

      <p>
        I can do Agile, or KanBan or whatever suits your project best. I’m also
        happy leading design and development projects.
      </p>

      <p>
        I’ve built web apps for{" "}
        <Link to="https://www.ireland.com/features/game-of-thrones-tapestry/">
          ireland.com
        </Link>
        , <Link to="https://obaemergency.royalmail.com/#/">Royal Mail</Link>,
        and <Link to="https://www.sony.co.uk/fes">Sony</Link>, and countless
        websites since I started building for the web 12 years ago.
      </p>
    </div>
  </Layout>
);

export default IndexPage;
