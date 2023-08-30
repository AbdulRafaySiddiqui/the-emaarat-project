export class PresentAnimation {
  constructor() {
    this.breakContent();
    this.paraChars = gsap.utils.toArray(".present-content .content .char");
    this.animatePatternImage();
    this.animateParagraph();
    this.animatePresentContent();
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
  }

  animatePresentContent() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".present-section-content",
          start: "top top",
          end: "bottom top",
          pin: true,
          markers: true,
          scrub: true,
        },
      })
      .to(
        ".present-section-content .heading",
        {
          scale: 2.5,
          ease: "none",
        },
        "animate"
      )
      .to(
        ".image-container .image",
        {
          top: 0,
          ease: "none",
        },
        "animate"
      );
  }
}
