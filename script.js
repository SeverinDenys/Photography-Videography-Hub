import { initCarousel } from "./js/introCarousel.js";
import { initWorksCarousel } from "./js/worksCarousel.js";

document.addEventListener("DOMContentLoaded", () => {
  initCarousel(".intro-carousel");
  initCarousel(".cameras-carousel");
  initWorksCarousel();
});

// async function getCameraData() {
//   const url =
//     "https://camera-database.p.rapidapi.com/cameras?brand=Canon";
//   const options = {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key":
//         "ff806745b9mshfc1372b27e4e138p180ea7jsn37710e946d8b",
//       "x-rapidapi-host": "camera-database.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(url, options);

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`HTTP ${response.status}: ${errorText}`);
//     }
//     const result = await response.json();
//     console.log("API result:", result);
//   } catch (error) {
//     console.error("Fetch Error:", error);
//   }
// }

// getCameraData();

let camerasData = [];
let brandSelect = document.getElementById("brand");

const handleFilters = () => {
  brandSelect.addEventListener("change", (event) => {
    const selectedBrand = event.target.value;

    let filtered = camerasData;
    if (selectedBrand) {
      filtered = camerasData.filter(
        (camera) => camera.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    renderCameras(filtered);
  });
};

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
