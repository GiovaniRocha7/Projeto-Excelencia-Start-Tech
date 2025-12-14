
    let leituraAtiva = false;

    const toggleBtn = document.getElementById('toggleReader');
    const alerta = document.getElementById('ttsAlerta');

    // Função para impedir que links sejam clicados
    function bloquearLinks(event) {
      event.preventDefault();
    }

    // Função para mostrar aviso estilizado
    function mostrarAlerta(mensagem) {
      alerta.textContent = mensagem;
      alerta.classList.add('visivel');
      setTimeout(() => {
        alerta.classList.remove('visivel');
      }, 3000);
    }

    toggleBtn.addEventListener('click', () => {
      leituraAtiva = !leituraAtiva;

      const elementos = document.querySelectorAll('p, span, li, h1, h2, h3, h4, h5, h6, a');

      if (leituraAtiva) {
        elementos.forEach(el => el.classList.add('texto-tts'));

        document.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', bloquearLinks);
        });

        document.body.addEventListener('click', leituraPorClique);

        toggleBtn.classList.add('ativo');
        mostrarAlerta("Leitura por clique ativada.");
        falarMensagem("Leitura por clique ativada.");

      } else {
        elementos.forEach(el => el.classList.remove('texto-tts'));

        document.querySelectorAll('a').forEach(link => {
          link.removeEventListener('click', bloquearLinks);
        });

        document.body.removeEventListener('click', leituraPorClique);

        toggleBtn.classList.remove('ativo');
        mostrarAlerta("Leitura por clique desativada.");
        falarMensagem("Leitura por clique desativada.");

      }
    });

    function leituraPorClique(event) {
      let selecionado = event.target;

      if (selecionado.closest) {
        const linkPai = selecionado.closest('a');
        if (linkPai) selecionado = linkPai;
      }

      if (['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(selecionado.tagName)) return;

      const texto = selecionado.innerText || selecionado.textContent;
      if (!texto.trim()) return;

      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = "pt-BR";

      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);

      event.stopPropagation();
      event.preventDefault();
    }

    function falarMensagem(mensagem) {
      const aviso = new SpeechSynthesisUtterance(mensagem);
      aviso.lang = "pt-BR";
      speechSynthesis.cancel(); // Interrompe qualquer leitura anterior
      speechSynthesis.speak(aviso);
    }
