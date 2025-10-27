// resources.js
document.addEventListener("DOMContentLoaded", () => {
  const resourcesContainer = document.getElementById("resources");

  fetch("../data/resources.json")
    .then((res) => res.json())
    .then((data) => renderResources(data))
    .catch((err) => console.error("Error loading resources:", err));

  function renderResources(categories) {
    categories.forEach((cat) => {
      const section = document.createElement("section");
      section.classList.add("resource-category");

      section.innerHTML = `
        <h2>${cat.category}</h2>
        <ul>
          ${cat.items
            .map(
              (item) => `
              <li>
                <a href="${item.url}" target="_blank">${item.name}</a>
              </li>
            `
            )
            .join("")}
        </ul>
      `;

      resourcesContainer.appendChild(section);
    });
  }
});
