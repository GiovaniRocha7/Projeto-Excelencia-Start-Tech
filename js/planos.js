// Menu hambúrguer (igual ao padrão das páginas logadas)
(() => {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
    document.querySelectorAll('.nav-links a, .nav-links button').forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
})();

// Estado do plano atual (mock: usa localStorage para refletir o plano do usuário logado)
const STORAGE_KEY = 'planoAtual'; // valores: 'free' | 'premium' | 'profissional'
function lerPlanoAtual() {
  return localStorage.getItem(STORAGE_KEY) || 'free';
}
function salvarPlanoAtual(plano) {
  localStorage.setItem(STORAGE_KEY, plano);
}

// Renderiza texto do plano atual
function atualizarPlanoAtualUI() {
  const el = document.getElementById('planoAtualDescricao');
  if (!el) return;
  const plano = lerPlanoAtual();
  const mapa = {
    free: 'Free — 3 simulações/semana, feedback básico.',
    premium: 'Premium — simulações ilimitadas e análise detalhada.',
    profissional: 'Profissional — recursos avançados e consultoria.'
  };
  el.textContent = `Plano atual: ${mapa[plano] || plano}`;
}

// Ações dos botões de upgrade/assinar
function configurarBotoesPlanos() {
  document.querySelectorAll('.botao-upgrade').forEach(btn => {
    btn.addEventListener('click', () => {
      const plano = btn.getAttribute('data-plano');
      if (!plano) return;
      // Aqui você pode redirecionar para a página de pagamento/alteração
      // Por enquanto, salvamos direto para simular a troca:
      salvarPlanoAtual(plano);
      atualizarPlanoAtualUI();
      alert(`Plano alterado para: ${plano}`);
    });
  });
}

// Trocar/Cancelar no cabeçalho
function configurarAcoesPlanoAtual() {
  const trocar = document.getElementById('botaoTrocarPlano');
  const cancelar = document.getElementById('botaoCancelarPlano');
  const sair = document.getElementById('botaoSair');

  if (trocar) {
    trocar.addEventListener('click', () => {
      // Sugestão: abrir modal de seleção de plano ou ir para checkout
      alert('Selecione abaixo o novo plano para trocar.');
      window.scrollTo({ top: document.getElementById('planos').offsetTop - 80, behavior: 'smooth' });
    });
  }
  if (cancelar) {
    cancelar.addEventListener('click', () => {
      const plano = lerPlanoAtual();
      if (plano === 'free') {
        alert('Você já está no plano Free.');
        return;
      }
      if (confirm('Tem certeza que deseja cancelar o plano pago e migrar para o Free?')) {
        salvarPlanoAtual('free');
        atualizarPlanoAtualUI();
        alert('Plano cancelado. Você agora está no plano Free.');
      }
    });
  }
  if (sair) {
    sair.addEventListener('click', () => {
      // Limpe sessão/autenticação conforme sua lógica
      alert('Sessão encerrada.');
      // Redirecione para login, se desejado
      // window.location.href = '/index.html';
    });
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  atualizarPlanoAtualUI();
  configurarBotoesPlanos();
  configurarAcoesPlanoAtual();
});