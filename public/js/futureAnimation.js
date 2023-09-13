export class FutureAnimation {
  constructor() {
    this.revealFirstSection();
    this.pinFutureSection();
    this.futureSectionRevealAnimation();
  }

  pinFutureSection() {
    this.pinTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".future-pinned-section",
        start: "top top",
        end: `bottom+=${window.innerHeight * 4}px top`,
        pin: true,
        markers: true,
        scrub: true,
        onUpdate: (e) => {
          if (e.progress > 0.97) {
            this.firstSectionReveal.play();
          } else {
            this.firstSectionReveal.reverse();
          }
        },
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
      .to(".future-init-container", {
        duration: 1,
      });
  }

  revealFirstSection() {
    this.firstSectionReveal = gsap
      .timeline()
      .to(
        [".grid-line1", ".grid-line2"],
        {
          x: 0,
          stagger: 0.2,
        },
        "revealGrid"
      )
      .to(
        [".grid-line3", ".grid-line4"],
        {
          y: 0,
          stagger: 0.2,
        },
        "revealGrid+=0.2"
      )
      .to(
        ".the-line-img",
        {
          opacity: 1,
        },
        "revealGrid+=1.2"
      )
      .to(
        ".main-heading",
        {
          opacity: 1,
        },
        "revealGrid+=1.5"
      )
      .pause();
  }
}
