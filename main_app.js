const loadrecipes = () => {
  fetch("https://dish-discovery-backend.onrender.com/recipe/")
    .then((res) => res.json())
    .then((data) => display_recipes(data))
    .catch((err) => console.log(err));
};

loadrecipes();

const display_recipes = (recipes) => {
    const gallerySection = document.getElementById("gallery");
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container");

    let rowDiv; // Initialize rowDiv variable

    recipes.forEach((recipe, index) => {
        if (index % 3 === 0) { // Create a new row after every third recipe
            rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            containerDiv.appendChild(rowDiv);
        }
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-lg-4", "mb-4");
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    cardDiv.innerHTML = `
        <img src="${recipe.image}"alt="" class="card-img-top">
        <div class="card-body">
        <h5 class="card-title">${recipe.name}</h5>
        <p class="card-text">${recipe.description.slice(0, 100)}</p>
        <a href="description.html?id=${recipe.id}" class="btn btn-outline-success btn-sm">Full Recipe</a>
        <a href="" class="btn btn-outline-danger btn-sm"><i class="far fa-heart"></i></a>
    </div> `;
    colDiv.appendChild(cardDiv);
    rowDiv.appendChild(colDiv);
  });
  containerDiv.appendChild(rowDiv);
  gallerySection.appendChild(containerDiv);
};
