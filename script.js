// Seleciona a barra de navegação
const navbar = document.querySelector('.navbar');

// Escuta o evento de "scroll" (rolagem) da página
window.addEventListener('scroll', () => {
    // Se a página for rolada mais de 50 pixels para baixo
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-active'); // Adiciona a classe que muda o visual
    } else {
        navbar.classList.remove('navbar-active'); // Remove quando volta pro topo
    }
});