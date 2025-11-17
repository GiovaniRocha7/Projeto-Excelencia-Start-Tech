document.addEventListener('DOMContentLoaded', function(){
    const bars = document.querySelectorAll('.bar');
    const overlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.getElementById('modalClose');

    const details = {
        comunicacao: {
            title: 'Comunicação verbal',
            html: '<p>Você demonstra boa capacidade de se expressar, utilizando um vocabulário adequado e respostas coerentes. Em alguns momentos, pausas ou repetições podem indicar nervosismo. Tente manter um ritmo mais calmo e respire antes de responder. Sua comunicação é clara e tem potencial para causar uma excelente primeira impressão.</p>'
        },
        clareza: {
            title: 'Clareza nas respostas',
            html: '<p>Sua estrutura de respostas é clara e objetiva — continue desenvolvendo exemplos concretos para cada ponto. Mantenha foco no ponto principal e evite divagações.</p>'
        },
        linguagem: {
            title: 'Linguagem Corporal',
            html: '<p>Sua expressão transmite engajamento e interesse. Em alguns momentos, gestos podem parecer acelerados — tente mantê-los mais suaves e alinhados ao tom da fala. Pequenas adequações tornam sua presença mais confiante.</p>'
        },
        emocao: {
            title: 'Emoção / Confiança',
            html: '<p>Sua postura demonstra comprometimento e respeito, trazendo credibilidade. Se notar insegurança, saiba que isso é comum; a prática ajuda a transformar ansiedade em autoconfiança.</p>'
        },
        conhecimento: {
            title: 'Conhecimento Técnico',
            html: '<p>Suas respostas apresentam boa estrutura e clareza de ideias. Em algumas perguntas, faltaram exemplos concretos que poderiam fortalecer seus argumentos. Procure conectar suas experiências ao que a vaga exige.</p>'
        }
    };

    function openModal(key, value){
        const d = details[key];
        if(!d) return;
        // montar card dentro do modal (usar d.html que já contém tags <p>)
        modalContent.innerHTML = '<div class="card">'
            + '<div class="score">Pontuação: ' + (value || d.value || '') + '%</div>'
            + '<h3>' + d.title + '</h3>'
            + d.html
            + '</div>';
        overlay.style.display = 'flex';
    }

    function closeModal(){ overlay.style.display = 'none'; }

    bars.forEach(b => {
        b.addEventListener('click', function(){
            const key = this.dataset.key;
            const val = this.dataset.value;
            openModal(key, val);
        });
        b.addEventListener('mouseenter', function(){
            const f = this.querySelector('.fill'); f.style.transform = 'scaleY(1.03)';
        });
        b.addEventListener('mouseleave', function(){
            const f = this.querySelector('.fill'); f.style.transform = 'scaleY(1)';
        });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e){ if(e.target === overlay) closeModal(); });
});
