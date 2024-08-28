const feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
    
        // Prepara os dados para os gráficos
        const gravidadeCounts = { baixa: 0, media: 0, alta: 0 };
        let avaliacaoGeralData = [];
        let satisfacaoData = [];
        let tempoResolucaoData = [];
        let datas = [];
    
        feedbackList.forEach(feedback => {
            gravidadeCounts[feedback.gravidade] += 1;
            avaliacaoGeralData.push({ data: feedback.dataInteracao, valor: Number(feedback.avaliacaoGeral) });
            satisfacaoData.push(Number(feedback.satisfacao));
            tempoResolucaoData.push({ data: feedback.dataInteracao, valor: parseInt(feedback.tempoResolucao.replace(/\D/g, '')) }); // Assumindo que o tempo é dado em formato "X dias"
        });
    
        // Ordena os dados por data
        avaliacaoGeralData = avaliacaoGeralData.sort((a, b) => new Date(a.data) - new Date(b.data));
        tempoResolucaoData = tempoResolucaoData.sort((a, b) => new Date(a.data) - new Date(b.data));
    
        // Extrai as datas e valores para os gráficos
        const labelsData = avaliacaoGeralData.map(item => item.data);
        const avaliacaoGeralValues = avaliacaoGeralData.map(item => item.valor);
        const tempoResolucaoValues = tempoResolucaoData.map(item => item.valor);
    
        // Gráfico de Gravidade
        new Chart(document.getElementById('chartGravidade'), {
            type: 'doughnut',
            data: {
                labels: ['Baixa', 'Média', 'Alta'],
                datasets: [{
                    label: 'Gravidade dos Problemas',
                    data: [gravidadeCounts.baixa, gravidadeCounts.media, gravidadeCounts.alta],
                    backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
                }]
            }
        });
    
        // Gráfico de Avaliação Geral
        new Chart(document.getElementById('chartAvaliacaoGeral'), {
            type: 'line',
            data: {
                labels: labelsData,
                datasets: [{
                    label: 'Avaliação Geral',
                    data: avaliacaoGeralValues,
                    backgroundColor: '#4CAF50',
                    borderColor: '#4CAF50',
                    fill: false
                }]
            }
        });
    
        // Gráfico de Satisfação
        new Chart(document.getElementById('chartSatisfacao'), {
            type: 'bar',
            data: {
                labels: feedbackList.map((_, index) => `Feedback ${index + 1}`),
                datasets: [{
                    label: 'Satisfação com o Atendimento',
                    data: satisfacaoData,
                    backgroundColor: '#FF9800',
                }]
            }
        });
    
        // Gráfico de Tempo de Resolução
        new Chart(document.getElementById('chartTempoResolucao'), {
            type: 'line',
            data: {
                labels: labelsData,
                datasets: [{
                    label: 'Tempo de Resolução (dias)',
                    data: tempoResolucaoValues,
                    backgroundColor: '#2196F3',
                    borderColor: '#2196F3',
                    fill: false
                }]
            }
        });