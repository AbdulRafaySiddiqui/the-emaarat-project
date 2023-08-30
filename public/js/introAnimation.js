import { fluidAnimation } from "./fluidAnimation.js";
import { PastLastSectionAnimation } from "./pastLastSectionAnimation.js";
import { SectionScrollAnimation } from "./sectionscrollAnimation.js";

export async function introAnimation() {
  new SectionScrollAnimation();

  const canvas = document.getElementsByTagName("canvas")[0];
  const canvasWrapper = document.querySelector(".canvas");

  canvasWrapper.style.zIndex = -200;

  fluidAnimation(canvas);

  gsap.set([".intro", ".loader", ".past"], {
    userSelect: "none",
    pointerEvents: "none",
  });

  const introTitle = await gsap
    .timeline({
      onComplete: () => {
        const mainEl = document.querySelector(".main");
        mainEl.style.height = "100%";
      },
    })
    .to(canvas, {
      opacity: 1,
      duration: 1,
    })
    .to(".intro__title .child", {
      y: "0%",
      duration: 1.4,
      stagger: 0.1,
      delay: 0.2,
      ease: Quart.easeInOut,
    });

  introTitle.kill();

  const pastElChilds = document.querySelectorAll(".item");

  let horizontalScrollWidth = 0;

  pastElChilds.forEach((el) => {
    horizontalScrollWidth += el.offsetWidth;
  });

  const introPast = document.querySelector(".intro-past");

  console.log(".intropast", introPast);

  const scrollTween = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".intro-past",
        start: "top top",
        end: () => `+=${horizontalScrollWidth} top`,
        scrub: true,
        pin: true,
      },
    })
    .to(
      ".intro__title",
      {
        scale: 200,
        x: "1000%",
        ease: "none",
        duration: 1,
      },
      "anim"
    )
    .to(
      ".past",
      {
        rotateY: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "none",
      },
      "anim"
    );

  scrollTween.to(pastElChilds, {
    duration: 8,
    x: () => -(horizontalScrollWidth - pastElChilds[0].offsetWidth),
    ease: "none",
  });

  new SplitType(".para1", {
    types: "words, chars",
  });

  gsap.set(".char", {
    opacity: 0,
  });

  gsap.to(".char", {
    opacity: 1,
    ease: "none",
    stagger: 0.01,
    scrollTrigger: {
      trigger: ".section1",
      containerAnimation: scrollTween,
      scrub: true,
      // markers: true,
      start: () => `+=${pastElChilds[0].offsetWidth - window.innerWidth / 4}px`,
      end: () => `+=${pastElChilds[0].offsetWidth + window.innerWidth / 2}px`,
      invalidateOnRefresh: true,
    },
  });

  new PastLastSectionAnimation();
}
