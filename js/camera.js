// =============================
// Get URL parameters
// =============================
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const selectedBrand = params.get("brand")?.toLowerCase() || "";
const selectedSensor = params.get("sensor")?.toLowerCase() || "";
const useParam = params.get("use");
const selectedUseCases = useParam
  ? useParam.split(",").map((u) => u.toLowerCase())
  : [];

// =============================
// Hamburger Menu Logic
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
// Fetch Cameras + Lenses Data
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
    console.error("Fetch Error (cameras):", error);
    return [];
  }
}

async function getLensesData() {
  try {
    const response = await fetch("/data/lenses.json");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch Error (lenses):", error);
    return [];
  }
}

// =============================
// Display Camera Info
// =============================
function displayCamera(camera) {
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
}

// =============================
// Display Matching Lenses
// =============================
async function displayLensesForCamera(camera) {
  try {
    const data = await getLensesData();

    // --- 1. Filter by same mount ---
    let filteredLenses = data.filter((lens) => lens.mount === camera.mount);

    // --- 2. Apply brand filter if present ---
    if (selectedBrand) {
      filteredLenses = filteredLenses.filter(
        (lens) => lens.brand.toLowerCase() === selectedBrand
      );
    }

    // --- 3. Apply use-case filter if present ---
    if (selectedUseCases.length > 0) {
      filteredLenses = filteredLenses.filter((lens) =>
        lens.useCases.some((use) =>
          selectedUseCases.includes(use.toLowerCase())
        )
      );
    } else {
      // fallback: match the camera’s native use cases
      filteredLenses = filteredLenses.filter((lens) =>
        lens.useCases.some((use) =>
          camera.useCases
            .map((c) => c.toLowerCase())
            .includes(use.toLowerCase())
        )
      );
    }

    // --- 4. Fallback: if nothing matches, show 4 random lenses ---
    if (filteredLenses.length === 0) {
      const randomLenses = data
        .filter((lens) => lens.mount === camera.mount)
        .slice(0, 6);
      filteredLenses = randomLenses;
    } else {
      filteredLenses = filteredLenses.slice(0, 4);
    }

    // --- 5. Render lens cards ---
    const lensesSection = document.getElementById("camera-lenses");
    lensesSection.innerHTML = `
      <h3>Recommended Lens Options</h3>
      <p>Based on your camera and selected filters, here are some matching lenses:</p>
      <div class="lenses-container">
        ${filteredLenses
          .map(
            (lens) => `
          <div class="lens-card">
            <img src="${lens.image}" alt="${lens.model}" />
            <h4>${lens.model}</h4>
            <p>${lens.type} • ${lens.focalLength} • ${lens.aperture}</p>
            <p>Use cases: ${lens.useCases.join(", ")}</p>
            <p class="price">$${lens.price}</p>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  } catch (error) {
    console.error("Error displaying lenses:", error);
  }
}

// =============================
// Initialize Page
// =============================
getCameraData().then((data) => {
  const camera = data.find((item) => item.id === Number(id));
  if (camera) {
    displayCamera(camera);
    displayLensesForCamera(camera);
  } else {
    console.error("Camera not found for ID:", id);
  }
});
