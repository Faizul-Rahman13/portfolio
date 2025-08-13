document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Initialize particles immediately (don't wait for DOMContentLoaded)
    initParticles(currentTheme);

    // Theme toggle event
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            updateParticlesColor(newTheme);
        });
    }
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    if (sections.length) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Skill card click event
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', function() {
            const skill = this.getAttribute('data-skill');
            window.location.href = `skill-details.html?skill=${skill}`;
        });
    });
});

function initParticles(theme) {
    if (!document.getElementById('particles-js')) return;
    
    // Load particles.js if not already loaded
    if (typeof particlesJS === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
        script.onload = function() {
            particlesJS('particles-js', getParticlesConfig(theme));
        };
        document.head.appendChild(script);
    } else {
        particlesJS('particles-js', getParticlesConfig(theme));
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (!themeIcon) return;
    
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

function updateParticlesColor(theme) {
    if (typeof pJS !== 'undefined') {
        const newColor = theme === 'dark' ? "#ffffff" : "#3498db";
        
        pJS.particles.color.value = newColor;
        if (pJS.particles.line_linked) {
            pJS.particles.line_linked.color = newColor;
        }
        
        pJS.fn.particlesRefresh();
    } else {
        // If pJS isn't available, reinitialize particles
        initParticles(theme);
    }
}

function getParticlesConfig(theme) {
    const particleColor = theme === 'dark' ? "#ffffff" : "#3498db";
    
    return {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": particleColor
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": particleColor,
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    };
}


// DESIGN TOOL STYLE

// Brand color hover effect with improved performance
document.querySelectorAll('.skill-badge').forEach(badge => {
  const brandColor = badge.getAttribute('data-brand-color');
  const textElement = badge.querySelector('span');
  
  badge.addEventListener('mouseenter', () => {
    badge.style.backgroundColor = brandColor;
    textElement.style.color = '#fff';
    badge.style.boxShadow = `0 10px 20px ${hexToRgba(brandColor, 0.2)}`;
  });
  
  badge.addEventListener('mouseleave', () => {
    badge.style.backgroundColor = '';
    textElement.style.color = '';
    badge.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
  });
});

// Optimized hex to rgba converter
function hexToRgba(hex, alpha) {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
}

// CONTACT ANIMATION 

 lottie.loadAnimation({
    container: document.getElementById('lottie-contact'), // the dom element
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets1.lottiefiles.com/packages/lf20_puciaact.json' // animation link
  });


// bottom to Top 

function launchRocket(el) {
    el.classList.add('launch');

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Reset after animation
    setTimeout(() => {
      el.classList.remove('launch');
    }, 1000);
  }


//   New Script

// LOCK THE INSPECT OPTION IN BROWSER START

document.addEventListener('contextmenu', event => event.preventDefault());
 document.onkeydown = function(e) {
   if (e.keyCode == 123 || // F12
       (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || // Ctrl+Shift+I/J
        (e.ctrlKey && e.keyCode == 85)) { // Ctrl+U
        return false;
    }
 }


// LOCK THE INSPECT OPTION IN BROWSER END 



