export function initWorksCarousel() {
  const track = document.querySelector(".works-track");
  const slidesWorks = document.querySelectorAll(".works-slide");
  const prevBtn = document.querySelector(".works-btn.prev");
  const nextBtn = document.querySelector(".works-btn.next");

  let indexWorks = 0;
  const slideWidth = slidesWorks[0].offsetWidth + 20;
  const visibleSlides = Math.floor(
    track.parentElement.offsetWidth / slideWidth
  );
  const maxIndex = slidesWorks.length - visibleSlides;

  function updateCarousel() {
    track.style.transform = `translateX(-${
      indexWorks * slideWidth
    }px)`;
    prevBtn.disabled = indexWorks === 0;
    nextBtn.disabled = indexWorks >= maxIndex;
  }

  updateCarousel();

  nextBtn.addEventListener("click", () => {
    if (indexWorks < maxIndex) {
      indexWorks++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (indexWorks > 0) {
      indexWorks--;
      updateCarousel();
    }
  });
}
