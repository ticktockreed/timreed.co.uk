import { TweenMax } from "gsap";

export function transitionPage({ exit, node, direction }) {
  if (direction === "in") {
    console.log("in", exit);
    TweenMax.from(node, 1, { width: "80%", height: "80%" });
  } else if (direction === "out") {
    console.log("out", exit);
    TweenMax.to(node, 1, { width: "80%", height: "80%" });
  }
}
