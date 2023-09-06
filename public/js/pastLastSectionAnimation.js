export class PastLastSectionAnimation {
  constructor() {
    this.el = document.querySelector(".last-section");
    this.sectionToScroll = document.querySelector(".content.section5");
    this.parentSection = document.querySelector(".last-section");
    this.topImages = gsap.utils.toArray(".top-images .image-8");
    this.bottomImages = gsap.utils.toArray(".bottom-images .image-9");
    this.timelineRevealTop = null;
    this.timelineRevealBottom = null;
    this.scrollTween = null;
    this.imageReveal = null;

    this.createIntersectionObserver(
      this.scrollSectionWithViewport.bind(this),
      this.sectionToScroll,
      1
    );
    this.createIntersectionObserver(this.revealImages.bind(this), this.el, 0.1);
  }

  createIntersectionObserver(animationCallback, elementToObserve, threshold) {
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animationCallback();
          }
        });
      },
      {
        root: document.querySelector(".past"),
        rootMargin: "250px",
        threshold: threshold,
      }
    );

    this.observer.observe(elementToObserve);
  }

  revealImages() {
    if (this.timelineRevealTop) return;

    this.timelineRevealTop = gsap.to(".top-images", {
      top: "25%",
      scrollTrigger: {
        trigger: this.el,
        start: `top+=${window.innerHeight * 0.15}px top`,
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    });

    if (this.timelineRevealBottom) return;

    gsap.to(".bottom-images", {
      top: "75%",
      scrollTrigger: {
        trigger: this.el,
        start: `top+=${window.innerHeight * 0.9}px top`,
        end: "bottom end",
        toggleActions: "play none none reverse",
      },
    });
  }

  scrollSectionWithViewport() {
    if (this.scrollTween) return;

    this.scrollTween = gsap
      .timeline({
        scrollTrigger: {
          trigger: this.parentSection,
          start: "top+=210px top",
          end: () =>
            `+=${
              document.querySelector(".last-section").offsetWidth -
              (this.sectionToScroll.offsetWidth + window.innerWidth / 9)
            }px`,
          scrub: true,
        },
      })
      .to(this.sectionToScroll, {
        x: () =>
          `+=${
            document.querySelector(".last-section").offsetWidth -
            this.sectionToScroll.offsetWidth
          }px`,
        ease: "none",
      });

    if (this.imageReveal) return;

    this.imageReveal = gsap
      .timeline({
        scrollTrigger: {
          id: "images-reveal-animation-last-section",
          trigger: this.el,
          start: () => `top+=${window.innerHeight * 0.2}px top`,
          end: () => `bottom+=${window.innerHeight * 4}px top`,
          scrub: true,
        },
      })
      .to(
        this.topImages[1],
        {
          y: 0,
        },
        "first"
      )
      .to(
        this.bottomImages[1],
        {
          y: 0,
        },
        "first+=0.2"
      )
      .to(
        this.topImages[2],
        {
          y: 0,
        },
        "second"
      )
      .to(
        this.bottomImages[2],
        {
          y: 0,
        },
        "second+=0.2"
      )
      .to(
        this.topImages[3],
        {
          y: 0,
        },
        "third"
      )
      .to(
        this.bottomImages[3],
        {
          y: 0,
        },
        "third+=0.2"
      );
  }
}
