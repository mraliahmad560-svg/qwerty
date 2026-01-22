// Main JavaScript for the Magical Media Showcase

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize particles
    createMagicParticles();
    
    // Initialize gallery with sample data
    initializeGallery();
    
    // Setup event listeners
    setupEventListeners();
    
    // Simulate loading animation
    simulateLoading();
});

// Create magical floating particles
function createMagicParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        const color = getRandomColor();
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.opacity = '0.7';
        particle.style.filter = 'blur(1px)';
        particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(90deg); }
            50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(180deg); }
            75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(270deg); }
        }
    `;
    document.head.appendChild(style);
}

// Get random color for particles
function getRandomColor() {
    const colors = [
        'rgba(124, 58, 237, 0.7)', // Purple
        'rgba(16, 185, 129, 0.7)', // Green
        'rgba(245, 158, 11, 0.7)', // Amber
        'rgba(239, 68, 68, 0.7)', // Red
        'rgba(59, 130, 246, 0.7)'  // Blue
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize gallery with sample data
function initializeGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    // Check if there's media in localStorage
    let mediaItems = JSON.parse(localStorage.getItem('enchantedGalleryMedia')) || [];
    
    // If no media in localStorage, load sample data
    if (mediaItems.length === 0) {
        mediaItems = getSampleMedia();
        localStorage.setItem('enchantedGalleryMedia', JSON.stringify(mediaItems));
    }
    
    // Display media items
    displayMediaItems(mediaItems);
    
    // Hide loading indicator
    setTimeout(() => {
        loadingIndicator.style.display = 'none';
    }, 1000);
}

// Get sample media data
function getSampleMedia() {
    return [
        {
            id: 1,
            title: "Mystical Forest",
            description: "A magical forest with glowing flora and fauna",
            type: "image",
            url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            date: "2023-10-15",
            favorite: true
        },
        {
            id: 2,
            title: "Northern Lights Dance",
            description: "Aurora borealis illuminating the night sky",
            type: "video",
            url: "https://assets.mixkit.co/videos/preview/mixkit-aurora-borealis-over-a-frozen-lake-41551-large.mp4",
            date: "2023-11-22",
            favorite: false
        },
        {
            id: 3,
            title: "Enchanted Waterfall",
            description: "A waterfall with magical glowing waters",
            type: "image",
            url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            date: "2023-09-05",
            favorite: true
        },
        {
            id: 4,
            title: "Starry Night Sky",
            description: "The Milky Way galaxy visible in a clear night sky",
            type: "image",
            url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            date: "2023-08-30",
            favorite: false
        },
        {
            id: 5,
            title: "Magical Portal",
            description: "A portal to another dimension opening in the forest",
            type: "video",
            url: "https://assets.mixkit.co/videos/preview/mixkit-magic-portal-in-the-forest-41540-large.mp4",
            date: "2023-12-10",
            favorite: true
        },
        {
            id: 6,
            title: "Crystal Cave",
            description: "A cave filled with glowing crystals",
            type: "image",
            url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            date: "2023-07-18",
            favorite: false
        }
    ];
}

// Display media items in the gallery
function displayMediaItems(mediaItems) {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';
    
    mediaItems.forEach(item => {
        const galleryItem = createGalleryItem(item);
        galleryGrid.appendChild(galleryItem);
    });
}

// Create a gallery item element
function createGalleryItem(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'gallery-item';
    itemDiv.dataset.id = item.id;
    itemDiv.dataset.type = item.type;
    itemDiv.dataset.favorite = item.favorite;
    
    const favoriteClass = item.favorite ? 'fas' : 'far';
    
    itemDiv.innerHTML = `
        <div class="media-container">
            ${item.type === 'image' 
                ? `<img src="${item.url}" alt="${item.title}" loading="lazy">` 
                : `<video preload="metadata"><source src="${item.url}" type="video/mp4"></video>`}
        </div>
        <div class="media-overlay">
            <h3 class="media-title">${item.title}</h3>
            <span class="media-type">${item.type === 'image' ? 'Image' : 'Video'}</span>
        </div>
        <button class="favorite-btn ${item.favorite ? 'active' : ''}">
            <i class="${favoriteClass} fa-heart"></i>
        </button>
    `;
    
    // Add click event to open lightbox
    itemDiv.addEventListener('click', function(e) {
        if (!e.target.closest('.favorite-btn')) {
            openLightbox(item);
        }
    });
    
    // Add favorite button event
    const favoriteBtn = itemDiv.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleFavorite(item.id);
    });
    
    return itemDiv;
}

// Toggle favorite status
function toggleFavorite(itemId) {
    let mediaItems = JSON.parse(localStorage.getItem('enchantedGalleryMedia')) || [];
    const itemIndex = mediaItems.findIndex(item => item.id == itemId);
    
    if (itemIndex !== -1) {
        mediaItems[itemIndex].favorite = !mediaItems[itemIndex].favorite;
        localStorage.setItem('enchantedGalleryMedia', JSON.stringify(mediaItems));
        
        // Update UI
        const favoriteBtn = document.querySelector(`.gallery-item[data-id="${itemId}"] .favorite-btn`);
        const favoriteIcon = favoriteBtn.querySelector('i');
        
        if (mediaItems[itemIndex].favorite) {
            favoriteBtn.classList.add('active');
            favoriteIcon.className = 'fas fa-heart';
        } else {
            favoriteBtn.classList.remove('active');
            favoriteIcon.className = 'far fa-heart';
        }
        
        // Show notification
        showNotification(`Item ${mediaItems[itemIndex].favorite ? 'added to' : 'removed from'} favorites!`);
    }
}

// Open lightbox with media item
function openLightbox(item) {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxDate = document.getElementById('lightboxDate');
    const lightboxType = document.getElementById('lightboxType');
    const lightboxFavorite = document.getElementById('lightboxFavorite');
    
    // Set content based on media type
    if (item.type === 'image') {
        lightboxImage.src = item.url;
        lightboxImage.style.display = 'block';
        lightboxVideo.style.display = 'none';
    } else {
        lightboxVideo.src = item.url;
        lightboxVideo.style.display = 'block';
        lightboxImage.style.display = 'none';
    }
    
    // Set other info
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
    lightboxDate.textContent = `Uploaded: ${formatDate(item.date)}`;
    lightboxType.textContent = item.type === 'image' ? 'Image' : 'Video';
    
    // Set favorite button
    lightboxFavorite.innerHTML = item.favorite 
        ? '<i class="fas fa-heart"></i> Remove from Favorites' 
        : '<i class="far fa-heart"></i> Add to Favorites';
    
    // Update favorite button event
    lightboxFavorite.onclick = function() {
        toggleFavorite(item.id);
        openLightbox(item); // Refresh lightbox
    };
    
    // Show lightbox
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    lightboxModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--primary-color)';
    notification.style.color = 'white';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '10px';
    notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    notification.style.zIndex = '3000';
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Navigation smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
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
    
    // Close lightbox
    document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside
    document.getElementById('lightboxModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // Filter gallery items
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter gallery items
            const filter = this.dataset.filter;
            filterGallery(filter);
        });
    });
    
    // Menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Filter gallery items
function filterGallery(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const type = item.dataset.type;
        const favorite = item.dataset.favorite === 'true';
        
        switch(filter) {
            case 'all':
                item.style.display = 'block';
                break;
            case 'image':
                item.style.display = type === 'image' ? 'block' : 'none';
                break;
            case 'video':
                item.style.display = type === 'video' ? 'block' : 'none';
                break;
            case 'favorite':
                item.style.display = favorite ? 'block' : 'none';
                break;
        }
        
        // Add animation
        if (item.style.display === 'block') {
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = 'fadeIn 0.5s ease';
            }, 10);
        }
    });
}

// Simulate loading animation
function simulateLoading() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    // Add CSS for fadeIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// Admin key verification
function verifyAdminKey() {
    const adminModal = document.getElementById('adminModal');
    adminModal.classList.add('active');
    
    document.getElementById('submitAdminKey').addEventListener('click', function() {
        const enteredKey = document.getElementById('adminKeyInput').value;
        const correctKey = "magic123"; // Default admin key
        
        if (enteredKey === correctKey) {
            // Store admin session
            sessionStorage.setItem('adminAuthenticated', 'true');
            adminModal.classList.remove('active');
            showNotification('Admin access granted!');
            
            // Redirect to upload page if not already there
            if (!window.location.pathname.includes('upload.html')) {
                window.location.href = 'upload.html';
            }
        } else {
            showNotification('Invalid admin key!', 'error');
        }
    });
    
    document.getElementById('cancelAdminKey').addEventListener('click', function() {
        adminModal.classList.remove('active');
    });
}

// Check if user is on upload page and verify admin access
if (window.location.pathname.includes('upload.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Check if admin is already authenticated
        if (sessionStorage.getItem('adminAuthenticated') !== 'true') {
            verifyAdminKey();
        }
    });
}