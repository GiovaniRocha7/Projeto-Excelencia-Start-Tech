// ....................CODIGO DO VIDEO FEATURES ....................
const featureItems = document.querySelectorAll('.feature-item');
const videoWrappers = document.querySelectorAll('.video-wrapper');
const badge = document.getElementById('video-badge');

const badgeTexts = {
    'artifacts': '✨ Artefatos',
    'knowledge': '📊 Análise de Dados',
    'collaborate': '👥 Colaboração'
};

// Pause all videos except the first one
videoWrappers.forEach((wrapper, index) => {
    const video = wrapper.querySelector('video');
    if (index !== 0) {
        video.pause();
    }
});

featureItems.forEach(item => {
    item.addEventListener('click', () => {
        const videoId = item.getAttribute('data-video');
        const wasExpanded = item.classList.contains('expanded');
        
        // Remove active and expanded class from all items
        featureItems.forEach(i => {
            i.classList.remove('active');
            i.classList.remove('expanded');
        });
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Toggle expanded class
        if (!wasExpanded) {
            item.classList.add('expanded');
        }
        
        // Hide all videos and pause them
        videoWrappers.forEach(wrapper => {
            wrapper.classList.remove('active');
            const video = wrapper.querySelector('video');
            video.pause();
        });
        
        // Show selected video and play it
        const selectedWrapper = document.getElementById(`video-${videoId}`);
        if (selectedWrapper) {
            selectedWrapper.classList.add('active');
            const video = selectedWrapper.querySelector('video');
            video.currentTime = 0;
            video.play();
        }
        
        // Update badge
        badge.textContent = badgeTexts[videoId];
    });
});

// .................... FIM CODIGO DO VIDEO FEATURES ....................







