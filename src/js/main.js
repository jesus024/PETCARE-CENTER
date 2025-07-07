// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  // Toggle menu móvil
  hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
      });
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
      }
  });
});

// Scroll suave a secciones
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
      element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
      });
  }
}

// Navegación suave para todos los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      }
  });
});

// Efectos de aparición al hacer scroll
function observeElements() {
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, observerOptions);

  // Observar elementos con animación
  document.querySelectorAll('.service-card, .team-member, .gallery-item').forEach(el => {
      observer.observe(el);
  });
}

// Inicializar observador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', observeElements);

// Cambiar color del header al hacer scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
      header.style.background = 'rgba(102, 126, 234, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
  } else {
      header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      header.style.backdropFilter = 'none';
  }
});

// Funciones para modales
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
  }
}

// Cerrar modal al hacer clic fuera
window.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
      document.body.style.overflow = 'auto';
  }
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => {
          modal.style.display = 'none';
      });
      document.body.style.overflow = 'auto';
  }
});

// Formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Validar formulario
          if (validateForm()) {
              // Simular envío del formulario
              submitForm();
          }
      });
  }

  function validateForm() {
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const servicio = document.getElementById('servicio').value;
      const mensaje = document.getElementById('mensaje').value.trim();

      // Validaciones básicas
      if (!nombre) {
          showError('Por favor, ingresa tu nombre.');
          return false;
      }

      if (!email || !isValidEmail(email)) {
          showError('Por favor, ingresa un email válido.');
          return false;
      }

      if (!servicio) {
          showError('Por favor, selecciona un servicio.');
          return false;
      }

      if (!mensaje) {
          showError('Por favor, ingresa un mensaje.');
          return false;
      }

      return true;
  }

  function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

  function showError(message) {
      // Crear mensaje de error temporal
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
      errorDiv.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #f44336;
          color: white;
          padding: 15px 20px;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          z-index: 3000;
          display: flex;
          align-items: center;
          gap: 10px;
          transform: translateX(100%);
          transition: transform 0.3s ease;
      `;

      document.body.appendChild(errorDiv);
      
      // Mostrar mensaje
      setTimeout(() => {
          errorDiv.style.transform = 'translateX(0)';
      }, 100);

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
          errorDiv.style.transform = 'translateX(100%)';
          setTimeout(() => {
              document.body.removeChild(errorDiv);
          }, 300);
      }, 3000);
  }

  function submitForm() {
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      
      // Mostrar loading
      submitButton.innerHTML = '<span class="loading"></span> Enviando...';
      submitButton.disabled = true;

      // Simular envío (reemplazar con lógica real)
      setTimeout(() => {
          // Resetear formulario
          contactForm.reset();
          
          // Restaurar botón
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
          
          // Mostrar mensaje de éxito
          showSuccessMessage();
      }, 2000);
  }

  function showSuccessMessage() {
      successMessage.classList.add('show');
      
      setTimeout(() => {
          successMessage.classList.remove('show');
      }, 3000);
  }
});

// Animaciones adicionales
function addHoverEffects() {
  // Efecto parallax suave en hero
  window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero) {
          hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
  });

  // Efecto hover en tarjetas de servicio
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
      });
  });
}

// Contador animado para estadísticas (si se agregan)
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
      current += increment;
      element.textContent = Math.floor(current);
      
      if (current >= target) {
          element.textContent = target;
          clearInterval(timer);
      }
  }, 16);
}

// Lazy loading para imágenes (si se agregan)
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
          }
      });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Funciones de utilidad
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

function throttle(func, limit) {
  let inThrottle;
  return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
      }
  };
}

// Optimizar scroll events
const optimizedScroll = throttle(() => {
  // Aquí van las funciones que se ejecutan en scroll
}, 100);

window.addEventListener('scroll', optimizedScroll);

// Funciones adicionales para mejorar UX
function addRippleEffect() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
      button.addEventListener('click', function(e) {
          const ripple = document.createElement('span');
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.cssText = `
              position: absolute;
              border-radius: 50%;
              transform: scale(0);
              animation: ripple 600ms linear;
              background-color: rgba(255, 255, 255, 0.5);
              width: ${size}px;
              height: ${size}px;
              left: ${x}px;
              top: ${y}px;
              pointer-events: none;
          `;
          
          this.style.position = 'relative';
          this.style.overflow = 'hidden';
          this.appendChild(ripple);
          
          setTimeout(() => {
              ripple.remove();
          }, 600);
      });
  });
}

// Agregar estilos CSS para el efecto ripple
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
  @keyframes ripple {
      to {
          transform: scale(4);
          opacity: 0;
      }
  }
`;
document.head.appendChild(rippleStyles);

// Inicializar todas las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  addHoverEffects();
  lazyLoadImages();
  addRippleEffect();
});

// Funciones para animaciones de entrada
function fadeInOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  
  elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
      }
  });
}

// Función para mostrar/ocultar botón de volver arriba
function toggleBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (window.pageYOffset > 300) {
      backToTopBtn?.classList.add('show');
  } else {
      backToTopBtn?.classList.remove('show');
  }
}

// Event listeners optimizados
window.addEventListener('scroll', debounce(() => {
  fadeInOnScroll();
  toggleBackToTop();
}, 100));

// Funciones para manejar errores
window.addEventListener('error', function(e) {
  console.error('Error en la página:', e.error);
});

// Función para detectar si el usuario está usando un dispositivo móvil
function isMobile() {
  return window.innerWidth <= 768;
}

// Ajustar comportamiento según el dispositivo
if (isMobile()) {
  // Deshabilitar efectos que consumen muchos recursos en móvil
  document.documentElement.style.setProperty('--animation-duration', '0.2s');
}

// Función para inicializar todo
function init() {
  console.log('Centro de Cuidado de Mascotas - Página cargada correctamente');
  
  // Verificar que todos los elementos críticos estén presentes
  const criticalElements = [
      '.navbar',
      '.hero',
      '.services',
      '.contact'
  ];
  
  criticalElements.forEach(selector => {
      if (!document.querySelector(selector)) {
          console.warn(`Elemento ${selector} no encontrado`);
      }
  });
}

// Ejecutar inicialización
document.addEventListener('DOMContentLoaded', init);