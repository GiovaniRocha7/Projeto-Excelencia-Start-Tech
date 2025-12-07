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
