import { FutureAnimation } from "./futureAnimation.js";
import { animateMarquee } from "./horizontalLoop.js";
import { ImageSlider } from "./imageSlider.js";
import { introAnimation } from "./introAnimation.js";
import { loaderAnimation } from "./loadingAnimation.js";
import { PresentAnimation } from "./presentAnimation.js";

gsap.registerPlugin(ScrollTrigger);

export const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,

  // for tablet smooth
  tablet: { smooth: true },

  // for mobile
  smartphone: { smooth: true },
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },

  // following line is not required to work pinning on touch screen

  // pinType: document.querySelector(".main").style.transform
  //   ? "transform"
  //   : "fixed",
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

ScrollTrigger.defaults({
  scroller: ".main",
  // markers: true,
});
// const canvas = document.querySelector("#webgl-canvas");
// const effect = new ImageHoverEffect(
//   canvas,
//   "/assets/front-image.png",
//   "/assets/back-image.png"
// );

const stopScrollOnMobile = () => {
  if (window.innerWidth < 768) {
    console.log("mobile");
    locoScroll.stop();
  } else {
    console.log("desktop");
    locoScroll.start();
  }
};

const main = async () => {
  stopScrollOnMobile();

  window.addEventListener("resize", stopScrollOnMobile);

  await loaderAnimation();
  await introAnimation();

  new PresentAnimation();
  new ImageSlider();

  animateMarquee();
  new FutureAnimation();
};

main().then(() => {});
