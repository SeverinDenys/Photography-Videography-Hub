// === Intro carousel start ===
const slides = document.querySelectorAll(".carousel-slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === i);
  });
}

next.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  showSlide(index);
});

prev.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
});

// Auto-slide every 5 seconds
setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 5000);

// === Intro carousel finish ===

// === My Works carousel start ===

const track = document.querySelector(".works-track");
const slidesWorks = document.querySelectorAll(".works-slide");
const prevBtn = document.querySelector(".works-btn.prev");
const nextBtn = document.querySelector(".works-btn.next");

let indexWorks = 0; // which "step" we're on

// width of one slide (incl. margins)
const slideWidth = slidesWorks[0].offsetWidth + 20;

// how many slides fit in the visible area
const visibleSlides = Math.floor(
  track.parentElement.offsetWidth / slideWidth
);

// last valid index (don’t scroll past the last photo)
const maxIndex = slidesWorks.length - visibleSlides;

function updateCarousel() {
  track.style.transform = `translateX(-${indexWorks * slideWidth}px)`;

  // disable buttons at ends
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

// === My Works carousel finish ===
