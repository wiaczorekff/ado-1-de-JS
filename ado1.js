"use strict";

// EXERCÍCIO 0 - ANTES DE MAIS NADA, IMPLEMENTE ESTA FUNÇÃO.
/**
 * Função que retorna um Array contendo os nomes dos alunos que fizeram este exercício.
 * @return {string[]} Os nomes dos alunos que fizeram este exercício.
 */
function nomesDosAlunos() {
    return [ "Felipe Aragão", "Pedro Almeida" ];
}

// Observe esses dois exemplos. O que vocês têm que desenvolver são funções semelhantes a essas.
// São funções que recebem alguns parâmetros fazem alguma coisa com esses parâmetros e retornam
// alguma coisa. Nada de variáveis globais ou código fora das funções.
// Ah, e não bagunce esses exemplos!

// EXEMPLO 1.
/**
 * Função que recebe dois números e retorna o maior deles.
 * @param {number} a O primeiro número.
 * @param {number} b O segundo número.
 * @return {number} O resultado da operação.
 */
function maiorDosDois(a, b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

// EXEMPLO 2.
/**
 * Função que recebe dois números e retorna o maior deles.
 * @param {number} a O primeiro número.
 * @param {number} b O segundo número.
 * @return {number} O resultado da operação.
 */
function maiorDosDoisSimplificado(a, b) {
    return a > b ? a : b;
}

// Implemente as funções abaixo, conforme pede o enunciado.
// Carregue o arquivo ado1.html para ver os resultados e a sua nota.

// EXERCÍCIO 1.
/**
 * Função que recebe quatro números e retorna o maior deles.
 * @param {number} a O primeiro número.
 * @param {number} b O segundo número.
 * @param {number} c O terceiro número.
 * @param {number} d O quarto número.
 * @return {number} O resultado da operação.
 */
function maiorDosQuatro(a, b, c, d) {
     let maior = a;
        if (b > maior) {
          maior = b;
        }
        if (c > maior) {
          maior = c;
        }
        if (d > maior) {
          maior = d;
        }
        return maior; 
}

// EXERCÍCIO 2.
/**
 * Função que recebe uma operação em formato de texto e devolve o resultado desta operação com os dois números passados,
 * na ordem em que eles foram passados. (Use as funções do Math se necessário).
 *
 * As operações são identificadas da seguinte maneira:
 *  - A: Adição - Soma numero1 com numero2
 *  - S: Subtração - Subtrai numero2 do numero1
 *  - M: Multiplicação - Multiplica numero1 com numero2
 *  - D: Divisão - Divide numero1 pelo numero2
 *  - P: Potência - Eleva o numero1 pelo numero2
 *
 * Verifique onde é possível fazer a operação.
 * Nos casos em que não for definido, retornar NaN (not-a-number). São esses os casos:
 *  - Divisão por zero
 *  - Zero elevado a zero
 *  - Zero elevado a número negativo
 *  - Número negativo elevado a potência não-inteira
 *
 * Se a operação passada não for uma das letras acima, retornar undefined.
 * Ah, as letras sempre devem ser maiúsculas. Em caso de minúsculas (ou símbolos, ou palavras com várias letras,
 * ou qualquer outra coisa), retorne undefined também.
 *
 * @param {string} operacao A letra que identifica a operação a ser realizada.
 * @param {number} numero1 O primeiro operando.
 * @param {number} numero2 O segundo operando.
 * @return {number} O resultado da operação.
 */
function operacoesBasicas(operacao, numero1, numero2) {
        switch (operacao) {
          case "A":
            return numero1 + numero2;
          case "S":
            return numero1 - numero2;
          case "M":
            return numero1 * numero2;
          case "D":
            if (numero2 === 0) {
              return NaN;
            }
            return numero1 / numero2;
          case "P":
            if (numero1 === 0 && numero2 === 0) {
              return NaN;
            }
            if (numero1 === 0 && numero2 < 0) {
              return NaN;
            }
            if (numero1 < 0 && !Number.isInteger(numero2)) {
              return NaN;
            }
            return Math.pow(numero1, numero2);
          default:
            return undefined;
        }
      }
      
    


// EXERCÍCIO 3.
/**
 * Escreva uma função que recebe dois elementos e retorna uma mensagem dizendo se eles são estritamente iguais,
 * equivalentes ou diferentes, com o seu tipo entre parênteses logo após o valor.
 *
 * Seguem os exemplos:
 *   - comparadorBasico(2, 1): "Elemento 2 (number) é diferente do elemento 1 (number)."
 *   - comparadorBasico("ABC", "ABC"): "Elemento ABC (string) é estritamente igual ao elemento ABC (string)."
 *   - comparadorBasico("2", 2): "Elemento 2 (string) é equivalente ao elemento 2 (number)."
 *   - comparadorBasico(new Cliente(), new Fornecedor()): "Elemento [object Object] (Cliente) é diferente do elemento [object Object] (Fornecedor)."
 *
 * Dica: Use a função auxiliar determinarTipo que está no arquivo utils.js.
 *
 * @param {*} elemento1 O primeiro operando.
 * @param {*} elemento2 O segundo operando.
 * @return {string} A mensagem com o resultado da comparação.
 */
function comparadorBasico(elemento1, elemento2) {

    
    
        const tipo1 = determinarTipo(elemento1);
        const tipo2 = determinarTipo(elemento2);
    
      if (elemento1 === elemento2) 
      {
        return `Elemento ${elemento1} (${tipo1}) é estritamente igual ao elemento ${elemento2} (${tipo2}).`;
      } 
      else if (elemento1 == elemento2) 
      {
        return `Elemento ${elemento1} (${tipo1}) é equivalente ao elemento ${elemento2} (${tipo2}).`;
      } 
      else 
      {
        return `Elemento ${elemento1} (${tipo1}) é diferente do elemento ${elemento2} (${tipo2}).`;
      }
}

// EXERCÍCIO 4.
/**
 * Recebe uma string com o nome completo de uma pessoa (primeiro e último nome apenas)
 * e devolve o primeiro nome.
 *
 * Exemplos:
 *  - Victor Stafusa -> Victor
 *  - João Silva -> João
 *  - Maria -> Maria
 *
 * @param {string} nomeCompleto Nome completo da pessoa.
 * @return {string} String com o primeiro nome apenas.
 */
function primeiroNome(nomeCompleto) {
    
        // Verifica se a string contém um espaço em branco.
        if (nomeCompleto.indexOf(" ") >= 0) {
          // Se sim, retorna a primeira palavra da string (o primeiro nome).
          return nomeCompleto.split(" ")[0];
        } else {
          // Se não, retorna a própria string.
          return nomeCompleto;
        }
      }
      
    

// EXERCÍCIO 5.
/**
 * Recebe uma string com o nome completo de uma pessoa (primeiro e último nome apenas)
 * e devolve o nome com o sobrenome abreviado. Caso só o primeiro nome seja passado,
 * retorne-o da mesma forma que o recebeu.
 *
 * Exemplos:
 *  - Victor Stafusa -> Victor S.
 *  - João Silva -> João S.
 *  - Maria -> Maria
 *
 * @param {string} nomeCompleto Nome completo da pessoa.
 * @return {string} String com o primeiro nome conforme dado e o segundo nome abreviado.
 */
function abreviadorNomes(nomeCompleto) {
    const partesNome = nomeCompleto.split(" ");
  if (partesNome.length === 1) {
    return partesNome[0];
  } else {
    const primeiroNome = partesNome[0];
    const ultimoNome = partesNome[partesNome.length - 1];
    const sobrenomeAbreviado = ultimoNome.charAt(0) + ".";
    return `${primeiroNome} ${sobrenomeAbreviado}`;
  }
}

// EXERCÍCIO 6.
/**
 * Escreva uma função que recebe uma string com uma data do calendário gregoriano no
 * formato brasileiro (dia/mês/ano) e determine se ela é válida.
 *
 * Para a data ser válida, ela tem que ter 4 dígitos no ano e 2 dígitos tanto no dia quanto no mês,
 * preenchidos com zeros à esquerda se for necessário.
 *
 * Lembre-se que alguns meses têm 30 dias e outros têm 31.
 * Fevereiro tem 28 dias em anos não bissextos e 29 em não-bissextos.
 * Quase todos os anos divisíveis por 4 são bissextos, mas existem 3 exceções a cada 400 anos, que são aqueles
 * divisíveis por 100, mas não por 400. Por exemplo, 1700, 1800, 1900, 2100 e 2200 não são anos bissextos.
 *
 * Embora o calendário gregoriano tenha sido instituído em 1582, considere como se fosse válido retroativamente
 * desde o ano 0001.
 *
 * @param {string} data String com a data no formato brasileiro (dia/mês/ano).
 * @return {boolean} Verdadeiro se a data for válida, falso em caso contrário.
 */
function xdataValida(data) {
   
        // Verifica se a string tem o formato correto
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!regex.test(data)) {
          return false;
        }
        
        // Extrai as informações da data
        const [lixo, dia, mes, ano] = data.match(regex);
        const diaNum = Number(dia);
        const mesNum = Number(mes);
        const anoNum = Number(ano);
        
        // Verifica se o ano é bissexto
        const bissexto = anoNum % 4 === 0 && (anoNum % 100 !== 0 || anoNum % 400 === 0);

        //checa os meses do ano
        if (mesNum < 1 || mesNum > 12)
        {
            return false;
        }
       
        // Verifica se o dia é válido para o mês
        if (mesNum === 2) {
          if (bissexto) {
            if (diaNum < 1 || diaNum > 29) {
              return false;
            }
          } else {
            if (diaNum < 1 || diaNum > 28) {
              return false;
            }
          }
        } else if ([4, 6, 9, 11].includes(mesNum)) {
          if (diaNum < 1 || diaNum > 30) {
            return false;
          }
        } else {
          if (diaNum < 1 || diaNum > 31) {
            return false;
          }
        }
        
        // Verifica se o ano tem 4 dígitos
        if (anoNum < 1) {
          return false;
        }
        
        // Verifica se o dia e o mês têm 2 dígitos
        if (dia.length !== 2 || mes.length !== 2) {
          return false;
        }
        
        // A data é válida
        return true;
      }
      
  


