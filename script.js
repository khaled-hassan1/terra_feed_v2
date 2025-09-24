// Enhanced Navigation with Scroll Effects
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger-btn');
const menu = document.getElementById('navbar-menu');

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // Add scrolled class for styling
  if (currentScrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Hide/show navbar on scroll
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScrollY = currentScrollY;
});

// Enhanced Hamburger Menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  menu.classList.toggle('open');
  
  // Prevent body scroll when menu is open
  if (menu.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Close menu when clicking on links
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && menu.classList.contains('open')) {
    hamburger.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Enhanced Carousel with Touch Support
const slides = document.querySelectorAll(".slide");
if (slides.length > 0) {
  let currentSlide = 0;
  let slideInterval;
  let isTransitioning = false;

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
    
    setTimeout(() => {
      isTransitioning = false;
    }, 1200);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    
    setTimeout(() => {
      isTransitioning = false;
    }, 1200);
  }

  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 6000);
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  // Touch/Swipe Support
  let startX = 0;
  let endX = 0;

  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      stopSlideshow();
    });

    carousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      
      startSlideshow();
    });

    // Mouse events for desktop
    carousel.addEventListener('mouseenter', stopSlideshow);
    carousel.addEventListener('mouseleave', startSlideshow);
  }

  // Start the slideshow
  startSlideshow();
}

// Enhanced Newsletter Form
const newsletterForm = document.querySelector('.newsletter');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    const button = newsletterForm.querySelector('button');
    const originalText = button.textContent;
    
    // Validate email
    if (!isValidEmail(email)) {
      showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
      return;
    }
    
    // Show loading state
    button.textContent = 'جاري الإرسال...';
    button.disabled = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      showNotification('تم الاشتراك بنجاح! شكراً لك', 'success');
      newsletterForm.reset();
      
    } catch (error) {
      showNotification('حدث خطأ، يرجى المحاولة مرة أخرى', 'error');
    } finally {
      button.textContent = originalText;
      button.disabled = false;
    }
  });
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${getNotificationIcon(type)}"></i>
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
    color: 'white',
    padding: '16px 20px',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    zIndex: '10000',
    transform: 'translateX(400px)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    maxWidth: '400px',
    fontSize: '14px',
    fontWeight: '600'
  });
  
  const content = notification.querySelector('.notification-content');
  Object.assign(content.style, {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  });
  
  const closeBtn = notification.querySelector('.notification-close');
  Object.assign(closeBtn.style, {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    marginLeft: 'auto'
  });
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close functionality
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function getNotificationIcon(type) {
  switch (type) {
    case 'success': return 'fa-check-circle';
    case 'error': return 'fa-exclamation-circle';
    default: return 'fa-info-circle';
  }
}

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// Enhanced Loading Animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Animate elements on load
  const animateElements = document.querySelectorAll('.value-card, .category-card, .product-card, .blog-card');
  animateElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.value-card, .category-card, .product-card, .blog-card, .contact-card, .about-mv-card, .about-feature-card').forEach(el => {
  observer.observe(el);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    animation: slideInUp 0.6s ease-out forwards;
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Enhanced Performance Monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
    }, 0);
  });
}

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment when service worker is ready
    // navigator.serviceWorker.register('/sw.js')
    //   .then(registration => console.log('SW registered'))
    //   .catch(error => console.log('SW registration failed'));
  });
}

// Enhanced Error Handling
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  // Could send to analytics service
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // Could send to analytics service
});

// Keyboard Navigation Enhancement
document.addEventListener('keydown', (e) => {
  // ESC key closes mobile menu
  if (e.key === 'Escape' && menu.classList.contains('open')) {
    hamburger.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  // Arrow keys for carousel navigation
  if (slides.length > 0) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  }
});

// Enhanced Accessibility
function enhanceAccessibility() {
  // Add skip link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'تخطي إلى المحتوى الرئيسي';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10001;
    transition: top 0.3s;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main content ID
  const mainContent = document.querySelector('.hero') || document.querySelector('main') || document.querySelector('.about-page') || document.querySelector('.products-page');
  if (mainContent) {
    mainContent.id = 'main-content';
  }
}

// Initialize accessibility enhancements
enhanceAccessibility();

// Lazy Loading for Images
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

// Initialize lazy loading
lazyLoadImages();

// Enhanced Form Validation
function enhanceFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearFieldError);
    });
  });
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  
  // Remove existing error
  clearFieldError(e);
  
  // Validate based on field type
  let isValid = true;
  let errorMessage = '';
  
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'هذا الحقل مطلوب';
  } else if (field.type === 'email' && value && !isValidEmail(value)) {
    isValid = false;
    errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
  }
  
  if (!isValid) {
    showFieldError(field, errorMessage);
  }
}

function clearFieldError(e) {
  const field = e.target;
  const errorElement = field.parentNode.querySelector('.field-error');
  if (errorElement) {
    errorElement.remove();
  }
  field.classList.remove('error');
}

function showFieldError(field, message) {
  field.classList.add('error');
  
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error';
  errorElement.textContent = message;
  errorElement.style.cssText = `
    color: #ef4444;
    font-size: 12px;
    margin-top: 4px;
    font-weight: 500;
  `;
  
  field.parentNode.appendChild(errorElement);
}

// Initialize form validation
enhanceFormValidation();

// Add error styles
const errorStyles = document.createElement('style');
errorStyles.textContent = `
  input.error, textarea.error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
  }
`;
document.head.appendChild(errorStyles);

console.log('TerraFeed Professional Enhancement Loaded ✨');