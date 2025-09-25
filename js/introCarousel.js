export function initCarousel(selector) {
  const carousel = document.querySelector(selector);
  if (!carousel) return;

  const slides = carousel.querySelectorAll(".carousel-slide");
  const prev = carousel.querySelector(".prev");
  const next = carousel.querySelector(".next");
  let index = 0;

  function showSlide(i) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === i);
    });
  }

  if (next && prev) {
    next.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      showSlide(index);
    });

    prev.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    });
  }

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 5000);

  showSlide(index);
}
