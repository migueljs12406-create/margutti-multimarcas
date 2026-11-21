
document.addEventListener("DOMContentLoaded", function () {
    const botao = document.getElementById("theme-toggle");

    if (!botao) return;

    function aplicarTema(tema) {
        const escuro = tema === "escuro";

        document.body.classList.toggle("dark-mode", escuro);
        document.body.classList.toggle("modo-escuro", escuro);

        botao.setAttribute("aria-pressed", String(escuro));

        botao.innerHTML = escuro
            ? '<i class="fa fa-sun-o"></i> <span>Modo claro</span>'
            : '<i class="fa fa-moon-o"></i> <span>Modo escuro</span>';
    }

    let temaSalvo = "claro";

    try {
        temaSalvo = localStorage.getItem("tema-margutti") || "claro";
    } catch (erro) {}

    aplicarTema(temaSalvo);

    botao.addEventListener("click", function () {
        const novoTema = document.body.classList.contains("modo-escuro")
            ? "claro"
            : "escuro";

        aplicarTema(novoTema);

        try {
            localStorage.setItem("tema-margutti", novoTema);
        } catch (erro) {}
    });
});
