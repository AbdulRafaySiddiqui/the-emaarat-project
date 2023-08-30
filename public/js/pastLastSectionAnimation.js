export class PastLastSectionAnimation {
  constructor() {
    this.el = document.querySelector(".last-section");
    this.topImages = gsap.utils.toArray(".top-images .image-8");
    this.bottomImages = gsap.utils.toArray(".bottom-images .image-9");
    this.timelineReveal = null;

    this.createIntersectionObserver();
    this.observe();
  }

  createIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!this.timelineReveal) {
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
          }
        });
      },
      {
        root: document.querySelector(".past"),
        rootMargin: "120px",
        threshold: 0.1,
      }
    );
  }
  observe() {
    this.observer.observe(this.el);
  }
}