// EXERCÍCIO 7.
/**
 * Escreva uma função que recebe uma string com uma data do calendário gregoriano no
 * formato brasileiro (dia/mês/ano) e converta para o formato: "Dia de Nome-do-Mês-por-Extenso de Ano".
 * Em caso de datas mal-formadas, devolva "Data inválida".
 *
 * Use a função desenvolvida no exercício anterior para decobrir se a data é ou não válida.
 *
 * Exemplos:
 *  - 10/11/2019 -> 10 de Novembro de 2019
 *  - 03/02/2000 -> 03 de Fevereiro de 2000
 *  - 31/02/2000 -> Data inválida
 *  - blablabla  -> Data inválida
 *
 * Observação: Note a letra maiúscula do mês.
 *
 * @param {string} data String com a data no formato brasileiro (dia/mês/ano).
 * @return {string} Data no formato "Dia de Nome-do-Mês-por-Extenso de Ano" ou "Data inválida".
 */
function converteDataParaFormaCompleta(data) {

    if (!dataValida(data)) {
      return "Data inválida";
    }
    const partesData = data.split("/");
  const dia = Number(partesData[0]);
  const mes = Number(partesData[1]);
  const ano = Number(partesData[2]);

  const diaN = (dia < 10) ? "0" + dia : "" + dia;
  let anoN = "" + ano;
  while (anoN.length < 4) anoN = "0" + anoN;

  const nomeMes = obterNomeMes(mes);
  return `${diaN} de ${nomeMes} de ${anoN}`;
}

