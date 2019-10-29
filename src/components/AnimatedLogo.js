import {
  Group,
  Triangle,
  Rectangle,
  Circle,
  Curve,
  Line,
  Pt
  // Num
} from "pts/dist/es5";
import { PtsCanvas } from "react-pts-canvas";
import { Polygon } from "pts";

export default class AnimationExample extends PtsCanvas {
  constructor() {
    super();
    this.pts = [];
  }

  _create(space, bound) {
    // add basic shapes to the canvas to create the logo...
    // tVert, tHoriz, rVert, rCircle, rTriangle
    const origin = new Pt(space.size.$divide(4));
    this.baseUnit = space.size.$divide(4).x;

    this.shapes = {
      rVert: {
        origin: new Pt(origin),
        size: new Pt()
      },
      rCircle: {
        origin: new Pt(origin),
        size: new Pt()
      },
      rTriangle: {
        origin: new Pt(origin),
        size: new Pt()
      }
    };
    const { rVert, rCircle, rTriangle } = this.shapes;

    rCircle.origin.add(this.baseUnit / 2.6, 0);
    rTriangle.origin.add(
      this.baseUnit / 2.6,
      this.baseUnit * 2 - this.baseUnit * 1.2
    );

    rVert.size.to(this.baseUnit, this.baseUnit * 2);
    rVert.rect = Rectangle.fromTopLeft(rVert.origin, rVert.size);

    rCircle.size.to(this.baseUnit * 1.2, this.baseUnit * 1.2);
    rCircle.rect = Rectangle.fromTopLeft(rCircle.origin, rCircle.size);

    rTriangle.size.to(this.baseUnit * 1.2, this.baseUnit * 1.2);
    rTriangle.rect = Rectangle.fromTopLeft(rTriangle.origin, rTriangle.size);

    // // create other shapes
    rCircle.circle = Circle.fromRect(rCircle.rect);
    rTriangle.triangle = Triangle.fromRect(rTriangle.rect);
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
    const {
      space,
      form,
      shapes: { rVert, rCircle, rTriangle }
    } = this;

    const line = new Group(rTriangle.triangle[0], rTriangle.triangle[1]);

    const myGroup = new Group(
      ...Circle.intersectLine2D(rCircle.circle, line),
      ...rTriangle.triangle,
      ...Rectangle.corners(rVert.rect)
    );

    // make visible
    form.fillOnly("#2D2D2D").rect(rVert.rect);
    form.fillOnly("#2D2D2D").circle(rCircle.circle);
    form.fillOnly("#f00").polygon(rTriangle.triangle);

    // //  mark points of wrapped polygon
    form.fill("#fff").points(myGroup, 5, "circle");
  }
}
