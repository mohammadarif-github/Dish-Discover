const loadReview = () => {
    fetch("https://dish-discovery-backend.onrender.com/review/")
        .then((res) => res.json())
        .then((data) => displayReview(data));
};

const displayReview = (reviews) => {
    reviews.forEach((review) => {
        const parent = document.getElementById("review-container");
        const div = document.createElement("div");
        div.classList.add("review-card");
        div.innerHTML = `
            <h2>${review.recipe_name}</h2>
            <h4>${review.reviewer_name}</h4>
            <p>${review.body.slice(0, 100)}</p>
            <h4>${review.rating}</h6>
        `;
        parent.appendChild(div);
    });
};

loadReview();


