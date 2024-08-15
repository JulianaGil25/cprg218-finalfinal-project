document.addEventListener("DOMContentLoaded", function() {
    fetchCategories();
});

function fetchCategories() {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(response => response.json())
        .then(data => {
            if (data && data.categories) {
                populateDropdown(data.categories);
            } else {
                console.error('No categories found.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function populateDropdown(categories) {
    const dropdown = document.getElementById("categoryDropdown");
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.idCategory; // Use the category ID
        option.textContent = category.strCategory; // Display the category name
        option.dataset.description = category.strCategoryDescription; // Store the description
        option.dataset.image = category.strCategoryThumb; // Store the image URL
        dropdown.appendChild(option);
    });
}

function showCategoryInfo() {
    const dropdown = document.getElementById("categoryDropdown");
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const categoryInfoDiv = document.getElementById("categoryInfo");

    if (selectedOption.value) {
        categoryInfoDiv.innerHTML = `
            <h2>${selectedOption.text}</h2>
            <img src="${selectedOption.dataset.image}" alt="${selectedOption.text}" style="width:150px;height:150px;">
            <p>${selectedOption.dataset.description}</p>
        `;
    } else {
        categoryInfoDiv.innerHTML = ""; // Clear the info if no category is selected
    }
}