function dataValida(data) {
    // Verifica se a string tem o formato correto
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(data)) {
        return false;
    }
    
    // Extrai as informações da data
    const [lixo, dia, mes, ano] = data.match(regex);
    const diaNum = Number(dia);
    const mesNum = Number(mes);
    const anoNum = Number(ano);
    return dataValidaComponentes(diaNum, mesNum, anoNum);
}

function dataValidaComponentes(dia, mes, ano) {
  const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (ano < 1 || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
    return false;
  }

  let diasNoMes = diasPorMes[mes - 1];
  if (mes === 2 && ((ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0)) {
    diasNoMes = 29;
  }

  if (dia > diasNoMes) {
    return false;
  }

  return true;
}

function obterNomeMes(mes) {
  const nomesMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];
  return nomesMeses[mes - 1];
}


// EXERCÍCIO 8.
/**
 * Escreva uma função que receba dois números inteiros positivos e devolva a soma de todos
 * os números pares entre os dois números (eles inclusive).
 * 
 * Exemplos:
 *  - 1 e 4 -> 2 + 4 = 6
 *  - 2 e 10 -> 2 + 4 + 6 + 8 + 10 = 30
 *  - 1 e 1 -> 0
 *  - 3 e 5 -> 4
 * @param {number} inicio O primeiro número.
 * @param {number} fim O segundo número.
 * @return {number} O somatório de valores pares entre os dois números, contando com eles.
 */
