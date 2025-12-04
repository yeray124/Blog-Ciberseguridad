document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("search");
    const filterSelect = document.getElementById("filter");
    const newsGrid = document.querySelector(".news-grid");
    const cards = Array.from(document.querySelectorAll(".news-card"));

    // Filtrar por texto
    function filterCards() {
        const text = searchInput.value.toLowerCase();
        cards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const desc = card.querySelector("p").textContent.toLowerCase();
            card.style.display = (title.includes(text) || desc.includes(text)) ? "block" : "none";
        });
    }

    // Ordenar por fecha
    function sortCards() {
        const sortBy = filterSelect.value;
        const visibleCards = cards.filter(card => card.style.display !== "none");

        visibleCards.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return sortBy === "recent" ? dateB - dateA : dateA - dateB;
        });

        visibleCards.forEach(card => newsGrid.appendChild(card));
    }

    // Eventos
    searchInput.addEventListener("input", () => {
        filterCards();
        sortCards();
    });

    filterSelect.addEventListener("change", sortCards);

    // Orden inicial
    sortCards();

});
