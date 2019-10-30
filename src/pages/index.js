import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div className="row justify-content-center">
      <div className="col-6">
        {/* <div className="richtext"> */}
        <h1 className="heading03 text-center text-color-turquoise">
          Coming soon...
        </h1>
        {/* </div> */}
      </div>
    </div>
  </Layout>
);

export default IndexPage;
