document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("search");
    const cards = document.querySelectorAll(".news-card");

    // 🔍 BÚSQUEDA EN TIEMPO REAL
    searchInput.addEventListener("input", () => {
        const text = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const desc = card.querySelector("p").textContent.toLowerCase();

            // Mostrar si coincide en título o descripción
            if (title.includes(text) || desc.includes(text)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

});
