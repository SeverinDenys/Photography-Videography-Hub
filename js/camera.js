const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log("Camera ID from URL:", id);

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
    console.log(camera.id);
    return camera.id === Number(id);
  });

  console.log("filtered camera:", filteredCamera);
  displayCamera(filteredCamera);
});

const displayCamera = (camera) => {
  const container = document.getElementById("camera-details");
  container.classList.add("cameras-container");

  container.innerHTML = `
    <div class="cameras-container"> 
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
