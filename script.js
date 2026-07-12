document.addEventListener("DOMContentLoaded", () => {
    
    // === 1. BOTÃO EXIBIR / OCULTAR OS MELHORES ===
    const btnRevelar = document.getElementById("btn-revelar-melhores");
    const secaoMelhores = document.getElementById("secao-melhores");

    if (btnRevelar && secaoMelhores) {
        btnRevelar.addEventListener("click", () => {
            if (secaoMelhores.classList.contains("escondido")) {
                secaoMelhores.classList.remove("escondido");
                setTimeout(() => {
                    secaoMelhores.classList.add("mostrar");
                }, 10);
                btnRevelar.textContent = "Ocultar os Melhores ❌";
            } else {
                secaoMelhores.classList.remove("mostrar");
                setTimeout(() => {
                    secaoMelhores.classList.add("escondido");
                }, 500);
                btnRevelar.textContent = "Exibir os Melhores da Guilda 🔥";
            }
        });
    }

    // === 2. ANIMAÇÃO DE SCROLL (SCROLL REVEAL) ===
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