import {
  TimelineLite,
  Power4
} from "./gsap-shockingly-green/minified/gsap.min";
import "./gsap-shockingly-green/minified/ScrambleTextPlugin.min";

export function transitionPage({ exit, node, e, entry, direction }) {
  const targetPosition = e.target.getBoundingClientRect();

  if (direction === "in") {
    window.scrollTo(0, 0);
    const timelineIn = new TimelineLite();
    const heroBoxDummy = node.querySelector(".workpage-hero__box-dummy");
    const workpage = node.querySelector(".workpage");
    const heroBox = node.querySelector(".workpage-hero__box");
    const heroBoxRect = heroBox.getBoundingClientRect();

    timelineIn
      .set(workpage, {
        position: "fixed",
        opacity: 0
      })
      .set(heroBoxDummy, {
        opacity: 1
      })
      .set(heroBoxDummy, {
        top: targetPosition.top,
        left: targetPosition.left,
        width: targetPosition.width,
        height: targetPosition.height
      })
      .set(heroBox, {
        clip: `rect(0px, 1140px, 580px, 0)`
      });

    timelineIn
      .to(heroBoxDummy, 0.25, {
        top: heroBoxRect.y,
        left: workpage.getBoundingClientRect().x,
        width: workpage.getBoundingClientRect().width - 15,
        height: heroBoxRect.height,
        delay: 0.2
      })
      .to(workpage, 0.35, {
        opacity: 1,
        position: "relative"
      })
      .to(heroBoxDummy, 0.35, {
        top: heroBoxRect.y,
        left: workpage.getBoundingClientRect().x,
        width: 0,
        height: heroBoxRect.height,
        delay: 0.2
      })
      .to(heroBox, 0.2, {
        clip: `rect(0px, 1140px, 580px, 300px)`
      })
      .set(document.body, {
        position: "relative"
      })
      .set(heroBoxDummy, {
        display: "none"
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
        duration: 0.5,
        scrambleText: { chars: "upperCase", speed: 0.3 },
        onComplete: () => {
          console.log("complete");
        }
      })
      .staggerTo(nonActiveWorkItems, 0.35, {
        opacity: 0,
        ease: Power4.easeOut
      })
      .to(activeItem, 0.25, { opacity: 0 });
  }
}
