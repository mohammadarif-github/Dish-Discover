
const createReview = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const userId = localStorage.getItem("user_id");
    const Token = localStorage.getItem("token");
    const param = new URLSearchParams(window.location.search).get("id");
    const rating = document.getElementById("ratingSelect").value;
    const message = document.getElementById("feedbackTextarea").value;
    
    console.log(Token);
    console.log(userId);
    console.log("foodID",param)
    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('recipe',param);
    formData.append('user',userId);
    formData.append('body',message);
    
    // Send form data to the backend API
    fetch(`https://dish-discovery-backend.onrender.com/reviews/${param}/create`, {
        method: "POST",
        headers: { 
            "Authorization": `Token ${Token}`,
        },
        body: formData // Use FormData object for file upload
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Response:', data);
        alert("Review submitted successfully!");
        window.location.href = "recipe.html";
    })
    .catch(error => {
        console.error('Error creating review:', error);
    });
};

// Add event listener to the form submission event
document.getElementById("feedbackForm").addEventListener("submit", createReview);

