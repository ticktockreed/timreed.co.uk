import {
  Group,
  Triangle,
  Rectangle,
  Circle,
  Pt
  // Num
} from "pts/dist/es5";
import { PtsCanvas } from "react-pts-canvas";

export default class AnimationExample extends PtsCanvas {
  constructor() {
    super();
    this.pts = [];
  }

  _create() {
    Group.fromArray([[1, 2], [3, 4]]);
    Group.fromPtArray([new Pt(1, 2), new Pt(3, 4)]);

    // add basic shapes to the canvas to create the logo...
    // tVert, tHoriz, rVert, rCircle, rTriangle
    this.shapes = {
      // tVert: {
      //   origin: new Pt(),
      //   size: new Pt()
      // },
      // tHoriz: {
      //   origin: new Pt(),
      //   size: new Pt()
      // },
      rVert: {
        origin: new Pt(),
        size: new Pt()
      },
      rCircle: {
        origin: new Pt(),
        size: new Pt()
      },
      rTriangle: {
        origin: new Pt(),
        size: new Pt()
      }
    };
  }

  componentDidUpdate() {
    if (this.props.pause) {
      this.space.pause();
    } else {
      this.space.resume();
    }
  }

  // Override PtsCanvas' start function
  start(space, bound) {
    console.log(space);
    this._create();
  }

  // Override PtsCanvas' resize function
  resize() {
    this._create();
  }

  // Override PtsCanvas' animate function
  animate(time, ftime) {
    const {
      space,
      form,
      shapes: { rVert, rCircle, rTriangle }
    } = this;

    const baseUnit = space.size.$divide(4).x;

    // set origin positions
    rCircle.origin.to(baseUnit / 2.6, 0);
    rTriangle.origin.to(baseUnit / 2.6, baseUnit * 2 - baseUnit * 1.2);

    // set rectangle sizes
    rVert.size.to(baseUnit, baseUnit * 2);
    rVert.rect = Rectangle.fromTopLeft(rVert.origin, rVert.size);

    rCircle.size.to(baseUnit * 1.2, baseUnit * 1.2);
    rCircle.rect = Rectangle.fromTopLeft(rCircle.origin, rCircle.size);

    rTriangle.size.to(baseUnit * 1.2, baseUnit * 1.2);
    rTriangle.rect = Rectangle.fromTopLeft(rTriangle.origin, rTriangle.size);

    // create other shapes
    rCircle.circle = Circle.fromRect(rCircle.rect);
    rTriangle.triangle = Triangle.fromRect(rTriangle.rect);

    // make visible
    form.fillOnly("#f00").rect(rVert.rect);
    // form.strokeOnly("#999").rect(rCircle.rect);
    form.fillOnly("blue").circle(rCircle.circle);
    // form.strokeOnly("#999").rect(rTriangle.rect);
    form.fillOnly("#999").polygon(rTriangle.triangle);
  }
}
