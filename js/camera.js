const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const icon = hamburger.querySelector("i");

// Toggle menu on click
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("open");

  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

// getting lenses json apis
async function getLensesData() {
  try {
    const response = await fetch("/data/lenses.json");
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

// getting the cameras json apis
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

getCameraData().then((data) => {
  let filteredCamera = data.find((camera) => {
    return camera.id === Number(id);
  });

  displayCamera(filteredCamera);
  displayLensesForCamera(filteredCamera);
});

async function displayLensesForCamera(camera) {
  try {
    const data = await getLensesData();
    const filteredLens = data.filter(
      (lens) => lens.brand === camera.brand
    );
    console.log("filtered lenses:", filteredLens);
  } catch (error) {
    console.error("Error displaying lenses:", error);
  }
}

const displayCamera = (camera) => {
  const container = document.getElementById("camera-details");
  container.classList.add("cameras-container");

  container.innerHTML = `
    <div class="cameras-container"> 
    <div class="camera-fullDesk">
    <p>${camera.fullDescription}</p>
     
    </div>
    <div class="cameras-photo">
      <img src="${camera.image}" alt="${camera.model}">
    </div>
    <div class="cameras-info">
      <h4 class="camera-name">${camera.brand} ${camera.model}</h4>
      <p class="camera-description">${camera.sensor}, ${camera.megapixels} MP</p>
      <p class="camera-price">Price: $${camera.price}</p>
    </div>
    </div>
    `;
};
