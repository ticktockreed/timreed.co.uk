import { Group, Triangle, Rectangle, Circle, Pt, Num } from "pts/dist/es5";
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
    const { space, form } = this;

    const originPoint = new Pt({ x: 100, y: 100, z: 2, w: 3 });
    // const rect = Rectangle.fromCenter(space.center, space.size.$divide(4));
    const triangle = Triangle.fromCenter(originPoint, space.size.$divide(8));
    const circle = Circle.fromCenter(originPoint, space.size.$divide(10));

    // form.fillOnly("#f00").rect(rect);
    form.fillOnly("#123").polygon(triangle);
    form.fillOnly("#f0f0f0").circle(circle);
  }
}