function somadorPares(inicio, fim) {
    
        let soma = 0;
        for (let i = inicio; i <= fim; i++) {
          if (i % 2 === 0) {
            soma += i;
          }
        }
        return soma;
      }
      
    

// EXERCÍCIO 9.
/**
 * Recebe um vetor de números e retorna o menor elemento do vetor.
 * Se o vetor estiver vazio, retorna undefined.
 * @param {number[]} vetor O vetor de números (nunca indefinido).
 * @return {number|undefined} O menor valor do vetor ou undefined se o vetor estiver vazio.
 */
function acharMenor(vetor) {
    if (vetor.length === 0) {
        return undefined;
      }
      let menor = vetor[0];
      for (let i = 1; i < vetor.length; i++) {
        if (vetor[i] < menor) {
          menor = vetor[i];
        }
      }
      return menor;
    }


// EXERCÍCIO 10.
/**
 * Recebe um vetor de números e devolve um outro vetor apenas com os números pares deste vetor.
 * Se o vetor estiver vazio, devolve um vetor vazio.
 * @param {number[]} O vetor com números inteiros (nunca indefinido).
 * @return {number[]} O vetor contendo apenas números pares do original (ou vazio se não houver nenhum).
 */
function acharPares(vetor) {
   
        let pares = [];
        for (let i = 0; i < vetor.length; i++) {
          if (vetor[i] % 2 === 0) {
            pares.push(vetor[i]);
          }
        }
        return pares;
      }
      


// EXERCÍCIO 11.
/**
 * Escreva uma função que recebe um dicionário com os dados da pessoa, calule o IMC dela colocando o valor obtido
 * na propriedade IMC deste objeto e retorne uma string contendo o o estado do peso dessa pessoa.
 *
 * Fórmula do IMC:
 *    IMC = (massa em kg) / (altura em metros)²
 *
 * Tabela de estados do IMC:
 *  - Menor de 18,5 -> "Abaixo do peso"
 *  - Entre 18,5 e 24,9 -> "Normal"
 *  - Entre 25,0 e 29,9 -> "Excesso de peso"
 *  - Entre 30,0 e 34,9 -> "Obesidade leve (Grau I)"
 *  - Entre 35,0 e 39,9 -> "Obesidade severa (Grau II)"
 *  - Maior e igual a 40,0 -> "Obesidade mórbida (Grau III)"
 * 
 * @param {Object} pessoa Dicionário com dados da pessoa.
 * @param {string} pessoa.nome O nome da pessoa.
 * @param {number} pessoa.peso A massa da pessoa em kg.
 * @param {number} pessoa.altura A altura da pessoa em metros.
 * @return {string} Estado do peso da pessoa.
 */
function calcularImc(pessoa) {
        const imc = pessoa.peso / (pessoa.altura * pessoa.altura);
        
        if (imc < 18.5) return 'Abaixo do peso';
        if (imc < 25) return 'Normal';
        if (imc < 30) return 'Excesso de peso';
        if (imc < 35) return 'Obesidade leve (Grau I)';
        if (imc < 40) return 'Obesidade severa (Grau II)';
        return 'Obesidade mórbida (Grau III)';
    }

        
// EXERCÍCIO 12.
/**
 * Escreva uma função que recebe uma frase e separe retorne um array com as palavras obtidas.
 *
 * Observação: Não se preocupe com a pontuação, vírgulas, ponto finais, pontos de exclamação e
 * outros caracteres de pontuação, ideogramas chineses, emojis, etc. nunca serão recebidos como parâmetro.
 *
 * @param {string} frase A frase a ser dividida em palavras.
 * @return {string[]} Um array com as palavras da frase.
 */
function obterPalavras(frase) {
    return frase.split(' ').filter(palavra => palavra !== "");
}
    

