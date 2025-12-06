const categorias = ["Comunicação", "Tempo de Resposta", "Corporal", "Emoções", "Técnico"];
const valores = [85, 100, 80, 40, 70];
const feedbacks = [
    "Você demonstra uma boa capacidade de se expressar, utilizando um vocabulário adequado e respostas coerentes. Em alguns momentos, suas pausas ou repetições podem indicar nervosismo, isso é comum em entrevistas. Tente manter um ritmo mais calmo e respire antes de responder. Sua comunicação é clara e tem potencial para causar uma excelente primeira impressão.Continue aprimorando o equilíbrio entre objetividade e naturalidade",

    "O tempo das suas respostas está adequado na maior parte das vezes. Quando a resposta se entende demais, pode soar dispersa; tente resumir o essencial em 30 a 60 segundos. Por outro lado, se a resposta for muito curta, complemente com um exemplo prático. Você está no caminho certo: a fluidez vem com o treino.",

    "Sua expressão transmite engajamento e interesse, o que é ótimo para criar conexão com o entrevistador. Em alguns momentos, gestos podem parecer um pouco acelerados - tente mantê-los mais suaves, alinhados ao tom da fala. Lembre se: expressar-se é positivo, e pequenas adequações já tornam sua presença mais confiante e profissional.",

    "Sua postura demonstra comprometimentos e respeito, o que transmite credibilidade. Se notar momentos de insegurança, lembre-se de que isso é natural. A prática constante ajuda a transformar ansiedade em autoconfiança. Mantenha o contato visual e finalize suas falas com segurança. Sua evolução é visível: cada simulação torna sua presença mais firme e autêntica.",

    "Suas respostas apresentam boa estrutura e clareza de ideias, demonstrando clareza e reflexão. Em algumas perguntas, faltaram exemplos concretos que poderiam fortalecer seus argumentos. Procure conectar suas experiências com o que a vaga exige - isso mostra segurança e autoconhecimento"
];

const chart = new Chart(document.getElementById("categoriaChart"), {
    type: "bar",
    data: {
        labels: categorias,
        datasets: [{ data: valores, backgroundColor: "#1d5d50" }]
    },
    options: {
        onClick(event, elements) {
            if (elements.length > 0) {
                const i = elements[0].index;
                document.querySelector("#textoFeedback").innerText = feedbacks[i];
                document.querySelector("#modalCategoria").style.display = "block";
            }
        }
    }
});

document.getElementById("fecharModal").onclick = ()=> modalCategoria.style.display = "none";
