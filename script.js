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

const handleFilters = () => {
  brandSelect.addEventListener("change", (event) => {
    const selectedBrand = event.target.value;
    console.log(selectedBrand);

    let filtered = camerasData;
    if (selectedBrand) {
      filtered = camerasData.filter(
        (camera) => camera.brand.toLowerCase() === selectedBrand.toLowerCase()
      ); // function for all event handlers
    }

    renderCameras(filtered);

    // put event handler to another dropdown
    // move filter out the function and
    // function that does filtering on all the dropdowns
    // 1-json and create array file
  });
};
const handleFiltersMatrix = () => {
  matrixSelect.addEventListener("change", (event) => {
    const selectedMatrix = event.target.value;
    console.log(selectedMatrix);

    let filtered = camerasData;
    if (selectedMatrix) {
      filtered = camerasData.filter(
        (camera) => camera.sensor.toLowerCase() === selectedMatrix.toLowerCase()
      ); // function for all event handlers
    }

    renderCameras(filtered);

    // put event handler to another dropdown
    // move filter out the function and
    // function that does filtering on all the dropdowns
    // 1-json and create array file
  });
};

handleFiltersMatrix();

handleFilters();

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
  renderCameras(camerasData);
});

/// extract the function and put there the values for filtering
