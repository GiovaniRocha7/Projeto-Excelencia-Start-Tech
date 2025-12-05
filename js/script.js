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








    const overlay = document.getElementById("overlay-modal");
    const modalLogin = document.getElementById("modal-login");
    const modalCadastro = document.getElementById("modal-cadastro");
   
    function abrirModal(tipo) {
      
        overlay.classList.add('ativo');
   
        // Esconde ambos primeiro para garantir
        modalLogin.style.display = "none";
        modalCadastro.style.display = "none";
   
        // Mostra apenas o solicitado
        if (tipo === 'login') {
            modalLogin.style.display = "block";
        } else if (tipo === 'cadastro') {
            modalCadastro.style.display = "block";
        }
        // Impede rolagem do corpo atrás do modal
        document.body.style.overflow = "hidden";
    }
   
    function fecharModal() {
        overlay.classList.remove('ativo');
        // Retorna rolagem do corpo
        document.body.style.overflow = "auto";
   
         // Pequeno delay para limpar o display após a animação de fade out
        setTimeout(() => {
             if (!overlay.classList.contains('ativo')) {
                modalLogin.style.display = "none";
                modalCadastro.style.display = "none";
             }
        }, 300);
    }
   
    // Fechar ao clicar fora do modal (no overlay escuro)
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            fecharModal();
        }
    });
   
    // Tecla ESC para fechar
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('ativo')) {
            fecharModal();
        }
    });



// ................CARD............... 


// ................CARD............... 