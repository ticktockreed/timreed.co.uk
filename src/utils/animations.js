import { TimelineLite, Power4, Back, gsap } from './gsap-shockingly-green/minified/gsap.min';
import './gsap-shockingly-green/minified/ScrambleTextPlugin.min';
import './gsap-shockingly-green/minified/ScrollToPlugin.min';
import SplitText from './gsap-shockingly-green/minified/SplitText.min';

import { getClipBox } from './misc';

export function transitionToWorkPage({
  direction,
  brand_color,
  activeWorkItem,
  activeItemPosition,
  workItems,
  exitDummy,
  entryDummy,
  workPage
}) {
  if (direction === 'in') {
    const tl = gsap.timeline({ paused: true });
    const heroBox = workPage.querySelector('.workpage-hero__box');
    const heroTitle = workPage.querySelector('.workpage-hero__title');
    const heroBoxRect = heroBox.getBoundingClientRect();
    console.log(heroTitle);
    const clipBox = getClipBox(heroBox);
    const titleSplitText = new SplitText(heroTitle, { type: 'words' });

    gsap.set(entryDummy, {
      // set the dummy to the same size as the workitem box
      top: 120,
      left: activeItemPosition.x,
      width: activeItemPosition.width,
      height: activeItemPosition.height,
      opacity: 1
    });
    gsap.set(heroTitle, {
      duration: 0,
      opacity: 0
    });

    tl.to(entryDummy, {
      duration: 0.4,
      delay: 0.1,
      // Animate to width of Hero container
      height: heroBoxRect.height,
      top: heroBoxRect.top,
      left: heroBoxRect.left + clipBox.left,
      width: heroBoxRect.width - clipBox.left,
      ease: Back.easeInOut
    })
      .to(workPage, {
        duration: 0.35,
        opacity: 1,
        ease: Power4.easeOut
      })
      .to(
        entryDummy,
        {
          duration: 0.2,
          opacity: 0,
          display: 'none',
          ease: Power4.easeOut
        },
        '-=0.2'
      )
      .to(
        heroTitle,
        {
          duration: 0.5,
          opacity: 1
        },
        '-=0.2'
      )
      .to(
        titleSplitText.words,
        {
          duration: 0.3,
          scrambleText: { chars: 'upperCase', speed: 0.5, revealDelay: 0.2, delimeter: ' ' }
        },
        '-=0.5'
      );
    tl.duration(1.5).play();
  } else if (direction === 'out') {
    const tl = gsap.timeline({ paused: true });

    const nonActiveWorkItems = workItems.filter((workItem) => {
      return workItem.className !== 'work-item worklink--active';
    });

    gsap
      // Overlay the dummy colour block
      .set(exitDummy, {
        backgroundColor: brand_color,
        top: activeItemPosition.y,
        left: activeItemPosition.x,
        width: activeItemPosition.width,
        opacity: 1,
        height: activeItemPosition.height
      });

    tl.to(exitDummy, {
      duration: 0.2,
      opacity: 1
    })
      // Hide the active item
      .set(activeWorkItem, {
        opacity: 0
      })
      .staggerTo(nonActiveWorkItems, 0.25, {
        opacity: 0,
        ease: Power4.easeOut
      })
      // Scroll to the top
      .set(window, {
        scrollTo: 0
      })
      // move the blok to the top of the page
      .to(exitDummy, {
        duration: 0.15,
        top: 120,
        ease: Back.easeIn
      });

    tl.duration(1.5).play();
  }
}

export function workItemHover({ workItemTextRef }) {
  const mySplitText = new SplitText(workItemTextRef.current, { type: 'words' });

  gsap.to(mySplitText.words, {
    duration: 0.35,
    scrambleText: {
      chars: 'lowerCase',
      speed: 0.1
    }
  });
}

export function animateNavItem({ navAbout, direction }) {
  const mySplitText = new SplitText(navAbout.current, { type: 'words' });

  if (direction === 'in') {
    gsap.to(mySplitText.words, {
      duration: 0.5,
      scrambleText: { chars: 'lowerCase', speed: 0.3 }
    });
  }
}

export function animateWorkItems({ workItems, direction }) {
  const tl = gsap.timeline();
  if (direction === 'in') {
    tl.staggerTo(
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
