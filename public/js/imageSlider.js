export class ImageSlider {
  constructor() {
    this.buttons = document.querySelectorAll(".slider-btn");
    this.bgImages = document.querySelectorAll(".bg-image");
    this.heads = document.querySelectorAll(".detail-content-head .head");
    this.paras = document.querySelectorAll(".detail-content-paras .para");
    this.innerImages = document.querySelectorAll(".inner-image");
    this.activeIndex = "0";
    this.previousIndex = null;
    this.changeActive();
  }

  changeActive() {
    this.buttons.forEach((btn, i) => {
      btn.addEventListener("click", (e) => {
        this.buttons.forEach((_btn) => {
          _btn.dataset.isactive = "false";
        });
        this.previousIndex = this.activeIndex;

        if (Number(btn.dataset.index) >= Number(this.activeIndex)) {
          let indexes = [];
          this.previousIndex = this.activeIndex;
          this.activeIndex = btn.dataset.index;
          btn.dataset.isactive = "true";

          this.bgImages.forEach((img, i) => {
            if (i > Number(btn.dataset.index)) return;
            indexes.push(i);
          });

          this.moveDown(indexes, this.previousIndex, this.activeIndex);
        } else {
          let indexes = [];
          this.previousIndex = this.activeIndex;
          this.activeIndex = btn.dataset.index;
          btn.dataset.isactive = "true";

          this.bgImages.forEach((img, i) => {
            if (i <= Number(btn.dataset.index)) return;
            indexes.push(i);
          });
          this.moveUp(indexes, this.previousIndex, this.activeIndex);
        }
      });
    });
  }

  moveDown(indexes, previousIndex, activeIndex) {
    const { animateBgImages, animateFgImages } =
      this.getAnimateBgAndFgImages(indexes);

    gsap
      .timeline()
      .to(
        animateBgImages,
        {
          top: 0,
          duration: 1.4,
          ease: Expo.easeInOut,
        },
        "moveDown"
      )
      .to(
        animateFgImages,
        {
          top: 0,
          duration: 1.4,
          ease: Expo.easeInOut,
        },
        "moveDown"
      )
      .to(
        this.heads[previousIndex],
        {
          opacity: 0,
          duration: 1.4,
          ease: Expo.easeInOut,
        },
        "moveDown-=0.5"
      )
      .to(
        this.heads[activeIndex],
        {
          opacity: 1,
          duration: 1.4,
          ease: Expo.easeInOut,
        },
        "moveDown"
      )
      .to(
        this.paras[previousIndex],
        {
          opacity: 0,
          duration: 1.4,
          ease: Expo.easeInOut,
        },
        "moveDown-=0.8"
      )
      .to(
        this.paras[activeIndex],
        {
          opacity: 1,
          duration: 1.4,
          ease: Expo.easeInOut,
        },
        "moveDown"
      );
  }
  moveUp(indexes, previousIndex, activeIndex) {
    const { animateBgImages, animateFgImages } =
      this.getAnimateBgAndFgImages(indexes);

    gsap
      .timeline()
      .to(
        animateBgImages,
        {
          top: "-100%",
          duration: 1.4,
          ease: Expo.easeInOut,
        },
        "moveUp"
      )
      .to(
        animateFgImages,
        {
          top: "-100%",
          duration: 1.4,
          ease: Expo.easeInOut,
        },
        "moveUp"
      )
      .to(
        this.heads[previousIndex],
        {
          opacity: 0,
          duration: 1.4,
          ease: Expo.easeInOut,
        },
        "moveUp-=0.5"
      )
      .to(
        this.heads[activeIndex],
        {
          opacity: 1,
          duration: 1.4,
          ease: Expo.easeInOut,
        },
        "moveUp"
      )
      .to(
        this.paras[previousIndex],
        {
          opacity: 0,
          duration: 1.4,
          ease: Expo.easeInOut,
        },
        "moveUp-=0.8"
      )
      .to(
        this.paras[activeIndex],
        {
          opacity: 1,
          duration: 1.4,
          ease: Expo.easeInOut,
        },
        "moveUp"
      );
  }

  getAnimateBgAndFgImages(indexes) {
    let animateBgImages = [];
    let animateFgImages = [];

    for (let i = 0; i <= indexes.length; i++) {
      const imgIndex = indexes[i];
      animateBgImages.push(this.bgImages[imgIndex]);
      animateFgImages.push(this.innerImages[imgIndex]);
    }

    return { animateBgImages, animateFgImages };
  }
}
