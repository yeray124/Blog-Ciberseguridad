document.addEventListener("DOMContentLoaded", () => {
    console.log("Script cargado - Inicializando menú...");

    /* --------------------------------------------------
       MENÚ HAMBURGUESA - VERSIÓN CORREGIDA
    -------------------------------------------------- */
    const menuBtn = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');

    if (menuBtn && navMenu) {
        console.log("Elementos del menú encontrados");
        
        // Abrir/cerrar menú principal
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log("Botón hamburguesa clickeado");
            
            navMenu.classList.toggle('open');
            this.classList.toggle('open');
            
            const isOpen = navMenu.classList.contains('open');
            this.setAttribute('aria-expanded', isOpen);
            console.log("Menú " + (isOpen ? "abierto" : "cerrado"));
        });

        // Cerrar menú SOLO al hacer clic en enlaces REALES (no dropdowns)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                // Solo cerrar si NO es un dropdown-toggle y estamos en móvil
                if (window.innerWidth <= 768 && !this.classList.contains('drop-toggle')) {
                    console.log("Cerrar menú por clic en enlace normal");
                    navMenu.classList.remove('open');
                    menuBtn.classList.remove('open');
                    menuBtn.setAttribute('aria-expanded', 'false');
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
                    console.log("Menú cerrado por clic fuera");
                    
                    // También cerrar todos los dropdowns
                    document.querySelectorAll('.dropdown-menu.open').forEach(menu => {
                        menu.classList.remove('open');
                    });
                    document.querySelectorAll('.drop-toggle.open').forEach(toggle => {
                        toggle.classList.remove('open');
                    });
                }
            }
        });
    }

    /* --------------------------------------------------
       DROPDOWN EN MÓVIL - VERSIÓN MEJORADA CON DEBOUNCE
    -------------------------------------------------- */
    let dropdownClickTime = 0;
    
    document.querySelectorAll('.dropdown').forEach(drop => {
        const toggle = drop.querySelector('.drop-toggle');
        const menu = drop.querySelector('.dropdown-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Prevenir doble clic rápido
                    const now = Date.now();
                    if (now - dropdownClickTime < 300) {
                        return;
                    }
                    dropdownClickTime = now;
                    
                    console.log("Dropdown toggle clickeado");
                    
                    // Verificar si YA está abierto
                    const isAlreadyOpen = menu.classList.contains('open');
                    
                    // Cerrar TODOS los dropdowns primero
                    document.querySelectorAll('.dropdown-menu.open').forEach(otherMenu => {
                        otherMenu.classList.remove('open');
                    });
                    document.querySelectorAll('.drop-toggle.open').forEach(otherToggle => {
                        otherToggle.classList.remove('open');
                    });
                    
                    // Si NO estaba abierto, abrirlo
                    if (!isAlreadyOpen) {
                        menu.classList.add('open');
                        toggle.classList.add('open');
                        console.log("Dropdown abierto");
                    } else {
                        console.log("Dropdown ya estaba abierto - cerrado");
                    }
                    
                    // IMPORTANTE: NO cerrar el menú principal aquí
                    return false;
                }
            });

            // Cerrar dropdown si se hace clic en un enlace dentro de él
            menu.querySelectorAll('a').forEach(dropLink => {
                dropLink.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        console.log("Clic en enlace del dropdown - cerrar ambos");
                        // Cerrar dropdown
                        menu.classList.remove('open');
                        toggle.classList.remove('open');
                        // Y cerrar menú principal
                        if (navMenu) navMenu.classList.remove('open');
                        if (menuBtn) {
                            menuBtn.classList.remove('open');
                            menuBtn.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
            });
        }
    });

    /* --------------------------------------------------
       MEJORA: CERRAR DROPDOWN AL TOCAR FUERA DE ÉL
    -------------------------------------------------- */
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.dropdown').forEach(drop => {
                const toggle = drop.querySelector('.drop-toggle');
                const menu = drop.querySelector('.dropdown-menu');
                
                // Si el clic NO está dentro del dropdown
                if (!drop.contains(e.target)) {
                    if (menu) menu.classList.remove('open');
                    if (toggle) toggle.classList.remove('open');
                }
            });
        }
    });

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
        sortCards();
    }

    /* --------------------------------------------------
       CERRAR DROPDOWNS AL CAMBIAR TAMAÑO DE VENTANA
    -------------------------------------------------- */
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.dropdown-menu.open').forEach(menu => {
                menu.classList.remove('open');
            });
            document.querySelectorAll('.drop-toggle.open').forEach(toggle => {
                toggle.classList.remove('open');
            });
        }
    });
});