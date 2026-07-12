document.addEventListener("DOMContentLoaded", () => {
    
    // === 1. BOTÃO EXIBIR / OCULTAR OS MELHORES ===
    const btnRevelar = document.getElementById("btn-revelar-melhores");
    const secaoMelhores = document.getElementById("secao-melhores");

    if (btnRevelar && secaoMelhores) {
        btnRevelar.addEventListener("click", () => {
            // Se estiver escondido, mostra. Se estiver visível, esconde.
            if (secaoMelhores.classList.contains("escondido")) {
                secaoMelhores.classList.remove("escondido");
                // Pequeno delay para a animação do CSS pegar suavemente
                setTimeout(() => {
                    secaoMelhores.classList.add("mostrar");
                }, 10);
                btnRevelar.textContent = "Ocultar os Melhores ❌";
            } else {
                secaoMelhores.classList.remove("mostrar");
                // Espera a animação sumir para colocar o display none de fato
                setTimeout(() => {
                    secaoMelhores.classList.add("escondido");
                }, 500);
                btnRevelar.textContent = "Exibir os Melhores da Guilda 🔥";
            }
        });
    }

    // === 2. ANIMAÇÃO AO ROLAR A PÁGINA (SCROLL REVEAL) ===
    const secoes = document.querySelectorAll(".section-hidden");

    const checarScroll = () => {
        const gatilhoUsuario = (window.innerHeight / 100) * 85; 

        secoes.forEach(secao => {
            const topoSecao = secao.getBoundingClientRect().top;

            if (topoSecao < gatilhoUsuario) {
                secao.classList.add("section-visible");
            }
        });
    };

    window.addEventListener("scroll", checarScroll);
    checarScroll(); 
});

// Recupera o nick salvo e exibe na tela
const usuarioLogado = localStorage.getItem("sk_usuario");
if (usuarioLogado) {
    document.getElementById("nome-jogador").textContent = usuarioLogado;
}