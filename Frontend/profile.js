const getparams = () => {
    // console.log("it's called");
    const param = new URLSearchParams(window.location.search).get("id");
    if (!param) {
        console.error("User Id Not Found In URL");
        return;
    }
    fetch(`https://dish-discovery-backend.onrender.com/user/${param}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data); 
            show_details(data); 
        })
        .catch((error) => {
            console.error('Error fetching user details:', error);
        });
};
getparams();

const show_details = (data) => {
    const profileContainer = document.querySelector('.profile-container');

    // Display username
    const usernameElement = document.createElement('h2');
    usernameElement.textContent = `Name: ${data.first_name} ${data.last_name}`;
    profileContainer.appendChild(usernameElement);

    // Display Edit Profile button
    const editProfileBtn = document.createElement('button');
    editProfileBtn.textContent = 'Edit Profile';
    editProfileBtn.classList.add('edit-profile-btn');
    profileContainer.appendChild(editProfileBtn);

    // Display table for recipes
    const recipeTable = document.createElement('table');
    recipeTable.classList.add('recipe-table');
    profileContainer.appendChild(recipeTable);

    // Add table header
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
        <tr>
            <th>Recipe</th>
            <th>Action</th>
        </tr>
    `;
    recipeTable.appendChild(tableHeader);

    const tableBody = document.createElement('tbody');
    recipeTable.appendChild(tableBody);

    data.added_recipes.forEach(recipe => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${recipe.name}</td>
            <td>
                <button class="update-btn">Update</button>
                <button class="delete-btn" data-recipe-id="${recipe.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const recipeId = event.target.getAttribute('data-recipe-id');
            deleteRecipe(recipeId);
        }
    });
};

// Function to delete recipe
const deleteRecipe = (recipeId) => {
    fetch(`https://dish-discovery-backend.onrender.com/recipe/${recipeId}/`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Recipe deleted successfully');
    })
    .catch(error => {
        console.error('Error deleting recipe:', error);
    });
};



