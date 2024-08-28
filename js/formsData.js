document.getElementById("feedbackForm").addEventListener("submit", function(event){ 
    event.preventDefault();

    const tempoResolucao = document.querySelector(".tempoResolucao").value;
    const dataInteracao = document.querySelector(".dataInteracao").value;
    const avaliacaoGeral = document.querySelector(".avaliacaoGeral").value
    const gravidade = document.querySelector(".gravidade").value;
    const satisfacao = document.querySelector(".satisfacao").value;

    const feedbackData = {
        tempoResolucao,
        dataInteracao,
        gravidade,
        avaliacaoGeral,
        satisfacao,
        
    }

    let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
    feedbackList.push(feedbackData);
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
});
    

