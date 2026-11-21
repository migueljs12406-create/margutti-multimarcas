/*---------------------------------------------------------------------
    File Name: custom.js - Margutti Multimarcas
---------------------------------------------------------------------*/

$(function () {

	"use strict";

	/* Mapa / Formulário (página inicial)
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	if (document.querySelector("#showMap")) {
		document.querySelector("#showMap").addEventListener("click", function (e) {
			e.preventDefault();
			$(".map_form_container").addClass("map_show");
		});
	}
	if (document.querySelector("#showForm")) {
		document.querySelector("#showForm").addEventListener("click", function (e) {
			e.preventDefault();
			$(".map_form_container").removeClass("map_show");
		});
	}

	/* Formulário de contato -> WhatsApp
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	var btnEnviarWhats = document.querySelector("#btnEnviarWhats");
	if (btnEnviarWhats) {
		btnEnviarWhats.addEventListener("click", function (e) {
			e.preventDefault();
			var nome = (document.querySelector("#campoNome") || {}).value || "";
			var telefone = (document.querySelector("#campoTelefone") || {}).value || "";
			var veiculo = (document.querySelector("#campoVeiculo") || {}).value || "";
			var mensagem = (document.querySelector("#campoMensagem") || {}).value || "";

			var texto = "Olá! Meu nome é " + nome + ".";
			if (veiculo) { texto += " Tenho interesse no veículo: " + veiculo + "."; }
			if (mensagem) { texto += " " + mensagem; }
			if (telefone) { texto += " (Meu telefone: " + telefone + ")"; }

			var url = "https://wa.me/5519999556088?text=" + encodeURIComponent(texto);
			window.open(url, "_blank");
		});
	}

	/* Página de Veículos: filtro por categoria
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	var filtros = document.querySelectorAll(".filter_btn");
	var itens = document.querySelectorAll(".vehicle_item");

	function aplicarFiltro(categoria) {
		itens.forEach(function (item) {
			var mostrar = (categoria === "todos") || (item.getAttribute("data-categoria") === categoria);
			item.style.display = mostrar ? "" : "none";
		});
	}

	if (filtros.length) {
		filtros.forEach(function (botao) {
			botao.addEventListener("click", function () {
				filtros.forEach(function (b) { b.classList.remove("active"); });
				botao.classList.add("active");
				aplicarFiltro(botao.getAttribute("data-filtro"));
			});
		});
	}

});
