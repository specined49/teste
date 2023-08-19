// Função para calcular a distância entre duas cidades
function distlinear(lat1, long1, lat2, long2) {
    const distance = Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(long1 - long2, 2)) * 111.12;
    return distance;
}

// Função para buscar o vistoriador mais próximo
function buscarVistoriadorMaisProximo() {
    const cidadeDigitada = document.getElementById("cidade").value;

    // Substituir o array abaixo com os dados de cidades
    const plan6 = [
        ["ABADIA DOS DOURADOS - MG", "MG", -18.3635, -47.47],
        ["ABAETE - MG", "MG", -19.111, -45.4305],
        ["ABRE CAMPO - MG", "MG", -20.2727, -42.4391],
        ["ACAIACA - MG", "MG", -20.4036, -43.1008],
        ["ACUCENA - MG", "MG", -19.0301, -42.411],
        ["AGUA BOA - MG", "MG", -18.0642, -42.2303],
        ["AGUA COMPRIDA - MG", "MG", -19.9912, -48.1104],
        ["AGUANIL - MG", "MG", -20.9696, -45.4172],
        ["AGUAS FORMOSAS - MG", "MG", -17.0485, -40.9727],
        ["AGUAS VERMELHAS - MG", "MG", -15.6868, -41.5604],
        ["AIMORES - MG", "MG", -19.6255, -41.2095],
        ["AIURUOCA - MG", "MG", -21.947, -44.6478],
        ["ALAGOA - MG", "MG", -22.1815, -44.6602],
        ["ALBERTINA - MG", "MG", -22.1991, -46.6208],
        ["ALEM PARAIBA - MG", "MG", -21.8094, -42.7574],
        ["ALFENAS - MG", "MG", -21.3929, -45.9952],
        ["ALFREDO VASCONCELOS - MG", "MG", -21.1424, -43.7111],
        ["ALMENARA - MG", "MG", -16.1005, -40.7101]
        // ... mais cidades ...
    ];
    const vistoriadores = [
        { nome: "vistoriador1", cidade: "ABADIA DOS DOURADOS - MG" },
        { nome: "vistoriador2", cidade: "AGUAS VERMELHAS - MG" },
        { nome: "vistoriador3", cidade: "AIMORES - MG" },
        // ... mais vistoriadores ...
    ];

    let menorDistancia = Infinity;
    let vistoriadorSelecionado = "";

    const cidadeSelecionada = plan6.find(cidade => cidade[0].toLowerCase() === cidadeDigitada.toLowerCase());

    if (!cidadeSelecionada) {
        alert("Cidade não encontrada.");
        return;
    }

    let vistoriadoresCache = JSON.parse(localStorage.getItem("vistoriadoresCache")) || [];

    if (vistoriadoresCache.length === 0) {
        vistoriadoresCache = vistoriadores.map(vistoriador => ({ ...vistoriador, status: 1 }));
        localStorage.setItem("vistoriadoresCache", JSON.stringify(vistoriadoresCache));
    }

    let vistoriadoresFila = vistoriadoresCache.filter(vistoriador => vistoriador.status === 1);

    if (vistoriadoresFila.length === 0) {
        vistoriadoresFila = [...vistoriadoresCache];
        vistoriadoresCache.forEach(vistoriador => vistoriador.status = 1);
        localStorage.setItem("vistoriadoresCache", JSON.stringify(vistoriadoresCache));
    }

    for (const vistoriador of vistoriadoresFila) {
        const cidadeVistoriador = plan6.find(cidade => cidade[0].toLowerCase() === vistoriador.cidade.toLowerCase());

        if (cidadeVistoriador) {
            const latCidadeVistoriador = cidadeVistoriador[2];
            const longCidadeVistoriador = cidadeVistoriador[3];

            const distancia = distlinear(cidadeSelecionada[2], cidadeSelecionada[3], latCidadeVistoriador, longCidadeVistoriador);

            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                vistoriadorSelecionado = vistoriador.nome;
            }
        }
    }

    if (vistoriadorSelecionado) {
        document.getElementById("empresa").textContent = vistoriadorSelecionado;
        document.getElementById("cidade-sede").textContent = cidadeSelecionada[0];
        document.getElementById("valor-distancia").textContent = menorDistancia.toFixed(2) + " km";
        const valorTotal = calcularValorTotal(menorDistancia);
        document.getElementById("valor-total").textContent = valorTotal.toFixed(2);

        // Atualizar o status do vistoriador selecionado
        const index = vistoriadoresCache.findIndex(vistoriador => vistoriador.nome === vistoriadorSelecionado);
        if (index !== -1) {
            vistoriadoresCache[index].status = 0;
            localStorage.setItem("vistoriadoresCache", JSON.stringify(vistoriadoresCache));
        }
    } else {
        alert("Nenhum vistoriador encontrado para a cidade digitada.");
    }
}

