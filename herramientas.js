// Datos de las herramientas
const toolsData = [
    {
        id: 1,
        name: "Nmap",
        category: "escaneo",
        description: "Herramienta de código abierto para exploración de red y auditoría de seguridad. Detecta hosts y servicios en una red informática.",
        license: "free",
        platform: "Multiplataforma",
        features: ["Escaneo de puertos", "Detección de servicios", "Detección de OS", "Scripting NSE"],
        link: "#nmap"
    },
    {
        id: 2,
        name: "Wireshark",
        category: "analisis",
        description: "Analizador de protocolos de red más utilizado en el mundo. Permite capturar y analizar tráfico de red en tiempo real.",
        license: "free",
        platform: "Multiplataforma",
        features: ["Captura en tiempo real", "Análisis profundo", "Filtrado avanzado", "Soporte múltiples protocolos"],
        link: "#wireshark"
    },
    {
        id: 3,
        name: "Burp Suite",
        category: "web",
        description: "Plataforma integral para pruebas de seguridad de aplicaciones web. Incluye herramientas para cada etapa del proceso de testing.",
        license: "premium",
        platform: "Multiplataforma",
        features: ["Proxy intercept", "Scanner automático", "Intruder", "Repeater"],
        link: "#burp"
    },
    {
        id: 4,
        name: "Metasploit",
        category: "exploit",
        description: "Framework de desarrollo y testing de exploits que proporciona información sobre vulnerabilidades de seguridad.",
        license: "free",
        platform: "Multiplataforma",
        features: ["Base de datos de exploits", "Payloads", "Auxiliares", "Post-explotación"],
        link: "#metasploit"
    },
    {
        id: 5,
        name: "John the Ripper",
        category: "forense",
        description: "Herramienta de recuperación de contraseñas de código abierto. Detecta contraseñas débiles en Unix, Windows y más.",
        license: "free",
        platform: "Multiplataforma",
        features: ["Crackeo offline", "Múltiples modos", "Soporte GPU", "Auto-detección"],
        link: "#john"
    },
    {
        id: 6,
        name: "Aircrack-ng",
        category: "monitoring",
        description: "Suite completa de herramientas para evaluar la seguridad de redes WiFi. Incluye captura de paquetes y ataques WEP/WPA.",
        license: "free",
        platform: "Linux/Windows/macOS",
        features: ["Captura de paquetes", "Ataques WEP/WPA", "Inyección de tráfico", "Test de rendimiento"],
        link: "#aircrack"
    },
    {
        id: 7,
        name: "Hydra",
        category: "escaneo",
        description: "Herramienta de fuerza bruta paralelizada que soporta numerosos protocolos de ataque. Muy rápida y flexible.",
        license: "free",
        platform: "Multiplataforma",
        features: ["Múltiples protocolos", "Ataque paralelo", "Listas personalizadas", "Reintentos"],
        link: "#hydra"
    },
    {
        id: 8,
        name: "Snort",
        category: "monitoring",
        description: "Sistema de detección de intrusiones (IDS) de código abierto que monitorea el tráfico de red en tiempo real.",
        license: "free",
        platform: "Multiplataforma",
        features: ["Detección en tiempo real", "Análisis de protocolos", "Reglas personalizables", "Alerta y logging"],
        link: "#snort"
    },
    {
        id: 9,
        name: "Maltego",
        category: "escaneo",
        description: "Herramienta de análisis de enlaces que realiza minería de información de fuentes abiertas (OSINT) de manera gráfica.",
        license: "premium",
        platform: "Multiplataforma",
        features: ["Visualización gráfica", "OSINT automatizado", "Transformaciones", "Integración APIs"],
        link: "#maltego"
    },
    {
        id: 10,
        name: "Volatility",
        category: "forense",
        description: "Framework avanzado de análisis forense de memoria. Extrae información de volcados de memoria RAM.",
        license: "free",
        platform: "Multiplataforma",
        features: ["Análisis de memoria", "Plugins extensibles", "Soporte múltiples OS", "Artefactos forenses"],
        link: "#volatility"
    },
    {
        id: 11,
        name: "OWASP ZAP",
        category: "web",
        description: "Herramienta de seguridad de aplicaciones web de código abierto. Ideal para desarrolladores y testers funcionales.",
        license: "free",
        platform: "Multiplataforma",
        features: ["Interceptación proxy", "Escáner automático", "Spidering", "API REST"],
        link: "#zap"
    },
    {
        id: 12,
        name: "Nessus",
        category: "escaneo",
        description: "Vulnerability scanner comercial ampliamente utilizado. Detecta vulnerabilidades, configuraciones erróneas y más.",
        license: "premium",
        platform: "Multiplataforma",
        features: ["Escaneo completo", "Base de datos actualizada", "Reporting avanzado", "Soporte empresarial"],
        link: "#nessus"
    }
];

// DOM Elements
const toolsGrid = document.getElementById('tools-grid');
const categoryButtons = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('tool-search');
const searchBtn = document.getElementById('search-btn');
const totalToolsElement = document.getElementById('total-tools');
const freeToolsElement = document.getElementById('free-tools');
const premiumToolsElement = document.getElementById('premium-tools');
const updatedToolsElement = document.getElementById('updated-tools');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    renderTools(toolsData);
    setupEventListeners();
});

// Actualizar estadísticas
function updateStats() {
    const totalTools = toolsData.length;
    const freeTools = toolsData.filter(tool => tool.license === 'free').length;
    const premiumTools = toolsData.filter(tool => tool.license === 'premium').length;
    
    totalToolsElement.textContent = totalTools;
    freeToolsElement.textContent = freeTools;
    premiumToolsElement.textContent = premiumTools;
    updatedToolsElement.textContent = 10; // Valor fijo para demo
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
    
    const featuresHTML = tool.features.map(feature => 
        `<li>${feature}</li>`
    ).join('');
    
    card.innerHTML = `
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
                <span class="tool-license ${tool.license}">${tool.license === 'free' ? 'Gratuita' : 'Premium'}</span>
                <span class="tool-platform">${tool.platform}</span>
            </div>
            <div class="tool-actions">
                <button class="tool-btn details" onclick="showToolDetails(${tool.id})">Detalles</button>
                <button class="tool-btn" onclick="window.location.href='${tool.link}'">Ver más</button>
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
        'monitoring': 'Monitoreo'
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
        'monitoring': 'Monitoreo y Detección'
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
        tool.features.some(feature => feature.toLowerCase().includes(searchTerm))
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
    
    // Búsqueda en tiempo real (opcional)
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim().length >= 3 || searchInput.value.trim().length === 0) {
            performSearch();
        }
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

// Mostrar detalles de herramienta (para demo)
function showToolDetails(toolId) {
    const tool = toolsData.find(t => t.id === toolId);
    if (tool) {
        alert(`Detalles de ${tool.name}\n\nCategoría: ${getCategoryName(tool.category)}\nLicencia: ${tool.license === 'free' ? 'Gratuita' : 'Premium'}\nPlataforma: ${tool.platform}\n\nCaracterísticas:\n• ${tool.features.join('\n• ')}`);
    }
}

// Inicializar tooltips y efectos (opcional)
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

// Exportar funciones si es necesario (para uso modular)
window.toolsModule = {
    filterTools,
    searchTools,
    showToolDetails
};