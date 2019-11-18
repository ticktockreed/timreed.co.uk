import { TimelineLite, Power4, Back, gsap } from './gsap-shockingly-green/minified/gsap.min';
import './gsap-shockingly-green/minified/ScrambleTextPlugin.min';
import './gsap-shockingly-green/minified/ScrollToPlugin.min';

import { getClipBox } from './misc';

export function transitionToWorkPage({ exit, node, e, entry, direction, brand_color, boundingRect }) {
  let target = e.target;

  if (e.target.className === 'work-item__info') {
    target = e.target.parentElement.parentElement;
  }

  const targetPosition = target.getBoundingClientRect();
  const topOfPage = 120;

  if (direction === 'in') {
    const timelineIn = gsap.timeline({ paused: true });
    const heroBoxDummy = node.querySelector('.workpage-hero__box-dummy');
    const workpage = node.querySelector('.workpage');
    workpage.style.opacity = 0;
    const heroBox = node.querySelector('.workpage-hero__box');
    const heroTitle = node.querySelectorAll('.workpage-hero__title');
    const heroBoxRect = heroBox.getBoundingClientRect();
    const clipBox = getClipBox(heroBox);

    console.log('TARGET', target);
    console.log('BOUNDINGRECT', boundingRect);
    console.log('TARGETPOSITION', targetPosition);

    gsap.set(heroBoxDummy, {
      // set the dummy to the same size as the workitem box
      top: topOfPage,
      left: boundingRect.x,
      width: boundingRect.width,
      height: boundingRect.height,
      opacity: 1
    });
    gsap.set(heroTitle, {
      duration: 0,
      opacity: 0
    });

    timelineIn
      .to(heroBoxDummy, {
        duration: 0.4,
        // Animate to width of Hero container
        height: heroBoxRect.height,
        top: heroBoxRect.top,
        left: heroBoxRect.left + clipBox.left,
        width: heroBoxRect.width - clipBox.left,
        ease: Back.easeOut
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
        heroTitle,
        {
          duration: 0.3,
          scrambleText: { chars: 'upperCase', speed: 0.5, revealDelay: 0.2, delimeter: ' ' }
        },
        '-=0.5'
      );
    timelineIn.duration(2).play();
  } else if (direction === 'out') {
    const timelineOut = new TimelineLite({ paused: true });

    const activeItem = node.querySelector('.worklink--active').parentElement;
    const activeItemTitle = activeItem.querySelector('.work-item__info');
    const workItems = [].slice.call(node.querySelectorAll('.work-item'));
    const nonActiveWorkItems = workItems.filter((workItem) => {
      return workItem.className !== 'work-item worklink--active';
    });
    const workItemDummy = node.querySelector('.work-item__dummy');

    timelineOut
      .staggerTo(nonActiveWorkItems, 0.5, {
        opacity: 0,
        ease: Power4.easeOut
      })
      .to(
        activeItemTitle,
        {
          duration: 0.35,
          opacity: 0
        },
        '-=0.5'
      )
      // Overlay the dummy colour block
      .to(workItemDummy, {
        duration: 0,
        backgroundColor: brand_color,
        top: targetPosition.y,
        left: targetPosition.x,
        width: targetPosition.width,
        height: targetPosition.height
      })
      // Fade out the active item
      .to(activeItem, {
        duration: 0,
        opacity: 0.1
      })
      // Scroll to the top
      .to(window, {
        duration: 0,
        scrollTo: 0
      })
      // Overlay the dummy colour block fixed at the position of the worklist__item
      .to(workItemDummy, {
        duration: 0,
        backgroundColor: brand_color,
        top: targetPosition.top,
        left: targetPosition.left,
        width: targetPosition.width,
        height: targetPosition.height
      })
      // move the blok to the top of the page
      .to(workItemDummy, {
        duration: 0.15,
        top: topOfPage,
        ease: Back.easeIn
      });

    timelineOut.duration(2).play();
  }
}

export function workItemHover({ e, direction }) {
  let target = e.target;

  if (target.className === 'work-item__wrapper' || target.className === 'work-item__block') {
    return;
  }
  const tl = new TimelineLite();

  const targetText = target.getAttribute('data-text');

  if (direction === 'out') {
    console.log('mouseIn');
    tl.to(target, {
      duration: 0.35,
      scrambleText: {
        text: targetText,
        chars: 'lowerCase',
        delimeter: ' ',
        speed: 0.1
      }
    });
  }
}

export function animateNavItem({ e, direction }) {
  const { target } = e;
  const tl = new TimelineLite();

  if (direction === 'in') {
    tl.to(target, {
      duration: 0.5,
      scrambleText: { text: 'About Me', chars: 'lowerCase', speed: 0.3 }
    });
  }
  if (direction === 'out') {
    tl.to(target, {
      duration: 0.5,
      scrambleText: {
        text: 'Creative Developer',
        chars: 'lowerCase',
        speed: 0.3
      }
    });
  }
}

export function animateWorkItems({ workItems, direction }) {
  const bl = new TimelineLite();
  if (direction === 'in') {
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
