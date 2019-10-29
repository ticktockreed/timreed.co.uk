import {
  Group,
  Triangle,
  Rectangle,
  Circle,
  World,
  Particle,
  Create,
  Bound,
  Num,
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

export default class AnimationExample extends PtsCanvas {
  constructor() {
    super();
    this.pts = [];
  }

  _create(space, bound) {
    const origin = new Pt(space.size.$divide(4));
    this.baseUnit = space.size.$divide(4).x;

    // add basic shapes to the canvas to create the logo...
    // rVert, rCircle, rTriangle
    this.shapes = createShapesGeometry(this.baseUnit, origin);

    this.rectCorners = Rectangle.corners(this.shapes.rVert.rect);

    // Create world and 100 random points
    this.world = new World(
      Bound.fromGroup(this.rectCorners.boundingBox()),
      1,
      0
    );
    this.pts = Create.distributeRandom(
      Bound.fromGroup(this.rectCorners.boundingBox()),
      15
    );

    // // Create particles and hit them with a random impulse
    for (let i = 0, len = this.pts.length; i < len; i++) {
      let p = new Particle(this.pts[i]).size(
        i === 0 ? 30 : 3 + (Math.random() * this.space.size.x) / 50
      );

      console.log("point", p);
      p.hit(Num.randomRange(-50, 50), Num.randomRange(-25, 25));
      this.world.add(p);
    }

    this.world.particle(0).lock = true; // lock it to move it by pointer later on
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

  action(type, px, py) {
    if (type == "move") {
      this.world.particle(0).position = new Pt(px, py);
    }
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
    form.fill("#fff").points(this.groupee, 5, "circle");

    this.world.drawParticles((p, i) => {
      let color =
        i === 0 ? "#fff" : ["#ff2d5d", "#42dc8e", "#2e43eb", "#ffe359"][i % 4];
      form.fillOnly(color).point(p, p.radius, "circle");
    });

    const newRect = Rectangle.fromTopLeft(rTriangle.origin, this.rectCorners);
    form.fillOnly("blue").rect(newRect);
    this.world.update(ftime);
  }
}
