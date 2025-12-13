        const ctxEvolucao = document.getElementById('evolucaoChart');
        if (ctxEvolucao && typeof Chart !== 'undefined') {
            new Chart(ctxEvolucao, {
                type: 'line',
                data: {
                    labels: ['10/10', '15/10', '20/10', '25/10', '28/10'],
                    datasets: [{
                        label: 'Sua Performance (%)',
                        data: [65, 70, 75, 78, 82],
                        borderColor: '#00d4ff',
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        borderWidth: 4,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#1d5d50',
                        pointBorderColor: '#00d4ff',
                        pointRadius: 6,
                        pointHoverRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: '#e5e7eb',
                                font: { size: 12 }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: { color: '#9ca3af' },
                            grid: { color: 'rgba(255, 255, 255, 0.05)' }
                        },
                        x: {
                            ticks: { color: '#9ca3af' },
                            grid: { color: 'rgba(255, 255, 255, 0.05)' }
                        }
                    }
                }
            });
        }