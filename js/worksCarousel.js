export function initWorksCarousel() {
  const carousel = document.querySelector(".works-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".works-track");
  const slides = carousel.querySelectorAll(".works-slide");
  const prevBtn = carousel.querySelector(".works-btn.prev");
  const nextBtn = carousel.querySelector(".works-btn.next");

  let index = 0;

  function getSlideWidth() {
    const slide = slides[0];
    const computedStyle = window.getComputedStyle(track);
    const gap = parseFloat(computedStyle.gap) || 0;
    return slide.offsetWidth + gap;
  }

  function getMaxIndex() {
    const carouselWidth = carousel.offsetWidth;
    const slideWidth = getSlideWidth();
    const totalTrackWidth =
      slides.length * slideWidth -
      parseFloat(window.getComputedStyle(track).gap || 0);

    const maxScrollDistance = totalTrackWidth - carouselWidth;

    const maxIndex = Math.max(
      0,
      Math.ceil(maxScrollDistance / slideWidth)
    );

    return maxIndex;
  }

  function updateCarousel() {
    const slideWidth = getSlideWidth();
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index >= getMaxIndex();
  }

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    const maxIndex = getMaxIndex();
    if (index < maxIndex) {
      index++;
      updateCarousel();
    }
  });

  window.addEventListener("resize", () => {
    index = Math.min(index, getMaxIndex());
    updateCarousel();
  });

  updateCarousel();
}
