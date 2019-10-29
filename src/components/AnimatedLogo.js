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

  _create() {
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

    const origin = new Pt(space.size.$divide(4));

    // // set origin positions
    rVert.origin.to(origin);
    rCircle.origin.to(origin);
    rTriangle.origin.to(origin);

    rCircle.origin.add(baseUnit / 2.6, 0);
    rTriangle.origin.add(baseUnit / 2.6, baseUnit * 2 - baseUnit * 1.2);

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

    // make visible
    form.fillOnly("#2D2D2D").rect(rVert.rect);
    // // form.strokeOnly("#999").rect(rCircle.rect);
    form.fillOnly("#2D2D2D").circle(rCircle.circle);
    // // form.strokeOnly("#999").rect(rTriangle.rect);
    form.fillOnly("#2D2D2D").polygon(rTriangle.triangle);

    form.strokeOnly("#f0f0f0", 5).polygon(Curve.cardinal([...poly1, ...poly2]));

    // //  mark points of wrapped polygon
    form.fill("#fff").points([...poly1, ...poly2], 5, "circle");
  }
}
