import {
  Group,
  Triangle,
  Rectangle,
  Circle,
  Curve,
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

    this.shapes.rCircle.origin.add(this.baseUnit / 2.6, 0);
    this.shapes.rTriangle.origin.add(
      this.baseUnit / 2.6,
      this.baseUnit * 2 - this.baseUnit * 1.2
    );
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
      shapes: { rVert, rCircle, rTriangle },
      baseUnit
    } = this;

    // set rectangle sizes
    rVert.size.to(baseUnit, baseUnit * 2);
    rVert.rect = Rectangle.fromTopLeft(rVert.origin, rVert.size);

    rCircle.size.to(baseUnit * 1.2, baseUnit * 1.2);
    rCircle.rect = Rectangle.fromTopLeft(rCircle.origin, rCircle.size);

    rTriangle.size.to(baseUnit * 1.2, baseUnit * 1.2);
    rTriangle.rect = Rectangle.fromTopLeft(rTriangle.origin, rTriangle.size);

    // // create other shapes
    rCircle.circle = Circle.fromRect(rCircle.rect);
    rTriangle.triangle = Triangle.fromRect(rTriangle.rect);

    const poly1 = Polygon.convexHull(Rectangle.corners(rVert.rect));
    const poly2 = Polygon.convexHull(
      Circle.intersectRect2D(rCircle.circle, rVert.rect)
    );

    console.log(rCircle.circle);

    const myGroup = new Group(
      ...rCircle.circle,
      ...rTriangle.triangle,
      ...Rectangle.corners(rVert.rect)
    );

    // console.log(myGroup);
    // make visible
    form.fillOnly("#2D2D2D").rect(rVert.rect);
    // // form.strokeOnly("#999").rect(rCircle.rect);
    form.fillOnly("#2D2D2D").circle(rCircle.circle);
    // // form.strokeOnly("#999").rect(rTriangle.rect);
    form.fillOnly("#f00").polygon(rTriangle.triangle);

    // //  mark points of wrapped polygon
    // form.strokeOnly("#f0f0f0", 5).polygon(Curve.cardinal([...poly1, ...poly2]));
    form.fill("#fff").points(myGroup, 5, "circle");
    // form.fillOnly("rgba(255, 255, 255, 0.8)").polygon([...poly1, ...poly2]);
  }
}
