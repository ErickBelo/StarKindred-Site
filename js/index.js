// Interações visuais exclusivas da homepage.
// Os IDs existentes são preservados porque também fazem parte do contrato da página.
const btnMelhores = document.getElementById("btn-toggle-melhores");
const painelElite = document.getElementById("painel-elite");

if (btnMelhores && painelElite) {
    btnMelhores.addEventListener("click", function () {
        const painelVisivel = painelElite.style.display === "grid";

        painelElite.style.display = painelVisivel ? "none" : "grid";
        btnMelhores.textContent = painelVisivel ? "Exibir Melhores" : "Ocultar Detalhes";
        btnMelhores.setAttribute("aria-expanded", String(!painelVisivel));

        if (!painelVisivel) {
            painelElite.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    });
}
