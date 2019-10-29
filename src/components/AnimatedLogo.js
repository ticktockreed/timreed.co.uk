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

    const { center } = space;
    const circleOrigin = new Pt(center);
    circleOrigin.subtract(0, space.size.$divide(4).x / 2);

    const triangleOrigin = new Pt(center);
    triangleOrigin.add(0, 100);

    const rectangleOrigin = new Pt(center);
    rectangleOrigin.subtract(space.size.$divide(4).x / 2, 0);

    const rectSize = new Pt(
      space.size.$divide(4).x,
      space.size.$divide(4).x * 2
    );

    const circleSize = new Pt(
      space.size.$divide(4).x / 1.5,
      space.size.$divide(4).x / 2
    );

    const triangleSize = new Pt(
      space.size.$divide(4).x / 1.5,
      space.size.$divide(4).x / 2
    );

    const rect = Rectangle.fromCenter(rectangleOrigin, rectSize);

    const circle = Circle.fromCenter(circleOrigin, circleSize);

    const triangle = Triangle.fromRect(
      Rectangle.fromCenter(
        new Pt(space.center.x, space.center.y + space.size.$divide(4).x / 2),
        new Pt(space.size.$divide(4).x, space.size.$divide(4).x)
      )
    );

    form.fillOnly("#f00").rect(rect);
    form.fillOnly("#f0f0f0").circle(circle);
    form.fillOnly("#123").polygon(triangle);
  }
}
