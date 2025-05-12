document.addEventListener('DOMContentLoaded', () => {
  // Initialize the animations
  initAnimations();
  
  // Header scroll effect
  initHeaderScroll();
  
  // Mobile menu toggle
  initMobileMenu();
  
  // Project modals
  initModals();
  
  // Contact form
  initContactForm();
});

// Initialize animations with delay sequence
function initAnimations() {
  // Hero section animations
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroDescription = document.querySelector('.hero-description');
  const heroButtons = document.querySelectorAll('.hero-buttons .btn');
  
  if (heroTitle) heroTitle.classList.add('animate-fadeInDown');
  if (heroSubtitle) {
    heroSubtitle.classList.add('animate-fadeInUp');
    heroSubtitle.classList.add('delay-300');
  }
  if (heroDescription) {
    heroDescription.classList.add('animate-fadeInUp');
    heroDescription.classList.add('delay-500');
  }
  
  heroButtons.forEach((btn, index) => {
    btn.classList.add('animate-fadeInUp');
    btn.classList.add(`delay-${700 + (index * 200)}`);
  });
  
  // Add scroll observer for other sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const elements = entry.target.querySelectorAll('.animate-on-scroll');
        elements.forEach((el, index) => {
          // Add a staggered delay based on the index
          setTimeout(() => {
            el.classList.add('animate-fadeInUp');
          }, index * 150);
        });
        
        // Once the animation is triggered, unobserve the target
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }); // Trigger when at least 10% of the target is visible
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.getElementById('header');
  
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('header-glass');
    } else {
      header.classList.remove('header-glass');
    }
  });
  
  // Trigger scroll event on page load
  window.dispatchEvent(new Event('scroll'));
}

// Mobile menu toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (!menuBtn || !navLinks) return;
  
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
    
    // Prevent scrolling when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
      document.body.style.overflow = '';
    });
  });
}

// Project modals
function initModals() {
  const modalBtns = document.querySelectorAll('.open-modal');
  const closeBtns = document.querySelectorAll('.close-modal');
  
  modalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const modal = document.getElementById(projectId + 'Modal');
      
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.querySelector('.modal-content').classList.add('animate-modal');
      }
    });
  });
  
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  });
  
  // Close modals when clicking outside the content
  window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal').forEach(modal => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  });
  
  // Prevent propagation on modal content click
  document.querySelectorAll('.modal-content').forEach(content => {
    content.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get the form elements
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const subject = contactForm.querySelector('input[name="subject"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;
    
    // Simple validation
    if (!name || !email || !message) {
      alert('Please fill out all required fields');
      return;
    }
    
    // Here you would typically send the data to a server
    // For this demo, we'll just show a success message
    
    // Create loading indicator
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate sending
    setTimeout(() => {
      // Reset form
      contactForm.reset();
      
      // Show success message
      alert('Your message has been sent successfully!');
      
      // Restore button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Get header height for offset
      const headerHeight = document.getElementById('header')?.offsetHeight || 0;
      
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
  });
});

// Particle background effect (optional - can be enabled for an engineering feel)
function initParticleBackground() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let particlesArray = [];
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = `rgba(14, 165, 233, ${Math.random() * 0.5 + 0.1})`;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.size > 0.2) this.size -= 0.01;
      
      // Wrap around edges
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Create particles
  function init() {
    particlesArray = [];
    const numberOfParticles = Math.min(120, canvas.width * canvas.height / 10000);
    
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  // Connect particles with lines
  function connect() {
    const maxDistance = canvas.width > 1000 ? 150 : 100;
    
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          ctx.strokeStyle = `rgba(14, 165, 233, ${opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    
    connect();
    requestAnimationFrame(animate);
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });
  
  init();
  animate();
}

// You can call initParticleBackground() if you decide to add this effect