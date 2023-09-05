export class PastLastSectionAnimation {
  constructor() {
    this.el = document.querySelector(".last-section");
    this.sectionToScroll = document.querySelector(".content.section5");
    this.parentSection = document.querySelector(".last-section");
    this.topImages = gsap.utils.toArray(".top-images .image-8");
    this.bottomImages = gsap.utils.toArray(".bottom-images .image-9");
    this.timelineReveal = null;
    this.scrollTween = null;

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
    if (this.timelineReveal) return;

    this.timelineReveal = gsap
      .timeline({
        scrollTrigger: {
          trigger: this.el,
          start: `top+=${window.innerWidth / 4}px top`,
          end: "bottom end",
          markers: true,
          toggleActions: "play none none reverse",
        },
      })
      .to(
        ".top-images",
        {
          top: "25%",
        },
        "image-section"
      )
      .to(
        ".bottom-images",
        {
          top: "75%",
        },
        "image-section"
      );
  }

  scrollSectionWithViewport() {
    if (this.scrollTween) return;

    gsap.to(this.sectionToScroll, {
      x: () =>
        `+=${
          this.parentSection.offsetWidth - this.sectionToScroll.offsetWidth
        }px`,
      ease: "none",
      scrollTrigger: {
        trigger: this.parentSection,
        start: "top+=210px top",
        end: () =>
          `+=${
            this.parentSection.offsetWidth -
            (this.sectionToScroll.offsetWidth + window.innerWidth / 8.1)
          }px`,
        scrub: true,
      },
    });
  }
}
