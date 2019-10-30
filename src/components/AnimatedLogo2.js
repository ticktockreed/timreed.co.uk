import {
  Triangle,
  Rectangle,
  Circle,
  Create,
  Pt
  // Num
} from "pts/dist/es5";
import { PtsCanvas } from "react-pts-canvas";

// Create the basic shapes, their positions and sizes and return as object
// returns
function createShapesGeometry(baseUnit, origin) {
  let rVert = {
    origin: new Pt(origin),
    size: new Pt()
  };

  let rCircle = {
    origin: new Pt(origin),
    size: new Pt()
  };

  let rTriangle = {
    origin: new Pt(origin),
    size: new Pt()
  };

  rCircle.origin.add(baseUnit / 2.6, 0);
  rTriangle.origin.add(baseUnit / 2.6, baseUnit * 2 - baseUnit * 1.2);

  rVert.size.to(baseUnit, baseUnit * 2);
  rVert.rect = Rectangle.fromTopLeft(rVert.origin, rVert.size);

  rCircle.size.to(baseUnit * 1.2, baseUnit * 1.2);
  rCircle.rect = Rectangle.fromTopLeft(rCircle.origin, rCircle.size);

  rTriangle.size.to(baseUnit * 1.2, baseUnit * 1.2);
  rTriangle.rect = Rectangle.fromTopLeft(rTriangle.origin, rTriangle.size);

  // // create other shapes
  rCircle.circle = Circle.fromRect(rCircle.rect);
  rTriangle.triangle = Triangle.fromRect(rTriangle.rect);

  return {
    rVert,
    rCircle,
    rTriangle
  };
}

export default class AnimatedLogo2 extends PtsCanvas {
  constructor() {
    super();
    this.pts = [];
    this.colors = ["#ff2d5d", "#42dc8e", "#2e43eb", "#ffe359"];
  }

  _create(space, bound) {
    if (!bound) {
      return;
    }
    this.baseUnit = space.size.$divide(4).x;

    this.pts = Create.distributeRandom(bound.bound, 500);
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
    this._create(space, bound);
  }

  // Override PtsCanvas' resize function
  resize(space, bound) {
    this._create(space, bound);
  }

  // Override PtsCanvas' animate function
  animate(time, ftime) {
    const { space, pts, form, colors } = this;

    // add basic shapes to the canvas to create the logo...
    // rVert, rCircle, rTriangle
    const { rVert, rCircle, rTriangle } = createShapesGeometry(
      this.baseUnit,
      space.pointer
    );

    let r = 100;

    // check if each point is within circle's range
    for (let i = 0, len = pts.length; i < len; i++) {
      if (Circle.withinBound(rCircle.circle, pts[i])) {
        // calculate circle size
        let dist = 0.1;
        console.log(dist);
        let p = pts[i]
          .$subtract(space.pointer)
          .scale(1)
          .add(space.pointer);
        form.fillOnly(colors[i % 4]).point(p, dist * 25, "circle");
      } else if (Rectangle.withinBound(rVert.rect, pts[i])) {
        let dist = 0.1;
        let p = pts[i]
          .$subtract(space.pointer)
          .scale(1)
          .add(space.pointer);
        form.fillOnly(colors[i % 4]).point(p, dist * 25, "circle");
      } else {
        //   form.fillOnly("#fff").point(pts[i], 0.5);
      }
    }
  }
}
