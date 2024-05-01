const loadrecipes = () => {
    fetch("https://dish-discovery-backend.onrender.com/recipe/")
    .then((res) => res.json())
    .then((data) => display_recipes(data))
    .catch((err)=>console.log(err))
};

const display_recipes = (recipes) => {
    const parent = document.getElementById("recipe-container");
    recipes.forEach(recipe => {
        const recipecard = document.createElement("div");
        recipecard.innerHTML = `
            <div class="row">
                <div class="single_recipe text-center col-md-6">
                    <div class="recepie_thumb">
                        <img src="${recipe.image}" alt="">
                    </div>
                    <h3>${recipe.name}</h3>
                    <a href="description.html?recipe_id=${recipe.id}" class="line_btn" onclick="getparams()" >View Full Recipe</a>
                </div>
            </div>
        `;
        parent.appendChild(recipecard);
    });
};

loadrecipes();
                        