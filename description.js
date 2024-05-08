const getparams = () => {
    console.log("it's called");
    const param = new URLSearchParams(window.location.search).get("id");
    if (!param) {
        console.error("Recipe ID not found in URL");
        return;
    }
    fetch(`https://dish-discovery-backend.onrender.com/recipe/${param}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data); 
            show_recipe(data); 
        })
        .catch((error) => {
            console.error('Error fetching recipe data:', error);
        });
};
getparams();
const show_recipe = (recipe) => {
    document.getElementById("recipeImage").src = recipe.image;
    document.getElementById("recipeName").innerText = recipe.name;
    document.getElementById("recipeDescription").innerText = recipe.description;

    const ingredientList = document.getElementById("ingredientList");
    ingredientList.innerHTML = ""; 

    // Splitting the ingredients by line breaks ("\n")
    recipe.ingredients.split('\n').forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient.trim(); // Trim whitespace from each ingredient
        ingredientList.appendChild(li);
    });
    document.getElementById("recipe").innerText = recipe.recipe;
};