// Função para calcular o valor total
function calcularValorTotal(distancia) {
    // Substitua o valor do quilômetro pelo valor correto
    const valorPorKm = 1.47; // Exemplo de valor por quilômetro
    return (distancia * 2)*valorPorKm;
}

document.getElementById("select-vistoriador").addEventListener("click", buscarVistoriadorMaisProximo);

// ...

// Função para calcular o valor total
function calcularValorTotal(distancia, tipoLaudo) {
    let valorPorKm = 2.94;

    if (tipoLaudo === "tipo1") {
        valorPorKm = 886.55;
    } else if (tipoLaudo === "tipo2") {
        valorPorKm = 394.69;
    } else if (tipoLaudo === "tipo3") {
        valorPorKm = 1000.00;
    }

    return distancia * valorPorKm;
}

// Função para calcular o valor total do laudo considerando a distância e o tipo
function calcularValorTotalLaudo(distancia, tipoLaudo) {
    const valorPorKm = calcularValorTotal(distancia, tipoLaudo);
    const valorTotal = valorPorKm + (distancia * 2 * 1.47); // Fórmula para calcular o valor total

    return valorTotal;
    totalInput.value = valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Função para atualizar o valor total no resultado
function atualizarValorTotalLaudo() {
    const distancia = parseFloat(document.getElementById("valor-distancia").textContent);
    const tipoLaudo = document.getElementById("tipo-laudo").value;
    
    const valorTotalLaudo = calcularValorTotalLaudo(distancia, tipoLaudo);
    document.getElementById("valor-total").textContent = `R$ ${valorTotalLaudo.toFixed(2)}`;
}

// Adicione um ouvinte de eventos para o input de distância
document.getElementById("valor-distancia").addEventListener("input", atualizarValorTotalLaudo);

// ...


// document.addEventListener("DOMContentLoaded", function() {
//     const tipoLaudoSelect = document.getElementById("tipo-laudo");
//     const totalInput = document.getElementById("total");
//     const distanciaSpan = document.getElementById("valor-distancia");
//     const aceiteSelect = document.getElementById("aceite");

//     function atualizarValorDoLaudo() {
//         const selectedValue = tipoLaudoSelect.value;
//         let valor;

//         if (selectedValue === "tipo1") {
//             valor = 886.55;
//         } else if (selectedValue === "tipo2") {
//             valor = 394.69;
//         } else if (selectedValue === "tipo3") {
//             valor = 1000.00;
//         } else {
//             valor = 0; // Valor padrão ou tratamento de erro
//         }

//         const distancia = parseFloat(distanciaSpan.textContent);
//         const valorTotal = valor + (distancia * 2 * 1.47);
//         totalInput.value = valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
//     }

//     // Definir valor padrão ao carregar a página
//     tipoLaudoSelect.value = "tipo1";
//     atualizarValorDoLaudo();

//     // Evento de escuta para o select de tipo de laudo
//     tipoLaudoSelect.addEventListener("change", atualizarValorDoLaudo);

//     // Evento de escuta para o select de aceite
//     aceiteSelect.addEventListener("change", atualizarValorDoLaudo);
// });

// // ... (resto do código)

