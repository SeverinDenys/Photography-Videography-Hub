// intro carousel beginning
const slides = document.querySelectorAll(".carousel-slide");
let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === i);
  });
}

// Auto-slide every 5 seconds
setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 5000);

// Show the first slide immediately
showSlide(index);
