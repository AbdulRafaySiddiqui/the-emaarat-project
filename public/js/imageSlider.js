export class ImageSlider {
  constructor() {
    this.buttons = document.querySelectorAll(".slider-btn");
    this.bgImages = document.querySelectorAll(".bg-image");
    this.innerImages = document.querySelectorAll(".inner-image");
    this.activeIndex = "0";
    this.changeActive();
  }

  changeActive() {
    this.buttons.forEach((btn, i) => {
      btn.addEventListener("click", (e) => {
        this.buttons.forEach((_btn) => {
          _btn.dataset.isactive = "false";
        });
        this.activeIndex = btn.dataset.index;
        btn.dataset.isactive = "true";
        console.log("active Index", this.activeIndex);

        this.moveDown();
      });
    });
  }

  moveDown() {
    this.bgImages.forEach((_img, i) => {
      if (this.activeIndex === i.toString()) {
        if (_img.dataset.animcompleted !== "true") {
          console.log("ANIM Completed", _img.dataset.animcompleted, i);
          gsap
            .timeline({
              onComplete: () => {
                this.bgImages.forEach(_otherImage, (i) => {
                  _otherImage.dataset.animcompleted = "false";
                });

                _img.dataset.animcompleted = "true";
              },
            })
            .to(
              _img,
              {
                top: 0,
                duration: 1.4,
                ease: Expo.easeInOut,
              },
              "moveDown"
            )
            .to(
              this.innerImages[i],
              {
                top: 0,
                duration: 1.4,
                ease: Expo.easeInOut,
              },
              "moveDown"
            );
        }
      }
    });
  }
}
