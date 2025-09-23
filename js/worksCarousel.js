export function initWorksCarousel() {
  const carousel = document.querySelector(".works-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".works-track");
  const slides = carousel.querySelectorAll(".works-slide");
  const prevBtn = carousel.querySelector(".works-btn.prev");
  const nextBtn = carousel.querySelector(".works-btn.next");

  let index = 0;

  function getSlideWidth() {
    return slides[0].offsetWidth + 16; // width + gap
  }

  function getMaxIndex() {
    const visibleCount = Math.floor(carousel.offsetWidth / getSlideWidth());
    return slides.length - visibleCount; // last full "page"
  }

  function updateCarousel() {
    track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index >= getMaxIndex();
  }

  prevBtn.addEventListener("click", () => {
    if (index > 0) index--;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    if (index < getMaxIndex()) index++;
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);

  updateCarousel();
}