// EXERCÍCIO 13.
/**
 * Implemente uma função que recebe uma string e devolva essa mesma string codificada em Rot13.
 * Veja mais sobre essa forma de codificação em https://pt.wikipedia.org/wiki/ROT13
 * Mas basicamente é trocar A por N, B por O, C por P ... L por Y, M por Z, N por A, O por B, ... Y por L e Z por M.
 * Lembre-se que:
 * 1. Não altere caracteres com acentos, símbolos, números ou caracteres especiais.
 * 2. Uma letra maiúscula vai sempre se tornar uma outra letra maiúscula.
 * 3. Uma letra minúscula vai sempre se tornar uma outra letra minúscula.
 * 4. Chamar essa função duas vezes com rot13(rot13(algumaStringQualquer)) deve retornar sempre a string original.
 * 5. Isso não é uma forma de criptografia nem um pouco segura, mas serve para ofuscar spoilers de filmes e séries de
 *    forma que sejam legíveis apenas por aqueles que queiram lê-los. Por exemplo, aqui vai um spoiler codificado
 *    por esse método:
 *    Fancr zngn Qhzoyrqber. Znf an ireqnqr, Qhzoyrqber wá zbeerevn qr dhnydhre wrvgb r vffb sbv pbzovanqb rager
 *    ryrf cnen ratnane Ibyqrzbeg, dhr pbasvnin rz Fancr.
 * @param {string} texto O texto a ser transformado com rot13.
 * @return {string} O texto resultante da transformação com rot13.
 */

   function rot13(texto) {
        let resultado = "";
        for (let i = 0; i < texto.length; i++) {
          const charCode = texto.charCodeAt(i);
          let novoCharCode = charCode;
          if (charCode >= 65 && charCode <= 90) {
            
            novoCharCode = ((charCode - 65 + 13) % 26) + 65;
          } else if (charCode >= 97 && charCode <= 122) {
          
            novoCharCode = ((charCode - 97 + 13) % 26) + 97;
          }
          resultado += String.fromCharCode(novoCharCode);
        }
        return resultado;
      }

// EXERCÍCIO 14.
/**
 * No HTML, existe uma <div id="rot13">.
 * Dentro desta <div> há dois <textarea>s.
 * Ao editar o primeiro <textarea>, esta função é automaticamente chamada. Ela deve fazer o seguinte:
 * 1. Ler o texto do primeiro <textarea>.
 * 2. Converter o texto lido em rot13 (use a função do exercício 13).
 * 3. Colocar o resultado no segundo <textarea>.
 */
function fazerRot13() {
{
  const entra = document.getElementById("entra-rot13").value;
  const sai = rot13(entra);
  document.getElementById("sai-rot13").value = sai;
}

function rot13(str) {
  return str.replace(/[a-zA-Z]/g, function(c) {
    return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  });
}
}


      
      
    


// EXERCÍCIO 15.
/**
 * Escreva uma função que recebe os três lados de um triângulo e retorne qual tipo de triângulo é.
 *
 * Pode ser "Equilátero", "Isósceles" ou "Escaleno".
 *
 * Pode ainda ser "Não é um triângulo" quando um dos lados é igual ou maior que a soma dos outros dois
 * ou quando pelo menos um lado tem tamanho zero ou negativo.
 *
 * @param {number} a O tamanho do primeiro lado do triângulo.
 * @param {number} b O tamanho do segundo lado do triângulo.
 * @param {number} c O tamanho do terceiro lado do triângulo.
 * @return {string} O tipo de triângulo resultante.
 */

function tipoTriangulo(a, b, c) {
    
if(a + b > c && a + c > b && c + b > a) 
{
    if(a == b && a == c && b == c)
    {
      return( "Equilátero");
    }
     else if(a == b || a == c|| b == c)
      {
        return("Isósceles");
      }
      else
      {
      return("Escaleno");  
      }
}
else
{
  return("Não é um triângulo");
}
}

  

// EXERCÍCIO 16.
/**
 * Use a fórmula de Heron para calcular a área de um triângulo a partir dos seus lados.
 * Se não for um triângulo, retorne undefined.
 *
 * Dica: Use a função do exercício anterior aqui para te ajudar.
 *
 * @param {number} a O tamanho do primeiro lado do triângulo.
 * @param {number} a O tamanho do segundo lado do triângulo.
 * @param {number} a O tamanho do terceiro lado do triângulo.
 * @return {number|undefined} A área do triângulo resultante ou undefined se não formar um triângulo.
 */
