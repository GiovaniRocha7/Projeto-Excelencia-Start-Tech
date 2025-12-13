const ctx = document.getElementById('categoriaChart');
const modal = document.getElementById('modalCategoria');
const fecharModal = document.getElementById('fecharModal');
const textoFeedback = document.getElementById('textoFeedback');

const feedbacks = {
    'Comunicação': 'Sua comunicação verbal está excelente! Você mantém clareza nas respostas e expressa ideias de forma estruturada. Continue praticando para ganhar ainda mais naturalidade.',
    'Postura': 'Sua postura transmite confiança e profissionalismo. Mantenha a naturalidade e evite movimentos repetitivos. Você está no caminho certo!',
    'Conteúdo': 'Seu conhecimento técnico é sólido. Aprofunde ainda mais em casos de uso específicos e estude tendências do mercado para se destacar.',
    'Expressão Facial': 'Sua expressão facial é natural e transmite segurança. Trabalhe na consistência e certifique-se de que sua expressão acompanha sempre o sentimento da resposta.',
    'Tom de Voz': 'Seu tom de voz é profissional e seguro. Varie um pouco mais a entonação para manter o interesse do entrevistador durante respostas mais longas.'
};

const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Comunicação', 'Postura', 'Conteúdo', 'Expressão Facial', 'Tom de Voz'],
        datasets: [{
            label: 'Seu Desempenho',
            data: [8, 7.5, 7, 8.5, 7.2],
            borderColor: '#1d5d50',
            borderWidth: 2,
            backgroundColor: [
                '#8dd9c4',
                '#a1e3ba',
                '#c3f1c8',
                '#9cd4ff',
                '#bca9ff'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: {
                    color: '#e5e7eb',
                    font: {
                        size: 18,      // 👈 legenda maior
                        weight: '600'
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#e5e7eb',
                    font: {
                        size: 16     // 👈 textos do eixo X
                    }
                }
            },
            y: {
                min: 0,
                max: 10,
                ticks: {
                    color: '#9ca3af',
                    font: {
                        size: 16     // 👈 números do eixo Y
                    }
                },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        },
        onClick: (event, activeElements) => {
            if (activeElements.length > 0) {
                const index = activeElements[0].index;
                const categoria = chart.data.labels[index];

                textoFeedback.textContent = feedbacks[categoria];
                modal.classList.add('show');
            }
        }
    }
});

fecharModal.addEventListener('click', () => modal.classList.remove('show'));

modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.classList.remove('show');
});
