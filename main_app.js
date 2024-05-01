const loadrecipes = () => {
    fetch("https://dish-discovery-backend.onrender.com/recipe/")
    .then((res) => res.json())
    .then((data) => dispaly_recipes(data))
    .catch((err)=>console.log(err))
};

const dispaly_recipes = (recipes) => {
    const parent = document.getElementById("recipe-container")
    recipes.forEach(recipe => {
        const recipecard = document.createElement("div");
        recipecard.innerHTML = `
        <div class="container">
            <div class="row">
            <div class="single_recepie text-center col-md-6">
                        <div class="recepie_thumb">
                            <img src="${recipe.image}" alt="">
                        </div>
                        <h3>${recipe.name}</h3>
                        <a href="#" class="line_btn">View Full Recipe</a>
                    </div>
            </div>
        </div>
        `;
        parent.appendChild(recipecard); // Move this line inside the loop
    });
};
loadrecipes();
                        