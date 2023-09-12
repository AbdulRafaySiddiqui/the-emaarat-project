export class CustomCursor {
  constructor(cursorEl) {
    this.cursorEl = cursorEl;
    this.cursorChilds = gsap.utils.toArray(this.cursorEl.children);
    gsap.set(this.cursorChilds, { xPercent: -50, yPercent: -50 });
    this.mousePosition = {
      x: 0,
      y: 0,
    };
    this.cursorPosition = {
      x: 0,
      y: 0,
    };
    this.speed = 0.2;
    // this.xTo = gsap.quickTo(this.cursorChilds[0], "x", {
    //   duration: 0.6,
    //   stagger: 0.005,
    //   ease: "none",
    // });
    // this.yTo = gsap.quickTo(this.cursorChilds[0], "y", {
    //   duration: 0.6,
    //   stagger: 0.005,
    //   ease: "none",
    // });
    this.pinMouseSection();
    this.mouseMove();
    this.ticker();
  }

  mouseMove() {
    // console.log("this.cursorChilds", this.cursorChilds);

    window.addEventListener("mousemove", (e) => {
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
    });
  }
  pinMouseSection() {
    ScrollTrigger.create({
      trigger: "#cursor",
      start: "top top",
      end: `${
        document.querySelector(".present").offsetHeight - window.innerHeight
      }px top`,
      pin: true,
      scrub: true,
    });
  }

  ticker() {
    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - this.speed, gsap.ticker.deltaRatio());

      this.cursorPosition.x +=
        (this.mousePosition.x - this.cursorPosition.x) * dt;
      this.cursorPosition.y +=
        (this.mousePosition.y - this.cursorPosition.y) * dt;

      gsap.to(this.cursorChilds, {
        x: this.cursorPosition.x,
        y: this.cursorPosition.y,
        duration: 0.5,
        stagger: 0.02,
        ease: "none",
      });
    });
  }
}
