document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('exampleInputEmail1');
    const passwordInput = document.getElementById('exampleInputPassword1');
    const entrarButton = document.getElementById('entrar-button');

    entrarButton.addEventListener('click', function(event) {
        if (emailInput.value.trim() === "" || passwordInput.value.trim() === "") {
            event.preventDefault();  
            alert("Por favor, preencha os campos obrigatórios de 'Usuário' e 'Senha'.");  
        } else {
            window.location.href = 'index.html';
    }});
});