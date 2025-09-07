let quiz = {}
let pontos = 0
let pergunta = 1
let resposta = ""
let idInputResposta = ""
let respostaCorretaId = ""

async function buscarPerguntas() {
  const urlDados = "./data.json"
  const resposta = await fetch(urlDados)
  const dados = await resposta.json()
  quiz = dados.quizzes[0]
}

function montarPergunta() {
const main = document.querySelector("main")

main.innerHTML = `
    
    <div class="quiz-header">
      <p>Pergunta <span id="numero">${pergunta}</span> de 10</p>
      <a href="../../../index.html"><button class="close-btn">×</button></a>
    </div>

    <h2 id="pergunta">
      ${alterarSinais(quiz.questions[pergunta-1].question)}
    </h2>

    <div class="opcoes">
      <label class="opcao" for="opcao_a">
        <input type="radio" id="opcao_a" name="opcao" value="${alterarSinais(quiz.questions[pergunta-1].options [0])}">
        <span>A) ${alterarSinais(quiz.questions[pergunta-1].options [0])}</span>
      </label>

      <label class="opcao" for="opcao_b">
        <input type="radio" id="opcao_b" name="opcao" value="${alterarSinais(quiz.questions[pergunta-1].options [1])}">
        <span>B) ${alterarSinais(quiz.questions[pergunta-1].options [1])}</span>
      </label>

      <label class="opcao" for="opcao_c">
        <input type="radio" id="opcao_c" name="opcao" value="${alterarSinais(quiz.questions[pergunta-1].options [2])}">
        <span>C) ${alterarSinais(quiz.questions[pergunta-1].options [2])}</span>
      </label>
    </div>

    <p id="feedback"></p>

    <div class="footer">
      <button id="proxima" class="next-btn">Responder</button>
    </div>`
}

function alterarSinais(texto) {
return texto.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function guardarResposta(evento) {
resposta = evento.target.value
idInputResposta = evento.target.id

const botaoEnviar = document.querySelector(".next-btn")
botaoEnviar.addEventListener("click", validarResposta)
}

function validarResposta() {
const botaoEnviar = document.querySelector(".next-btn")
botaoEnviar.innerText = "Próxima"
botaoEnviar.removeEventListener("click", validarResposta)

if (pergunta === 10) {
    botaoEnviar.innerText = "Finalizar"
    botaoEnviar.addEventListener("click", finalizar)
} else {
    botaoEnviar.addEventListener("click", proximaPergunta)
}

console.log(`Pergunta: ${pergunta}, Resposta correta: ${quiz.questions[pergunta - 1].answer}`); 

if (resposta === quiz.questions[pergunta-1].answer) {
    document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "correta")
    pontos += 1
} else {
    document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "errada")
    document.querySelector(`label[for='${respostaCorretaId}']`).setAttribute("id", "correta")
}

pergunta += 1
}

function finalizar() {

window.location.href = "../resultado/resultado.html"
}

function proximaPergunta() {
montarPergunta()
adicionarEventoInputs()
}

function adicionarEventoInputs() {
const inputResposta = document.querySelectorAll(".opcoes input")
inputResposta.forEach(input => {
    input.addEventListener("click", guardarResposta)

    if(input.value === quiz.questions[pergunta-1].answer) {
        respostaCorretaId = input.id
    }
})
}

async function iniciar() {
await buscarPerguntas()
montarPergunta()
adicionarEventoInputs()
}

iniciar()