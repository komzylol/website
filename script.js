// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get all sector boxes
    const boxes = document.querySelectorAll('.sector-box');
    
    // Add event listeners to each box
    boxes.forEach((box, index) => {
        // Click event
        box.addEventListener('click', function() {
            const sector = this.getAttribute('data-sector');
            handleBoxClick(this, sector, index);
        });
        
        // Mouse enter event
        box.addEventListener('mouseenter', function() {
            createRippleEffect(this);
        });
        
        // Keyboard support
        box.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const sector = this.getAttribute('data-sector');
                handleBoxClick(this, sector, index);
            }
        });
    });
});

// Sector information data
const sectorInfo = {
    informatico: {
        title: "Settore Informatico",
        icon: "images/informatico.jpg",
        website: "https://www.clericiacademy.it/operatore-informatico/",
        description: "Un percorso formativo all'avanguardia che prepara gli studenti alle professioni del futuro digitale. Scopri le competenze tecnologiche essenziali per il mondo del lavoro moderno.",
        features: [
            "Programmazione e sviluppo software",
            "Gestione database e reti informatiche",
            "Cybersecurity e protezione dati",
            "App e sviluppo web mobile",
            "Intelligenza artificiale e automazione"
        ]
    },
    pasti: {
        title: "Settore di Ristorazione",
        icon: "images/ristorazione.jpg",
        website: "https://www.clericiacademy.it/operatore-ristorazione/",
        description: "Formazione professionale nel settore della ristorazione con focus su cibo di qualità, tradizione culinaria e gestione operativa.",
        features: [
            "Cucina tradizionale e moderna",
            "Gestione sala e servizio",
            "Sicurezza alimentare HACCP",
            "Pastry e pasticceria",
            "Gestione economica e business"
    ]
    },
    commerciale: {
        title: "Settore Meccanico",
        icon: "images/meccanico.jpg",
        website: "https://www.clericiacademy.it/operatore-meccanico/",
        description: "Formazione tecnica specializzata nella riparazione e manutenzione di veicoli e macchinari industriali.",
        features: [
            "Motori e meccanica auto",
            "Diagnostica elettronica",
            "Manutenzione preventiva",
            "Ricambi e supply chain",
            "Tecnologie automotive moderne"
        ]
    }
};

// Current sector variable
let currentSector = null;

// Handle box click
function handleBoxClick(box, sector, index) {
    // Remove previous selection
    document.querySelectorAll('.sector-box').forEach(b => {
        b.classList.remove('selected');
    });
    
    // Add selection class
    box.classList.add('selected');
    
    // Create particle burst effect
    createParticleBurst(box, sector);
    
    // Show sector details
    showSectorDetails(sector);
}