function areaTriangulo(a, b, c) {
    
        // Verifica se os lados formam um triângulo
        if (a + b <= c || a + c <= b || b + c <= a) {
          return undefined;
        }
      
        // Calcula o semiperímetro
        const p = (a + b + c) / 2;
      
        // Calcula a área usando a fórmula de Heron
        const area = Math.sqrt(p * (p - a) * (p - b) * (p - c));
      
        return area;
      }
    


// EXERCÍCIO 17.
/**
 * No HTML, existe uma <div id="triangulo">.
 * Dentro desta <div> há três <input>s à esquerda de um <button> e um quarto e um quinto <input> à direita.
 *
 * Ao clicar neste <button>:
 * 1. Leia os valores dos primeiros três <input>s.
 * 2. Converta os valores lidos para valores numéricos (use a função lerNumero que já está aí, ela veio do utils.js).
 * 3. Utilize a função tipoTriangulo do exercício 15 para saber qual tipo de triângulo é o resultado disso.
 * 4. Utilize a função areaTriangulo do exercício 16 para saber qual é a área do triângulo.
 * 5. Coloque o nome do tipo de triângulo resultante na quarta <input>.
 * 6. Coloque a área do triângulo resultante na quinta <input>.
 *
 * Se a função lerNumero lançar um erro, coloque a mensagem de erro dela na quarta <input> e deixe a quinta em branco.
 *
 * Um esqueleto da implementação final já foi deixado pelo professor para ajudar.
 * Dica: Procure ver funções de manipulação de DOM nas partes que faltam (o que está como naoFizIssoAinda()).
 */
function verificarTriangulo() {
  let texto1, texto2;

  const inputs = document.querySelectorAll('.ex17 input');

  try {
    const a = lerNumero(inputs[0].value, { erro: "Informe o número A corretamente." });
    const b = lerNumero(inputs[1].value, { erro: "Informe o número B corretamente." });
    const c = lerNumero(inputs[2].value, { erro: "Informe o número C corretamente." });

    texto1 = tipoTriangulo(a, b, c);
    texto2 = areaTriangulo(a, b, c) || '';

   
  } catch (e) {
    texto1 = e.message;
    texto2 = '';
    
  }
  inputs[3].value = texto1
  inputs[4].value = texto2
    
}

// EXERCÍCIO 18.
/**
 * Escreva uma função que recebe um array com 52 cartas de baralho já devidamente embaralhado e
 * um array com 2 a 7 objetos representando jogadores de poker (uma das muitas variantes do jogo, existem várias).
 *
 * Distribua 5 cartas para cada jogador, mas sempre de forma a dar a primeira carta para o primeiro
 * jogador, a segunda para o segundo jogador e assim por diante. Após dar uma carta ao último jogador,
 * dá-se a carta seguinte novamente ao primeiro jogador, a posterior novamemente ao segundo e repete-se
 * isso até que cada jogador tenha suas 5 cartas. As cartas remanescentes (e apenas elas) devem permanecer
 * no array original.
 *
 * Cada carta é representada por um objeto no formato "valor-naipe", onde naipe é "♢", "♣", "♡" ou "♠" e o
 * valor é "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q" ou "K".
 *
 * Cada jogador é representado por um objeto no seguinte formato:
 * {"nome": (uma string), "cartas": (um array com cinco cartas)}
 * 
 * @param {string[]} baralho Um array com as cartas a serem distribuídas.
 *                                Ao término da função, restarão entre 17 e 42 cartas remanescentes neste array.
 * @param {Object[]} jogadores Um array com os jogadores que devem receber as cartas.
 */
function distribuirCartas(baralho, jogadores) {
  
  {
    let index = 0; 
    const numCartas = jogadores.length * 5; 
    for (let i = 0; i < numCartas; i++) {
      const jogador = jogadores[i % jogadores.length]; 
      jogador.cartas.push(baralho[index]); 
      index++; 
    }
    baralho.splice(0, index); 
  }
}  

  

