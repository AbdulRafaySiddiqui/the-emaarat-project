export async function loaderAnimation() {
  await gsap
    .timeline({
      onComplete: () => {
        const loaderEl = document.querySelector(".loader");
        loaderEl.style.display = "none";
      },
    })
    .from(".image", {
      opacity: 0,
      ease: Quart.easeInOut,
    })
    .from(
      ".loader .child",
      {
        y: "100%",
        stagger: 0.1,
        duration: 1.4,
        delay: 0.2,
        ease: Quart.easeInOut,
      },
      "-=0.6"
    )
    .from(
      ".progress__indicator",
      {
        scale: 0,
        ease: Quart.easeInOut,
      },
      "-=1.7"
    )
    .from(
      ".progress__bar",
      {
        scaleX: 0,
        transformOrigin: "left",
        ease: Quart.easeInOut,
      },
      "-=1.7"
    )
    .to(
      ".progress__indicator",
      {
        left: "100%",
        duration: 2,
        delay: 0.2,
        ease: Quart.easeInOut,
      },
      "-=1"
    )
    .to(".loader .child", {
      y: "-100%",
      duration: 1.4,
      stagger: 0.1,
      delay: 0.2,
      ease: Quart.easeInOut,
    })
    .to(
      ".progress__indicator",
      {
        scale: 0,
        ease: Quart.easeInOut,
      },
      "-=2"
    )
    .to(
      ".progress__bar",
      {
        scaleX: 0,
        transformOrigin: "right",
        ease: Quart.easeInOut,
      },
      "-=1.5"
    )
    .to(
      ".image",
      {
        opacity: 0,
        ease: Quart.easeInOut,
      },
      "-=0.6"
    )
    .to(".loader", {
      opacity: 0,
      duration: 2,
      ease: Expo.easeInOut,
    });
}
