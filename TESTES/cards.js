// Navegação entre seções
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        // Em telas pequenas deixe o comportamento padrão (ancora/scroll)
        if (window.innerWidth <= 768) {
            // deixa o link navegar normalmente para a âncora (scroll)
            return;
        }

        // Comportamento desktop (mantido)
        e.preventDefault();
        
        // Remove active de todos
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        document.querySelectorAll('.form-section').forEach(section => section.classList.remove('active'));
        
        // Adiciona active ao clicado
        this.classList.add('active');
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.classList.add('active');
            // opcional: rolar suavemente até a seção ativa
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Função para adicionar formação
function adicionarFormacao() {
    const html = `
        <div class="academic-card">
            <div class="form-grid">
                <div class="form-group">
                    <label>Nível de Escolaridade</label>
                    <select>
                        <option value="">Selecione</option>
                        <option value="ensino-medio">Ensino Médio</option>
                        <option value="superior">Superior</option>
                        <option value="pos-graduacao">Pós-graduação</option>
                        <option value="mestrado">Mestrado</option>
                        <option value="doutorado">Doutorado</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Situação</label>
                    <select>
                        <option value="">Selecione</option>
                        <option value="cursando">Cursando</option>
                        <option value="completo">Completo</option>
                        <option value="trancado">Trancado</option>
                    </select>
                </div>
                <div class="form-group full-width">
                    <label>Instituição</label>
                    <input type="text" placeholder="Nome da instituição">
                </div>
                <div class="form-group full-width">
                    <label>Curso</label>
                    <input type="text" placeholder="Nome do curso">
                </div>
                <div class="form-group">
                    <label>Ano de Início</label>
                    <input type="number" placeholder="2020" min="1980" max="2100">
                </div>
                <div class="form-group">
                    <label>Ano de Conclusão</label>
                    <input type="number" placeholder="2024" min="1980" max="2100">
                </div>
            </div>
        </div>
    `;
    document.getElementById('formacaoList').insertAdjacentHTML('beforeend', html);
}

// Função para adicionar experiência
function adicionarExperiencia() {
    const html = `
        <div class="experience-card">
            <div class="form-grid">
                <div class="form-group full-width">
                    <label>Área de Atuação (Empresa)</label>
                    <input type="text" placeholder="Nome da empresa">
                </div>
                <div class="form-group">
                    <label>Cargo Atual</label>
                    <input type="text" placeholder="Seu cargo">
                </div>
                <div class="form-group full-width">
                    <label>Descrição das Atividades</label>
                    <textarea rows="4" placeholder="Descreva suas principais atividades e responsabilidades..."></textarea>
                </div>
                <div class="form-group full-width">
                    <label>Objetivo Profissional</label>
                    <textarea rows="4" placeholder="Descreva seus objetivos nesta área..."></textarea>
                </div>
            </div>
        </div>
    `;
    document.getElementById('experienciaList').insertAdjacentHTML('beforeend', html);
}

// Função para adicionar habilidade
function adicionarHabilidade() {
    const input = document.getElementById('novaHabilidade');
    const habilidade = input.value.trim();
    
    if (habilidade === '') {
        alert('Digite uma habilidade antes de adicionar');
        return;
    }
    
    const html = `
        <span class="skill-tag">
            ${habilidade}
            <button type="button" onclick="removerHabilidade(this)">✕</button>
        </span>
    `;
    
    document.getElementById('habilidadesList').insertAdjacentHTML('beforeend', html);
    input.value = '';
    input.focus();
}

// Função para remover habilidade
function removerHabilidade(btn) {
    btn.closest('.skill-tag').remove();
}

// Permitir Enter para adicionar habilidade
document.getElementById('novaHabilidade')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        adicionarHabilidade();
    }
});

// Submissão do formulário
document.getElementById('formPerfil')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Perfil salvo com sucesso!');
    // Aqui você faria uma chamada AJAX para salvar os dados
});

// Formatação de CPF
document.getElementById('cpf')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 8) {
        value = value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6, 9) + '-' + value.slice(9);
    } else if (value.length > 5) {
        value = value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6);
    } else if (value.length > 2) {
        value = value.slice(0, 3) + '.' + value.slice(3);
    }
    e.target.value = value;
});

// Formatação de Telefone
document.getElementById('telefone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) {
        value = '(' + value.slice(0, 2) + ') ' + value.slice(2, 7) + '-' + value.slice(7);
    } else if (value.length > 2) {
        value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
    }
    e.target.value = value;
});

// Formatação de CEP
document.getElementById('cep')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 5) {
        value = value.slice(0, 5) + '-' + value.slice(5);
    }
    e.target.value = value;
});

// ===== USER MENU TOGGLE =====
(function() {
    const avatarBtn = document.getElementById('userAvatarBtn');
    const dropdown = document.getElementById('userDropdown');

    if (!avatarBtn || !dropdown) return;

    function openMenu() {
        dropdown.classList.add('open');
        dropdown.setAttribute('aria-hidden', 'false');
        avatarBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        dropdown.classList.remove('open');
        dropdown.setAttribute('aria-hidden', 'true');
        avatarBtn.setAttribute('aria-expanded', 'false');
    }

    avatarBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        if (isOpen) closeMenu();
        else openMenu();
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && !avatarBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
    });

    // Example: handle sign out click (user can integrate real logic)
    document.getElementById('menuSair')?.addEventListener('click', function(e) {
        e.preventDefault();
        // highlight: close menu and perform sign out action
        closeMenu();
        alert('Saindo...');
        // TODO: substituir por lógica real de logout
    });
})();

