export class FutureAnimation {
  constructor() {
    this.pinFutureSection();
    this.futureSectionRevealAnimation();
  }

  pinFutureSection() {
    this.pinTimeline = gsap.timeline({
      ease: "none",
      scrollTrigger: {
        trigger: ".future-pinned-section",
        start: "top top",
        end: `bottom+=${window.innerHeight * 20}px top`,
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
      )
      .to(
        [".main-heading .filled", ".main-heading .outlined"],
        {
          yPercent: -20,
          duration: 1,
          opacity: 0,
          stagger: 0.065,
        },
        "heading"
      )
      .to(
        ".the-line-heading .heading",
        {
          top: "45%",
          duration: 1,
          opacity: 1,
        },
        "heading+=0.5"
      )
      .to(
        ".scroll-for-more",
        {
          opacity: 0,
          // duration: 1,
        },
        "heading+=0.9"
      )
      .to(
        [".the-line-thumbnails .line1", ".the-line-thumbnails .line2"],
        {
          left: "75%",
          scale: 1,
          opacity: 1,
          stagger: 0.2,
        },
        "heading+=1"
      )
      .to(
        ".the-line-thumbnails .line3",
        {
          scale: 1,
          opacity: 1,
          left: "0%",
        },
        "heading+=1.2"
      )
      .to(".the-line-thumbnails", {
        duration: 2,
      })
      .to(
        ".the-line-img img",
        {
          duration: 2,
          opacity: 0.2,
        },
        "heading+=3.8"
      )
      .to(
        [".the-line-thumbnails .line3", ".the-line-thumbnails .line2"],
        {
          duration: 1.4,
          top: "100%",
          scale: 0.8,
          opacity: 0,
          stagger: 0.2,
        },
        "heading+=4"
      )
      .to(
        ".the-line-thumbnails .line1",
        {
          duration: 1.4,
          scale: 0.8,
          opacity: 0,
          top: "-25%",
        },
        "heading+=4.2"
      )
      .to(
        ".the-line-content",
        {
          bottom: "10%",
          duration: 1.2,
          opacity: 1,
        },
        "heading+=4.5"
      )
      .to(
        ".the-line-details",
        {
          top: "-50%",
          duration: 1.5,
        },
        "heading+=10"
      )
      .to(
        ".trojena-img",
        {
          left: "25%",
          duration: 3,
        },
        "heading+=12"
      )
      .to(
        ".trojena-thumbnail",
        {
          left: "75%",
          duration: 1.5,
        },
        "heading+=12"
      )
      .to(
        ".trojena-content",
        {
          bottom: "100%",
          duration: 4,
        },
        "heading+=12"
      )
      .to(
        ".trojena-thumbnail",
        {
          left: "100%",
          duration: 1.5,
        },
        "heading+=18"
      )
      .to(
        ".future__root",
        {
          duration: 2,
          backgroundColor: "white",
        },
        "heading+=20"
      )
      .to(
        ".grid-line",
        {
          duration: 2,
          backgroundColor: "rgba(24, 36, 48, 0.1)",
        },
        "heading+=20"
      )
      .to(
        ".future__root .logo",
        {
          color: "#182430",
          duration: 2,
        },
        "heading+=20"
      )
      .to(
        ".sindalah-img",
        {
          left: "25%",
          duration: 3,
        },
        "+=1.5"
      )
      .to(
        ".sindalah-title",
        {
          opacity: 1,
        },
        "+=1.5"
      )
      .to(
        ".sindalah-title",
        {
          opacity: 0,
          duration: 1.5,
        },
        "+=3"
      )
      .to(
        ".sindalah-overlay",
        {
          opacity: 1,
          duration: 1.5,
        },
        "+=0.5"
      )
      .to(
        ".sindalah-feature-1",
        {
          duration: 1.5,
          left: "25%",
        },
        "-=0.4"
      )
      .to(
        ".sindalah-feature-2",
        {
          duration: 1.5,
          left: "25%",
        },
        "-=0.1"
      )
      .to(
        ".sindalah-feature-3",
        {
          duration: 1.5,
          left: "25%",
        },
        "-=0.1"
      )
      .to(
        ".future__root",
        {
          duration: 2,
          backgroundColor: "black",
        },
        "background"
      )
      .to(
        ".grid-line",
        {
          duration: 2,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
        "background"
      )
      .to(
        ".future__root .logo",
        {
          duration: 2,
          color: "white",
        },
        "background"
      )
      .to(
        [".the-line", ".trojena", ".sindalah", ".grid-line"],
        {
          duration: 2,
          opacity: 0,
        },
        "background+=2"
      )
      .to(
        ".future-adrenaline",
        {
          opacity: 1,
          duration: 2,
        },
        "+=0.4"
      );
  }
}
