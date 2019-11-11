import { TweenMax, TimelineLite } from "gsap";

export function transitionPage({ exit, node, e, entry, direction }) {
  const targetPosition = e.target.getBoundingClientRect();

  if (direction === "in") {
    window.scrollTo(0, 0);
    const heroBoxDummy = node.querySelector(".workpage-hero__box-dummy");
    const workpage = node.querySelector(".workpage");
    const heroBox = node
      .querySelector(".workpage-hero__box")
      .getBoundingClientRect();
    const timelineIn = new TimelineLite();

    //   Deal with clippath animation
    // const clipPath1 = [0, 0, 100, 0, 100, 100, 0, 100];
    // const clipPath2 = [25, 0, 100, 0, 100, 100, 25, 100];

    // clipPath2.onUpdate = function() {
    //   TweenMax.set(heroBoxDummy, {
    //     webkitClipPath: `polygon(${clipPath1[0]}% ${clipPath1[1]}%, ${
    //       clipPath1[2]
    //     }% ${clipPath1[3]}%, ${clipPath1[4]}% ${clipPath1[5]}%, ${
    //       clipPath1[6]
    //     }% ${clipPath1[7]}%)`
    //   });
    // };

    timelineIn
      .set(workpage, {
        opacity: 0
      })
      .set(heroBoxDummy, {
        opacity: 1
      })
      .to(heroBoxDummy, 0, {
        top: targetPosition.top,
        left: targetPosition.left,
        width: targetPosition.width,
        height: targetPosition.height
      })
      .to(heroBoxDummy, 1, {
        top: heroBox.y,
        left: heroBox.x,
        width: heroBox.width,
        height: heroBox.height
      })
      .to(
        heroBoxDummy,
        1,
        {
          clip: `rect(0px, 1140px, 580px, 300px)`
        },
        "-=1"
      )
      .to(workpage, 1, {
        opacity: 1
      })
      .to(heroBoxDummy, 0.25, { opacity: 0 });
  } else if (direction === "out") {
    const timelineOut = new TimelineLite();
    const workItems = [].slice.call(node.querySelectorAll(".work-item"));
    const nonActiveWorkItems = workItems.filter(workItem => {
      return workItem.className !== "work-item site-navigation__text--active";
    });

    const workItemBlocks = nonActiveWorkItems.map(workItem => {
      return workItem.querySelector(".work-item__image");
    });

    // animate out other images and pass the position of this box to
    timelineOut
      .staggerTo(workItemBlocks, 0.25, { width: "100%", height: "0" })
      .staggerTo(nonActiveWorkItems, 0.25, { opacity: 0 });
  }
}
