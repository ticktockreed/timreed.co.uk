import { TweenMax } from "gsap";

export function transitionPage({ exit, node, direction }) {
  if (direction === "in") {
    TweenMax.to(node, 2, { width: 200, height: 150 });
  } else if (direction === "out") {
    TweenMax.to(node, 2, { width: 0, height: 0 });
  }
}