// Create ripple effect
function createRippleEffect(box) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(26, 35, 126, 0.15);
        transform: translate(-50%, -50%);
        pointer-events: none;
        width: 0;
        height: 0;
        top: 50%;
        left: 50%;
        animation: rippleAnimation 0.6s ease-out;
    `;
    
    box.appendChild(ripple);
    
    // Add ripple animation
    const style = document.createElement('style');
    if (!document.getElementById('ripple-animation-style')) {
        style.id = 'ripple-animation-style';
        style.textContent = `
            @keyframes rippleAnimation {
                to {
                    width: 400px;
                    height: 400px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Create particle burst effect
function createParticleBurst(box, sector) {
    const colors = ['#1a237e', '#3949ab', '#5c6bc0', '#7986cb'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            top: ${box.getBoundingClientRect().top + box.offsetHeight / 2}px;
            left: ${box.getBoundingClientRect().left + box.offsetWidth / 2}px;
            animation: particleBurst 1s ease-out forwards;
            z-index: 1000;
        `;
        
        // Random direction
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 120 + Math.random() * 80;
        
        document.body.appendChild(particle);
        
        // Animate particle
        if (!document.getElementById('particle-animation-style')) {
            const style = document.createElement('style');
            style.id = 'particle-animation-style';
            style.textContent = `
                @keyframes particleBurst {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Show notification
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: rgba(26, 35, 126, 0.95);
        color: #fff;
        padding: 15px 35px;
        border-radius: 30px;
        box-shadow: 0 8px 24px rgba(26, 35, 126, 0.3);
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.5px;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const boxes = document.querySelectorAll('.sector-box');
        const currentFocus = document.querySelector('.sector-box:focus');
        
        if (currentFocus) {
            const index = Array.from(boxes).indexOf(currentFocus);
            let newIndex;
            
            if (e.key === 'ArrowLeft') {
                newIndex = (index - 1 + boxes.length) % boxes.length;
            } else {
                newIndex = (index + 1) % boxes.length;
            }
            
            boxes[newIndex].focus();
        }
    }
    
    // Close modals with ESC key
    if (e.key === 'Escape') {
        const websiteModal = document.getElementById('websiteModal');
        const videoModal = document.getElementById('videoModal');
        const videoSelectionModal = document.getElementById('videoSelectionModal');
        
        if (websiteModal && websiteModal.classList.contains('active')) {
            closeWebsite();
        }
        
        if (videoModal && videoModal.classList.contains('active')) {
            closeVideo();
        }
        
        if (videoSelectionModal && videoSelectionModal.classList.contains('active')) {
            closeVideoSelection();
        }
    }
});

// Make boxes focusable
document.querySelectorAll('.sector-box').forEach(box => {
    box.setAttribute('tabindex', '0');
});

// Admin Panel Functions
let savedVideos = [];

// Load videos when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadVideos);
} else {
    loadVideos();
}

// Toggle admin panel
function toggleAdminPanel() {
    const modal = document.getElementById('adminModal');
    modal.classList.toggle('active');
    
    // Prevent body scroll when modal is open
    if (modal.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Add video from input
function addVideo() {
    const urlInput = document.getElementById('videoUrlInput');
    const titleInput = document.getElementById('videoTitleInput');
    
    const url = urlInput.value.trim();
    const title = titleInput.value.trim() || 'Video';
    
    if (!url) {
        alert('Inserisci un URL video Instagram valido');
        return;
    }
    
    // Extract post ID from Instagram URL
    const postId = extractInstagramPostId(url);
    if (!postId) {
        alert('URL Instagram non valido. Usa un link come: https://www.instagram.com/p/...');
        return;
    }
    
    // Add to saved videos
    savedVideos.push({
        id: postId,
        url: url,
        title: title,
        addedAt: new Date().toISOString()
    });
    
    // Save to localStorage
    saveVideos();
    
    // Clear inputs
    urlInput.value = '';
    titleInput.value = '';
    
    // Refresh display
    displayVideos();
}

// Extract Instagram post ID from URL
function extractInstagramPostId(url) {
    const match = url.match(/instagram\.com\/p\/([a-zA-Z0-9_]+)/);
    return match ? match[1] : null;
}

// Display videos in the list
function displayVideos() {
    const videosList = document.getElementById('videosList');
    
    // Clear list
    videosList.innerHTML = '';
    
    if (savedVideos.length === 0) {
        videosList.innerHTML = '<p style="text-align: center; color: #999; grid-column: 1/-1;">Nessun video aggiunto</p>';
        return;
    }
    
    // Display in admin panel
    savedVideos.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
            <div class="video-item-title">${video.title || `Video ${index + 1}`}</div>
            <div class="video-item-preview">
                <iframe src="https://www.instagram.com/p/${video.id}/embed/" 
                        style="width: 100%; height: 100%; border: none;" 
                        frameborder="0" 
                        scrolling="no">
                </iframe>
            </div>
            <button class="btn-remove" onclick="removeVideo(${index})">Rimuovi</button>
        `;
        videosList.appendChild(videoItem);
    });
}

// Remove a video
function removeVideo(index) {
    savedVideos.splice(index, 1);
    saveVideos();
    displayVideos();
}

// Clear all videos
function clearAllVideos() {
    if (savedVideos.length === 0) {
        return;
    }
    
    if (confirm('Sei sicuro di voler cancellare tutti i video?')) {
        savedVideos = [];
        saveVideos();
        displayVideos();
    }
}

// Save videos to localStorage
function saveVideos() {
    localStorage.setItem('clericiAcademyVideos', JSON.stringify(savedVideos));
}

// Load videos from localStorage
function loadVideos() {
    const stored = localStorage.getItem('clericiAcademyVideos');
    if (stored) {
        savedVideos = JSON.parse(stored);
        displayVideos();
    }
}

// Show sector details
function showSectorDetails(sector) {
    const info = sectorInfo[sector];
    if (!info) return;
    
    // Store current sector
    currentSector = sector;
    
    // Update detail section content
    document.getElementById('detailIcon').src = info.icon;
    document.getElementById('detailIcon').alt = info.title;
    document.getElementById('detailTitle').textContent = info.title;
    document.getElementById('detailDescription').textContent = info.description;
    
    // Update features list
    const featuresList = document.getElementById('detailFeatures');
    featuresList.innerHTML = '';
    info.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Hide home content and show detail
    document.querySelector('.content-section').classList.add('hidden');
    document.querySelector('.sectors-section').classList.add('hidden');
    document.querySelector('.videos-section').classList.add('hidden');
    document.getElementById('detailSection').classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show website in modal
function showWebsite() {
    if (!currentSector) return;
    
    const info = sectorInfo[currentSector];
    if (!info || !info.website) return;
    
    // Set iframe source
    document.getElementById('websiteFrame').src = info.website;
    
    // Show modal
    document.getElementById('websiteModal').classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close website modal
function closeWebsite() {
    // Hide modal
    document.getElementById('websiteModal').classList.remove('active');
    
    // Clear iframe source
    document.getElementById('websiteFrame').src = '';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Show video selection modal (like YouTube)
function showNextVideo() {
    if (savedVideos.length === 0) {
        alert('Nessun video disponibile. Aggiungi video dal pannello amministratore.');
        return;
    }
    
    // Display videos in selection grid
    displayVideoSelection();
    
    // Show selection modal
    document.getElementById('videoSelectionModal').classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Display videos in selection grid
function displayVideoSelection() {
    const grid = document.getElementById('videoSelectionGrid');
    grid.innerHTML = '';
    
    savedVideos.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-selection-item';
        videoItem.innerHTML = `
            <div class="video-selection-item-preview">
                <iframe src="https://www.instagram.com/p/${video.id}/embed/" 
                        frameborder="0" 
                        scrolling="no"></iframe>
            </div>
            <div class="video-selection-item-title">${video.title || `Video ${index + 1}`}</div>
        `;
        videoItem.onclick = () => playVideo(index);
        grid.appendChild(videoItem);
    });
}

// Close video selection modal
function closeVideoSelection() {
    document.getElementById('videoSelectionModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Play specific video by index
function playVideo(index) {
    const video = savedVideos[index];
    const videoUrl = `https://www.instagram.com/p/${video.id}/embed/?cr=1&v=14&wp=540`;
    
    // Close selection modal
    closeVideoSelection();
    
    // Open video player
    const iframe = document.getElementById('videoFrame');
    document.getElementById('videoModal').classList.add('active');
    
    setTimeout(() => {
        iframe.src = videoUrl;
    }, 100);
    
    document.body.style.overflow = 'hidden';
}

// Close video modal
function closeVideo() {
    // Hide modal
    document.getElementById('videoModal').classList.remove('active');
    
    // Clear iframe source
    document.getElementById('videoFrame').src = '';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Go back to home
function goBack() {
    // Hide detail section
    document.getElementById('detailSection').classList.remove('active');
    
    // Show home content
    document.querySelector('.content-section').classList.remove('hidden');
    document.querySelector('.sectors-section').classList.remove('hidden');
    document.querySelector('.videos-section').classList.remove('hidden');
    
    // Remove selection from boxes
    document.querySelectorAll('.sector-box').forEach(b => {
        b.classList.remove('selected');
    });
    
    // Reset current sector
    currentSector = null;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
