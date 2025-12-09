// tutoriales.js - Funcionalidad para la página de tutoriales

document.addEventListener('DOMContentLoaded', function() {
    // Sistema de filtros
    const searchInput = document.getElementById('tutorial-search');
    const categoryFilter = document.getElementById('category-filter');
    const levelFilter = document.getElementById('level-filter');
    const durationFilter = document.getElementById('duration-filter');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    
    // Tutorial cards (seleccionaríamos dinámicamente en un caso real)
    const tutorialCards = document.querySelectorAll('.tutorial-card, .featured-tutorial');
    
    // Aplicar filtros
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            applyTutorialFilters();
        });
    }
    
    // Resetear filtros
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            resetTutorialFilters();
        });
    }
    
    // Aplicar filtros al escribir en la búsqueda
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            applyTutorialFilters();
        }, 300));
    }
    
    // Aplicar filtros al cambiar selectores
    [categoryFilter, levelFilter, durationFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', function() {
                applyTutorialFilters();
            });
        }
    });
    
    // Función para aplicar filtros
    function applyTutorialFilters() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedCategory = categoryFilter ? categoryFilter.value : '';
        const selectedLevel = levelFilter ? levelFilter.value : '';
        const selectedDuration = durationFilter ? durationFilter.value : '';
        
        tutorialCards.forEach(card => {
            let showCard = true;
            
            // Filtrar por búsqueda
            if (searchTerm) {
                const cardText = card.textContent.toLowerCase();
                if (!cardText.includes(searchTerm)) {
                    showCard = false;
                }
            }
            
            // Filtrar por categoría
            if (selectedCategory && showCard) {
                const cardCategory = card.querySelector('.category, .tutorial-level');
                if (cardCategory && !cardCategory.textContent.toLowerCase().includes(selectedCategory)) {
                    showCard = false;
                }
            }
            
            // Filtrar por nivel
            if (selectedLevel && showCard) {
                const cardLevel = card.querySelector('.level, .tutorial-level');
                if (cardLevel && !cardLevel.textContent.toLowerCase().includes(selectedLevel)) {
                    showCard = false;
                }
            }
            
            // Filtrar por duración
            if (selectedDuration && showCard) {
                const timeElement = card.querySelector('.duration-badge, .tutorial-time, .lab-time');
                if (timeElement) {
                    const timeText = timeElement.textContent.toLowerCase();
                    if (selectedDuration === 'short' && !timeText.includes('< 30')) {
                        showCard = false;
                    } else if (selectedDuration === 'medium' && (!timeText.includes('30') && !timeText.includes('60'))) {
                        showCard = false;
                    } else if (selectedDuration === 'long' && !timeText.includes('> 60')) {
                        showCard = false;
                    }
                }
            }
            
            // Mostrar/ocultar tarjeta
            if (showCard) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Mostrar mensaje si no hay resultados
        showNoResultsMessage();
    }
    
    // Función para resetear filtros
    function resetTutorialFilters() {
        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = '';
        if (levelFilter) levelFilter.value = '';
        if (durationFilter) durationFilter.value = '';
        
        applyTutorialFilters();
    }
    
    // Mostrar mensaje si no hay resultados
    function showNoResultsMessage() {
        const visibleCards = Array.from(tutorialCards).filter(card => card.style.display !== 'none');
        
        // Remover mensaje anterior si existe
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Si no hay tarjetas visibles, mostrar mensaje
        if (visibleCards.length === 0) {
            const mainContent = document.querySelector('.tutoriales-main');
            if (mainContent) {
                const message = document.createElement('div');
                message.className = 'no-results-message';
                message.innerHTML = `
                    <div class="no-results-content">
                        <i class="fas fa-search"></i>
                        <h3>No se encontraron tutoriales</h3>
                        <p>Prueba con otros filtros o términos de búsqueda.</p>
                        <button class="reset-all-btn">Limpiar todos los filtros</button>
                    </div>
                `;
                
                message.style.cssText = `
                    text-align: center;
                    padding: 3rem;
                    background: var(--azul-electrico);
                    border-radius: 15px;
                    border: 2px solid rgba(0, 255, 171, 0.3);
                    margin: 2rem 0;
                    animation: fadeIn 0.5s ease;
                `;
                
                const noResultsContent = message.querySelector('.no-results-content');
                noResultsContent.style.cssText = `
                    max-width: 500px;
                    margin: 0 auto;
                `;
                
                noResultsContent.querySelector('i').style.cssText = `
                    font-size: 4rem;
                    color: var(--verde-neon);
                    margin-bottom: 1.5rem;
                `;
                
                noResultsContent.querySelector('h3').style.cssText = `
                    color: var(--verde-neon);
                    margin-bottom: 1rem;
                `;
                
                noResultsContent.querySelector('p').style.cssText = `
                    color: rgba(255, 255, 255, 0.7);
                    margin-bottom: 1.5rem;
                `;
                
                const resetBtn = noResultsContent.querySelector('.reset-all-btn');
                resetBtn.style.cssText = `
                    padding: 0.8rem 1.5rem;
                    background: var(--verde-neon);
                    color: var(--azul-oscuro);
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                `;
                
                resetBtn.addEventListener('mouseenter', function() {
                    this.style.background = 'transparent';
                    this.style.color = 'var(--verde-neon)';
                    this.style.border = '2px solid var(--verde-neon)';
                });
                
                resetBtn.addEventListener('mouseleave', function() {
                    this.style.background = 'var(--verde-neon)';
                    this.style.color = 'var(--azul-oscuro)';
                    this.style.border = 'none';
                });
                
                resetBtn.addEventListener('click', resetTutorialFilters);
                
                mainContent.appendChild(message);
            }
        }
    }
    
    // Debounce para búsqueda
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Botones de progreso
    const continueBtns = document.querySelectorAll('.continue-btn, .start-btn, .review-btn');
    continueBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.tutorial-card');
            if (card) {
                const progressBar = card.querySelector('.progress-bar');
                const progressText = card.querySelector('.progress-container span');
                
                // Simular progreso
                const currentWidth = parseInt(progressBar.style.width) || 0;
                if (currentWidth < 100) {
                    const newWidth = currentWidth + 25;
                    progressBar.style.width = newWidth + '%';
                    
                    if (newWidth >= 100) {
                        progressText.innerHTML = 'Completado <i class="fas fa-check"></i>';
                        this.textContent = 'Repasar ';
                        this.innerHTML += '<i class="fas fa-redo"></i>';
                        this.className = 'review-btn';
                    } else {
                        progressText.textContent = newWidth + '% completado';
                    }
                    
                    // Actualizar estadísticas del sidebar
                    updateProgressStats();
                }
            }
        });
    });
    
    // Actualizar estadísticas de progreso
    function updateProgressStats() {
        const completedTutorials = document.querySelectorAll('.progress-bar[style*="width: 100"]').length;
        const totalTutorials = document.querySelectorAll('.tutorial-card').length;
        const progressPercentage = Math.round((completedTutorials / totalTutorials) * 100);
        
        // Actualizar widget de progreso
        const circle = document.querySelector('.circle');
        const circleValue = document.querySelector('.circle span');
        const completedStat = document.querySelector('.stat-item:nth-child(1) .stat-value');
        
        if (circle && circleValue) {
            circle.style.background = `conic-gradient(var(--verde-neon) ${progressPercentage}%, rgba(0, 255, 171, 0.2) 0%)`;
            circleValue.textContent = progressPercentage + '%';
        }
        
        if (completedStat) {
            completedStat.textContent = `${completedTutorials}/${totalTutorials}`;
        }
    }
    
    // Botones de laboratorio
    const labBtns = document.querySelectorAll('.lab-btn');
    labBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const labCard = this.closest('.lab-card');
            if (labCard) {
                const labName = labCard.querySelector('h3').textContent;
                const labUsers = labCard.querySelector('.lab-users span');
                
                // Simular inicio de laboratorio
                const currentUsers = parseInt(labUsers.textContent) || 0;
                labUsers.textContent = currentUsers + 1;
                
                // Mostrar modal de confirmación
                showLabModal(labName);
            }
        });
    });
    
    // Modal de laboratorio
    function showLabModal(labName) {
        const modal = document.createElement('div');
        modal.className = 'lab-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-flask"></i> Iniciando Laboratorio</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Preparando entorno para: <strong>${labName}</strong></p>
                    <div class="loading-spinner">
                        <div class="spinner"></div>
                        <p>Creando máquinas virtuales...</p>
                    </div>
                    <div class="lab-info">
                        <p><i class="fas fa-clock"></i> Tiempo estimado: 2-3 minutos</p>
                        <p><i class="fas fa-shield-alt"></i> Entorno 100% seguro y aislado</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="cancel-btn">Cancelar</button>
                    <button class="continue-lab-btn">Continuar</button>
                </div>
            </div>
        `;
        
        // Estilos del modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: var(--azul-electrico);
            border-radius: 15px;
            width: 90%;
            max-width: 500px;
            border: 2px solid var(--verde-neon);
            overflow: hidden;
            animation: slideUp 0.3s ease;
        `;
        
        // Añadir estilos CSS para la animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .loading-spinner .spinner {
                width: 50px;
                height: 50px;
                border: 3px solid rgba(0, 255, 171, 0.3);
                border-top-color: var(--verde-neon);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 1rem auto;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
        
        // Cerrar modal
        const closeBtn = modal.querySelector('.close-modal');
        const cancelBtn = modal.querySelector('.cancel-btn');
        
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });
        
        cancelBtn.addEventListener('click', function() {
            modal.remove();
        });
        
        // Continuar al laboratorio
        const continueBtn = modal.querySelector('.continue-lab-btn');
        continueBtn.addEventListener('click', function() {
            const loadingSpinner = modal.querySelector('.loading-spinner');
            loadingSpinner.innerHTML = `
                <div class="spinner" style="border-top-color: #4CAF50;"></div>
                <p>¡Laboratorio listo! Redirigiendo...</p>
            `;
            
            setTimeout(() => {
                modal.remove();
                alert(`En un sitio real, esto te redirigiría al laboratorio: ${labName}`);
            }, 2000);
        });
        
        // Cerrar al hacer clic fuera del modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // Scroll suave a secciones
    const stepLinks = document.querySelectorAll('.step-link');
    stepLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Suscripción al newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            if (emailInput.value) {
                // Mostrar estado de carga
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Suscribiendo...';
                submitBtn.disabled = true;
                
                // Simular envío
                setTimeout(() => {
                    alert(`¡Gracias por suscribirte! Hemos enviado un correo de confirmación a ${emailInput.value}`);
                    emailInput.value = '';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Inicializar estadísticas
    updateProgressStats();
});