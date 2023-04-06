"use strict";

prepararTestes(funcs => {
    const erroGravissimo = funcs.erroGravissimo;
    window.onerror = (ev, arquivo, linha, coluna, erro) => {
        erroGravissimo(""
                + "<h1>SE VOCÊ ESTÁ VENDO ISSO, É PORQUE O SEU JAVASCRIPT CONTÉM ERROS SINTÁTICOS.</h1>"
                + "<p>Este é um erro gravíssimo. Veja mais detalhes no console do navegador para tentar entender onde ocorreu o erro.</p>"
                + "<p>Quem entregar para o professor algo que faça esta mensagem aparecer, vai ficar com nota zero!</p>"
        );
        document.querySelector("#testefw-botao-executar").disabled = true;
    };
    const divNota = document.querySelector("#testefw-nota");
    if (divNota) divNota.style.display = "none";
},
funcs => {
    const grupo = funcs.grupo;
    const teste = funcs.teste;
    const igual = funcs.igual;
    const naoDeuErro = funcs.naoDeuErro;
    const Utilitarios = funcs.Utilitarios;
    const Xoshiro128ssSeedRandom = funcs.Xoshiro128ssSeedRandom;
    const erroGravissimo = funcs.erroGravissimo;
    const numeroMaximoDeAlunos = 5;
    const random = new Xoshiro128ssSeedRandom(
            Math.sqrt(2) * 2 ** 32,
            Math.sqrt(3) * 2 ** 32,
            Math.sqrt(5) * 2 ** 32,
            Math.sqrt(7) * 2 ** 32
    );
    let nomesOk = false;
    function testOk() { return nomesOk; }
    function setTestOk(ok) { nomesOk = ok; }

    function JSONbonito(dados, keys) {
        return JSON.stringify(dados, keys, 1);
    }

    function bonitoIgual(valorEsperado) {
        const novoIgual = igual(JSONbonito(valorEsperado));
        const testarVelho = novoIgual.testar;
        novoIgual.testar = valorObtido => testarVelho(JSONbonito(valorObtido));
        return novoIgual;
    }

    function igualComMargemDeErro(valorEsperado) {
        return {
            testar: valorObtido => {
                if (typeof valorObtido !== "number") return igual(valorEsperado).testar(valorObtido);
                const diff = Math.abs(valorEsperado - valorObtido);
                if (diff > 10e-10) return igual(valorEsperado).testar(valorObtido);
            },
            esperado: `Resultado esperado: ${valorEsperado}.`
        };
    }

    function igualComposto(valorEsperado) {
        return {
            testar: valorObtido => {
                if (typeof valorObtido !== "string" || !valorObtido.includes("|")) {
                    return igual(valorEsperado).testar(valorObtido);
                }
                const p1 = valorEsperado.substring(0, valorEsperado.indexOf("|") - 1);
                const p2 = valorObtido.substring(0, valorObtido.indexOf("|") - 1);
                igual(p1).testar(p2);
                const n1 = +valorEsperado.substring(valorEsperado.indexOf("|") + 1);
                const n2 = +valorObtido.substring(valorObtido.indexOf("|") + 1);
                const diff = Math.abs(n1 - n2);
                if (diff > 10e-10) return igual(valorEsperado).testar(valorObtido);
            },
            esperado: `Resultado esperado: ${valorEsperado}.`
        }
    }

    const nomes = Object.freeze([
        "Carlos", "Paulo", "Maria", "Fabiana", "Fernanda", "Cláudio", "Elizabete", "Roberto", "Solange", "Yasmin",
        "Rayssa", "Joaquim", "Pedro", "Juliana", "Rodrigo", "Ricardo", "Meire", "Sílvia", "Daniela", "Marcos",
        "Eduardo", "Valéria", "Osvaldo", "Yago", "Felipe", "Vanessa", "Victor", "Michelle", "Alex", "Janete"
    ]);
    const sobrenomes = Object.freeze([
        "de Souza", "de Oliveira", "dos Santos", "de Gusmões", "de Andrade", "da Silva", "Melo", "da Cunha", "Brito", "da Luz",
        "Fernandes", "Teixeira", "Pereira", "Freitas", "do Amaral", "da Cruz", "Machado", "Assis", "Figueiredo", "da Conceição",
        "Ferreira", "Matos", "de Campos", "dos Reis", "Rainha", "Valete"
    ]);

    function nomeAleatorio() {
        return random.nomeAleatorio(nomes, sobrenomes);
    }

    // NOME DOS ALUNOS.

    function validarNomesAlunos() {
        const alunos = nomesDosAlunos(), nomes = [];
        if (!(alunos instanceof Array)) throw new Error("Os nomes do(a)(s) aluno(a)(s) deveriam estar em um array.");
        if (alunos.length === 0) throw new Error("Você(s) se esqueceu(ram) de preencher os nomes do(a)(s) aluno(a)(s).");

        alunos.forEach((aluno, idx) => {
            const numero = idx + 1;

            if (typeof aluno !== "string") throw new Error(`O nome do(a) aluno(a) ${numero} deveria ser uma string.`);
            if (["João da Silva", "Maria da Silva", ""].includes(aluno.trim())) {
                throw new Error(`O nome do(a) aluno(a) ${numero} não está correto.`);
            }
            if (aluno !== aluno.trim()) {
                throw new Error(`Não deixe espaços em branco sobrando no começo ou no final do nome de ${aluno.trim()}.`);
            }
            if (nomes.includes(aluno)) throw new Error("Há nomes de alunos(as) repetidos.");
            nomes.push(aluno);
        });
        if (alunos.length > numeroMaximoDeAlunos) {
            throw new Error(`Vocês só podem fazer grupo de até ${numeroMaximoDeAlunos} alunos(as).`);
        }
        return alunos;
    }

    function mostrarValidacaoNomesAlunos() {
        try {
            const alunos = validarNomesAlunos();
            alunos.forEach(nome => {
                const li = document.createElement("li");
                li.append(nome);
                document.querySelector("#testefw-alunos").append(li);
            });
        } catch (e) {
            erroGravissimo(""
                    + "<h1>SE VOCÊ ESTÁ VENDO ISSO, É PORQUE VOCÊ NÃO DEFINIU CORRETAMENTE OS INTEGRANTES DO SEU GRUPO.</h1>"
                    + "<p>Arrumar isto é a primeira coisa que você tem que fazer neste ADO, e assim que o fizer esta mensagem vai desaparecer.</p>"
                    + "<p>Procure a função nomesDosAlunos() no arquivo ado1.js.</p>"
                    + "<p>Quem entregar para o professor um JavaScript que faça esta mensagem aparecer, vai ficar com nota zero!</p>"
            );
            throw e;
        }
    }

    grupo("Nomes dos alunos", "Verifica se a identificação do(a)(s) aluno(a)(s) está ok").naoFracionado.minimo(-10).testes([
        teste("Listagem de alunos ok.", () => mostrarValidacaoNomesAlunos(), naoDeuErro(), undefined, setTestOk)
    ]);

    // Exercício exemplo.

    grupo("Exemplos", "Verifica se não bagunçou os exemplos dados").minimo(-1).testes([
        teste("O maior de 1 e 3 é 3.", () => maiorDosDois            (1, 3), igual(3), testOk),
        teste("O maior de 5 e 3 é 5.", () => maiorDosDois            (5, 3), igual(5), testOk),
        teste("O maior de 1 e 3 é 3.", () => maiorDosDoisSimplificado(1, 3), igual(3), testOk),
        teste("O maior de 5 e 3 é 5.", () => maiorDosDoisSimplificado(5, 3), igual(5), testOk)
    ]);

    // Exercício 1.

    grupo("Exercício 1", "Maior dos quatro").maximo(0.2).testes([
        teste("O maior de 1, 3, 5, 7 é 7."     , () => maiorDosQuatro( 1,  3,  5,  7), igual( 7), testOk),
        teste("O maior de 1, 3, 5, 9 é 9."     , () => maiorDosQuatro( 1,  3,  5,  9), igual( 9), testOk),
        teste("O maior de 1, 3, 5, 0 é 5."     , () => maiorDosQuatro( 1,  3,  5,  0), igual( 5), testOk),
        teste("O maior de 10, 3, 5, 7 é 10."   , () => maiorDosQuatro(10,  3,  5,  7), igual(10), testOk),
        teste("O maior de 1, 30, 5, 7 é 30."   , () => maiorDosQuatro( 1, 30,  5,  7), igual(30), testOk),
        teste("O maior de 1, 3, 50, 7 é 50."   , () => maiorDosQuatro( 1,  3, 50,  7), igual(50), testOk),
        teste("O maior de -4, -2, -9, -3 é -2.", () => maiorDosQuatro(-4, -2, -9, -3), igual(-2), testOk)
    ]);

    // Exercício 2.

    grupo("Exercício 2 - parte 1 (caminho feliz)", "Operações aritméticas").maximo(0.3).testes([
        teste("0 + 0 deve voltar 0."              , () => operacoesBasicas("A",  0  ,  0   ), igual(  0    ), testOk),
        teste("3.5 + 4 deve voltar 7.5."          , () => operacoesBasicas("A",  3.5,  4   ), igual(  7.5  ), testOk),
        teste("8 + -4 deve voltar 4."             , () => operacoesBasicas("A",  8  , -4   ), igual(  4    ), testOk),
        teste("-3.5 + 4 deve voltar 0.5."         , () => operacoesBasicas("A", -3.5,  4   ), igual(  0.5  ), testOk),
        teste("9 - 1.75 deve voltar 7.25."        , () => operacoesBasicas("S",  9  ,  1.75), igual(  7.25 ), testOk),
        teste("9.1 - -1.1 deve voltar 10.2."      , () => operacoesBasicas("S",  9.1, -1.1 ), igual( 10.2  ), testOk),
        teste("4 - 4 deve voltar 0."              , () => operacoesBasicas("S",  4  ,  4   ), igual(  0    ), testOk),
        teste("1.8 * 7 deve voltar 12.6."         , () => operacoesBasicas("M",  1.8,  7   ), igual( 12.6  ), testOk),
        teste("4 * -4 deve voltar -16."           , () => operacoesBasicas("M",  4  , -4   ), igual(-16    ), testOk),
        teste("0 * 999 deve voltar 0."            , () => operacoesBasicas("M",  0  ,999   ), igual(  0    ), testOk),
        teste("7 / 2 deve voltar 3.5."            , () => operacoesBasicas("D",  7  ,  2   ), igual(  3.5  ), testOk),
        teste("7 / 0.5 deve voltar 14."           , () => operacoesBasicas("D",  7  ,  0.5 ), igual( 14    ), testOk),
        teste("0 / 5 deve voltar 0."              , () => operacoesBasicas("D",  0  ,  5   ), igual(  0    ), testOk),
        teste("0.2 / 0.1 deve voltar 2."          , () => operacoesBasicas("D",  0.2,  0.1 ), igual(  2    ), testOk),
        teste("8 elevado a 3 deve voltar 512."    , () => operacoesBasicas("P",  8  ,  3   ), igual(512    ), testOk),
        teste("-3 elevado a 4 deve voltar 81."    , () => operacoesBasicas("P", -3  ,  4   ), igual( 81    ), testOk),
        teste("0.5 elevado a 3 deve voltar 0.125.", () => operacoesBasicas("P",  0.5,  3   ), igual(  0.125), testOk),
        teste("-2 elevado a 5 deve voltar -32."   , () => operacoesBasicas("P", -2  ,  5   ), igual(-32    ), testOk),
        teste("50 elevado a 0 deve voltar 1."     , () => operacoesBasicas("P", 50  ,  0   ), igual(  1    ), testOk),
        teste("0 elevado a 33 deve voltar 0."     , () => operacoesBasicas("P",  0  , 33   ), igual(  0    ), testOk)
    ]);

    grupo("Exercício 2 - parte 2 (caminho infeliz)", "Operações aritméticas produzindo NaN ou undefined").maximo(0.2).testes([
        teste("0 elevado a 0 não deve ser possível."   , () => operacoesBasicas("P",  0,  0  ), igual(NaN), testOk),
        teste("0 elevado a -1 não deve ser possível."  , () => operacoesBasicas("P",  0, -1  ), igual(NaN), testOk),
        teste("-1 elevado a 0.5 não deve ser possível.", () => operacoesBasicas("P", -1,  0.5), igual(NaN), testOk),
        teste("-3 elevado a 7.6 não deve ser possível.", () => operacoesBasicas("P", -3,  7.6), igual(NaN), testOk),
        teste("Divisão por zero não deve ser possível.", () => operacoesBasicas("D", 32,  0  ), igual(NaN), testOk),
        teste("0 / 0 não deve ser possível."           , () => operacoesBasicas("D",  0,  0  ), igual(NaN), testOk),
        teste("Operação Z que não existe deve voltar undefined."       , () => operacoesBasicas("Z"      , 1, 2), igual(undefined), testOk),
        teste("Operação d que não existe deve voltar undefined."       , () => operacoesBasicas("d"      , 3, 4), igual(undefined), testOk),
        teste("Operação s que não existe deve voltar undefined."       , () => operacoesBasicas("s"      , 5, 6), igual(undefined), testOk),
        teste("Operação Abacaxi que não existe deve voltar undefined." , () => operacoesBasicas("Abacaxi", 0, 8), igual(undefined), testOk),
        teste("Operação [branco] que não existe deve voltar undefined.", () => operacoesBasicas(""       , 7, 9), igual(undefined), testOk),
        teste("Operação @ que não existe deve voltar undefined."       , () => operacoesBasicas("@"      , 6, 1), igual(undefined), testOk),
        teste("Operação !#& que não existe deve voltar undefined."     , () => operacoesBasicas("!#&"    , 3, 0), igual(undefined), testOk)
    ]);

    // Exercícios 3.

    // Algumas classes bobas apenas para testarmos algo além dos tipos mais simples.
    class Abacaxi    {} // Sem toString aqui.
    class Laranja    {                                         toString() { return "laranja verde"; }}
    class Cliente    { constructor(nome) { this.nome = nome; } toString() { return this.nome;       }}
    class Fornecedor { constructor(nome) { this.nome = nome; } toString() { return this.nome;       }}
    class Uva        {                                         toString() { return "1";             }}

    // Criamos algumas instâncias dessas classes.
    const abcx1 = new Abacaxi(); // Temos um abacaxi aqui.
    const abcx2 = new Abacaxi(); // E um outro abacaxi aqui.
    const larnj = new Laranja();
    const uva   = new Uva();
    const rafa  = new Cliente("Rafaela");
    const pedro = new Cliente("Pedro");
    const xara  = new Cliente("Pedro");   // Homônimo do cara acima. Temos dois clientes chamados Pedro.
    const paula = new Fornecedor("Paula");
    const droga = "[E esse é um dos motivos pelo qual o == e o != são uma droga, prefira sempre o === e o !==]";

    grupo("Exercício 3", "Comparador básico").maximo(0.4).testes([
        teste("3 e 3 são estritamente iguais."                  , () => comparadorBasico(3    , 3    ), igual("Elemento 3 (number) é estritamente igual ao elemento 3 (number)."                      ), testOk),
        teste("undefined e undefined são estritamente iguais."  , () => comparadorBasico(            ), igual("Elemento undefined (undefined) é estritamente igual ao elemento undefined (undefined)."), testOk),
        teste('"ABC" e "ABC" são estritamente iguais.'          , () => comparadorBasico("ABC", "ABC"), igual("Elemento ABC (string) é estritamente igual ao elemento ABC (string)."                  ), testOk),
        teste('3 e "3" são equivalentes.'                       , () => comparadorBasico(3    , "3"  ), igual("Elemento 3 (number) é equivalente ao elemento 3 (string)."                             ), testOk),
        teste("null e undefined são equivalentes."              , () => comparadorBasico(null        ), igual("Elemento null (null) é equivalente ao elemento undefined (undefined)."                 ), testOk),
        teste("1 e 2 são diferentes."                           , () => comparadorBasico(1    , 2    ), igual("Elemento 1 (number) é diferente do elemento 2 (number)."                               ), testOk),
        teste('"1" e 2 são diferentes.'                         , () => comparadorBasico(  "1", 2    ), igual("Elemento 1 (string) é diferente do elemento 2 (number)."                               ), testOk),
        teste("Array e objeto são diferentes."                  , () => comparadorBasico([]   , {}   ), igual("Elemento  (Array) é diferente do elemento [object Object] (Object)."                   ), testOk),
        teste("Abacaxi e laranja são diferentes."               , () => comparadorBasico(abcx1, larnj), igual("Elemento [object Object] (Abacaxi) é diferente do elemento laranja verde (Laranja)."   ), testOk),
        teste("Cliente e fornecedor são diferentes."            , () => comparadorBasico(pedro, paula), igual("Elemento Pedro (Cliente) é diferente do elemento Paula (Fornecedor)."                  ), testOk),
        teste("Dois clientes diferentes são diferentes."        , () => comparadorBasico(pedro, rafa ), igual("Elemento Pedro (Cliente) é diferente do elemento Rafaela (Cliente)."                   ), testOk),
        teste("Um cliente é igual a si mesmo."                  , () => comparadorBasico(pedro, pedro), igual("Elemento Pedro (Cliente) é estritamente igual ao elemento Pedro (Cliente)."            ), testOk),
        teste("Dois clientes homônimos são diferentes."         , () => comparadorBasico(pedro, xara ), igual("Elemento Pedro (Cliente) é diferente do elemento Pedro (Cliente)."                     ), testOk),
        teste("Dois abacaxis são diferentes."                   , () => comparadorBasico(abcx1, abcx2), igual("Elemento [object Object] (Abacaxi) é diferente do elemento [object Object] (Abacaxi)." ), testOk),
        teste("true e false são diferentes."                    , () => comparadorBasico(true , false), igual("Elemento true (boolean) é diferente do elemento false (boolean)."                      ), testOk),
        teste("true e 1 são equivalentes."                      , () => comparadorBasico(true , 1    ), igual("Elemento true (boolean) é equivalente ao elemento 1 (number)."                         ), testOk),
        teste("true e 1 são equivalentes."                      , () => comparadorBasico(true , "1"  ), igual("Elemento true (boolean) é equivalente ao elemento 1 (string)."                         ), testOk),
        teste("false e 0 são equivalentes."                     , () => comparadorBasico(false, 0    ), igual("Elemento false (boolean) é equivalente ao elemento 0 (number)."                        ), testOk),
        teste("true e 2 são diferentes."                        , () => comparadorBasico(true , 2    ), igual("Elemento true (boolean) é diferente do elemento 2 (number)."                           ), testOk),

        // E eis aqui um forte motivo para nunca se usar == e != e sempre usar === e !==.
        teste(`Fornecedora Paula e nome Paula são equivalentes. ${droga}`, () => comparadorBasico(paula, "Paula"), igual("Elemento Paula (Fornecedor) é equivalente ao elemento Paula (string)."), testOk),
        teste(`Uva e true são equivalentes. ${droga}`                    , () => comparadorBasico(uva  ,   true ), igual("Elemento 1 (Uva) é equivalente ao elemento true (boolean)."           ), testOk)
    ]);

    // Exercícios 4 e 5.

    grupo("Exercício 4", "Primeiro nome").maximo(0.3).testes([
        teste("Yuri Dirickson deve retornar Yuri."   , () => primeiroNome("Yuri Dirickson"), igual("Yuri"   ), testOk),
        teste("Marina Silva deve retornar Marina."   , () => primeiroNome("Marina Silva"  ), igual("Marina" ), testOk),
        teste("Tatá Wernerck deve retornar Tatá."    , () => primeiroNome("Tatá"          ), igual("Tatá"   ), testOk),
        teste("Robson deve retornar Robson."         , () => primeiroNome("Robson"        ), igual("Robson" ), testOk),
        teste("Victor deve retornar Victor."         , () => primeiroNome("Victor"        ), igual("Victor" ), testOk),
        teste("Ana Júlia deve retornar Ana."         , () => primeiroNome("Ana Júlia"     ), igual("Ana"    ), testOk),
        teste("William Bonner deve retornar William.", () => primeiroNome("William Bonner"), igual("William"), testOk)
    ]);

    grupo("Exercício 5", "Nome abreviado").maximo(0.3).testes([
        teste("Yuri Dirickson deve retornar Yuri D."   , () => abreviadorNomes("Yuri Dirickson"), igual("Yuri D."   ), testOk),
        teste("Marina Silva deve retornar Marina S."   , () => abreviadorNomes("Marina Silva"  ), igual("Marina S." ), testOk),
        teste("Tatá Wernerck deve retornar Tatá W."    , () => abreviadorNomes("Tatá Wernerck" ), igual("Tatá W."   ), testOk),
        teste("Robson deve retornar Robson."           , () => abreviadorNomes("Robson"        ), igual("Robson"    ), testOk),
        teste("Victor deve retornar Victor."           , () => abreviadorNomes("Victor"        ), igual("Victor"    ), testOk),
        teste("Ana Júlia deve retornar Ana J."         , () => abreviadorNomes("Ana Júlia"     ), igual("Ana J."    ), testOk),
        teste("William Bonner deve retornar William B.", () => abreviadorNomes("William Bonner"), igual("William B."), testOk)
    ]);

    // Exercícios 6 e 7.

    const datasBoas = {
        "31/01/1975": "31 de Janeiro de 1975",
        "10/02/2219": "10 de Fevereiro de 2219",
        "28/03/1677": "28 de Março de 1677",
        "07/04/1944": "07 de Abril de 1944",
        "14/05/2001": "14 de Maio de 2001",
        "22/06/1789": "22 de Junho de 1789",
        "31/07/1821": "31 de Julho de 1821",
        "25/08/1982": "25 de Agosto de 1982",
        "12/09/2044": "12 de Setembro de 2044",
        "01/10/3566": "01 de Outubro de 3566",
        "04/11/1210": "04 de Novembro de 1210",
        "03/12/1777": "03 de Dezembro de 1777",
        "09/01/1500": "09 de Janeiro de 1500",
        "12/02/1989": "12 de Fevereiro de 1989",
        "24/03/2022": "24 de Março de 2022",
        "30/04/2020": "30 de Abril de 2020",
        "16/05/2090": "16 de Maio de 2090",
        "19/06/2051": "19 de Junho de 2051",
        "13/07/2030": "13 de Julho de 2030",
        "13/08/1967": "13 de Agosto de 1967",
        "13/09/1923": "13 de Setembro de 1923",
        "29/10/1848": "29 de Outubro de 1848",
        "30/11/1625": "30 de Novembro de 1625",
        "31/12/9999": "31 de Dezembro de 9999",
        "01/01/0001": "01 de Janeiro de 0001",
        "31/01/0001": "31 de Janeiro de 0001",
        "29/02/2024": "29 de Fevereiro de 2024",
        "29/02/1600": "29 de Fevereiro de 1600",
        "31/03/0001": "31 de Março de 0001",
        "31/05/2029": "31 de Maio de 2029",
        "31/07/2023": "31 de Julho de 2023",
        "31/08/1997": "31 de Agosto de 1997",
        "31/10/1453": "31 de Outubro de 1453"
    };

    const datasRuins = [
        "30/00/1756",
        "32/01/2023",
        "10/-1/1984",
        "10/13/1984",
        "00/04/1984",
        "99/99/9999",
        "-5/04/1928",
        "29/02/2023",
        "29/02/1900",
        "29/02/2100",
        "30/02/2023",
        "30/02/2024",
        "31/04/2023",
        "31/06/2023",
        "31/09/2023",
        "31/11/2023",
        "14-10-2023",
        "14.10.2023",
        "3/7/2023",
        "12/08/0000",
        "31/04/-001",
        "  /  /    ",
        " 1/ 1/  24",
        "10/10/2010 xxx",
        "abacaxi e pêra",
        "zoado",
        "WT/Fw/tfWTF",
        ""
    ];
    
    const testes6p1 = [];
    const testes7p1 = [];
    for (const ddMMyyyy in datasBoas) {
        const porExtenso = datasBoas[ddMMyyyy];
        testes6p1.push(teste(`A data ${ddMMyyyy} é válida.`, eval(`() => dataValida("${ddMMyyyy}")`), igual(true), testOk));
        testes7p1.push(teste(`A data ${ddMMyyyy} deve devolver ${porExtenso}.`, eval(`() => converteDataParaFormaCompleta("${ddMMyyyy}")`), igual(porExtenso), testOk));
    }

    const testes6p2 = [];
    const testes7p2 = [];
    for (const idx in datasRuins) {
        const ddMMyyyy = datasRuins[idx];
        testes6p2.push(teste(`A data ${ddMMyyyy} é inválida.`, eval(`() => dataValida("${ddMMyyyy}")`), igual(false), testOk));
        testes7p2.push(teste(`A data ${ddMMyyyy} é inválida.`, eval(`() => converteDataParaFormaCompleta("${ddMMyyyy}")`), igual("Data inválida"), testOk));
    }

    grupo("Exercício 6 - parte 1 (caminho feliz)"  , "Datas válidas").maximo(0.3).testes(testes6p1);
    grupo("Exercício 6 - parte 2 (caminho infeliz)", "Datas inválidas").maximo(0.3).testes(testes6p2);
    grupo("Exercício 7 - parte 1 (caminho feliz)"  , "Datas válidas por extenso").maximo(0.2).testes(testes7p1);
    grupo("Exercício 7 - parte 2 (caminho infeliz)", "Datas inválidas por extenso").maximo(0.1).testes(testes7p2);

    // Exercícios 8 ao 11.

    grupo("Exercício 8", "Somar pares").maximo(0.2).testes([
        teste("1 e 4 deve devolver 6."    , () => somadorPares(  1,  4), igual(  6), testOk),
        teste("2 e 9 deve devolver 20."   , () => somadorPares(  2,  9), igual( 20), testOk),
        teste("2 e 10 deve devolver 30."  , () => somadorPares(  2, 10), igual( 30), testOk),
        teste("1 e 10 deve devolver 30."  , () => somadorPares(  1, 10), igual( 30), testOk),
        teste("2 e 11 deve devolver 30."  , () => somadorPares(  2, 11), igual( 30), testOk),
        teste("1 e 11 deve devolver 30."  , () => somadorPares(  1, 11), igual( 30), testOk),
        teste("2 e 12 deve devolver 42."  , () => somadorPares(  2, 12), igual( 42), testOk),
        teste("1 e 3 deve devolver 2."    , () => somadorPares(  1,  3), igual(  2), testOk),
        teste("8 e 8 deve devolver 8."    , () => somadorPares(  8,  8), igual(  8), testOk),
        teste("3 e 3 deve devolver 0."    , () => somadorPares(  3,  3), igual(  0), testOk),
        teste("-20 e 20 deve devolver 0." , () => somadorPares(-20, 20), igual(  0), testOk),
        teste("-20 e 10 deve devolver 80.", () => somadorPares(-20, 10), igual(-80), testOk)
    ]);

    grupo("Exercício 9", "Achar o menor").maximo(0.2).testes([
        teste("Se o vetor estiver vazio, devolve undefined."  , () => acharMenor(Object.freeze([                            ])), igual(undefined), testOk),
        teste("Para [42] retorna 42."                         , () => acharMenor(Object.freeze([                          42])), igual(       42), testOk),
        teste("Para [1, 2, 3, 4, 5] retorna 1."               , () => acharMenor(Object.freeze([         1,   2,  3,   4,  5])), igual(        1), testOk),
        teste("Para [1, 2, 3, 4, 0] retorna 0."               , () => acharMenor(Object.freeze([         1,   2,  3,   4,  0])), igual(        0), testOk),
        teste("Para [1, 2, -3, 4, 0] retorna -3."             , () => acharMenor(Object.freeze([         1,   2, -3,   4,  0])), igual(       -3), testOk),
        teste("Para [42, 12, 21] retorna 12."                 , () => acharMenor(Object.freeze([                 42,  12, 21])), igual(       12), testOk),
        teste("Para [42, 12, 21, -27, 8, -22, 9] retorna -27.", () => acharMenor(Object.freeze([42, 12, 21, -27,  8, -22,  9])), igual(      -27), testOk)
    ]);

    grupo("Exercício 10", "Achar os pares").maximo(0.3).testes([
        teste("Se o vetor estiver vazio, devolve um vetor vazio.", () => acharPares(Object.freeze([               ])), bonitoIgual([           ]), testOk),
        teste("Para [1, 3, 5, 7, 9] retorna vazio."              , () => acharPares(Object.freeze([1, 3,  5,  7, 9])), bonitoIgual([           ]), testOk),
        teste("Para [1, 2, 3, 4, 5] retorna [2, 4]."             , () => acharPares(Object.freeze([1, 2,  3,  4, 5])), bonitoIgual([   2,  4   ]), testOk),
        teste("Para [1, 2, 3, 4, 0] retorna [2, 4, 0]."          , () => acharPares(Object.freeze([1, 2,  3,  4, 0])), bonitoIgual([   2,  4, 0]), testOk),
        teste("Para [1, 2, 3, -4, 0] retorna [2, -4, 0]."        , () => acharPares(Object.freeze([1, 2,  3, -4, 0])), bonitoIgual([   2, -4, 0]), testOk),
        teste("Para [6, 2, -3, -4, 0] retorna [6, 2, -4, 0]."    , () => acharPares(Object.freeze([6, 2, -3, -4, 0])), bonitoIgual([6, 2, -4, 0]), testOk),
        teste("Para [6, 2, 6, 2, 3] retorna [6, 2, 6, 2]."       , () => acharPares(Object.freeze([6, 2,  6,  2, 3])), bonitoIgual([6, 2,  6, 2]), testOk)
    ]);

    grupo("Exercício 11", "IMC").maximo(0.4).testes([
        teste('Deve devolver "Abaixo do peso" para IMC abaixo de 18,5.'                           , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:  50    , altura: 1.7  })), igual("Abaixo do peso"              ), testOk),
        teste('Deve devolver "Normal" para IMC a partir de 18,5 e abaixo de 25.'                  , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:  60    , altura: 1.7  })), igual("Normal"                      ), testOk),
        teste('Deve devolver "Excesso de peso" para IMC a partir de 25 e abaixo de 30.'           , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:  72.25 , altura: 1.7  })), igual("Excesso de peso"             ), testOk),
        teste('Deve devolver "Obesidade leve (Grau I)" para IMC a partir de 30 e abaixo de 35.'   , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:  86.7  , altura: 1.7  })), igual("Obesidade leve (Grau I)"     ), testOk),
        teste('Deve devolver "Obesidade severa (Grau II)" para IMC a partir de 35 e abaixo de 40.', () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 101.15 , altura: 1.7  })), igual("Obesidade severa (Grau II)"  ), testOk),
        teste('Deve devolver "Obesidade mórbida (Grau III)" para IMC a parte de 40.'              , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 160    , altura: 1.7  })), igual("Obesidade mórbida (Grau III)"), testOk),

        teste('Deve devolver "Abaixo do peso" para IMC abaixo de 18,5.'                           , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:   0    , altura: 2.0  })), igual("Abaixo do peso"              ), testOk),
        teste('Deve devolver "Abaixo do peso" para IMC abaixo de 18,5.'                           , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:  73.999, altura: 2.0  })), igual("Abaixo do peso"              ), testOk),
        teste('Deve devolver "Normal" para IMC a partir de 18,5 e abaixo de 25.'                  , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:  74    , altura: 2.0  })), igual("Normal"                      ), testOk),
        teste('Deve devolver "Normal" para IMC a partir de 18,5 e abaixo de 25.'                  , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:  99.999, altura: 2.0  })), igual("Normal"                      ), testOk),
        teste('Deve devolver "Excesso de peso" para IMC a partir de 25 e abaixo de 30.'           , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 100    , altura: 2.0  })), igual("Excesso de peso"             ), testOk),
        teste('Deve devolver "Excesso de peso" para IMC a partir de 25 e abaixo de 30.'           , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 119.999, altura: 2.0  })), igual("Excesso de peso"             ), testOk),
        teste('Deve devolver "Obesidade leve (Grau I)" para IMC a partir de 30 e abaixo de 35.'   , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 120    , altura: 2.0  })), igual("Obesidade leve (Grau I)"     ), testOk),
        teste('Deve devolver "Obesidade leve (Grau I)" para IMC a partir de 30 e abaixo de 35.'   , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 139.999, altura: 2.0  })), igual("Obesidade leve (Grau I)"     ), testOk),
        teste('Deve devolver "Obesidade severa (Grau II)" para IMC a partir de 35 e abaixo de 40.', () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 140    , altura: 2.0  })), igual("Obesidade severa (Grau II)"  ), testOk),
        teste('Deve devolver "Obesidade severa (Grau II)" para IMC a partir de 35 e abaixo de 40.', () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 159.999, altura: 2.0  })), igual("Obesidade severa (Grau II)"  ), testOk),
        teste('Deve devolver "Obesidade mórbida (Grau III)" para IMC a parte de 40.'              , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 160    , altura: 2.0  })), igual("Obesidade mórbida (Grau III)"), testOk),
        teste('Deve devolver "Obesidade mórbida (Grau III)" para IMC a parte de 40.'              , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 9999999, altura: 2.0  })), igual("Obesidade mórbida (Grau III)"), testOk),

        teste('Deve devolver "Abaixo do peso" para IMC abaixo de 18,5.'                           , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:   0    , altura: 0.5  })), igual("Abaixo do peso"              ), testOk),
        teste('Deve devolver "Abaixo do peso" para IMC abaixo de 18,5.'                           , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:   4.624, altura: 0.5  })), igual("Abaixo do peso"              ), testOk),
        teste('Deve devolver "Normal" para IMC a partir de 18,5 e abaixo de 25.'                  , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:   4.625, altura: 0.5  })), igual("Normal"                      ), testOk),
        teste('Deve devolver "Normal" para IMC a partir de 18,5 e abaixo de 25.'                  , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:   6.249, altura: 0.5  })), igual("Normal"                      ), testOk),
        teste('Deve devolver "Excesso de peso" para IMC a partir de 25 e abaixo de 30.'           , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:   6.25 , altura: 0.5  })), igual("Excesso de peso"             ), testOk),
        teste('Deve devolver "Excesso de peso" para IMC a partir de 25 e abaixo de 30.'           , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:   7.499, altura: 0.5  })), igual("Excesso de peso"             ), testOk),
        teste('Deve devolver "Obesidade leve (Grau I)" para IMC a partir de 30 e abaixo de 35.'   , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:   7.5  , altura: 0.5  })), igual("Obesidade leve (Grau I)"     ), testOk),
        teste('Deve devolver "Obesidade leve (Grau I)" para IMC a partir de 30 e abaixo de 35.'   , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:   8.749, altura: 0.5  })), igual("Obesidade leve (Grau I)"     ), testOk),
        teste('Deve devolver "Obesidade severa (Grau II)" para IMC a partir de 35 e abaixo de 40.', () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:   8.75 , altura: 0.5  })), igual("Obesidade severa (Grau II)"  ), testOk),
        teste('Deve devolver "Obesidade severa (Grau II)" para IMC a partir de 35 e abaixo de 40.', () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:   9.999, altura: 0.5  })), igual("Obesidade severa (Grau II)"  ), testOk),
        teste('Deve devolver "Obesidade mórbida (Grau III)" para IMC a parte de 40.'              , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso:  10    , altura: 0.5  })), igual("Obesidade mórbida (Grau III)"), testOk),
        teste('Deve devolver "Obesidade mórbida (Grau III)" para IMC a parte de 40.'              , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 9999999, altura: 0.5  })), igual("Obesidade mórbida (Grau III)"), testOk),

        teste('Deve devolver "Abaixo do peso" para IMC abaixo de 18,5.'                           , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 100    , altura: 9999 })), igual("Abaixo do peso"              ), testOk),
        teste('Deve devolver "Abaixo do peso" para IMC abaixo de 18,5.'                           , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 100    , altura: 2.33 })), igual("Abaixo do peso"              ), testOk),
        teste('Deve devolver "Normal" para IMC a partir de 18,5 e abaixo de 25.'                  , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 100    , altura: 2.32 })), igual("Normal"                      ), testOk),
        teste('Deve devolver "Normal" para IMC a partir de 18,5 e abaixo de 25.'                  , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 100    , altura: 2.01 })), igual("Normal"                      ), testOk),
        teste('Deve devolver "Excesso de peso" para IMC a partir de 25 e abaixo de 30.'           , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 100    , altura: 2.0  })), igual("Excesso de peso"             ), testOk),
        teste('Deve devolver "Excesso de peso" para IMC a partir de 25 e abaixo de 30.'           , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 100    , altura: 1.83 })), igual("Excesso de peso"             ), testOk),
        teste('Deve devolver "Obesidade leve (Grau I)" para IMC a partir de 30 e abaixo de 35.'   , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 100    , altura: 1.82 })), igual("Obesidade leve (Grau I)"     ), testOk),
        teste('Deve devolver "Obesidade leve (Grau I)" para IMC a partir de 30 e abaixo de 35.'   , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 100    , altura: 1.7  })), igual("Obesidade leve (Grau I)"     ), testOk),
        teste('Deve devolver "Obesidade severa (Grau II)" para IMC a partir de 35 e abaixo de 40.', () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 100    , altura: 1.69 })), igual("Obesidade severa (Grau II)"  ), testOk),
        teste('Deve devolver "Obesidade severa (Grau II)" para IMC a partir de 35 e abaixo de 40.', () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 100    , altura: 1.59 })), igual("Obesidade severa (Grau II)"  ), testOk),
        teste('Deve devolver "Obesidade mórbida (Grau III)" para IMC a parte de 40.'              , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 100    , altura: 1.58 })), igual("Obesidade mórbida (Grau III)"), testOk),
        teste('Deve devolver "Obesidade mórbida (Grau III)" para IMC a parte de 40.'              , () => calcularImc(Object.freeze({ nome: nomeAleatorio(), peso: 100    , altura: 0.01 })), igual("Obesidade mórbida (Grau III)"), testOk)
    ]);

    // Exercício 12.
    const testes12 = [
        ["Anunciação"                                 , ["Anunciação"                                                            ]],
        ["Alceu Valença"                              , ["Alceu", "Valença"                                                      ]],
        ["Na bruma leve das paixões que vêm de dentro", ["Na", "bruma", "leve", "das", "paixões", "que", "vêm", "de", "dentro"   ]],
        ["Tu vens chegando pra brincar no meu quintal", ["Tu", "vens", "chegando", "pra", "brincar", "no", "meu", "quintal"      ]],
        ["No teu cavalo peito nu cabelo ao vento"     , ["No", "teu", "cavalo", "peito", "nu", "cabelo", "ao", "vento"           ]],
        ["E o Sol quarando nossas roupas no varal"    , ["E", "o", "Sol", "quarando", "nossas", "roupas", "no", "varal"          ]],
        ["Tu vens Tu vens Eu já escuto os teus sinais", ["Tu", "vens", "Tu", "vens", "Eu", "já", "escuto", "os", "teus", "sinais"]],
        ["A voz do anjo sussurrou no meu ouvido"      , ["A", "voz", "do", "anjo", "sussurrou", "no", "meu", "ouvido"            ]],
        ["Eu não duvido já escuto os teus sinais"     , ["Eu", "não", "duvido", "já", "escuto", "os", "teus", "sinais"           ]],
        ["Que tu virias numa manhã de domingo"        , ["Que", "tu", "virias", "numa", "manhã", "de", "domingo"                 ]],
        ["Eu te anuncio nos sinos das catedrais"      , ["Eu", "te", "anuncio", "nos", "sinos", "das", "catedrais"               ]],
        [""                                           , [                                                                        ]],
        ["    "                                       , [                                                                        ]],
        ["  Ignore   palavras   que   forem   vazias ", ["Ignore", "palavras", "que", "forem", "vazias"                          ]],
    ];

    grupo("Exercício 12", "Palavras da frase").maximo(0.4).testes(
        testes12.map(par =>
            teste(`Testar a frase "${par[0]}".`, eval(`() => obterPalavras("${par[0]}")`), bonitoIgual(par[1]), testOk)
        )
    );

    // Exercícios 13 e 14.

    const rot13Str = [
        ["Eu vou resolver este exercício.", "Rh ibh erfbyire rfgr rkrepípvb."],
        ["Eu vou passar nesta disciplina.", "Rh ibh cnffne arfgn qvfpvcyvan."],
        ["Eu não vou reprovar.", "Rh aãb ibh ercebine."],
        ["O algoritmo para resolver o rot13 é molezinha!", "B nytbevgzb cnen erfbyire b ebg13 é zbyrmvaun!"],
        ["Wyvern não é um dragão.", "Jlirea aãb é hz qentãb."],
        ["Charizard também não é um dragão!", "Punevmneq gnzoéz aãb é hz qentãb!"],
        ["O nome verdadeiro do Goku é Kakaroto.", "B abzr ireqnqrveb qb Tbxh é Xnxnebgb."],
        ["Luke, I am your father!", "Yhxr, V nz lbhe sngure!"],
        ["A resposta é 42.", "N erfcbfgn é 42."],
        ["wingardium leviosa", "jvatneqvhz yrivbfn"],
        ["AVADA KEDAVRA!!!!!!!", "NINQN XRQNIEN!!!!!!!"],
        [
            "Dois hambúrgueres, alface, queijo, molho especial, cebola, picles, num pão com gergelim.",
            "Qbvf unzoúethrerf, nysnpr, dhrvwb, zbyub rfcrpvny, probyn, cvpyrf, ahz cãb pbz tretryvz."
        ],
        [
            "!#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_ªº§¹²³£¢¬`abcdefghijklmnopqrstuvwxyz{|}~",
            "!#$%&'()*+,-./0123456789:;<=>?@NOPQRSTUVWXYZABCDEFGHIJKLM[\]^_ªº§¹²³£¢¬`nopqrstuvwxyzabcdefghijklm{|}~"
        ]
    ];

    const acentos = "ãÃñÑáéíóúýÁÉÍÓÚÝàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛçÇäëïöüÄËÏÖÜ";
    const emojis = "😂👧🏻🐖🔺🔔❤️☠️👑🍰✝️⚗️🏴‍☠️😍😉";
    const estrangeiro = "نص عربي Русский текст 中文文本 日本語テキスト 한국어 텍스트 Ελληνικό κείμενο தமிழில் உரை नेपालीमा पाठ ಕನ್ನಡದಲ್ಲಿ ಪಠ್ಯ טקסט בעברית";

    grupo("Exercício 13", "ROT13").maximo(0.4).testes(
        rot13Str.flatMap(par => [
            teste(`Deve devolver "${par[1]}" para rot13("${par[0]}").`, eval(`() => rot13("${par[0]}")`), igual(par[1]), testOk),
            teste(`Deve devolver "${par[0]}" para rot13("${par[1]}").`, eval(`() => rot13("${par[1]}")`), igual(par[0]), testOk),
            teste(`Deve voltar para "${par[0]}" com rot13 duas vezes.`, eval(`() => rot13(rot13("${par[0]}"))`), igual(par[0]), testOk)
        ]).concat(["", acentos, emojis, estrangeiro].map(x =>
            teste(`Deve devolver igual para rot13("${x}")`, eval(`() => rot13("${x}")`), igual(x), testOk)
        ))
    );

    const fazRot13 = () => {
        const e = document.querySelector("#entra-rot13");
        e.value = "$$$$";
        e.oninput();
        return document.querySelector("#sai-rot13").value;
    };

    grupo("Exercício 14", "ROT13 no formulário").maximo(0.4).testes(
        rot13Str.flatMap(par => [
            teste(`Deve devolver "${par[1]}" para rot13("${par[0]}").`, eval(fazRot13.toString().replace("$$$$", par[0])), igual(par[1]), testOk),
            teste(`Deve devolver "${par[0]}" para rot13("${par[1]}").`, eval(fazRot13.toString().replace("$$$$", par[1])), igual(par[0]), testOk)
        ]).concat(["", acentos, emojis, estrangeiro].map(x =>
            teste(`Deve devolver igual para rot13("${x}")`, eval(`() => rot13("${x}")`), igual(x), testOk)
        ))
    );

    // Exercícios 15, 16 e 17.

    const triangulos = [
        ["Equilátero", 5   * 5   * Math.sqrt(3) / 4],
        ["Equilátero", 8   * 8   * Math.sqrt(3) / 4],
        ["Equilátero", 3.3 * 3.3 * Math.sqrt(3) / 4],
        ["Isósceles" , Math.sqrt(16    *  4    *  4    *   8  )],
        ["Isósceles" , Math.sqrt(16.4  *  4.4  *  4.4  *   7.6)],
        ["Isósceles" , Math.sqrt(15.5  *  2.5  *  2.5  *  10.5)],
        ["Escaleno"  , Math.sqrt( 4.5  *  0.5  *  1.5  *   2.5)],
        ["Escaleno"  , Math.sqrt( 3.25 *  0.25 *  0.75 *  2.25)],
        ["Escaleno"  , Math.sqrt( 7.4  *  0.2  *  2.3  *  4.9 )]
    ];
    for (const triangulo of triangulos) {
        triangulo[2] = triangulo[0] + "|" + triangulo[1];
    }
    
    function testeTrianguloFeliz(func, campo) {
        const compara = campo === 0 ? igual : campo === 1 ? igualComMargemDeErro : igualComposto;
        return [
            teste(`Deve devolver "${triangulos[0][campo]}" para 5, 5 e 5.`      , eval(`() => ${func}( 5  ,   5,  5  )`), compara(triangulos[0][campo]), testOk),
            teste(`Deve devolver "${triangulos[1][campo]}" para 8, 8 e 8.`      , eval(`() => ${func}( 8  ,   8,  8  )`), compara(triangulos[1][campo]), testOk),
            teste(`Deve devolver "${triangulos[2][campo]}" para 3.3, 3.3 e 3.3.`, eval(`() => ${func}( 3.3, 3.3,  3.3)`), compara(triangulos[2][campo]), testOk),
            teste(`Deve devolver "${triangulos[3][campo]}" para 12, 8 e 12.`    , eval(`() => ${func}(12  ,   8, 12  )`), compara(triangulos[3][campo]), testOk),
            teste(`Deve devolver "${triangulos[4][campo]}" para 12, 12 e 8.8.`  , eval(`() => ${func}(12  ,  12,  8.8)`), compara(triangulos[4][campo]), testOk),
            teste(`Deve devolver "${triangulos[5][campo]}" para 5, 13 e 13.`    , eval(`() => ${func}( 5  ,  13, 13  )`), compara(triangulos[5][campo]), testOk),
            teste(`Deve devolver "${triangulos[6][campo]}" para 4, 2 e 3.`      , eval(`() => ${func}( 4  ,   2,  3  )`), compara(triangulos[6][campo]), testOk),
            teste(`Deve devolver "${triangulos[7][campo]}" para 3, 2.5 e 1.`    , eval(`() => ${func}( 3  , 2.5,  1  )`), compara(triangulos[7][campo]), testOk),
            teste(`Deve devolver "${triangulos[8][campo]}" para 7.2, 2.5 e 5.1.`, eval(`() => ${func}( 7.2, 2.5,  5.1)`), compara(triangulos[8][campo]), testOk)
        ];
    }

    function testeTrianguloInfeliz(func, msg) {
        return [
            teste('Deve devolver "Não é um triângulo" para 7.2, 2.5 e 3.', eval(`() => ${func}( 7.2, 2.5,  3  )`), igual(msg), testOk),
            teste('Deve devolver "Não é um triângulo" para 1, 2 e 3.'    , eval(`() => ${func}( 1  , 2  ,  3  )`), igual(msg), testOk),
            teste('Deve devolver "Não é um triângulo" para 2, 2 e 4.'    , eval(`() => ${func}( 2  , 2  ,  4  )`), igual(msg), testOk),
            teste('Deve devolver "Não é um triângulo" para 2, 5 e 1.'    , eval(`() => ${func}( 2  , 5  ,  1  )`), igual(msg), testOk),
            teste('Deve devolver "Não é um triângulo" para 2, 2 e 0.'    , eval(`() => ${func}( 2  , 2  ,  0  )`), igual(msg), testOk),
            teste('Deve devolver "Não é um triângulo" para 0, 2 e 1.'    , eval(`() => ${func}( 0  , 2  ,  1  )`), igual(msg), testOk),
            teste('Deve devolver "Não é um triângulo" para 0, 2 e 0.'    , eval(`() => ${func}( 0  , 2  ,  0  )`), igual(msg), testOk),
            teste('Deve devolver "Não é um triângulo" para 0, 0 e 0.'    , eval(`() => ${func}( 0  , 0  ,  0  )`), igual(msg), testOk),
            teste('Deve devolver "Não é um triângulo" para -1, -1 e -1.' , eval(`() => ${func}(-1  ,-1  , -1  )`), igual(msg), testOk),
            teste('Deve devolver "Não é um triângulo" para 2, 2 e -1.'   , eval(`() => ${func}( 2  , 2  , -1  )`), igual(msg), testOk),
            teste('Deve devolver "Não é um triângulo" para 2, -2 e 5.'   , eval(`() => ${func}( 2  ,-2  ,  5  )`), igual(msg), testOk),
            teste('Deve devolver "Não é um triângulo" para -7, 8 e 2.'   , eval(`() => ${func}(-7  , 8  ,  2  )`), igual(msg), testOk),
            teste('Deve devolver "Não é um triângulo" para -5, -5 e -5.' , eval(`() => ${func}(-5  ,-5  , -5  )`), igual(msg), testOk),
            teste('Deve devolver "Não é um triângulo" para -5, -5 e 4.'  , eval(`() => ${func}(-5  ,-5  ,  4  )`), igual(msg), testOk),
            teste('Deve devolver "Não é um triângulo" para -3, -4 e 5.'  , eval(`() => ${func}(-3  ,-4  , -5  )`), igual(msg), testOk)
        ];
    }

    function testeTrianguloMuitoInfeliz() {
        return [
            teste('Deve devolver "Informe o número A corretamente." para entrada com letras no A.', () => informarLados("a",   5,   5), igual("Informe o número A corretamente."), testOk),
            teste('Deve devolver "Informe o número B corretamente." para entrada com letras no B.', () => informarLados(  5, "b",   5), igual("Informe o número B corretamente."), testOk),
            teste('Deve devolver "Informe o número C corretamente." para entrada com letras no C.', () => informarLados(  5,   5, "c"), igual("Informe o número C corretamente."), testOk),
            teste('Deve devolver "Informe o número A corretamente." para entrada vazia no A.'     , () => informarLados( "",   5,   5), igual("Informe o número A corretamente."), testOk),
            teste('Deve devolver "Informe o número B corretamente." para entrada vazia no B.'     , () => informarLados(  5,  "",   5), igual("Informe o número B corretamente."), testOk),
            teste('Deve devolver "Informe o número C corretamente." para entrada vazia no C.'     , () => informarLados(  5,   5,  ""), igual("Informe o número C corretamente."), testOk),
            teste(
                'Deve devolver "Informe o número A corretamente." para entrada com palavras.',
                () => informarLados("Willy Wonka - Rachadinha de chocolate com laranja", "Tonho da Lua - Senhor dos exércitos de robôs", "Dudu Bananinha - Sheik chapeiro"),
                igual("Informe o número A corretamente."),
                testOk
            )
        ];
    }

    function informarLados(a, b, c) {
        document.querySelector("#tipoTriangulo").value = "ERRADO ERRADO ERRADO";
        document.querySelector("#areaTriangulo").value = "ERRADO ERRADO ERRADO";
        document.querySelector("#ladoA").value = "" + a;
        document.querySelector("#ladoB").value = "" + b;
        document.querySelector("#ladoC").value = "" + c;
        let resultado = "", crash = null;
        const bt = document.querySelector("#botaoTriangulo"), oldClick = bt.onclick;
        bt.onclick = function() {
            try {
                oldClick();
                resultado = document.querySelector("#tipoTriangulo").value;
                let r2 = document.querySelector("#areaTriangulo").value;
                if (r2 !== "") resultado += "|" + r2;
            } catch (e) {
                crash = e;
            }
        };
        bt.click();
        bt.onclick = oldClick;
        limparForm17();
        if (crash) throw crash;
        return resultado;
    }

    grupo("Exercício 15 - parte 1 (caso feliz - é um triângulo)"   , "Tipo de triângulo - equilátero, isósceles e escaleno")
            .maximo(0.3).testes(testeTrianguloFeliz  ("tipoTriangulo", 0));
    grupo("Exercício 15 - parte 2 (caso infeliz - não é triângulo)", "Tipo de triângulo - não é um triângulo")
            .maximo(0.3).testes(testeTrianguloInfeliz("tipoTriangulo", "Não é um triângulo"));

    grupo("Exercício 16 - parte 1 (caso feliz - é um triângulo)"   , "Área do triângulo - é triângulo")
            .maximo(0.3).testes(testeTrianguloFeliz  ("areaTriangulo", 1));
    grupo("Exercício 16 - parte 2 (caso infeliz - não é triângulo)", "Área do triângulo - não é um triângulo")
            .maximo(0.1).testes(testeTrianguloInfeliz("areaTriangulo", undefined));

    grupo("Exercício 17 - parte 1 (caso feliz - é um triângulo)"          , "Tipo de triângulo no formulário - equilátero, isósceles e escaleno")
            .maximo(0.2).testes(testeTrianguloFeliz  ("informarLados", 2));
    grupo("Exercício 17 - parte 2 (caso infeliz - não é triângulo)"       , "Tipo de triângulo no formulário - não é um triângulo")
            .maximo(0.2).testes(testeTrianguloInfeliz("informarLados", "Não é um triângulo"));
    grupo("Exercício 17 - parte 3 (caso muito infeliz - entrada inválida)", "Tipo de triângulo no formulário - usuário preencheu o formulário com porcaria")
            .maximo(0.2).testes(testeTrianguloMuitoInfeliz()        );

    // Exercícios 18 a 21.

    const naipes = Object.freeze(["♢", "♣", "♡", "♠"]);
    const valores = Object.freeze(["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]);

    function fazerEmbaralhamentos() {
        const baralhoOrdenado = Object.freeze(naipes.flatMap(n => valores.map(v => `${v}-${n}`)));
        const CARTAS_NA_MAO = 5;
        const MIN_JOGADORES = 2;
        const MAX_JOGADORES = 7;
        const POSSIVEIS_MESAS = MAX_JOGADORES - MIN_JOGADORES + 1;
        let nJogadores = MIN_JOGADORES;
        const resposta = [];

        for (let i = 0; i < 30; i++) {
            const b = i <     POSSIVEIS_MESAS ? [...baralhoOrdenado]
                    : i < 2 * POSSIVEIS_MESAS ? [...baralhoOrdenado].reverse()
                    : random.embaralhar([...baralhoOrdenado]);
            const estaMao = {baralho: b, resto: b.slice(nJogadores * CARTAS_NA_MAO), as: null, temReal: true, jogadores: []};
            resposta.push(estaMao);

            for (let j = 0; j < nJogadores; j++) {
                let meuNome;
                do {
                    meuNome = nomeAleatorio();
                } while (estaMao.jogadores.map(j => j.semCartas.nome).includes(meuNome));
                const jogador = {
                    semCartas: {nome: meuNome, cartas: []},
                    comCartas: {nome: meuNome, cartas: []}
                };
                estaMao.jogadores.push(jogador);
                let jogadorTemReal = false;
                for (let k = 0; k < CARTAS_NA_MAO; k++) {
                    const carta = b[k * nJogadores + j];
                    if (carta === "A-♢") estaMao.as = meuNome;
                    if (["J", "Q", "K"].includes(carta.split("-")[0])) jogadorTemReal = true;
                    jogador.comCartas.cartas.push(b[k * nJogadores + j]);
                }
                if (!jogadorTemReal) estaMao.temReal = false;
                const ord = jogador.comCartas.cartas.map(c => c.split("-")[0]).sort();
            }
            nJogadores = ((nJogadores - 1) % POSSIVEIS_MESAS) + MIN_JOGADORES;
        }
        return Object.freeze(resposta);
    }

    const embaralhamentos = fazerEmbaralhamentos();
    const maosComTrincas = [];
    const maosSemTrincas = [];

    // 30 trincas
    for (let i = 0; i < 30; i++) {
        const valoresMao = random.embaralhar([...valores]);
        const naipeTrinca = random.embaralhar([...naipes]);
        const naipeOutro1 = random.sortear(naipes);
        const naipeOutro2 = random.sortear(naipes);
        const mao = [
            `${valoresMao[0]}-${naipeTrinca[0]}`,
            `${valoresMao[0]}-${naipeTrinca[1]}`,
            `${valoresMao[0]}-${naipeTrinca[2]}`,
            `${valoresMao[1]}-${naipeOutro1}`,
            `${valoresMao[2]}-${naipeOutro2}`,
        ];
        maosComTrincas.push(random.embaralhar(mao));
    }

    // 15 full houses
    for (let i = 0; i < 15; i++) {
        const valoresMao = random.embaralhar([...valores]);
        const naipeTrinca = random.embaralhar([...naipes]);
        const naipePar = random.embaralhar([...naipes]);
        const mao = [
            `${valoresMao[0]}-${naipeTrinca[0]}`,
            `${valoresMao[0]}-${naipeTrinca[1]}`,
            `${valoresMao[0]}-${naipeTrinca[2]}`,
            `${valoresMao[1]}-${naipePar[0]}`,
            `${valoresMao[1]}-${naipePar[1]}`,
        ];
        maosComTrincas.push(random.embaralhar(mao));
    }

    // 10 quadras
    for (let i = 0; i < 10; i++) {
        const valoresMao = random.embaralhar([...valores]);
        const naipeOutro = random.sortear(naipes);
        const mao = [
            `${valoresMao[0]}-♢`,
            `${valoresMao[0]}-♣`,
            `${valoresMao[0]}-♡`,
            `${valoresMao[0]}-♠`,
            `${valoresMao[1]}-${naipeOutro}`,
        ];
        maosComTrincas.push(random.embaralhar(mao));
    }

    // 30 pares
    for (let i = 0; i < 30; i++) {
        const valoresMao = random.embaralhar([...valores]);
        const naipePar = random.embaralhar([...naipes]);
        const naipeOutro1 = random.sortear(naipes);
        const naipeOutro2 = random.sortear(naipes);
        const naipeOutro3 = random.sortear(naipes);
        const mao = [
            `${valoresMao[0]}-${naipePar[0]}`,
            `${valoresMao[0]}-${naipePar[1]}`,
            `${valoresMao[1]}-${naipeOutro1}`,
            `${valoresMao[2]}-${naipeOutro2}`,
            `${valoresMao[3]}-${naipeOutro3}`,
        ];
        maosSemTrincas.push(random.embaralhar(mao));
    }

    // 20 pares duplos
    for (let i = 0; i < 20; i++) {
        const valoresMao = random.embaralhar([...valores]);
        const naipePar1 = random.embaralhar([...naipes]);
        const naipePar2 = random.embaralhar([...naipes]);
        const naipeOutro = random.sortear(naipes);
        const mao = [
            `${valoresMao[0]}-${naipePar1[0]}`,
            `${valoresMao[0]}-${naipePar1[1]}`,
            `${valoresMao[1]}-${naipePar2[0]}`,
            `${valoresMao[1]}-${naipePar2[0]}`,
            `${valoresMao[2]}-${naipeOutro}`,
        ];
        maosSemTrincas.push(random.embaralhar(mao));
    }

    // 50 mãos sem repetição
    for (let i = 0; i < 50; i++) {
        const valoresMao = random.embaralhar([...valores]);
        const naipesMao1 = random.sortear(naipes);
        const naipesMao2 = random.sortear(naipes);
        const naipesMao3 = random.sortear(naipes);
        const naipesMao4 = random.sortear(naipes);
        const naipesMao5 = random.sortear(naipes);
        const mao = [
            `${valoresMao[0]}-${naipesMao1}`,
            `${valoresMao[1]}-${naipesMao2}`,
            `${valoresMao[2]}-${naipesMao3}`,
            `${valoresMao[3]}-${naipesMao4}`,
            `${valoresMao[4]}-${naipesMao5}`,
        ];
        maosSemTrincas.push(random.embaralhar(mao));
    }
    Object.freeze(maosComTrincas);
    Object.freeze(maosSemTrincas);

    const fazEx18 = () => {
        const b = 1111;
        const j = 2222;
        distribuirCartas(b, j);
        return JSONbonito({jogadores: j, sobrou: b});
    };

    grupo("Exercício 18", "Distribuir cartas").maximo(0.6).testes(embaralhamentos.map(
        (mao, i) => teste(
            `Deve distribuir corretamente [${i + 1}].`,
            eval(fazEx18.toString().replace("1111", JSONbonito(mao.baralho)).replace("2222", JSONbonito(mao.jogadores.map(j => j.semCartas)))),
            igual(JSONbonito({jogadores: mao.jogadores.map(j => j.comCartas), sobrou: mao.resto})),
            testOk
        )
    ));

    grupo("Exercício 19", "Encontrar o ás de ouros").maximo(0.2).testes(embaralhamentos.map(
        (mao, i) => teste(
            `Deve descobrir quem tem o ás de ouros [${i + 1}].`,
            eval(`() => asDeOuros(${JSONbonito(mao.jogadores.map(j => j.comCartas))})`),
            igual(mao.as),
            testOk
        )
    ));

    grupo("Exercício 20", "Descobrir se todos os jogadores têm cartas reais").maximo(0.4).testes(embaralhamentos.map(
        (mao, i) => teste(
            `Deve descobrir se todos os jogadores têm cartas reais [${i + 1}].`,
            eval(`() => todosTemCartasReais(${JSONbonito(mao.jogadores.map(j => j.comCartas))})`),
            igual(mao.temReal),
            testOk
        )
    ));

    grupo("Exercício 21 - Parte 1", "Descobrir que há uma trinca num grupo de cartas").maximo(0.3).testes(
        maosComTrincas.map((mao, idx) =>
            teste(
                `Deve descobrir que há uma trinca em ${JSONbonito(mao)} - [${idx + 1}].`,
                eval(`() => existeTrinca(${JSONbonito(mao)})`),
                igual(true),
                testOk
            )
        )
    );

    grupo("Exercício 21 - Parte 2", "Descobrir que não há uma trinca num grupo de cartas").maximo(0.3).testes(
        maosSemTrincas.map((mao, idx) =>
            teste(
                `Deve descobrir que não há uma trinca em ${JSONbonito(mao)} - [${idx + 1}].`,
                eval(`() => existeTrinca(${JSONbonito(mao)})`),
                igual(false),
                testOk
            )
        )
    );

    const teste22 = [
        [
            "",
            {}
        ],
        [
            "            ",
            {}
        ],
        [
            "  ignore      espaços    em      branco     em    excesso     ",
            {ignore: 1, espaços: 1, em: 2, branco: 1, excesso: 1}
        ],
        [
            "javascript",
            {javascript: 1}
        ],
        [
            "vai dar certo",
            {vai: 1, dar: 1, certo: 1}
        ],
        [
            "um elefante incomoda muita gente dois elefantes incomodam incomodam muito mais três elefantes incomodam muita gente quatro elefantes incomodam incomodam incomodam incomodam muito mais",
            {um: 1, elefante: 1, incomoda: 1, muita: 2, gente: 2, dois: 1, elefantes: 3, incomodam: 7, muito: 2, mais: 2, três: 1, quatro: 1}
        ],
        [
            "pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa pa", // Letra oficial da música tema do programa Esporte Espetacular
            {pa: 29}
        ],
        [
            "Será só imaginação Será que nada vai acontecer Será que é tudo isso em vão Será que vamos conseguir vencer ô ô ô ô ô ô",
            {será: 4, só: 1, imaginação: 1, que: 3, nada: 1, vai: 1, acontecer: 1, é: 1, tudo: 1, isso: 1, em: 1, vão: 1, vamos: 1, conseguir: 1, vencer: 1, ô: 6}
        ],
        [
            "O doce perguntou ao doce qual é o doce mais doce e o doce respondeu ao doce que o doce mais doce é o doce de batata doce",
            {o: 5, doce: 10, perguntou: 1, ao: 2, qual: 1, é: 2, mais: 2, e: 1, respondeu: 1, que: 1, de: 1, batata: 1}
        ],
        [
            "OI EU SOU O DOLLYNHO SEU AMIGUINHO Vamos cantar Dolly Dolly Guaraná Dolly o melhor Dolly Guaraná o sabor brasileiro dolly dolly guaraná dolly DOLLY GUARANÁ DoLlY gUArAnÁ Dolly DOLLY dOLLy DollY",
            {oi: 1, eu: 1, sou: 1, o: 3, dollynho: 1, seu: 1, amiguinho: 1, vamos: 1, cantar: 1, dolly: 13, guaraná: 5, melhor: 1, sabor: 1, brasileiro: 1}
        ],
        [
            "Nós somos os borg você será assimilado resistir é fútil",
            {nós: 1, somos: 1, os: 1, borg: 1, você: 1, será: 1, assimilado: 1, resistir: 1, é: 1, fútil: 1}
        ]
    ];

    // Exercício 22.
    grupo("Exercício 22", "Contar palavras").maximo(0.4).testes(
        teste22.map(item => teste(item[0], eval(`() => contarPalavras("${item[0]}")`), bonitoIgual(item[1]), testOk))
    );

    // Exercício 23.
    const φ  = (1 + Math.sqrt(5)) / 2; // φ = Proporção áurea.
    const R2 = Math.sqrt(2);
    grupo("Exercício 23", "Fórmula de Bhaskara").maximo(0.4).testes([
        teste("1, -2 e 0 deve devolver [0, 2]."     , () => bhaskara(  1,  -2,   0), bonitoIgual([ 0,    2]), testOk),
        teste("1, 5 e -14 deve devolver [-7, 2]."   , () => bhaskara(  1,   5, -14), bonitoIgual([-7,    2]), testOk),
        teste("-1, 1 e 12 deve devolver [-3, 4]."   , () => bhaskara( -1,   1,  12), bonitoIgual([-3,    4]), testOk),
        teste("3, 2 e -8 deve devolver [-2, 4/3]."  , () => bhaskara(  3,   2,  -8), bonitoIgual([-2,  4/3]), testOk),
        teste("1, -1, 1 deve devolver []."          , () => bhaskara(  1,  -1,   1), bonitoIgual([        ]), testOk),
        teste("1, 4, 20 deve devolver []."          , () => bhaskara(  1,   4,  20), bonitoIgual([        ]), testOk),
        teste("-1, 2 e 3 deve devolver [-1, 3]."    , () => bhaskara( -1,   2,   3), bonitoIgual([-1,    3]), testOk),
        teste("4, 6 e 2 deve devolver [-1, -1/2]."  , () => bhaskara(  4,   6,   2), bonitoIgual([-1, -1/2]), testOk),
        teste("1/2, 5 e 12 deve devolver [-6, -4]." , () => bhaskara(1/2,   5,  12), bonitoIgual([-6,   -4]), testOk),
        teste("1, -1 e -2 deve devolver [-1, 2]."   , () => bhaskara(  1,  -1,  -2), bonitoIgual([-1,    2]), testOk),
        teste("0, 4 e 3 deve devolver undefined."   , () => bhaskara(  0,   4,   3),       igual(undefined ), testOk),
        teste("0, -7 e 1 deve devolver undefined."  , () => bhaskara(  0,  -7,   1),       igual(undefined ), testOk),
        teste("0, 0 e 0 deve devolver undefined."   , () => bhaskara(  0,   0,   0),       igual(undefined ), testOk),
        teste("1, 0 e 0 deve devolver [0, 0]."      , () => bhaskara(  1,   0,   0), bonitoIgual([ 0,    0]), testOk),
        teste("1, 1 e 1 deve devolver []."          , () => bhaskara(  1,   1,   1), bonitoIgual([        ]), testOk),
        teste("1, 2 e -15 deve devolver [-5, 3]."   , () => bhaskara(  1,   2, -15), bonitoIgual([-5,    3]), testOk),
        teste("1, 1 e -90 deve devolver [-10, 9]."  , () => bhaskara(  1,   1, -90), bonitoIgual([-10,   9]), testOk),
        teste("2, -7 e 3 deve devolver [1/2, 3]."   , () => bhaskara(  2,  -7,   3), bonitoIgual([1/2,   3]), testOk),
        teste("5, -80 e 0 deve devolver [0, 16]."   , () => bhaskara(  5, -80,   0), bonitoIgual([  0,  16]), testOk),
        teste("5, -80 e 75 deve devolver [1, 15]."  , () => bhaskara(  5, -80,  75), bonitoIgual([  1,  15]), testOk),
        teste("-1, 16 e -60 deve devolver [6, 10]." , () => bhaskara( -1,  16, -60), bonitoIgual([  6,  10]), testOk),
        teste("1, -1 e -1 deve devolver [1 - φ, φ].", () => bhaskara(  1,  -1,  -1), bonitoIgual([1-φ,   φ]), testOk),
        teste("1, 0 e -2 deve devolver [-√2, √2]."  , () => bhaskara(  1,   0,  -2), bonitoIgual([-R2,  R2]), testOk)
    ]);

    // Exercício 24.
    class Campeonato {
        #times;
        #classificacao;

        constructor() {
            "use strict";
            const nomeTimes = [
                "América Mineiro", "Atlhetico Paranaense", "Atlético Mineiro", "Bahia", "Botafogo",
                "Corinthians", "Coritiba", "Cruzeiro", "Cuiabá", "Flamengo",
                "Fluminense", "Fortaleza", "Goiás", "Grêmio", "Internacional",
                "Palmeiras", "Red Bull Bragantino", "Santos", "São Paulo", "Vasco"
            ];
            this.#times = {}
            nomeTimes.forEach(time => this.#times[time] = {vitorias: 0, empates: 0, derrotas: 0, "saldo-de-gols": 0});
            for (const time1 of nomeTimes) {
                for (const time2 of nomeTimes) {
                    if (time1 === time2) continue;
                    const gols1 = random.nextInt(0, 6);
                    const gols2 = random.nextInt(0, 6);
                    this.#times[time1]["saldo-de-gols"] += gols1 - gols2;
                    this.#times[time2]["saldo-de-gols"] += gols2 - gols1;
                    if (gols1 > gols2) {
                        this.#times[time1].vitorias++;
                        this.#times[time2].derrotas++;
                    } else if (gols2 > gols1) {
                        this.#times[time2].vitorias++;
                        this.#times[time1].derrotas++;
                    } else {
                        this.#times[time1].empates++;
                        this.#times[time2].empates++;
                    }
                }
            }
            this.#classificacao = [...nomeTimes].sort((time1, time2) => {
                const pontos1 = 3 * this.#times[time1].vitorias + this.#times[time1].empates;
                const pontos2 = 3 * this.#times[time2].vitorias + this.#times[time2].empates;
                const saldo1 = this.#times[time1]["saldo-de-gols"];
                const saldo2 = this.#times[time2]["saldo-de-gols"];
                if (pontos1 !== pontos2) return pontos1 - pontos2;
                if (saldo1 !== saldo2) return saldo1 - saldo2;
                if (time1 > time2) return 1;
                if (time1 < time2) return -1;
                return 0;
            });
            //Object.freeze(this);
        }

        get times() {
            return this.#times;
        }

        get classificacao() {
            return this.#classificacao;
        }
    }
    Object.freeze(Campeonato.prototype);

    function montarCampeonatos() {
        const campeonatos = [];
        for (let i = 0; i < 50; i++) {
            campeonatos.push(new Campeonato());
        }
        return Object.freeze(campeonatos);
    }

    grupo("Exercício 24", "Classificação do campeonato").maximo(0.5).testes(
        montarCampeonatos().map((camp, idx) =>
            teste(
                `Classificação do campeonato [${idx + 1}]`,
                eval(`() => classificacao(${JSONbonito(camp.times)})`),
                bonitoIgual(camp.classificacao),
                testOk
            )
        )
    );

    // Exercício 25.
    const errado = [
        "Eu vou entregar por meio do One Drive.",
        "Eu vou entregar por meio do Google Drive.",
        "Eu vou entregar por e-mail.",
        "Eu vou entregar um CD com o código para o professor.",
        "Eu vou entregar um pen-drive com o código para o professor.",
        "Eu vou entregar pelo WhatsApp.",
        "Eu vou entregar pelo Telegram.",
        "Eu vou entregar pelo MediaFire.",
        "Eu vou imprimir o código e entregar em papel pro professor.",
        "Eu vou tirar uma foto do código e entregar essa foto.",
        "Eu vou mandar um áudio no WhatsApp do professor onde eu leio e falo todo o código.",
        "Eu vou entregar o código em PDF.",
        "Eu vou entregar pelos correios.",
        "Eu não vou entregar nada.",
        "Eu vou entregar o meu arquivo ado1.js junto com outros arquivos.",
        "Eu vou entregar o meu arquivo ado1-teste.js que eu alterei.",
        "Eu vou entregar o meu arquivo ado1-teste.js junto com outros arquivos.",
        "Eu vou entregar o meu arquivo testefw.js que eu alterei.",
        "Eu vou entregar o meu arquivo testefw.js junto com outros arquivos.",
        "Eu vou entregar o meu arquivo ado1.html que eu alterei e nada mais.",
        "Eu vou entregar o meu arquivo ado1.html junto com outros arquivos.",
        "Eu vou entregar o meu arquivo ado1.css que eu alterei e nada mais.",
        "Eu vou entregar o meu arquivo ado.css junto com outros arquivos.",
        "Eu vou entregar o meu arquivo hot-xxx-video.mp4 que eu baixei e nada mais.",
        "Eu vou invadir e quebrar tudo exigindo intervenção militar até o professor me dar a nota que eu quero.",
        "Eu vou falar com extraterrestres e rezar para pneus.",
        "Eu vou entregar um arquivo RAR.",
        "Eu vou pegar uma arma, sequestrar o professor e assim ele vai ter que me dar nota.",
        "Eu vou arrumar uns quinhentos reais, mostrar a grana para o professor e perguntar se ele está a fim de negociar a nota.",
        "Eu vou xingar o professor, ameaçar processar ele e reclamar na imprensa até ele me dar a nota que eu quero.",
        "Oi, eu sou o Dollynho, seu amiguinho.",
        "Vai querer o combo ou só o lanche? Acompanha McFritas para a viagem?",
        ""
                + "We don't need no validation. / "
                + "We don't need no version control. / "
                + "No dark sarcasm in the comments. / "
                + "Bugs leave my code alone. / "
                + "HEY, BUGS, LEAVE MY CODE ALONE. / "
                + "All in all, it's just another gambi in the code. / "
                + "All in all, you're just a huge gambi in the code.",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ];

    const correto = [
        "Eu vou entregar o meu arquivo ado1.js que eu alterei e nada mais.",
        "Eu vou fazer no Git e enviar o link para o professor.",
    ];

    const testes25 = [];
    for (let i = 1; i <= 12; i++) {
        const copia = errado.concat(correto);
        const bagunca = random.embaralhar(copia);
        const resposta = [];
        for (let i = 0; i < bagunca.length; i++) {
            if (bagunca[i] === correto[0] || bagunca[i] === correto[1]) resposta.push(i);
        }
        testes25.push(
            teste(
                `Deve achar a melhor forma de entregar [${i}].`,
                eval(`() => comoFazerEntrega(${JSON.stringify(bagunca).replaceAll(',"', ', "')})`),
                bonitoIgual(resposta),
                testOk
            )
        );
    }

    grupo("Exercício 25", "Entrega").naoFracionado.maximo(0.4).testes(testes25);
});