// Função que carrega conteúdo HTML de uma URL (usando fetch)
function loadContent(url, targetElementId, loadingMessage = 'Carregando...') {
    const targetElement = document.getElementById(targetElementId);
    
    // Exibe a mensagem de carregamento
    targetElement.innerHTML = `<p>${loadingMessage}</p>`;

    // Faz o fetch do arquivo
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar o arquivo: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            targetElement.innerHTML = data; // Atualiza o conteúdo
        })
        .catch(error => {
            targetElement.innerHTML = `<p>Erro ao carregar o conteúdo. Tente novamente mais tarde.</p>`;
            console.error('Erro ao carregar o conteúdo:', error);
        });
}

// Função que carrega a página principal com base no nome do arquivo
function loadPage(page) {
    loadContent(page + '.html', 'content');
    
    // Salva a seção visitada no LocalStorage
    localStorage.setItem('currentSection', page);
}

// Função que carrega a navbar no início
document.addEventListener('DOMContentLoaded', function() {
    // Carrega a navbar
    loadContent('navbar.html', 'navbar', 'Carregando a navbar...');
    
    // Tenta carregar a página salva no LocalStorage ou carrega a página inicial
    const savedPage = localStorage.getItem('currentSection');
    if (savedPage) {
        loadPage(savedPage); // Carrega a página salva
    } else {
        loadPage('home'); // Carrega a página inicial por padrão
    }

    // Configuração da navbar
    configurarNavbar();
});