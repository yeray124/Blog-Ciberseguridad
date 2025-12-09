document.addEventListener("DOMContentLoaded", () => {
    console.log("Script cargado - Inicializando menú...");

    /* --------------------------------------------------
       MENÚ HAMBURGUESA - VERSIÓN SIMPLE Y FUNCIONAL
    -------------------------------------------------- */
    const menuBtn = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');

    if (menuBtn && navMenu) {
        console.log("Elementos del menú encontrados:", menuBtn, navMenu);
        
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log("Botón clickeado");
            
            // Alternar clases
            navMenu.classList.toggle('open');
            this.classList.toggle('open');
            
            // Actualizar atributo de accesibilidad
            const isOpen = navMenu.classList.contains('open');
            this.setAttribute('aria-expanded', isOpen);
            console.log("Menú " + (isOpen ? "abierto" : "cerrado"));
        });

        // Cerrar menú al hacer clic en un enlace (sólo en móvil)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('open');
                    menuBtn.classList.remove('open');
                    menuBtn.setAttribute('aria-expanded', 'false');
                    console.log("Menú cerrado por clic en enlace");
                }
            });
        });

        // Cerrar menú al hacer clic fuera (sólo en móvil)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                    navMenu.classList.remove('open');
                    menuBtn.classList.remove('open');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    } else {
        console.error("ERROR: No se encontraron elementos del menú");
    }

    /* --------------------------------------------------
       FILTRO + ORDENAMIENTO DE NOTICIAS
    -------------------------------------------------- */
    const searchInput = document.getElementById("search");
    const filterSelect = document.getElementById("filter");
    const newsGrid = document.querySelector(".news-grid");
    const cards = Array.from(document.querySelectorAll(".news-card"));

    if (searchInput && filterSelect && newsGrid && cards.length > 0) {
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
        sortCards(); // Orden inicial
    }

    /* --------------------------------------------------
       DROPDOWN EN MÓVIL
    -------------------------------------------------- */
    document.querySelectorAll('.dropdown').forEach(drop => {
        const toggle = drop.querySelector('.drop-toggle');
        const menu = drop.querySelector('.dropdown-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Cerrar otros dropdowns
                    document.querySelectorAll('.dropdown-menu.open').forEach(otherMenu => {
                        if (otherMenu !== menu) otherMenu.classList.remove('open');
                    });
                    
                    // Alternar el actual
                    menu.classList.toggle('open');
                    toggle.classList.toggle('open');
                }
            });
        }
    });

    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.dropdown').forEach(drop => {
                if (!drop.contains(e.target)) {
                    const menu = drop.querySelector('.dropdown-menu');
                    const toggle = drop.querySelector('.drop-toggle');
                    if (menu) menu.classList.remove('open');
                    if (toggle) toggle.classList.remove('open');
                }
            });
        }
    });
});