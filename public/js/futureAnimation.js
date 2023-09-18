import { locoScroll } from "./main.js";

gsap.registerPlugin(ScrollToPlugin);

export class FutureMouseFollower {
  constructor() {
    this.mouseEl = document.querySelector(".future-cursor");

    gsap.set(this.mouseEl, {
      xPercent: -50,
      yPercent: -50,
    });
    this.mousePos = {
      x: 0,
      y: 0,
    };
    this.cursorPos = {
      x: 0,
      y: 0,
    };

    this.xSet = gsap.quickSetter(this.mouseEl, "x", "px");
    this.ySet = gsap.quickSetter(this.mouseEl, "y", "px");

    this.addEventListener();
    this.tick();
  }

  updateMousePos(e) {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
  }

  addEventListener() {
    window.addEventListener("mousemove", this.updateMousePos.bind(this));
  }

  tick() {
    this.xSet(this.cursorPos.x);
    this.ySet(this.cursorPos.y);

    this.cursorPos.x = gsap.utils.interpolate(
      this.cursorPos.x,
      this.mousePos.x,
      0.2
    );
    this.cursorPos.y = gsap.utils.interpolate(
      this.cursorPos.y,
      this.mousePos.y,
      0.2
    );

    window.requestAnimationFrame(this.tick.bind(this));
  }
}

export class FutureAnimation {
  constructor() {
    this.mouseFollower = new FutureMouseFollower();
    this.pinFutureSection();
    this.futureSectionRevealAnimation();
    this.exploreFutureAnimation();
    this.btnClickListeners();
  }

  pinFutureSection() {
    this.pinTimeline = gsap.timeline({
      ease: "none",
      scrollTrigger: {
        trigger: ".future-pinned-section",
        start: "top top",
        end: `bottom+=${window.innerHeight * 20}px top`,
        pin: true,
        scrub: true,
        onUpdate: (e) => {
          if (e.progress > 0.7) {
            gsap.set(".future .pin-spacer", {
              zIndex: 1,
            });
          } else {
            gsap.set(".future .pin-spacer", {
              zIndex: -1,
            });
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
        ".sindalah-content",
        {
          bottom: "100%",
          delay: 2,
          duration: 4,
        },
        "sindalah-content"
      )
      .to(
        ".sindalah-overlay",
        {
          opacity: 1,
          duration: 1.5,
        },
        "sindalah-content+=0.1"
      )
      .to(
        ".sindalah-feature-1",
        {
          duration: 1.5,
          left: "25%",
        },
        "sindalah-content+=0.1"
      )
      .to(
        ".sindalah-feature-2",
        {
          duration: 1.5,
          left: "25%",
        },
        "sindalah-content+=1.8"
      )
      .to(
        ".sindalah-feature-3",
        {
          duration: 1.5,
          left: "25%",
        },
        "sindalah-content+=3"
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
        [".the-line-img", ".trojena-img"],
        {
          opacity: 0,
        },
        "background-=2"
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

  exploreFutureAnimation() {
    this.exploreFuture = gsap
      .timeline()
      .to(".future-adrenaline-root", {
        opacity: 0,
      })
      .to(".future-showoff-title", {
        top: "45%",
        opacity: 1,
      })
      .to(".showcase-img", {
        keyframes: {
          opacity: [0, 1, 0],
        },
        duration: 1,
        stagger: 0.25,
      })
      .to(
        ".future-showoff-title",
        {
          opacity: 0,
        },
        "+=0.5"
      )
      .to(
        [
          ".future-final-heading-container .heading .line",
          ".future-final-heading-container .go-to-home",
        ],
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          onStart: () => {
            gsap.set(".future-final-heading-container", {
              zIndex: 2,
            });
          },
        },
        "+=0.5"
      )
      .to(
        ".future-final-heading-container .heading .line .strikethrough",
        {
          width: "100%",
          ease: Expo.easeInOut,
          duration: 1.2,
          onStart: () => {
            gsap.set(".future-footer-container", {
              zIndex: 2,
            });
          },
        },
        "footer-reveal"
      )
      .to(
        ".future-footer-container",
        {
          top: () => (window.innerHeight < 1027 ? "-=100px" : "-=125px"),
          ease: Expo.easeOut,
        },
        "footer-reveal"
      )
      .to(
        ".future-footer-container .social-links .link",
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
        },
        "footer-reveal+=0.6"
      )
      .pause();
  }

  btnClickListeners() {
    this.seeMoreBtn = document.querySelector(".btn.see-more");
    this.goHomeBtn = document.querySelector(".btn.go-home");
    this.goToHomeBtn = document.querySelector(".go-to-home");
    this.futureShowcaseSection = document.querySelector(".future-showcase");

    this.seeMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      locoScroll.stop();
      this.exploreFuture.play();
      this.futureShowcaseSection.style.zIndex = "1";
    });

    this.goHomeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      locoScroll.scrollTo("top");
      this.futureShowcaseSection.style.zIndex = "0";
    });

    this.goToHomeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      locoScroll.start();
      locoScroll.scrollTo("top");
      this.exploreFuture.reverse();
      this.futureShowcaseSection.style.zIndex = "0";
      gsap.set(
        [".future-final-heading-container", ".future-footer-container"],
        {
          zIndex: 0,
        }
      );
    });
  }
}
