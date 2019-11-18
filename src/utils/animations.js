import { TimelineLite, Power4, Back, gsap } from './gsap-shockingly-green/minified/gsap.min';
import './gsap-shockingly-green/minified/ScrambleTextPlugin.min';
import './gsap-shockingly-green/minified/ScrollToPlugin.min';
import SplitText from './gsap-shockingly-green/minified/SplitText.min';

import { getClipBox } from './misc';

export function transitionToWorkPage({ node, direction, brand_color, workItemRef }) {
  if (workItemRef === null) return;

  const workItem = workItemRef.current;
  const targetPosition = workItem.getBoundingClientRect();
  const topOfPage = 120;

  if (direction === 'in') {
    const tl = gsap.timeline({ paused: true });
    const heroBoxDummy = node.querySelector('.workpage-hero__box-dummy');
    const workpage = node.querySelector('.workpage');
    workpage.style.opacity = 0;
    const heroBox = node.querySelector('.workpage-hero__box');
    const heroTitle = node.querySelectorAll('.workpage-hero__title');
    const heroBoxRect = heroBox.getBoundingClientRect();
    const clipBox = getClipBox(heroBox);
    const titleSplitText = new SplitText(heroTitle, { type: 'words' });

    gsap.set(heroBoxDummy, {
      // set the dummy to the same size as the workitem box
      top: topOfPage,
      left: targetPosition.x,
      width: targetPosition.width,
      height: targetPosition.height,
      opacity: 1
    });
    gsap.set(heroTitle, {
      duration: 0,
      opacity: 0
    });

    tl.to(heroBoxDummy, {
      duration: 0.4,
      delay: 0.1,
      // Animate to width of Hero container
      height: heroBoxRect.height,
      top: heroBoxRect.top,
      left: heroBoxRect.left + clipBox.left,
      width: heroBoxRect.width - clipBox.left,
      ease: Back.easeInOut
    })
      .to(workpage, {
        duration: 0.35,
        opacity: 1,
        ease: Power4.easeOut
      })
      .to(
        heroBoxDummy,
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
    tl.duration(2).play();
  } else if (direction === 'out') {
    const tl = gsap.timeline({ paused: true });
    const activeItem = node.querySelector('.worklink--active').parentElement;
    const workItems = [].slice.call(node.querySelectorAll('.work-item'));
    const nonActiveWorkItems = workItems.filter((workItem) => {
      return workItem.className !== 'work-item worklink--active';
    });
    const workItemDummy = node.querySelector('.work-item__dummy');

    gsap
      // Overlay the dummy colour block
      .set(workItemDummy, {
        backgroundColor: brand_color,
        top: targetPosition.y,
        left: targetPosition.x,
        width: targetPosition.width,
        opacity: 0,
        height: targetPosition.height
      });

    tl.to(workItemDummy, {
      duration: 0.2,
      opacity: 1
    })
      // Hide the active item
      .set(activeItem, {
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
      .to(workItemDummy, {
        duration: 0.15,
        top: topOfPage,
        ease: Back.easeIn
      });

    tl.duration(2).play();
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