// EXERCÍCIO 19.
/**
 * Escreva uma função que recebe um array com 2 a 7 objetos representando jogadores de poker, no mesmo formato
 * do exercício 18, mas já com as cartas devidamente recebidas, e retorne o nome do jogador que tem o ás de ouros.
 * Se ninguém estiver com o ás de ouros, retorne null.
 *
 * @param {Object[]} jogadores Um array com os jogadores, cada um com 5 cartas.
 * @return {string|undefined} O nome do jogador com o ás de ouros ou undefined se ninguém tiver o ás de ouros.
 */
function asDeOuros(jogadores) {

  let resultado = null;

  for (let i = 0; i < jogadores.length; i++) {
    const jogador = jogadores[i];

    for (let j = 0; j < jogador.cartas.length; j++) {
      const carta = jogador.cartas[j];

      if (carta === "A-♢") {

        resultado = jogador.nome;
      }
    }
  }
  return resultado;
  
  
}


// EXERCÍCIO 20.
/**
 * Escreva uma função que recebe um array com 2 a 7 objetos representando jogadores de poker, no mesmo formato
 * dos exercícios 18 e 19 e determine se todos eles têm alguma carta real (J, Q ou K).
 *
 * Dica: Lembre-se dos métodos every e some dos arrays. 
 *
 * @param {Object[]} jogadores Um array com os jogadores, cada um com 5 cartas.
 * @return {boolean} Verdadeiro se todos tiverem alguma carta real na mão, falso se algum não tiver.
 */
function todosTemCartasReais(jogadores) {
   {
    const cartasReais = ['J', 'Q', 'K'];
    
    // Verifica se todas as cartas de cada jogador são reais
    const todosTemCartasReais = jogadores.every((jogador) => {
      return jogador.cartas.some((carta) => {
        const valor = carta.split('-')[0];
        return cartasReais.includes(valor);
      });
    });
    
    return todosTemCartasReais;
  }
  
}

// EXERCÍCIO 21.
/**
 * Escreva uma função que recebe um array com 5 cartas de baralho correspondendo às cartas que algum jogador tem
 * em sua mão (no mesmo formato exercícios 18, 19 e 20) e determine se existem pelo menos 3 cartas com o mesmo valor.
 *
 * Observação 1: Não existem duas cartas iguais no baralho. Isso só poderia acontecer se algum dos jogadores estivesse
 * trapaceando, mas considere que todos são sempre honestos.
 *
 * @param {string[]} cartas Um array com as 5 cartas.
 * @return {boolean} Verdadeiro se houverem pelo menos 3 cartas com o mesmo valor na mão, falso em caso contrário.
 */
function existeTrinca(cartas) {
    
        const valores = cartas.map(carta => carta.slice(0, -1)); // extrai o valor de cada carta
        const contagem = {}; // objeto que irá guardar a contagem de cada valor
        for (const valor of valores) {
          contagem[valor] = (contagem[valor] || 0) + 1; // incrementa a contagem do valor
          if (contagem[valor] >= 3) { // se já tem 3 cartas com o mesmo valor, retorna true
            return true;
          }
        }
        return false; // se chegou aqui é porque não encontrou uma trinca
      }
      


// EXERCÍCIO 22.
/**
 * Escreva uma função que recebe uma frase e retorne um objeto (chave-valor) onde as chaves são as palavras e o
 * valor é o número de vezes que cada palavra aparece na frase.
 *
 * Observação 1: Não se preocupe com a pontuação, vírgulas, ponto finais, pontos de exclamação e
 * outros caracteres de pontuação, ideogramas chineses, emojis, etc. nunca serão recebidos como parâmetro.
 *
 * Observação 2: Palavras em maiúsculas devem ser consideradas iguais a palavras em minúsculas.
 * As palavras no objeto do resultado devem estar todas em letras minúsculas.
 *
 * Dica: Chame a função obterPalavras do exercício 12 como parte da solução desde exercício.
 *
 * @param {string} frase A frase da qual deseja se obter a contagem de palavras.
 * @return {Object} Um objeto onde as chaves são palavras da frase e os valores são o número de ocorrências na frase.
 */
function contarPalavras(frase) {
  {
    const palavras = obterPalavras(frase.toLowerCase());
    const contador = {};
    for (const palavra of palavras) {
      if (contador[palavra]) {
        contador[palavra]++;
      } else {
        contador[palavra] = 1;
      }
    }
    return contador;
  }
  
}

