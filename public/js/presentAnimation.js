import { CustomCursor } from "./customCursor.js";
export class PresentAnimation {
  constructor() {
    this.breakContent();
    this.paraChars = gsap.utils.toArray(".present-content .content .char");
    this.animatePatternImage();
    this.animateParagraph();
    this.animatePresentTitle();
    this.animatePresentContent();
    this.animateRevealImage();
    this.lastSectionRevealAnimation();
    this.animateStar();
    this.cursorAnimation = new CustomCursor(document.querySelector("#cursor"));
  }

  animatePatternImage() {
    gsap.to(".pattern-img", {
      rotate: 0,
      ease: "none",

      scrollTrigger: {
        trigger: ".present-inner",
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: true,
        onEnter: () => {
          document.querySelector(".main").style.willChange = "transform";
        },
        onEnterBack: () => {
          document.querySelector(".main").style.willChange = "auto";
        },
      },
    });
  }

  animateStar() {
    gsap.to(".spinning-star", {
      rotate: "360deg",
      scrollTrigger: {
        id: "start-rotate-anim",
        trigger: ".present-section-content",
        start: "top 50%",
        end: () => "bottom+=2000px top",
        scrub: true,
      },
    });
  }

  animateParagraph() {
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "para-animate",
        trigger: ".present-inner",
        start: "top top",
        end: "bottom top",
        toggleActions: "play none none reverse",
        scrub: true,
      },
    });

    tl.fromTo(
      ".present-content .heading .char",
      {
        clipPath: "polygon(0 0, 0% 0, 0% 99%, 0% 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 99%, 0% 100%)",
        stagger: 0.08,
      }
    ).from(
      this.paraChars,
      {
        y: 40,
        x: -40,
        opacity: 0,
        duration: 0.02,
        ease: Power4.easeInOut,
        stagger: 0.01,
      },
      "-=0.6"
    );
  }

  breakContent() {
    new SplitType(".present-content .content", { type: "words, chars" });
    new SplitType(".present-content .heading", { type: "chars" });
    new SplitType(".present-section-content .para", { type: "words, chars" });
  }

  animatePresentTitle() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".present-section-title",
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: true,
        },
      })
      .to(
        ".present-section-title .heading",
        {
          scale: 2.5,
          ease: "none",
        },
        "animate"
      )
      .to(
        ".image-container .image",
        {
          y: 0,
          ease: "none",
        },
        "animate"
      );
  }

  animatePresentContent() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".present-section-content",
          scrub: true,
          start: "top-=50% top",
          end: "bottom-=50% top",
        },
      })
      .to(".present-section-content .para .char", {
        opacity: 1,
        stagger: 0.25,
        ease: "none",
      });
  }

  animateRevealImage() {
    gsap.to(".present-section-image-reveal .image-reveal", {
      width: "100%",
      scrollTrigger: {
        id: "image-reveal",
        trigger: ".present-section-image-reveal",
        start: "top top",
        pin: true,
        scrub: true,
      },
    });
  }

  lastSectionRevealAnimation() {
    ScrollTrigger.create({
      trigger: ".future-init-container",
      start: "top top",
      end: "bottom top",
      pin: true,
      scrub: true,
    });
  }
}
