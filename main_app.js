const loadrecipes = () => {
  fetch("https://dish-discovery-backend.onrender.com/recipe/")
    .then((res) => res.json())
    .then((data) => display_recipes(data))
    .catch((error) => console.log(error));
};

const user_id = localStorage.getItem("user_id");

loadrecipes();
const display_recipes = (recipes) => {
  const gallerySection = document.getElementById("gallery");
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("container");

  let rowDiv; // Initialize rowDiv variable

  recipes.forEach((recipe, index) => {
    if (index % 3 === 0) {
      // Create a new row after every third recipe
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
        <p class="card-text">${recipe.description.slice(0, 220)}</p>
        <a href="description.html?id=${
          recipe.id
        }" class="btn btn-outline-success btn-sm">Full Recipe</a>
        <a href="#" class="btn btn-outline-danger btn-sm" onclick="addFavourite(${recipe.id},${user_id})">
        <i class="far fa-heart"></i></a>
      </div> `;
    colDiv.appendChild(cardDiv);
    rowDiv.appendChild(colDiv);
  });
  containerDiv.appendChild(rowDiv);
  gallerySection.appendChild(containerDiv);
};


const handleSearch = () => {
  const value = document.getElementById("search").value;
  // window.location.href="recipe.html"
  loadsearched(value);
  document.getElementById("search").value = '';
};

const loadsearched = (search) => {
  console.log(search);
  let url = 'https://dish-discovery-backend.onrender.com/recipes/';
  if (search) {
      url += `?search=${search}`;
  }
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
      const gallerySection = document.getElementById("gallery");
      gallerySection.innerHTML = ''; // Clear the gallery section before displaying new results

      if(data.results.length > 0){
          display_recipes(data?.results);
      }
      else{
          window.location.href = "recipe.html";
      }
  });
};


// const addFavourite = (recipe_id, user_id) => {
//   fetch(`https://dish-discovery-backend.onrender.com/recipe/${recipe_id}/`)
//     .then((res) => res.json())
//     .then((recipe) => {
//       fetch(`https://dish-discovery-backend.onrender.com/user/${user_id}`)
//         .then((res) => res.json())
//         .then((user) => {
//           fetch("https://dish-discovery-backend.onrender.com/favourite/", {
//             method: "POST",
//             headers: { "Content-type": "application/json" },
//             body: JSON.stringify({
//               user: user,
//               recipe: recipe,
//             }),
//           })
//             .then((res) => res.json())
//             .then((data) => console.log(data))
//             .catch((error) =>
//               console.error("Error Creating Favourite : ", error)
//             );
//         })
//         .catch((error) => console.error("Error Fetching User : ", error));
//     })
//     .catch((error) => console.error("Error Fetching Recipe : ", error));
// };

// const addFavourite = (recipeid) => {
//   fetch(`http://127.0.0.1:8000/addfavourite/${recipeid}/`,{
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       user: localStorage.getItem("user_id"),
//       recipe_id: recipeid,
//     }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to add favorite");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Favorite added successfully:", data);
//     })
//     .catch((error) => {
//       console.error("Error adding favorite:", error);
//     });
// };
