import { initCarousel } from "./js/introCarousel.js";
import { initWorksCarousel } from "./js/worksCarousel.js";

document.addEventListener("DOMContentLoaded", () => {
  initCarousel(".intro-carousel");
  initCarousel(".cameras-carousel");
  initWorksCarousel();
});

let camerasData = [];
let brandSelect = document.getElementById("brand");
let matrixSelect = document.getElementById("sensor");
let priceSelect = document.getElementById("price");

// =============================
// Hamburger menu logic
// =============================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const icon = hamburger.querySelector("i");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("open");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

// =============================
// Filter listeners
// =============================
brandSelect.addEventListener("change", applyFilters);
matrixSelect.addEventListener("change", applyFilters);
priceSelect.addEventListener("change", applyFilters);

document
  .querySelectorAll('input[name="usecase"]')
  .forEach((checkbox) => {
    checkbox.addEventListener("change", applyFilters);
  });

// =============================
// Filtering logic
// =============================
function getFilteredCameras() {
  let filtered = camerasData;

  // Brand filter
  if (brandSelect.value) {
    filtered = filtered.filter(
      (camera) =>
        camera.brand.toLowerCase() === brandSelect.value.toLowerCase()
    );
  }

  // Sensor filter
  const normalize = (str) => str.toLowerCase().replace(/[-\s]/g, "");
  if (matrixSelect.value) {
    const sensorValue = normalize(matrixSelect.value);
    filtered = filtered.filter(
      (camera) => normalize(camera.sensor) === sensorValue
    );
  }

  // Price filter
  if (priceSelect.value) {
    const value = priceSelect.value;
    if (value.includes("-")) {
      const [min, max] = value.split("-").map(Number);
      filtered = filtered.filter(
        (camera) => camera.price >= min && camera.price <= max
      );
    } else if (value.includes("+")) {
      const min = parseInt(value);
      filtered = filtered.filter((camera) => camera.price >= min);
    }
  }

  // UseCases filter
  const checkedBoxes = document.querySelectorAll(
    'input[name="usecase"]:checked'
  );
  const selectedUseCases = Array.from(checkedBoxes).map((checkbox) =>
    checkbox.value.toLowerCase()
  );

  if (selectedUseCases.length > 0) {
    filtered = filtered.filter((camera) =>
      camera.useCases.some((useCase) =>
        selectedUseCases.includes(useCase.toLowerCase())
      )
    );
  }

  return filtered;
}

function applyFilters() {
  const filtered = getFilteredCameras();

  if (
    !brandSelect.value &&
    !matrixSelect.value &&
    !priceSelect.value &&
    document.querySelectorAll('input[name="usecase"]:checked')
      .length === 0
  ) {
    renderCameras(camerasData.slice(0, 9));
  } else {
    renderCameras(filtered);
  }
}

// =============================
// Fetch cameras
// =============================
async function getCameraData() {
  try {
    const response = await fetch("/data/cameras.json");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

// =============================
// Render cameras
// =============================
const renderCameras = (cameras) => {
  const section = document.getElementById("cameras");
  section.innerHTML = "";

  cameras.forEach((camera) => {
    const container = document.createElement("div");
    container.classList.add("cameras-container");

    container.innerHTML = `
  <div class="cameras-photo">
    <img src="${camera.image}" alt="${camera.model}">
  </div>
  <div class="cameras-info">
    <h4 class="camera-name">${camera.brand} ${camera.model}</h4>
    <p class="camera-description">${camera.sensor}, ${camera.megapixels} MP</p>
    <p class="camera-price">Price: $${camera.price}</p>
  </div>
`;
    // send only brand, sensor, and use cases
    container.addEventListener("click", () => {
      console.log("clicked:", camera);

      const selectedBrand = brandSelect.value;
      const selectedSensor = matrixSelect.value;
      const selectedUseCases = Array.from(
        document.querySelectorAll('input[name="usecase"]:checked')
      ).map((checkbox) => checkbox.value);

      const queryParams = new URLSearchParams({
        id: camera.id,
        brand: selectedBrand || "",
        sensor: selectedSensor || "",
        use: selectedUseCases.join(","),
      });

      // Redirect with filters in URL (no price)
      window.location.href = `/pages/camera.html?${queryParams.toString()}`;
    });

    section.appendChild(container);
  });
};

// =============================
// Init
// =============================
getCameraData().then((data) => {
  camerasData = data;
  applyFilters();
});