// EXERCÍCIO 23.
/**
 * Use a fórmula de Bhaskara para calcular as raízes da equação ax² + bx + c = 0.
 * Se a for 0, retorne undefined, pois isso não seria uma equação do segundo grau.
 * Se houverem raízes reais, retorne um array com essas duas raízes, a menor primeiro e a maior depois.
 * Se não houverem raízes reais, retorne um array vazio.
 *
 * @param {number} a O termo quadrático da expressão de segundo grau.
 * @param {number} b O termo linear da expressão de segundo grau.
 * @param {number} c O termo constante da expressão de segundo grau.
 * @return {number[]|undefined} Um array com as soluções reais ou undefined se não for uma equação de segundo grau.
 */
function bhaskara(a, b, c) {
    
        if (a === 0) {
          return undefined;
        }
      
        const delta = b ** 2 - 4 * a * c;
      
        if (delta < 0) {
          return [];
        }
      
        const x1 = (-b - Math.sqrt(delta)) / (2 * a);
        const x2 = (-b + Math.sqrt(delta)) / (2 * a);
      
        return [Math.min(x1, x2), Math.max(x1, x2)];
      }
      


// EXERCÍCIO 24.
/**
 * Crie uma função que receba um dicionário (objeto com chave-valor) onde cada chave corresponde ao nome de um time
 * de futebol o valor é um outro objeto com os campos "vitorias", "empates", "derrotas" e "saldo-de-gols".
 *
 * Retorne um array contendo os nomes dos times de acordo com a classificação no campeonato, com os que tiverem maior
 * número de pontos primeiro (cada vitória = 3 pontos, cada empate = 1 ponto, cada derrota = 0 pontos).
 * Caso haja empate no número de pontos, use o saldo de gols como critério de desempate.
 * Persistindo o empate, use a ordem alfabética do nome do time para ordená-los na classificação.
 *
 * Dica: Os operadores < ou > também podem ser usados para classificar strings em ordem alfabética. Por exemplo,
 * "Flamengo" < "Grêmio" resulta em true e "Bahia" > "Vasco" resulta em false.
 *
 * Dica: Use o método sort de array passando como parâmetro, um lambda com dois parâmetros.
 *
 * @param {Object} times O dicionário contendpo os nomes dos times e o respectivo número de pontos e saldo de gols.
 * @return {string[]} Um array com os times na ordem de classificação, do campeão ao lanterna.
 */
function classificacao(campeonato) {
 
  const resultado = [];
  for (const times in campeonato) {
    resultado.push(times);
  }
  return resultado.sort((times1, times2) => {
    const pontos1 = 3 * campeonato [times1].vitorias + campeonato [times1].empates;
    const pontos2 = 3 * campeonato [times2].vitorias + campeonato [times2].empates;
    const saldo1 = campeonato[times1] ["saldo-de-gols"];
    const saldo2 = campeonato[times2] ["saldo-de-gols"];
    if (pontos1 !== pontos2) return pontos1 - pontos2;
    if (saldo1 != saldo2) return saldo1 - saldo2;
    if(times1 > times2) return 1;
    if(time1 < times2) return -1;
    return 0;
  });
  

}
// EXERCÍCIO 25.
/**
 * Esta função recebe um array com várias opções acerca de como você deve fazer a entrega deste AC.
 *
 * Retorne um outro array com dois elementos que contenha os dois índices das duas opções corretas dentre as várias
 * fornecidas. Lembrando que o primeiro elemento tem o índice 0, o segundo o índice 1, o terceiro o índice 2 e assim
 * por diante.
 *
 * Leia atentamente todos os enunciados aqui e no GitHub para saber quais são as opções corretas, principalmente o
 * README.md.
 *
 * Dica: Use o console.log para ver o que é recebido no array.
 *
 * @param {string[]} array Várias possibilidades de como fazer a entrega deste AC.
 * @return {string[]} As opções corretas de entrega.
 */
function comoFazerEntrega(array) {
  const opcao1Index = array.findIndex((opcao) =>
  opcao.includes("Eu vou entregar o meu arquivo ado1.js que eu alterei e nada mais.")
);

const opcao2Index = array.findIndex((opcao) =>
  opcao.includes("Eu vou fazer no Git e enviar o link para o professor.")
);

const indexes = [opcao1Index, opcao2Index];
indexes.sort((a, b) => a - b);
return indexes;
}