function toggleDescription(descId) {
    const description = document.getElementById(descId);
    const arrow = description.previousElementSibling.querySelector('.arrow');

    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";
        arrow.textContent = "➖"; // Изменяем стрелочку на минус
    } else {
        description.style.display = "none";
        arrow.textContent = "➕"; // Изменяем стрелочку на плюс
    }
}