import {
  TimelineLite,
  Power4,
  Back
} from "./gsap-shockingly-green/minified/gsap.min";
import "./gsap-shockingly-green/minified/ScrambleTextPlugin.min";

import { getClipBox } from "./misc";

export function transitionToWorkPage({ exit, node, e, entry, direction }) {
  const targetPosition = e.target.getBoundingClientRect();

  if (direction === "in") {
    window.scrollTo(0, 0);
    const timelineIn = new TimelineLite();
    const heroBoxDummy = node.querySelector(".workpage-hero__box-dummy");
    const workpage = node.querySelector(".workpage");
    const heroBox = node.querySelector(".workpage-hero__box");
    const heroBoxRect = heroBox.getBoundingClientRect();

    const clipBox = getClipBox(heroBox);

    console.log(clipBox.left);
    timelineIn
      .set(workpage, {
        position: "fixed",
        width: "100%",
        height: "100%",
        left: 0,
        right: 0,
        opacity: 0
      })
      .set(heroBoxDummy, {
        opacity: 1
      })
      .set(heroBoxDummy, {
        top: targetPosition.top,
        left: targetPosition.left,
        width: targetPosition.width,
        height: targetPosition.height,
        opacity: 1
      })

      .to(heroBoxDummy, 0, {
        top: targetPosition.top,
        left: targetPosition.left,
        width: targetPosition.width,
        height: targetPosition.height,
        opacity: 1
      })
      .to(heroBoxDummy, 0.8, {
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        ease: Power4.easeOut
      })
      .to(heroBoxDummy, 0.6, {
        width: heroBoxRect.width - clipBox.left,
        height: heroBoxRect.height,
        top: heroBoxRect.top,
        left: heroBoxRect.left + clipBox.left,
        ease: Back.easeIn
      });
  } else if (direction === "out") {
    const timelineOut = new TimelineLite();
    const activeItem = node.querySelector(".worklink--active");
    const activeItemTitle = activeItem.querySelector(".work-item__title");
    const workItems = [].slice.call(node.querySelectorAll(".work-item"));
    const nonActiveWorkItems = workItems.filter(workItem => {
      return workItem.className !== "work-item worklink--active";
    });

    timelineOut
      .to(activeItemTitle, {
        duration: 0.35,
        scrambleText: { chars: "upperCase", speed: 0.3 }
      })
      .to(
        activeItemTitle,
        {
          duration: 0.35,
          opacity: 0
        },
        "-=0.2"
      )
      .staggerTo(nonActiveWorkItems, 0.5, {
        opacity: 0,
        ease: Power4.easeOut
      });
    //   .to(activeItem, 0.25, { opacity: 0 });
  }
}

export function animateNavItem({ e, direction }) {
  const { target } = e;
  const tl = new TimelineLite();

  if (direction === "in") {
    tl.to(target, {
      duration: 0.5,
      scrambleText: { text: "About Me", chars: "lowerCase", speed: 0.3 }
    });
  }
  if (direction === "out") {
    tl.to(target, {
      duration: 0.5,
      scrambleText: {
        text: "Creative Developer",
        chars: "lowerCase",
        speed: 0.3
      }
    });
  }
}

export function animateWorkItems({ workItems, direction }) {
  const bl = new TimelineLite();
  console.log(workItems[0]);
  if (direction === "in") {
    bl.staggerTo(
      workItems,
      1,
      {
        opacity: 1,
        y: 0
      },
      0.15
    );
  }
  //   if (direction === "out") {
  //   }
}
