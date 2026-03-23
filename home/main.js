/**
 * CrackDevelopers - Main JavaScript
 * Connects CSS styling with interactive functionality
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeUI();
  initializeNavigation();
  initializeScrollEffects();
  initializeButtons();
});

/**
 * Initialize UI Components
 */
function initializeUI() {
  // Ensure all elements are visible
  document.body.style.visibility = 'visible';
  document.body.style.opacity = '1';
  
  // Set dark theme colors
  document.body.style.backgroundColor = '#2a1420';
  document.body.style.color = '#f5f5f5';
}

/**
 * Navigation Controller
 */
function initializeNavigation() {
  const navLinks = document.querySelectorAll('nav a, .nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.color = '#ff4d5c';
    });

    link.addEventListener('mouseleave', function() {
      this.style.color = '#f5f5f5';
    });

    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/**
 * Scroll Effects & Animations
 */
function initializeScrollEffects() {
  // Fade in sections on scroll
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'all 0.6s ease-out';
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    observer.observe(section);
  });

  // Header hide/show on scroll
  let lastScrollTop = 0;
  const header = document.querySelector('header, nav');
  
  window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY;
    
    if (scrollTop > 100) {
      if (scrollTop > lastScrollTop) {
        // Scrolling down - hide
        if (header) header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up - show
        if (header) header.style.transform = 'translateY(0)';
      }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

/**
 * Button Interactions
 */
function initializeButtons() {
  const buttons = document.querySelectorAll('.btn, button, a[class*="button"], [role="button"]');

  buttons.forEach(button => {
    // Hover effect
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
      this.style.boxShadow = '0 10px 25px rgba(255, 77, 92, 0.4)';
      this.style.transition = 'all 0.3s ease';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = 'none';
    });

    // Click effect
    button.addEventListener('click', function(e) {
      // Add ripple effect
      const circle = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      circle.style.width = size + 'px';
      circle.style.height = size + 'px';
      circle.style.position = 'absolute';
      circle.style.left = x + 'px';
      circle.style.top = y + 'px';
      circle.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
      circle.style.borderRadius = '50%';
      circle.style.animation = 'ripple 0.6s ease-out';
      circle.style.pointerEvents = 'none';

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(circle);

      setTimeout(() => circle.remove(), 600);
    });
  });
}

/**
 * Animation Keyframes
 */
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  header, nav {
    transition: transform 0.3s ease;
  }
  
  section {
    transition: all 0.6s ease-out;
  }
`;
document.head.appendChild(style);

// Ensure page loads with proper theme
window.addEventListener('load', function() {
  document.documentElement.style.backgroundColor = '#2a1420';
});;