// contacto.js - Funcionalidad para la página de contacto

document.addEventListener('DOMContentLoaded', function() {
    // Validación del formulario
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const newMessageBtn = document.getElementById('newMessage');
    const charCount = document.getElementById('charCount');
    const messageTextarea = document.getElementById('mensaje');
    
    // Contador de caracteres para el textarea
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            charCount.textContent = this.value.length;
            
            // Cambiar color si se acerca al límite
            if (this.value.length > 900) {
                charCount.style.color = '#ff6b6b';
            } else if (this.value.length > 800) {
                charCount.style.color = '#ffa726';
            } else {
                charCount.style.color = 'inherit';
            }
        });
    }
    
    // Validación en tiempo real
    const formFields = contactForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            clearError(this);
        });
    });
    
    // Validar un campo específico
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        // Limpiar errores previos
        clearError(field);
        
        // Validaciones específicas
        if (field.hasAttribute('required') && !field.value.trim()) {
            showError(formGroup, errorMessage, 'Este campo es obligatorio');
            return false;
        }
        
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showError(formGroup, errorMessage, 'Por favor, introduce un email válido');
                return false;
            }
        }
        
        if (field.id === 'telefono' && field.value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
            if (!phoneRegex.test(field.value)) {
                showError(formGroup, errorMessage, 'Por favor, introduce un teléfono válido');
                return false;
            }
        }
        
        if (field.id === 'mensaje' && field.value.length > 1000) {
            showError(formGroup, errorMessage, 'El mensaje no puede exceder los 1000 caracteres');
            return false;
        }
        
        return true;
    }
    
    // Mostrar error
    function showError(formGroup, errorElement, message) {
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Limpiar error
    function clearError(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        }
    }
    
    // Envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validar todos los campos
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Aquí normalmente enviarías los datos al servidor
                // Por ahora, simulamos el envío
                simulateFormSubmission();
            } else {
                // Scroll al primer error
                const firstError = this.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });
    }
    
    // Simular envío del formulario
    function simulateFormSubmission() {
        // Mostrar estado de carga
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simular tiempo de envío
        setTimeout(() => {
            // Ocultar formulario y mostrar mensaje de éxito
            contactForm.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Restaurar botón
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
            
            // Scroll al mensaje de éxito
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    }
    
    // Botón para nuevo mensaje
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', function() {
            // Mostrar formulario y ocultar mensaje de éxito
            contactForm.style.display = 'block';
            successMessage.classList.add('hidden');
            
            // Resetear formulario
            contactForm.reset();
            charCount.textContent = '0';
            
            // Limpiar errores
            const errorGroups = contactForm.querySelectorAll('.error');
            errorGroups.forEach(group => {
                group.classList.remove('error');
            });
            
            // Scroll al formulario
            contactForm.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Funcionalidad FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Cerrar todas las FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir la FAQ clickeada si no estaba activa
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Botón del mapa
    const mapBtn = document.querySelector('.map-btn');
    if (mapBtn) {
        mapBtn.addEventListener('click', function() {
            // En un caso real, esto abriría Google Maps
            const address = encodeURIComponent('Calle Seguridad Digital 123, Madrid, España');
            window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
        });
    }
    
    // Enlaces de redes sociales
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList.contains('twitter') ? 'Twitter' :
                           this.classList.contains('linkedin') ? 'LinkedIn' :
                           this.classList.contains('github') ? 'GitHub' : 'Telegram';
            
            alert(`En un sitio real, esto te llevaría a nuestro perfil de ${platform}`);
        });
    });
});