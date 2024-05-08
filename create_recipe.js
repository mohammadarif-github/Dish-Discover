const createRecipe = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const Token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    // Retrieve form data
    const recipeName = document.getElementById("recipeName").value;
    const description = document.getElementById("description").value;
    const ingredients = document.getElementById("ingredients").value;
    const recipe = document.getElementById("recipe").value;
    const slug = slugify(recipeName, { lower: true, replacement: '-', remove: /[*+~.()'"!:@]/g });

    // Check if an image file is selected
    let imageFile = null;
    const imageInput = document.getElementById("image");
    if (imageInput.files.length > 0) {
        imageFile = imageInput.files[0];
    }

    console.log(Token);
    console.log(userId);

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append('name', recipeName);
    formData.append('description', description);
    formData.append('ingredients', ingredients);
    formData.append('recipe', recipe);
    formData.append('slug', slug); // Add slug to form data
    formData.append('added_by', userId); // Assuming userId is correct
    if (imageFile) {
        formData.append('image', imageFile);
    }

    // Send form data to the backend API
    fetch("https://dish-discovery-backend.onrender.com/recipes/create", {
        method: "POST",
        headers: { 
            "Authorization": `Token ${Token}`,
        },
        body: formData // Use FormData object for file upload
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Response:', data);
        if (data.detail) {
            const p = document.getElementById('recipe-error');
            p.innerText = 'You must be logged in to upload recipe!';
        } else if (data.id) {
            const p = document.getElementById('recipe-error');
            p.innerText = 'Recipe created successfully. Please reload.';
            
        }
        window.location.href = "recipe.html";
    })
    .catch(error => {
        console.error('Error creating recipe:', error);
    });
};

// Add event listener to the form submission event
document.getElementById("submitBtn").addEventListener("click", createRecipe);
