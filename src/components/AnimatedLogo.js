import React from "react";

import Zdog from "zdog";

class AnimatedLogo extends React.Component {
  constructor(props) {
    super(props);
    this.zDogRef = React.createRef();
    this.state = {
      illo: undefined
    };
  }

  componentDidMount() {
    this.setState(
      () => {
        return {
          illo: new Zdog.Illustration({
            // set canvas with selector
            element: this.zDogRef.current
          })
        };
      },
      () => {
        console.log(this.state); // add circle
        new Zdog.Ellipse({
          addTo: this.state.illo,
          diameter: 80,
          stroke: 20,
          color: "#f00"
        });
        // update & render
        this.state.illo.updateRenderGraph();
        // console.log(this.state.illo);
      }
    );
  }

  render() {
    if (this.state.illo) {
      console.log(this.state.illo);
      alert("helooo");
      this.state.illo.updateRenderGraph();
    }
    return <div ref={this.zDogRef} style={{ width: 300, height: 300 }} />;
  }
}

export default AnimatedLogo;
