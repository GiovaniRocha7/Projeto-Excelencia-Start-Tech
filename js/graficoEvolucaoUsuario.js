
const ctx = document.getElementById("evolucaoChart");

new Chart(ctx, {
    type: "line",
    data: {
        labels: ["JAN", "FEV", "MAR", "ABR", "MAI"], // ← depois virá do backend
        datasets: [{
            label: "Sua evolução",
            data: [2, 4, 3, 5, 8],                    // ← valores reais no futuro
            borderWidth: 3,
            borderColor: "#1d5d50",
            pointRadius: 5,
            tension: 0.35
        }]
    },
    options: {
        plugins:{ legend:{ display:false }},
        scales:{
            y:{ min:0, max:10 }
        }
    }
});