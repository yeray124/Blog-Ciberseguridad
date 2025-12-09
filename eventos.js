document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------------------------
       FILTRO + ORDENAMIENTO DE NOTICIAS (TU CÓDIGO)
    -------------------------------------------------- */

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

    // Eventos búsqueda
    searchInput.addEventListener("input", () => {
        filterCards();
        sortCards();
    });

    filterSelect.addEventListener("change", sortCards);

    // Orden inicial
    sortCards();



    /* --------------------------------------------------
       MENÚ HAMBURGUESA RESPONSIVE
    -------------------------------------------------- */

    const btn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');

    if (btn && nav) {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('open');
            btn.classList.toggle('open');
        });
    }



    /* --------------------------------------------------
       DROPDOWN EN MÓVIL (click en vez de hover)
    -------------------------------------------------- */

    document.querySelectorAll('.dropdown').forEach(drop => {
        const toggle = drop.querySelector('.drop-toggle');
        const menu = drop.querySelector('.dropdown-menu');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', (e) => {
            // Solo activar en móvil
            if (window.matchMedia('(max-width: 768px)').matches) {
                e.preventDefault();
                menu.classList.toggle('open');
            }
        });

        // Cerrar si se toca afuera
        document.addEventListener('click', (e) => {
            if (!drop.contains(e.target)) {
                menu.classList.remove('open');
            }
        });
    });



    /* --------------------------------------------------
       OPCIONAL: CERRAR MENÚ AL CLICAR LINK EN MÓVIL
    -------------------------------------------------- */
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.matchMedia('(max-width: 768px)').matches) {
                nav.classList.remove('open');
                btn.classList.remove('open');
                btn.setAttribute('aria-expanded', "false");
            }
        });
    });

});
