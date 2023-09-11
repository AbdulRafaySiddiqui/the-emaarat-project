export class CustomCursor {
  constructor(cursorEl) {
    this.cursorEl = cursorEl;
    this.cursorChilds = this.cursorEl.children;
    this.pinMouseSection();
    this.mouseMove();
  }

  mouseMove() {
    window.addEventListener("mousemove", (e) => {
      gsap.to(this.cursorChilds, {
        x: (i) => {
          return (
            e.clientX - this.cursorChilds[i].getBoundingClientRect().width / 2
          );
        },
        y: (i) => {
          return (
            e.clientY - this.cursorChilds[i].getBoundingClientRect().height / 2
          );
        },
        duration: 0.6,
        stagger: 0.04,
      });
    });
  }
  pinMouseSection() {
    ScrollTrigger.create({
      trigger: "#cursor",
      start: "top top",
      end: `${document.querySelector(".present").offsetHeight}px top`,
      pin: true,
      scrub: true,
      //   pinSpacing: false,
    });
  }
}
