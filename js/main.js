/**
 * 创意无限 - 广告创意公司展示网站
 * 主交互脚本
 */

// ==================== 
// DOM Elements
// ====================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const worksGrid = document.getElementById('worksGrid');
const tabButtons = document.querySelectorAll('.tab-btn');
const previewModal = document.getElementById('previewModal');
const modalClose = document.getElementById('modalClose');
const previewImage = document.getElementById('previewImage');
const previewVideo = document.getElementById('previewVideo');
const previewTitle = document.getElementById('previewTitle');
const backToTop = document.getElementById('backToTop');
const statNumbers = document.querySelectorAll('.stat-number');

// ==================== 
// State
// ====================
let worksData = null;
let currentCategory = 'posters';

// ==================== 
// Initialize
// ====================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    loadWorksData();
    initTabs();
    initModal();
    initBackToTop();
    initScrollAnimations();
    initStatsCounter();
});

// ==================== 
// Navbar Scroll Effect
// ====================
function initNavbar() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

// ==================== 
// Mobile Menu
// ====================
function initMobileMenu() {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ==================== 
// Load Works Data
// ====================
async function loadWorksData() {
    try {
        const response = await fetch('static/works.json');
        if (!response.ok) {
            throw new Error('Failed to load works data');
        }
        worksData = await response.json();
        renderWorks(currentCategory);
    } catch (error) {
        console.error('Error loading works:', error);
        worksGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-exclamation-circle"></i>
                <span>暂无作品数据</span>
            </div>
        `;
    }
}

// ==================== 
// Tabs
// ====================
function initTabs() {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update category and render
            currentCategory = btn.dataset.category;
            if (worksData) {
                renderWorks(currentCategory);
            }
        });
    });
}

// ==================== 
// Render Works
// ====================
function renderWorks(category) {
    if (!worksData || !worksData[category]) {
        worksGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-folder-open"></i>
                <span>该分类暂无作品</span>
            </div>
        `;
        return;
    }

    const works = worksData[category];
    const categoryNames = {
        posters: '创意海报',
        ecommerce: '电商设计',
        logos: 'Logo设计',
        videos: '广告视频'
    };

    worksGrid.innerHTML = works.map((work, index) => {
        if (category === 'videos') {
            return `
                <div class="work-card" data-type="video" data-url="${work.url || ''}" data-title="${work.title}" style="animation-delay: ${index * 0.1}s">
                    <img src="${work.cover}" alt="${work.title}" loading="lazy">
                    <span class="video-badge"><i class="fas fa-play"></i> 视频</span>
                    <div class="work-card-overlay">
                        <h4 class="work-card-title">${work.title}</h4>
                        <span class="work-card-category">${categoryNames[category]}</span>
                    </div>
                    <div class="work-card-icon">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="work-card" data-type="image" data-url="${work.image}" data-title="${work.title}" style="animation-delay: ${index * 0.1}s">
                    <img src="${work.image}" alt="${work.title}" loading="lazy">
                    <div class="work-card-overlay">
                        <h4 class="work-card-title">${work.title}</h4>
                        <span class="work-card-category">${categoryNames[category]}</span>
                    </div>
                    <div class="work-card-icon">
                        <i class="fas fa-expand"></i>
                    </div>
                </div>
            `;
        }
    }).join('');

    // Add click events to cards
    document.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('click', () => openPreview(card));
    });

    // Trigger animations
    requestAnimationFrame(() => {
        document.querySelectorAll('.work-card').forEach(card => {
            card.classList.add('fade-in-up');
        });
    });
}

// ==================== 
// Modal / Preview
// ====================
function initModal() {
    // Close button
    modalClose.addEventListener('click', closePreview);

    // Click overlay to close
    previewModal.querySelector('.modal-overlay').addEventListener('click', closePreview);

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && previewModal.classList.contains('active')) {
            closePreview();
        }
    });
}

function openPreview(card) {
    const type = card.dataset.type;
    const url = card.dataset.url;
    const title = card.dataset.title;

    previewTitle.textContent = title;

    if (type === 'video' && url) {
        previewImage.style.display = 'none';
        previewVideo.style.display = 'block';
        previewVideo.src = url;
    } else {
        previewVideo.style.display = 'none';
        previewVideo.src = '';
        previewImage.style.display = 'block';
        previewImage.src = url;
    }

    previewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePreview() {
    previewModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Stop video if playing
    previewVideo.pause();
    previewVideo.src = '';
}

// ==================== 
// Back to Top
// ====================
function initBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== 
// Scroll Animations
// ====================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ==================== 
// Stats Counter Animation
// ====================
function initStatsCounter() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounters() {
    statNumbers.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// ==================== 
// Utility Functions
// ====================

// Debounce function for scroll events
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

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}