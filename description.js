const getparams = () =>{
    console.log("its called");
    const param = new URLSearchParams(window.location.search).get("id");
    loadTime(param);
    fetch(`https://dish-discovery-backend.onrender.com/recipe/${param}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data); // Make sure data is being received correctly
        show_recipe(data); // Call the displayRecipe function with the fetched data
    })
    .catch((error) => {
        console.error('Error fetching recipe data:', error);
    });
    // .then((data)=>displayRecipe(data));
};


const show_recipe = (recipe) => {
    document.getElementById("recipeImage").src = recipe.image;
    document.getElementById("recipeName").innerText = recipe.name;
    
    const ingredientList = document.getElementById("ingredientList");
    ingredientList.innerHTML = ""; // Clear previous content
    recipe.ingredients.split(',').forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient.trim(); // Trim excess whitespace
        ingredientList.appendChild(li);
    });

    document.getElementById("recipeDescription").innerText = recipe.description;
};
