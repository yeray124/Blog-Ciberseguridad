// Datos de las herramientas (todas gratuitas)
const toolsData = [
    {
        id: 1,
        name: "Nmap",
        category: "escaneo",
        description: "Herramienta de código abierto para exploración de red y auditoría de seguridad. Detecta hosts y servicios en una red informática.",
        license: "GPL",
        platform: "Multiplataforma",
        features: ["Escaneo de puertos", "Detección de servicios", "Detección de OS", "Scripting NSE"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "#nmap",
        difficulty: "beginner"
    },
    {
        id: 2,
        name: "Wireshark",
        category: "analisis",
        description: "Analizador de protocolos de red más utilizado en el mundo. Permite capturar y analizar tráfico de red en tiempo real.",
        license: "GPL",
        platform: "Multiplataforma",
        features: ["Captura en tiempo real", "Análisis profundo", "Filtrado avanzado", "Soporte múltiples protocolos"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "#wireshark",
        difficulty: "intermediate"
    },
    {
        id: 3,
        name: "Burp Suite Community",
        category: "web",
        description: "Versión gratuita del famoso toolkit para pruebas de seguridad de aplicaciones web. Incluye las herramientas esenciales.",
        license: "Community",
        platform: "Multiplataforma",
        features: ["Proxy intercept", "Scanner básico", "Repeater", "Intruder"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "#burp",
        difficulty: "intermediate"
    },
    {
        id: 4,
        name: "Metasploit Framework",
        category: "exploit",
        description: "Framework de desarrollo y testing de exploits que proporciona información sobre vulnerabilidades de seguridad.",
        license: "BSD",
        platform: "Multiplataforma",
        features: ["Base de datos de exploits", "Payloads", "Auxiliares", "Post-explotación"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "#metasploit",
        difficulty: "intermediate"
    },
    {
        id: 5,
        name: "John the Ripper",
        category: "cracking",
        description: "Herramienta de recuperación de contraseñas de código abierto. Detecta contraseñas débiles en Unix, Windows y más.",
        license: "GPL",
        platform: "Multiplataforma",
        features: ["Crackeo offline", "Múltiples modos", "Soporte GPU", "Auto-detección"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "#john",
        difficulty: "intermediate"
    },
    {
        id: 6,
        name: "Aircrack-ng",
        category: "monitoring",
        description: "Suite completa de herramientas para evaluar la seguridad de redes WiFi. Incluye captura de paquetes y ataques WEP/WPA.",
        license: "GPL",
        platform: "Linux/Windows/macOS",
        features: ["Captura de paquetes", "Ataques WEP/WPA", "Inyección de tráfico", "Test de rendimiento"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "#aircrack",
        difficulty: "advanced"
    },
    {
        id: 7,
        name: "Hydra",
        category: "cracking",
        description: "Herramienta de fuerza bruta paralelizada que soporta numerosos protocolos de ataque. Muy rápida y flexible.",
        license: "GPL",
        platform: "Multiplataforma",
        features: ["Múltiples protocolos", "Ataque paralelo", "Listas personalizadas", "Reintentos"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "#hydra",
        difficulty: "intermediate"
    },
    {
        id: 8,
        name: "Snort",
        category: "monitoring",
        description: "Sistema de detección de intrusiones (IDS) de código abierto que monitorea el tráfico de red en tiempo real.",
        license: "GPL",
        platform: "Multiplataforma",
        features: ["Detección en tiempo real", "Análisis de protocolos", "Reglas personalizables", "Alerta y logging"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "#snort",
        difficulty: "advanced"
    },
    {
        id: 9,
        name: "Maltego CE",
        category: "escaneo",
        description: "Versión Community Edition de la herramienta de análisis de enlaces para OSINT. Limitada pero muy poderosa.",
        license: "Proprietary Free",
        platform: "Multiplataforma",
        features: ["Visualización gráfica", "OSINT básico", "Transformaciones limitadas", "Para individuos"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "#maltego",
        difficulty: "intermediate"
    },
    {
        id: 10,
        name: "Volatility",
        category: "forense",
        description: "Framework avanzado de análisis forense de memoria. Extrae información de volcados de memoria RAM.",
        license: "GPL",
        platform: "Multiplataforma",
        features: ["Análisis de memoria", "Plugins extensibles", "Soporte múltiples OS", "Artefactos forenses"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "#volatility",
        difficulty: "advanced"
    },
    {
        id: 11,
        name: "OWASP ZAP",
        category: "web",
        description: "Herramienta de seguridad de aplicaciones web de código abierto. Ideal para desarrolladores y testers funcionales.",
        license: "Apache 2.0",
        platform: "Multiplataforma",
        features: ["Interceptación proxy", "Escáner automático", "Spidering", "API REST"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "#zap",
        difficulty: "beginner"
    },
    {
        id: 12,
        name: "Nessus Essentials",
        category: "escaneo",
        description: "Versión gratuita del vulnerability scanner. Escanea hasta 16 IPs y es ideal para aprendizaje y proyectos personales.",
        license: "Free for Home Use",
        platform: "Multiplataforma",
        features: ["Escaneo básico", "Base de datos actualizada", "Reporting limitado", "Para uso personal"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "#nessus",
        difficulty: "intermediate"
    }
];

// DOM Elements
const toolsGrid = document.getElementById('tools-grid');
const categoryButtons = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('tool-search');
const searchBtn = document.getElementById('search-btn');
const totalToolsElement = document.getElementById('total-tools');
const freeToolsElement = document.getElementById('free-tools');
const openSourceElement = document.getElementById('open-source');
const updatedToolsElement = document.getElementById('updated-tools');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    renderTools(toolsData);
    setupEventListeners();
    initTooltips();
});

// Actualizar estadísticas
function updateStats() {
    const totalTools = toolsData.length;
    const openSourceCount = toolsData.filter(tool => 
        tool.license === 'GPL' || tool.license === 'BSD' || tool.license === 'Apache 2.0'
    ).length;
    
    totalToolsElement.textContent = totalTools;
    freeToolsElement.textContent = totalTools; // Todas son gratuitas
    openSourceElement.textContent = openSourceCount;
    updatedToolsElement.textContent = totalTools; // Todas actualizadas para 2025
}

// Renderizar herramientas
function renderTools(tools) {
    toolsGrid.innerHTML = '';
    
    if (tools.length === 0) {
        toolsGrid.innerHTML = `
            <div class="no-results">
                <h3>😕 No se encontraron herramientas</h3>
                <p>Intenta con otros términos de búsqueda o selecciona otra categoría.</p>
            </div>
        `;
        return;
    }
    
    tools.forEach(tool => {
        const toolCard = createToolCard(tool);
        toolsGrid.appendChild(toolCard);
    });
}

// Crear tarjeta de herramienta
function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.dataset.category = tool.category;
    card.dataset.name = tool.name.toLowerCase();
    card.dataset.difficulty = tool.difficulty;
    
    const featuresHTML = tool.features.map(feature => 
        `<li>${feature}</li>`
    ).join('');
    
    card.innerHTML = `
        <img src="${tool.image}" alt="${tool.name}" class="tool-image" onerror="this.src='https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'">
        <div class="tool-header">
            <span class="tool-badge">${getCategoryName(tool.category)}</span>
            <h3 class="tool-title">${tool.name}</h3>
            <div class="tool-category">${getCategoryDescription(tool.category)}</div>
        </div>
        <div class="tool-body">
            <p class="tool-description">${tool.description}</p>
            <ul class="tool-features">${featuresHTML}</ul>
        </div>
        <div class="tool-footer">
            <div class="tool-meta">
                <span class="tool-license">${tool.license}</span>
                <span class="tool-platform">${tool.platform}</span>
            </div>
            <div class="tool-actions">
                <button class="tool-btn" onclick="showToolDetails(${tool.id})">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4"/>
                        <path d="M12 8h.01"/>
                    </svg>
                    VER GUÍA
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Obtener nombre de categoría
function getCategoryName(category) {
    const categories = {
        'escaneo': 'Escaneo',
        'analisis': 'Análisis',
        'web': 'Web',
        'exploit': 'Explotación',
        'forense': 'Forense',
        'monitoring': 'Monitoreo',
        'cracking': 'Password Cracking'
    };
    return categories[category] || category;
}

// Obtener descripción de categoría
function getCategoryDescription(category) {
    const descriptions = {
        'escaneo': 'Escaneo y Reconocimiento',
        'analisis': 'Análisis de Red',
        'web': 'Seguridad Web',
        'exploit': 'Herramientas de Explotación',
        'forense': 'Análisis Forense Digital',
        'monitoring': 'Monitoreo y Detección',
        'cracking': 'Password Cracking'
    };
    return descriptions[category] || 'Herramienta de Ciberseguridad';
}

// Filtrar herramientas por categoría
function filterTools(category) {
    if (category === 'all') {
        return toolsData;
    }
    return toolsData.filter(tool => tool.category === category);
}

// Buscar herramientas
function searchTools(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        return toolsData;
    }
    
    return toolsData.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm) ||
        tool.category.includes(searchTerm) ||
        tool.features.some(feature => feature.toLowerCase().includes(searchTerm)) ||
        tool.license.toLowerCase().includes(searchTerm) ||
        tool.platform.toLowerCase().includes(searchTerm)
    );
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros por categoría
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            button.classList.add('active');
            
            const category = button.dataset.category;
            const filteredTools = filterTools(category);
            renderTools(filteredTools);
        });
    });
    
    // Búsqueda
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Búsqueda en tiempo real
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim().length >= 2 || searchInput.value.trim().length === 0) {
            performSearch();
        }
    });
    
    // Efecto de carga en imágenes
    const images = document.querySelectorAll('.tool-image');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Realizar búsqueda
function performSearch() {
    const searchTerm = searchInput.value;
    const activeCategory = document.querySelector('.category-btn.active').dataset.category;
    
    let results = searchTools(searchTerm);
    
    // Aplicar filtro de categoría además de búsqueda
    if (activeCategory !== 'all') {
        results = results.filter(tool => tool.category === activeCategory);
    }
    
    renderTools(results);
}

// Mostrar detalles de herramienta
function showToolDetails(toolId) {
    const tool = toolsData.find(t => t.id === toolId);
    if (tool) {
        const difficultyText = {
            'beginner': 'Principiante',
            'intermediate': 'Intermedio',
            'advanced': 'Avanzado'
        };
        
        const modalHTML = `
            <div class="tool-modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${tool.image}" alt="${tool.name}" class="modal-image">
                    <h2>${tool.name}</h2>
                    <div class="modal-meta">
                        <span class="modal-category">${getCategoryName(tool.category)}</span>
                        <span class="modal-license">${tool.license}</span>
                        <span class="modal-difficulty ${tool.difficulty}">${difficultyText[tool.difficulty]}</span>
                        <span class="modal-platform">${tool.platform}</span>
                    </div>
                    <p class="modal-description">${tool.description}</p>
                    <h3>Características principales:</h3>
                    <ul class="modal-features">
                        ${tool.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <div class="modal-info">
                        <p><strong>Licencia:</strong> ${tool.license}</p>
                        <p><strong>Plataforma:</strong> ${tool.platform}</p>
                        <p><strong>Dificultad:</strong> ${difficultyText[tool.difficulty]}</p>
                        <p><strong>Categoría:</strong> ${getCategoryDescription(tool.category)}</p>
                    </div>
                    <div class="modal-actions">
                        <button onclick="window.open('https://www.google.com/search?q=${encodeURIComponent(tool.name + ' tutorial español')}', '_blank')" class="modal-btn guide">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                            </svg>
                            VER GUÍA COMPLETA
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Crear modal
        const modal = document.createElement('div');
        modal.innerHTML = modalHTML;
        document.body.appendChild(modal);
        
        // Estilos del modal
        const style = document.createElement('style');
        style.textContent = `
            .tool-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
                backdrop-filter: blur(5px);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .modal-content {
                background: linear-gradient(135deg, #1a1a1a, var(--azul-oscuro));
                border-radius: 20px;
                padding: 2rem;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                border: 2px solid var(--verde-neon);
                box-shadow: 0 20px 60px rgba(0, 255, 171, 0.3);
                position: relative;
                animation: slideUp 0.4s ease;
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .close-modal {
                position: absolute;
                top: 1rem;
                right: 1.5rem;
                font-size: 2rem;
                color: var(--verde-neon);
                cursor: pointer;
                transition: color 0.3s ease;
                background: none;
                border: none;
                line-height: 1;
            }
            
            .close-modal:hover {
                color: #fff;
            }
            
            .modal-image {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 12px;
                margin-bottom: 1.5rem;
                border: 2px solid rgba(0, 255, 171, 0.3);
            }
            
            .modal-meta {
                display: flex;
                flex-wrap: wrap;
                gap: 0.8rem;
                margin: 1rem 0;
            }
            
            .modal-meta span {
                padding: 0.3rem 0.8rem;
                border-radius: 4px;
                font-size: 0.85rem;
                font-weight: 600;
            }
            
            .modal-category {
                background: rgba(0, 255, 171, 0.1);
                color: var(--verde-neon);
                border: 1px solid rgba(0, 255, 171, 0.3);
            }
            
            .modal-license {
                background: rgba(76, 175, 80, 0.1);
                color: #4caf50;
                border: 1px solid rgba(76, 175, 80, 0.3);
            }
            
            .modal-difficulty.beginner {
                background: rgba(76, 175, 80, 0.2);
                color: #4caf50;
                border: 1px solid rgba(76, 175, 80, 0.3);
            }
            
            .modal-difficulty.intermediate {
                background: rgba(255, 152, 0, 0.2);
                color: #ff9800;
                border: 1px solid rgba(255, 152, 0, 0.3);
            }
            
            .modal-difficulty.advanced {
                background: rgba(244, 67, 54, 0.2);
                color: #f44336;
                border: 1px solid rgba(244, 67, 54, 0.3);
            }
            
            .modal-platform {
                background: rgba(33, 150, 243, 0.1);
                color: #2196f3;
                border: 1px solid rgba(33, 150, 243, 0.3);
            }
            
            .modal-description {
                color: rgba(255, 255, 255, 0.9);
                line-height: 1.6;
                margin: 1.5rem 0;
                font-size: 1.1rem;
            }
            
            .modal-features {
                list-style: none;
                padding: 0;
                margin: 1rem 0 2rem;
            }
            
            .modal-features li {
                padding: 0.5rem 0;
                color: rgba(255, 255, 255, 0.9);
                position: relative;
                padding-left: 1.8rem;
            }
            
            .modal-features li::before {
                content: "✓";
                position: absolute;
                left: 0;
                color: var(--verde-neon);
                font-weight: bold;
                font-size: 1.2rem;
            }
            
            .modal-info {
                background: rgba(0, 0, 0, 0.2);
                padding: 1.5rem;
                border-radius: 12px;
                margin: 1.5rem 0;
                border: 1px solid rgba(0, 255, 171, 0.1);
            }
            
            .modal-info p {
                color: rgba(255, 255, 255, 0.9);
                margin: 0.5rem 0;
                display: flex;
                justify-content: space-between;
            }
            
            .modal-info p strong {
                color: var(--verde-neon);
            }
            
            .modal-actions {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
            }
            
            .modal-btn {
                flex: 1;
                padding: 1.2rem 1.5rem;
                border: none;
                border-radius: 10px;
                font-weight: 700;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .modal-btn.guide {
                background: linear-gradient(135deg, var(--verde-neon), #00cc88);
                color: var(--azul-oscuro);
            }
            
            .modal-btn.guide:hover {
                background: linear-gradient(135deg, #00cc88, var(--verde-neon));
                transform: translateY(-3px);
                box-shadow: 0 8px 20px rgba(0, 255, 171, 0.4);
            }
        `;
        document.head.appendChild(style);
        
        // Cerrar modal
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        // Cerrar al hacer clic fuera del contenido
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }
        });
        
        // Cerrar con Escape
        const closeModal = () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
            document.removeEventListener('keydown', handleEscape);
        };
        
        const handleEscape = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        
        document.addEventListener('keydown', handleEscape);
    }
}

// Inicializar tooltips
function initTooltips() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });
}

// Función para simular clic en categoría (para enlaces del menú)
function filterByCategory(categoryName) {
    const categoryMap = {
        'nmap': 'escaneo',
        'wireshark': 'analisis',
        'burp': 'web',
        'metasploit': 'exploit',
        'hydra': 'cracking',
        'aircrack': 'monitoring'
    };
    
    const category = categoryMap[categoryName];
    if (category) {
        // Encontrar y hacer clic en el botón correspondiente
        const buttons = document.querySelectorAll('.category-btn');
        buttons.forEach(btn => {
            if (btn.dataset.category === category || btn.dataset.category === 'all') {
                btn.click();
            }
        });
        
        // Scroll al grid de herramientas
        document.querySelector('.tools-grid').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Hacer funciones disponibles globalmente
window.toolsModule = {
    filterTools,
    searchTools,
    showToolDetails,
    filterByCategory
};

// Manejar enlaces hash en la URL
window.addEventListener('hashchange', handleHash);
window.addEventListener('load', handleHash);

function handleHash() {
    const hash = window.location.hash.substring(1); // Eliminar el #
    if (hash && hash !== '') {
        filterByCategory(hash);
    }
}