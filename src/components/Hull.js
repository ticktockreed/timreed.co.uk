import { Create, Polygon } from "pts/dist/es5";
import { PtsCanvas } from "react-pts-canvas";

export default class AnimationExample extends PtsCanvas {
  constructor() {
    super();
    this.pts = [];
  }

  _create() {
    // Make a face with 30 radial points with slight randomness
    const radius = this.space.size.minValue().value / 3;
    this.pts = Create.radialPts(this.space.center, radius, 30);
    this.pts.map(p => p.add(50 * (Math.random() - Math.random())));
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
    this._create();
  }

  // Override PtsCanvas' resize function
  resize() {
    this._create();
  }

  // Override PtsCanvas' animate function
  animate(time, ftime) {
    this.pts[this.pts.length - 1] = this.space.pointer;

    // convex hull the points
    let hull = Polygon.convexHull(this.pts);

    // eyes' positions
    let left = this.space.center.$subtract(50);
    let right = this.space.center.$add(50, -50);
    let leftB = left
      .clone()
      .toAngle(this.space.pointer.$subtract(left).angle(), 10, left);
    let rightB = right
      .clone()
      .toAngle(this.space.pointer.$subtract(right).angle(), 10, right);

    // draw face and eyes
    this.form.fillOnly("rgba(255, 255, 255, 0.5)").polygon(hull);
    this.form.fill("#fff").points([left, right], 20, "circle");
    this.form.fill("#123").points([leftB, rightB], 5, "circle");

    // draw the hull and pts
    this.form.fill("#fff").points(hull, 5, "circle");
    this.form.fill("rgba(0,0,0,.5)").points(this.pts, 2, "circle");
    this.form.fill("#f03").point(this.space.pointer, 10, "circle");

    // draw mouth
    this.form.strokeOnly("#123", 5).line([left.$add(0, 80), right.$add(0, 80)]);
  }
}
