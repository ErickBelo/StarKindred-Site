document.addEventListener("DOMContentLoaded", () => {
    
    // === 1. SISTEMA DE FILTRO DE MEMBROS ===
    const botoesFiltro = document.querySelectorAll(".btn-filtro");
    const cardsMembros = document.querySelectorAll(".card");

    botoesFiltro.forEach(botao => {
        botao.addEventListener("click", () => {
            // Remove a cor amarela ativa de todos os botões e coloca no que foi clicado
            botoesFiltro.forEach(b => b.classList.remove("ativo"));
            botao.classList.add("ativo");

            const filtroAtivo = botao.getAttribute("data-filter");

            cardsMembros.forEach(card => {
                const eloCard = card.getAttribute("data-elo");
                
                // Se for 'todos' ou se o elo do card for igual ao do botão, mostra. Se não, esconde.
                if (filtroAtivo === "todos" || eloCard === filtroAtivo) {
                    card.classList.remove("escondido");
                } else {
                    card.classList.add("escondido");
                }
            });
        });
    });

    // === 2. ANIMAÇÃO SUAVE DE APARECER CONTEÚDO (SCROLL REVEAL) ===
    const secoes = document.querySelectorAll(".section-hidden");

    const checarScroll = () => {
        // Define o ponto da tela onde a animação deve começar (85% da altura da tela)
        const gatilhoUsuario = (window.innerHeight / 100) * 85; 

        secoes.forEach(secao => {
            const topoSecao = secao.getBoundingClientRect().top;

            if (topoSecao < gatilhoUsuario) {
                secao.classList.add("section-visible");
            }
        });
    };

    // Ativa o leitor de scroll do navegador
    window.addEventListener("scroll", checarScroll);
    
    // Roda uma vez assim que a página abre para mostrar o que já está na tela
    checarScroll(); 
});