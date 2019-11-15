import { TimelineLite, Power4, Back } from './gsap-shockingly-green/minified/gsap.min';
import './gsap-shockingly-green/minified/ScrambleTextPlugin.min';
import './gsap-shockingly-green/minified/ScrollToPlugin.min';

import { getClipBox } from './misc';

export function transitionToWorkPage({ exit, node, e, entry, direction, brand_color }) {
  let target = e.target;

  if (e.target.className === 'work-item__title') {
    target = e.target.parentElement.parentElement;
  }
  if (e.target.className === 'work-item__info') {
    target = e.target.parentElement.parentElement;
  }
  if (e.target.className === 'work-item__info') {
    target = e.target.parentElement.parentElement;
  }

  const targetPosition = target.getBoundingClientRect();
  console.log(target, targetPosition);

  if (direction === 'in') {
    const timelineIn = new TimelineLite();
    const heroBoxDummy = node.querySelector('.workpage-hero__box-dummy');
    const workpage = node.querySelector('.workpage');
    const heroBox = node.querySelector('.workpage-hero__box');
    const heroTitle = node.querySelectorAll('.workpage-hero__title');
    const heroBoxRect = heroBox.getBoundingClientRect();
    const clipBox = getClipBox(heroBox);

    timelineIn
      .to(workpage, 0, {
        opacity: 0
      })
      .to(heroBoxDummy, 0, {
        // set the dummy to the same size as the workitem box
        top: 120,
        left: targetPosition.x,
        width: targetPosition.width,
        height: targetPosition.height,
        opacity: 1
      })
      .to(heroBoxDummy, 0.6, {
        // Animate to TOP and HEIGHT of Hero container
        height: heroBoxRect.height,
        top: heroBoxRect.top,
        ease: Power4.easeOut
      })
      .to(heroBoxDummy, 0.8, {
        // Animate to width of Hero container
        left: heroBoxRect.left + clipBox.left,
        width: heroBoxRect.width - clipBox.left,
        ease: Power4.easeOut
      })
      .to(heroTitle, 0, {
        opacity: 0
      })
      .to(workpage, 0.35, {
        width: 'auto',
        height: 'auto',
        left: 0,
        right: 0,
        opacity: 1,
        ease: Power4.easeOut
      })
      .to(
        heroBoxDummy,
        0.2,
        {
          opacity: 0,
          display: 'none',
          ease: Power4.easeOut
        },
        '-=0.35'
      )
      .to(heroTitle, 0.5, {
        opacity: 1
      })
      .to(
        heroTitle,
        0.5,
        {
          scrambleText: { chars: 'upperCase', speed: 0.3 }
        },
        '-=0.5'
      );
  } else if (direction === 'out') {
    const timelineOut = new TimelineLite({ paused: true });

    const activeItem = node.querySelector('.worklink--active').parentElement;
    const activeItemTitle = activeItem.querySelector('.work-item__title');
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
      // Animate the text out
      .to(activeItemTitle, {
        duration: 0.35,
        scrambleText: { chars: 'upperCase', speed: 0.3 }
      })
      .to(
        activeItemTitle,
        {
          duration: 0.35,
          opacity: 0
        },
        '-=0.1'
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
        opacity: 0
      })
      // Scroll to the top
      .to(window, {
        duration: 0.35,
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
      .to(workItemDummy, {
        duration: 0.35,
        top: 120
      });

    timelineOut.duration(1.5).play();
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
