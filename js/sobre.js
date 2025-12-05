// Aguarda o carregamento completo da página antes de inicializar o Swiper
document.addEventListener('DOMContentLoaded', function() {

    // ................ INICIALIZAÇÃO DO SWIPER CORRIGIDA ................ 
    // O seletor deve ser o CONTAINER PRINCIPAL (que tem a classe .swiper)
    const swiper = new Swiper('.swiper', { 
        loop: true,
        speed: 700,
        spaceBetween: 30,

        // Paginação
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        // Navegação
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Responsividade
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            },
        }
    });

    // .................... CÓDIGO DO VÍDEO FEATURES ....................
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
            // Verifica se o badge existe antes de atualizar (Pode não existir nesta página)
            if(badge) {
                badge.textContent = badgeTexts[videoId];
            }
        });
    })});


    /* script local para controlar navegação do carrossel */
(function(){
	const carousel = document.getElementById('histoCarousel');
	const prev = document.getElementById('hist-prev');
	const next = document.getElementById('hist-next');

	function getGap(){
		const s = window.getComputedStyle(carousel);
		return parseInt(s.gap || 20,10) || 20;
	}
	function step(){
		const card = carousel.querySelector('.histo-card');
		if(!card) return carousel.clientWidth * 0.9;
		return Math.round(card.getBoundingClientRect().width + getGap());
	}

	function toNext(){
		const max = carousel.scrollWidth - carousel.clientWidth;
		const s = step();
		if(carousel.scrollLeft >= max - 5) carousel.scrollTo({left:0, behavior:'smooth'});
		else carousel.scrollBy({left:s, behavior:'smooth'});
	}
	function toPrev(){
		const s = step();
		if(carousel.scrollLeft <= 5) {
			const end = carousel.scrollWidth - carousel.clientWidth;
			carousel.scrollTo({left:end, behavior:'smooth'});
		} else carousel.scrollBy({left:-s, behavior:'smooth'});
	}

	prev.addEventListener('click', toPrev);
	next.addEventListener('click', toNext);

	carousel.addEventListener('keydown', (e) => {
		if(e.key === 'ArrowRight'){ e.preventDefault(); toNext(); }
		if(e.key === 'ArrowLeft'){ e.preventDefault(); toPrev(); }
	});

	function updateNav(){
		if(carousel.scrollWidth <= carousel.clientWidth + 2){ prev.style.display='none'; next.style.display='none'; }
		else { prev.style.display=''; next.style.display=''; }
	}
	window.addEventListener('resize', updateNav);
	window.addEventListener('load', updateNav);
})();   