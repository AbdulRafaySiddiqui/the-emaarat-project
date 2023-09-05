export class SectionScrollAnimation {
  constructor() {
    this.el = document.querySelector(".section4");
    this.pinTween = null;
    this.imagesTranslate = gsap.utils.toArray(".image-hover-anim");
    this.headings = gsap.utils.toArray(".heading-3");
    this.paragraphs = document.querySelectorAll(".paragraph-2");

    this.breakParagraphs();
    this.createIntersectionObserver();
    this.observe();
  }

  createIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (this.pinTween) return;

            this.pinTween = gsap.to(this.el, {
              x: () =>
                `+=${
                  document.querySelector(".pinned-section").offsetWidth -
                  this.el.offsetWidth
                }px`,
              ease: "none",
              scrollTrigger: {
                trigger: ".pinned-section",
                start: `top+=210px top`,
                end: () =>
                  `+=${
                    document.querySelector(".pinned-section").offsetWidth -
                    (this.el.offsetWidth + window.innerWidth / 5.36)
                  }px`,
                scrub: true,
              },
            });

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: ".pinned-section",
                  start: "top top",
                  end: () =>
                    `+=${
                      document.querySelector(".pinned-section").offsetWidth -
                      (this.el.offsetWidth + window.innerWidth / 5.36)
                    }`,
                  scrub: true,
                  //   toggleActions: "play none none reverse",
                },
              })
              .to(this.imagesTranslate[0], {
                filter: "grayscale(0)",
              })
              .to(
                this.imagesTranslate[1],
                {
                  left: 0,
                  ease: "none",
                },
                "first"
              )
              .to(
                this.headings[0],
                {
                  // HIDE
                  clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
                  ease: "none",
                },
                "first"
              )
              .to(
                `.text1 .line`,
                {
                  stagger: 0.02,
                  //   opacity: 0,
                  clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
                  ease: "none",
                },
                "first"
              )
              .to(
                this.headings[1],
                {
                  // VISIBLE
                  clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                  ease: "none",
                },
                "first+=0.05"
              )
              .to(
                `.text2 .line`,
                {
                  stagger: 0.02,
                  clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                  ease: "none",
                },
                "first+=0.05"
              )
              .to(this.imagesTranslate[1], {
                filter: "grayscale(0)",
              })
              .to(
                this.imagesTranslate[2],
                {
                  left: 0,
                  ease: "none",
                },
                "second"
              )
              .to(
                this.headings[1],
                {
                  clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
                  ease: "none",
                },
                "second"
              )
              .to(
                ".text2 .line",
                {
                  stagger: 0.02,
                  //   opacity: 0,
                  clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
                  ease: "none",
                },
                "second"
              )
              .to(
                this.headings[2],
                {
                  clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                  ease: "none",
                },
                "second+=0.05"
              )
              .to(
                ".text3 .line",
                {
                  stagger: 0.02,
                  clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                  ease: "none",
                },
                "second+=0.05"
              )
              .to(this.imagesTranslate[2], {
                filter: "grayscale(0)",
              })
              .to(
                this.imagesTranslate[3],
                {
                  left: 0,
                  ease: "none",
                },
                "third"
              )
              .to(
                this.headings[2],
                {
                  clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
                  ease: "none",
                },
                "third"
              )
              .to(
                ".text3 .line",
                {
                  stagger: 0.02,
                  clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
                  ease: "none",
                },
                "third"
              )
              .to(
                this.headings[3],
                {
                  clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                  ease: "none",
                },
                "third+=0.05"
              )
              .to(
                ".text4 .line",
                {
                  stagger: 0.02,
                  clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                  ease: "none",
                },
                "third+=0.05"
              )
              .to(this.imagesTranslate[3], {
                filter: "grayscale(0)",
              })
              .to(
                this.imagesTranslate[4],
                {
                  left: 0,
                  ease: "none",
                },
                "fourth"
              )
              .to(
                this.headings[3],
                {
                  clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
                  ease: "none",
                },
                "fourth"
              )
              .to(
                ".text4 .line",
                {
                  clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
                  ease: "none",
                  stagger: 0.02,
                },
                "fourth"
              )
              .to(
                this.headings[4],
                {
                  clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                  ease: "none",
                },
                "fourth+=0.05"
              )
              .to(
                ".text5 .line",
                {
                  clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                  ease: "none",
                  stagger: 0.02,
                },
                "fourth+=0.05"
              )
              .to(this.imagesTranslate[4], {
                filter: "grayscale(0)",
              })
              .to(this.imagesTranslate[5], {
                left: 0,
                ease: "none",
              })
              .to(this.imagesTranslate[5], {
                filter: "grayscale(0)",
              });
          }
        });
      },
      {
        root: document.querySelector(".past"),
        rootMargin: "250px",
        threshold: 1.0,
      }
    );
  }

  observe() {
    this.observer.observe(this.el);
  }

  breakParagraphs() {
    this.paragraphs.forEach((para) => {
      new SplitType(para, { types: "lines" });
    });
  }
}
