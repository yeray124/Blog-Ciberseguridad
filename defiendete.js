// defiendete.js - Funcionalidad para la página de Defiéndete

document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let selectedOptions = [];
    let currentSimulator = null;
    
    // Evaluación de riesgo
    const quizOptions = document.querySelectorAll('.quiz-option');
    const calculateBtn = document.getElementById('calculate-risk');
    const riskResult = document.getElementById('risk-result');
    const riskLevelText = document.getElementById('risk-level-text');
    const meterFill = document.getElementById('meter-fill');
    const recommendationsList = document.getElementById('recommendations-list');
    const retakeQuizBtn = document.getElementById('retake-quiz');
    
    // Seleccionar opciones del quiz
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const question = this.closest('.quiz-question');
            
            // Remover selección previa en esta pregunta
            question.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Marcar como seleccionada
            this.classList.add('selected');
            
            // Guardar selección
            const riskLevel = this.getAttribute('data-risk');
            selectedOptions.push({
                question: question.querySelector('h3').textContent,
                risk: riskLevel
            });
        });
    });
    
    // Calcular riesgo
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const selected = document.querySelectorAll('.quiz-option.selected');
            
            if (selected.length < 2) {
                alert('Por favor, responde todas las preguntas.');
                return;
            }
            
            // Calcular nivel de riesgo
            const riskValues = {
                'low': 1,
                'medium': 2,
                'high': 3,
                'critical': 4
            };
            
            let totalRisk = 0;
            selected.forEach(option => {
                const risk = option.getAttribute('data-risk');
                totalRisk += riskValues[risk];
            });
            
            const averageRisk = totalRisk / selected.length;
            let riskLevel, riskPercent, riskColor;
            
            if (averageRisk <= 1.5) {
                riskLevel = 'BAJO';
                riskPercent = 25;
                riskColor = '#4CAF50';
            } else if (averageRisk <= 2.5) {
                riskLevel = 'MODERADO';
                riskPercent = 50;
                riskColor = '#FF9800';
            } else if (averageRisk <= 3.5) {
                riskLevel = 'ALTO';
                riskPercent = 75;
                riskColor = '#FF5252';
            } else {
                riskLevel = 'CRÍTICO';
                riskPercent = 100;
                riskColor = '#F44336';
            }
            
            // Mostrar resultados
            riskLevelText.textContent = riskLevel;
            riskLevelText.style.color = riskColor;
            meterFill.style.width = riskPercent + '%';
            meterFill.style.background = riskColor;
            
            // Mostrar recomendaciones
            showRecommendations(riskLevel);
            
            // Mostrar sección de resultados
            riskResult.classList.remove('hidden');
            
            // Scroll a resultados
            riskResult.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Mostrar recomendaciones según nivel de riesgo
    function showRecommendations(riskLevel) {
        const recommendations = {
            'BAJO': [
                'Mantén tus hábitos actuales de seguridad',
                'Realiza backups mensuales',
                'Usa autenticación de dos factores en cuentas importantes',
                'Mantén el software actualizado'
            ],
            'MODERADO': [
                'Implementa un gestor de contraseñas',
                'Habilita el firewall de tu sistema',
                'Realiza escaneos semanales con antivirus',
                'Eduza a tu familia sobre seguridad básica'
            ],
            'ALTO': [
                'Cambia todas tus contraseñas inmediatamente',
                'Implementa soluciones de seguridad empresarial',
                'Realiza auditorías de seguridad periódicas',
                'Considera un seguro de ciberseguridad'
            ],
            'CRÍTICO': [
                'Contrata un consultor de seguridad inmediatamente',
                'Implementa sistemas de detección de intrusiones',
                'Establece un plan de respuesta a incidentes',
                'Realiza formaciones obligatorias para todo el personal'
            ]
        };
        
        recommendationsList.innerHTML = '';
        recommendations[riskLevel].forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });
    }
    
    // Rehacer evaluación
    if (retakeQuizBtn) {
        retakeQuizBtn.addEventListener('click', function() {
            // Resetear selecciones
            quizOptions.forEach(option => {
                option.classList.remove('selected');
            });
            selectedOptions = [];
            
            // Ocultar resultados
            riskResult.classList.add('hidden');
            
            // Scroll al inicio del quiz
            document.querySelector('.assessment-quiz').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Tarjetas de amenazas (acordeón)
    const threatToggles = document.querySelectorAll('.threat-toggle');
    threatToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const card = this.closest('.threat-card');
            card.classList.toggle('active');
            
            // Cerrar otras tarjetas (opcional)
            // document.querySelectorAll('.threat-card').forEach(otherCard => {
            //     if (otherCard !== card) {
            //         otherCard.classList.remove('active');
            //     }
            // });
        });
    });
    
    // Pestañas de herramientas
    const categoryTabs = document.querySelectorAll('.category-tab');
    const toolCategories = document.querySelectorAll('.tools-category');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Activar pestaña
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar categoría correspondiente
            toolCategories.forEach(cat => {
                cat.classList.remove('active');
                if (cat.id === category + '-tools') {
                    cat.classList.add('active');
                }
            });
        });
    });
    
    // Checklist de seguridad
    const checkItems = document.querySelectorAll('.check-item');
    const completedChecks = document.getElementById('completed-checks');
    const totalChecks = document.getElementById('total-checks');
    const checklistProgress = document.getElementById('checklist-progress');
    const resetChecklistBtn = document.getElementById('reset-checklist');
    
    // Inicializar contadores
    totalChecks.textContent = checkItems.length;
    updateChecklistProgress();
    
    // Actualizar progreso al marcar/desmarcar
    checkItems.forEach(item => {
        item.addEventListener('change', updateChecklistProgress);
    });
    
    function updateChecklistProgress() {
        const checkedItems = document.querySelectorAll('.check-item:checked');
        const progress = (checkedItems.length / checkItems.length) * 100;
        
        completedChecks.textContent = checkedItems.length;
        checklistProgress.style.width = progress + '%';
        
        // Cambiar color según progreso
        if (progress < 33) {
            checklistProgress.style.background = '#F44336';
        } else if (progress < 66) {
            checklistProgress.style.background = '#FF9800';
        } else {
            checklistProgress.style.background = '#4CAF50';
        }
    }
    
    // Resetear checklist
    if (resetChecklistBtn) {
        resetChecklistBtn.addEventListener('click', function() {
            checkItems.forEach(item => {
                item.checked = false;
            });
            updateChecklistProgress();
        });
    }
    
    // Simuladores de ataques
    const scenarioButtons = document.querySelectorAll('.start-scenario');
    const simulatorModal = document.getElementById('simulator-modal');
    const modalContent = simulatorModal.querySelector('.modal-content');
    
    scenarioButtons.forEach(button => {
        button.addEventListener('click', function() {
            const scenario = this.getAttribute('data-scenario');
            startSimulator(scenario);
        });
    });
    
    // Iniciar simulador
    function startSimulator(scenario) {
        currentSimulator = scenario;
        
        // Configurar contenido según escenario
        let simulatorHTML = '';
        let simulatorTitle = '';
        let simulatorSteps = [];
        
        switch(scenario) {
            case 'phishing':
                simulatorTitle = 'Simulador de Phishing';
                simulatorHTML = `
                    <div class="simulator-header">
                        <h2><i class="fas fa-fish"></i> ${simulatorTitle}</h2>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="simulator-body">
                        <p>Identifica cuáles de estos emails son phishing y cuáles son legítimos.</p>
                        
                        <div class="email-simulator">
                            <div class="email" data-type="phishing">
                                <div class="email-header">
                                    <span class="sender">soporte@paypa1.com</span>
                                    <span class="subject">URGENTE: Su cuenta ha sido comprometida</span>
                                </div>
                                <div class="email-body">
                                    <p>Estimado usuario,</p>
                                    <p>Hemos detectado actividad sospechosa en su cuenta de PayPal. Por favor, haga clic en el siguiente enlace para verificar su identidad:</p>
                                    <p><a href="#" class="fake-link">paypa1-verificacion.com/seguridad</a></p>
                                    <p>Si no actúa en las próximas 24 horas, su cuenta será suspendida.</p>
                                </div>
                                <div class="email-actions">
                                    <button class="identify-btn" data-answer="phishing">Es Phishing</button>
                                    <button class="identify-btn" data-answer="legit">Es Legítimo</button>
                                </div>
                                <div class="email-feedback hidden"></div>
                            </div>
                            
                            <div class="email" data-type="legit">
                                <div class="email-header">
                                    <span class="sender">noreply@github.com</span>
                                    <span class="subject">Nuevo inicio de sesión detectado</span>
                                </div>
                                <div class="email-body">
                                    <p>Hola,</p>
                                    <p>Se detectó un nuevo inicio de sesión en tu cuenta de GitHub:</p>
                                    <ul>
                                        <li><strong>Ubicación:</strong> Madrid, España</li>
                                        <li><strong>Dispositivo:</strong> Chrome en Windows</li>
                                        <li><strong>Hora:</strong> Hace 5 minutos</li>
                                    </ul>
                                    <p>Si fuiste tú, puedes ignorar este mensaje. Si no, por favor revisa tu cuenta.</p>
                                </div>
                                <div class="email-actions">
                                    <button class="identify-btn" data-answer="phishing">Es Phishing</button>
                                    <button class="identify-btn" data-answer="legit">Es Legítimo</button>
                                </div>
                                <div class="email-feedback hidden"></div>
                            </div>
                        </div>
                        
                        <div class="simulator-score">
                            <h3>Puntuación: <span id="score">0</span>/2</h3>
                            <button class="restart-simulator">Reiniciar Simulador</button>
                        </div>
                    </div>
                `;
                break;
                
            case 'password':
                simulatorTitle = 'Simulador de Fortaleza de Contraseñas';
                simulatorHTML = `
                    <div class="simulator-header">
                        <h2><i class="fas fa-key"></i> ${simulatorTitle}</h2>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="simulator-body">
                        <p>Escribe contraseñas y descubre cuánto tiempo tardaría un hacker en crackearlas.</p>
                        
                        <div class="password-simulator">
                            <div class="password-input">
                                <input type="text" id="password-test" placeholder="Escribe una contraseña para probar">
                                <button id="test-password">Probar</button>
                            </div>
                            
                            <div class="password-results hidden">
                                <h4>Resultados:</h4>
                                <div class="result-item">
                                    <span>Fortaleza:</span>
                                    <span id="strength">-</span>
                                </div>
                                <div class="result-item">
                                    <span>Tiempo estimado de crackeo:</span>
                                    <span id="crack-time">-</span>
                                </div>
                                <div class="result-item">
                                    <span>Recomendación:</span>
                                    <span id="recommendation">-</span>
                                </div>
                            </div>
                            
                            <div class="password-examples">
                                <h4>Ejemplos:</h4>
                                <div class="example-list">
                                    <button class="example-btn" data-password="123456">123456</button>
                                    <button class="example-btn" data-password="password">password</button>
                                    <button class="example-btn" data-password="qwerty">qwerty</button>
                                    <button class="example-btn" data-password="P@ssw0rd!2024">P@ssw0rd!2024</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }
        
        modalContent.innerHTML = simulatorHTML;
        simulatorModal.classList.remove('hidden');
        
        // Configurar funcionalidad específica del simulador
        setupSimulator(scenario);
    }
    
    // Configurar funcionalidad del simulador
    function setupSimulator(scenario) {
        const closeBtn = modalContent.querySelector('.close-modal');
        
        // Cerrar modal
        closeBtn.addEventListener('click', function() {
            simulatorModal.classList.add('hidden');
        });
        
        // Cerrar al hacer clic fuera
        simulatorModal.addEventListener('click', function(e) {
            if (e.target === simulatorModal) {
                simulatorModal.classList.add('hidden');
            }
        });
        
        // Configuración específica por escenario
        if (scenario === 'phishing') {
            setupPhishingSimulator();
        } else if (scenario === 'password') {
            setupPasswordSimulator();
        }
    }
    
    // Configurar simulador de phishing
    function setupPhishingSimulator() {
        const identifyButtons = document.querySelectorAll('.identify-btn');
        const restartBtn = document.querySelector('.restart-simulator');
        const scoreElement = document.getElementById('score');
        
        let score = 0;
        let answered = 0;
        
        identifyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const email = this.closest('.email');
                const correctAnswer = email.getAttribute('data-type');
                const userAnswer = this.getAttribute('data-answer');
                const feedback = email.querySelector('.email-feedback');
                
                // Deshabilitar botones
                email.querySelectorAll('.identify-btn').forEach(btn => {
                    btn.disabled = true;
                });
                
                // Mostrar feedback
                if (userAnswer === correctAnswer) {
                    feedback.innerHTML = '<i class="fas fa-check-circle"></i> ¡Correcto!';
                    feedback.style.color = '#4CAF50';
                    score++;
                } else {
                    feedback.innerHTML = '<i class="fas fa-times-circle"></i> Incorrecto.';
                    feedback.style.color = '#F44336';
                    
                    // Mostrar explicación
                    if (correctAnswer === 'phishing') {
                        feedback.innerHTML += '<p class="explanation">Señales de phishing: dominio falso (paypa1.com), urgencia falsa, enlace sospechoso.</p>';
                    } else {
                        feedback.innerHTML += '<p class="explanation">Este email es legítimo: viene del dominio oficial, proporciona información específica sin pedir datos.</p>';
                    }
                }
                
                feedback.classList.remove('hidden');
                answered++;
                
                // Actualizar puntuación
                scoreElement.textContent = score;
                
                // Mostrar resultado final
                if (answered === 2) {
                    setTimeout(() => {
                        alert(`Simulador completado. Puntuación: ${score}/2\n${score >= 1 ? '¡Buen trabajo!' : 'Necesitas más práctica.'}`);
                    }, 500);
                }
            });
        });
        
        // Reiniciar simulador
        restartBtn.addEventListener('click', function() {
            document.querySelectorAll('.email').forEach(email => {
                email.querySelectorAll('.identify-btn').forEach(btn => {
                    btn.disabled = false;
                });
                email.querySelector('.email-feedback').classList.add('hidden');
            });
            score = 0;
            answered = 0;
            scoreElement.textContent = '0';
        });
    }
    
    // Configurar simulador de contraseñas
    function setupPasswordSimulator() {
        const testBtn = document.getElementById('test-password');
        const passwordInput = document.getElementById('password-test');
        const resultsDiv = document.querySelector('.password-results');
        const exampleButtons = document.querySelectorAll('.example-btn');
        
        testBtn.addEventListener('click', function() {
            const password = passwordInput.value.trim();
            
            if (!password) {
                alert('Por favor, escribe una contraseña para probar.');
                return;
            }
            
            // Calcular fortaleza
            const strength = calculatePasswordStrength(password);
            const crackTime = estimateCrackTime(password);
            const recommendation = getPasswordRecommendation(strength);
            
            // Mostrar resultados
            document.getElementById('strength').textContent = strength;
            document.getElementById('strength').className = strength.toLowerCase();
            document.getElementById('crack-time').textContent = crackTime;
            document.getElementById('recommendation').textContent = recommendation;
            
            resultsDiv.classList.remove('hidden');
        });
        
        // Ejemplos predefinidos
        exampleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const password = this.getAttribute('data-password');
                passwordInput.value = password;
                
                // Probar automáticamente
                testBtn.click();
            });
        });
        
        // Calcular fortaleza de contraseña
        function calculatePasswordStrength(password) {
            let score = 0;
            
            // Longitud
            if (password.length >= 8) score += 1;
            if (password.length >= 12) score += 1;
            if (password.length >= 16) score += 1;
            
            // Complejidad
            if (/[a-z]/.test(password)) score += 1;
            if (/[A-Z]/.test(password)) score += 1;
            if (/[0-9]/.test(password)) score += 1;
            if (/[^A-Za-z0-9]/.test(password)) score += 1;
            
            // Determinar nivel
            if (score >= 6) return 'MUY FUERTE';
            if (score >= 4) return 'FUERTE';
            if (score >= 2) return 'MODERADA';
            return 'DÉBIL';
        }
        
        // Estimar tiempo de crackeo
        function estimateCrackTime(password) {
            // Estimación básica (no realista, solo para demostración)
            const length = password.length;
            const charset = estimateCharsetSize(password);
            const combinations = Math.pow(charset, length);
            const guessesPerSecond = 1e9; // 1 billón de guesses/segundo
            
            const seconds = combinations / guessesPerSecond;
            
            if (seconds < 1) return 'Menos de 1 segundo';
            if (seconds < 60) return 'Segundos';
            if (seconds < 3600) return 'Minutos';
            if (seconds < 86400) return 'Horas';
            if (seconds < 2592000) return 'Días';
            if (seconds < 31536000) return 'Meses';
            return 'Años';
        }
        
        function estimateCharsetSize(password) {
            let size = 0;
            if (/[a-z]/.test(password)) size += 26;
            if (/[A-Z]/.test(password)) size += 26;
            if (/[0-9]/.test(password)) size += 10;
            if (/[^A-Za-z0-9]/.test(password)) size += 32;
            return size || 26; // Default a solo minúsculas
        }
        
        function getPasswordRecommendation(strength) {
            switch(strength) {
                case 'MUY FUERTE': return 'Excelente. Mantén esta contraseña.';
                case 'FUERTE': return 'Buena. Podría ser más larga.';
                case 'MODERADA': return 'Aceptable. Añade símbolos y mayúsculas.';
                case 'DÉBIL': return 'Muy débil. Cambia esta contraseña inmediatamente.';
                default: return '';
            }
        }
    }
    
    // Botón de simulador en tarjetas de amenazas
    const threatSimulatorBtns = document.querySelectorAll('.simulator-btn');
    threatSimulatorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const threat = this.getAttribute('data-threat');
            startSimulator(threat);
        });
    });
    
    // Enlaces de herramientas
    const toolLinks = document.querySelectorAll('.tool-link, .tool-item');
    toolLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const toolName = this.querySelector('span')?.textContent || this.textContent;
            alert(`En un sitio real, esto te llevaría a descargar/instalar: ${toolName}`);
        });
    });
    
    // Contactos de emergencia
    const emergencyContacts = document.querySelectorAll('.contact-item');
    emergencyContacts.forEach(contact => {
        contact.addEventListener('click', function(e) {
            e.preventDefault();
            const contactType = this.querySelector('h4').textContent;
            alert(`En un sitio real, esto te contactaría con: ${contactType}`);
        });
    });
});