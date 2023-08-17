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

    // Substituir o array abaixo com os dados de vistoriadores
    const vistoriadores = [
        { nome: "vistoriador1", cidade: "ABADIA DOS DOURADOS - MG" },
        { nome: "vistoriador2", cidade: "AGUAS VERMELHAS - MG" },
        { nome: "vistoriador3", cidade: "AIMORES - MG" },
        // ... mais vistoriadores ...
    ];

    let menorDistancia = Infinity;
    let vistoriadorSelecionado = "";

    const cidadeSelecionada = plan6.find(cidade => cidade[0].toLowerCase() === cidadeDigitada.toLowerCase());

    if (cidadeSelecionada) {
        const latCidadeSelecionada = cidadeSelecionada[2];
        const longCidadeSelecionada = cidadeSelecionada[3];

        for (const vistoriador of vistoriadores) {
            const cidadeVistoriador = plan6.find(cidade => cidade[0].toLowerCase() === vistoriador.cidade.toLowerCase());
            
            if (cidadeVistoriador) {
                const latCidadeVistoriador = cidadeVistoriador[2];
                const longCidadeVistoriador = cidadeVistoriador[3];

                const distancia = distlinear(latCidadeSelecionada, longCidadeSelecionada, latCidadeVistoriador, longCidadeVistoriador);

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
        } else {
            alert("Nenhum vistoriador encontrado para a cidade digitada.");
        }
    } else {
        alert("Cidade não encontrada.");
    }
}

// Função para calcular o valor total
function calcularValorTotal(distancia) {
    // Substitua o valor do quilômetro pelo valor correto
    const valorPorKm = 0.5; // Exemplo de valor por quilômetro

    return distancia * valorPorKm;
}

document.getElementById("select-vistoriador").addEventListener("click", buscarVistoriadorMaisProximo);
