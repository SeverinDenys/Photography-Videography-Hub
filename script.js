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

brandSelect.addEventListener("change", applyFilters);

matrixSelect.addEventListener("change", applyFilters);

priceSelect.addEventListener("change", applyFilters);

function getFilteredCameras() {
  let filtered = camerasData;

  if (brandSelect.value) {
    filtered = filtered.filter(
      (camera) =>
        camera.brand.toLowerCase() === brandSelect.value.toLowerCase()
    );
  }

  const normalize = (str) => str.toLowerCase().replace(/[-\s]/g, ""); // removes dashes & spaces

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
      // Example "500-1000"
      const [min, max] = value.split("-").map(Number);
      filtered = filtered.filter(
        (camera) => camera.price >= min && camera.price <= max
      );
    } else if (value.includes("+")) {
      // Example "2000+"
      const min = parseInt(value); // "2000" -> 2000
      filtered = filtered.filter((camera) => camera.price >= min);
    }
  }

  return filtered;
}

function applyFilters() {
  const filtered = getFilteredCameras();

  if (
    !brandSelect.value &&
    !matrixSelect.value &&
    !priceSelect.value
  ) {
    renderCameras(camerasData.slice(0, 10));
  } else {
    renderCameras(filtered);
  }
}

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

const renderCameras = (cameras) => {
  const section = document.getElementById("cameras");
  section.innerHTML = "";

  cameras.forEach((camera) => {
    const container = document.createElement("div");
    container.classList.add("cameras-container");

    container.innerHTML = `
    <div class= "cameras-photo">
      <img src="${camera.image}" alt="${camera.model}">
    </div>
     <div class="cameras-info">
        <h4 class="camera-name">${camera.brand} ${camera.model}</h4>
        <p class="camera-description">${camera.sensor}, ${camera.megapixels} MP</p>
        <p class="camera-price">Price: $${camera.price}</p>
      </div>

    `;
    section.appendChild(container);
  });
};

getCameraData().then((data) => {
  camerasData = data;
  applyFilters();
});

/// extract the function and put there the values for filtering
