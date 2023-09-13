export class FutureAnimation {
  constructor() {
    this.pinFutureSection();
    this.futureSectionRevealAnimation();
  }

  pinFutureSection() {
    this.pinTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".future-pinned-section",
        start: "top top",
        end: `bottom+=${window.innerHeight * 10}px top`,
        pin: true,
        markers: true,
        scrub: true,
      },
    });
  }
  futureSectionRevealAnimation() {
    this.pinTimeline
      .to(".future-init-container", {
        duration: 1,
      })
      .to(
        ".future-init-container",
        {
          duration: 2,
          autoAlpha: 0,
        },
        "+=1.4"
      )
      .to(
        [".grid-line1", ".grid-line2"],
        {
          x: 0,
          duration: 2,
          stagger: 0.2,
        },
        "revealGrid"
      )
      .to(
        [".grid-line3", ".grid-line4"],
        {
          y: 0,
          duration: 2,
          stagger: 0.2,
        },
        "revealGrid+=0.2"
      )
      .to(
        ".the-line-img",
        {
          duration: 2,
          opacity: 1,
        },
        "revealGrid+=1.2"
      )
      .to(
        ".main-heading",
        {
          duration: 2,
          opacity: 1,
        },
        "revealGrid+=1.5"
      );
  }

  // revealFirstSection() {
  //   this.firstSectionReveal = gsap
  //     .timeline()
  //     .to(
  //       [".grid-line1", ".grid-line2"],
  //       {
  //         x: 0,
  //         stagger: 0.2,
  //       },
  //       "revealGrid"
  //     )
  //     .to(
  //       [".grid-line3", ".grid-line4"],
  //       {
  //         y: 0,
  //         stagger: 0.2,
  //       },
  //       "revealGrid+=0.2"
  //     )
  //     .to(
  //       ".the-line-img",
  //       {
  //         opacity: 1,
  //       },
  //       "revealGrid+=1.2"
  //     )
  //     .to(
  //       ".main-heading",
  //       {
  //         opacity: 1,
  //       },
  //       "revealGrid+=1.5"
  //     )
  //     .pause();
  // }
}
