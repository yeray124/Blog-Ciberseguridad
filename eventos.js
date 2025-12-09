document.addEventListener("DOMContentLoaded", () => {
    console.log("Script cargado - Inicializando menú...");

    /* --------------------------------------------------
       VARIABLES GLOBALES
    -------------------------------------------------- */
    let isMobile = window.innerWidth <= 768;

    /* --------------------------------------------------
       DETECCIÓN DE MÓVIL
    -------------------------------------------------- */
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 768;
    });

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
                if (isMobile && !this.classList.contains('drop-toggle')) {
                    console.log("Cerrar menú por clic en enlace normal");
                    navMenu.classList.remove('open');
                    menuBtn.classList.remove('open');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Cerrar menú al hacer clic fuera (sólo en móvil)
        document.addEventListener('click', function(e) {
            if (isMobile) {
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
       DROPDOWN EN MÓVIL - VERSIÓN MEJORADA
    -------------------------------------------------- */
    let dropdownClickTime = 0;
    
    document.querySelectorAll('.dropdown').forEach(drop => {
        const toggle = drop.querySelector('.drop-toggle');
        const menu = drop.querySelector('.dropdown-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', (e) => {
                if (isMobile) {
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
                    if (isMobile) {
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
        if (isMobile) {
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
       FILTRO + ORDENAMIENTO DE NOTICIAS - VERSIÓN CORREGIDA
    -------------------------------------------------- */
    const searchInput = document.getElementById("search");
    const filterSelect = document.getElementById("filter");
    const newsGrid = document.querySelector(".news-grid");
    const cards = Array.from(document.querySelectorAll(".news-card"));

    if (searchInput && filterSelect && newsGrid && cards.length > 0) {
        console.log("Filtro de búsqueda inicializado");
        
        // Verificar que las tarjetas tengan data-date
        cards.forEach((card, index) => {
            if (!card.dataset.date) {
                console.warn(`Tarjeta ${index} no tiene data-date, asignando fecha por defecto`);
                // Intentar obtener fecha del texto
                const dateText = card.querySelector('.date')?.textContent;
                if (dateText) {
                    try {
                        const parts = dateText.split('/');
                        if (parts.length === 3) {
                            // Formato: DD/MM/YYYY a YYYY-MM-DD
                            card.dataset.date = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                            console.log(`Fecha asignada: ${card.dataset.date}`);
                        }
                    } catch (error) {
                        console.error(`Error al parsear fecha: ${dateText}`, error);
                        card.dataset.date = '2025-01-01'; // Fecha por defecto
                    }
                } else {
                    card.dataset.date = '2025-01-01'; // Fecha por defecto
                }
            }
        });

        // Filtrar por texto
        function filterCards() {
            const text = searchInput.value.toLowerCase().trim();
            console.log(`Buscando: "${text}"`);
            
            let visibleCount = 0;
            
            cards.forEach(card => {
                const title = card.querySelector("h3")?.textContent.toLowerCase() || '';
                const desc = card.querySelector("p")?.textContent.toLowerCase() || '';
                const show = title.includes(text) || desc.includes(text);
                
                card.style.display = show ? 'block' : 'none';
                
                if (show) {
                    visibleCount++;
                    console.log(`Mostrando: "${title.substring(0, 30)}..."`);
                }
            });
            
            console.log(`Total visible: ${visibleCount} de ${cards.length}`);
        }

        // Ordenar por fecha
        function sortCards() {
            const sortBy = filterSelect.value;
            console.log(`Ordenando por: ${sortBy === 'recent' ? 'Más recientes' : 'Más antiguos'}`);
            
            const visibleCards = cards.filter(card => card.style.display !== 'none');
            
            visibleCards.sort((a, b) => {
                try {
                    const dateA = new Date(a.dataset.date || '2025-01-01');
                    const dateB = new Date(b.dataset.date || '2025-01-01');
                    
                    if (sortBy === "recent") {
                        return dateB - dateA; // Más recientes primero
                    } else {
                        return dateA - dateB; // Más antiguos primero
                    }
                } catch (error) {
                    console.error("Error al ordenar fechas:", error);
                    return 0;
                }
            });

            // Reordenar en el DOM
            visibleCards.forEach(card => {
                newsGrid.appendChild(card);
            });
            
            console.log(`Reordenadas ${visibleCards.length} tarjetas`);
        }

        // Eventos del filtro
        searchInput.addEventListener("input", () => {
            console.log("Input cambiado");
            filterCards();
            sortCards();
        });

        filterSelect.addEventListener("change", function() {
            console.log(`Select cambiado a: ${this.value}`);
            sortCards();
        });

        // Orden inicial
        setTimeout(() => {
            console.log("Orden inicial aplicada");
            filterCards();
            sortCards();
        }, 100);
    } else {
        console.warn("Elementos del filtro no encontrados");
        console.log({
            searchInput: !!searchInput,
            filterSelect: !!filterSelect,
            newsGrid: !!newsGrid,
            cards: cards.length
        });
    }

    /* --------------------------------------------------
       MANEJO MEJORADO DEL SELECT (desplegable)
    -------------------------------------------------- */
    // Ya tenemos filterSelect definido arriba, solo agregamos manejo especial
    if (filterSelect) {
        console.log("Select encontrado, agregando manejo especial...");
        
        // Prevenir problemas de doble evento
        let selectClickTime = 0;
        const SELECT_CLICK_DELAY = 200;
        
        // Evento simple para el select (para debugging)
        filterSelect.addEventListener('click', function(e) {
            const now = Date.now();
            if (now - selectClickTime < SELECT_CLICK_DELAY) {
                e.stopPropagation();
                return;
            }
            selectClickTime = now;
            console.log("Select clickeado - abriendo opciones");
        });
        
        // Cerrar select al hacer clic fuera (solo en móvil)
        document.addEventListener('click', function(e) {
            if (isMobile && e.target !== filterSelect) {
                // Forzar blur para cerrar el select en móvil
                filterSelect.blur();
            }
        });
        
        // Debug: mostrar cuando cambia el valor
        filterSelect.addEventListener('change', function() {
            console.log(`DEBUG: Select cambiado a "${this.value}" - Evento fired`);
        });
    }

    /* --------------------------------------------------
       BOTÓN DE BÚSQUEDA
    -------------------------------------------------- */
    const searchButton = document.querySelector('.search-filters button');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            console.log("Botón de búsqueda clickeado");
            if (searchInput) {
                searchInput.focus();
            }
        });
    }

    /* --------------------------------------------------
       CERRAR DROPDOWNS AL CAMBIAR TAMAÑO DE VENTANA
    -------------------------------------------------- */
    window.addEventListener('resize', () => {
        if (!isMobile) { // Si cambiamos a desktop
            document.querySelectorAll('.dropdown-menu.open').forEach(menu => {
                menu.classList.remove('open');
            });
            document.querySelectorAll('.drop-toggle.open').forEach(toggle => {
                toggle.classList.remove('open');
            });
            
            // También cerrar menú móvil si está abierto
            if (navMenu && menuBtn) {
                navMenu.classList.remove('open');
                menuBtn.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        }
        
        // Actualizar estado de móvil
        isMobile = window.innerWidth <= 768;
    });

    console.log("Inicialización completa - Todo listo!");
});