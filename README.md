# Trivia

Trivia é um jogo de perguntas e respostas sobre assuntos variados baseado na categoria de jogos de mesmo nome.

Antes de começar a jogar, a pessoa jogadora deve realizar o login com seu nome e e-mail, podendo oferecer um e-mail cadastrado no [Gravatar](https://br.gravatar.com/) caso queira utilizar o seu Gravatar como avatar.

Ao iniciar o jogo, a pessoa jogadora deverá selecionar uma das respostas disponíveis para cada pergunta antes do tempo acabar, senão a resposta será considerada errada. No final, a pontuação marcada pela pessoa é mostrada na tela e é disponibilizado à ela a página de ranking, para que possa visualizar as pontuações e colocações de todos os jogadores.

A aplicação foi desenvolvida em conjunto com [Erick Viana](https://github.com/erickvianac), [Victor Hugo](https://github.com/victorhbm) e [Ronny Velárdez](https://github.com/ronnymv) utilizando as metodologias Scrum e Kanban. Inclusive, o código foi produzido em pares dinâmicos e em grupo, nos casos de problemas mais complexos.

## Tecnologias utilizadas

O projeto foi desenvolvido utilizando a biblioteca [React](https://reactjs.org/), incluindo o [React Router](https://reactrouter.com/) para roteamento e o [Redux](https://redux.js.org/) para gerenciamento de estado da aplicação. Além disso, foi utilizado a API do [Open Trivia Database](https://opentdb.com/) para obter as perguntas e as respostas do jogo e a API do [Gravatar](https://br.gravatar.com/) para solicitar a imagem de perfil do usuário a partir do seu e-mail.

## Instalação das dependências

Você precisará de um ambiente de execução [Node.js](https://nodejs.org) instalado em sua máquina para executar o comando de instalação de dependências.

Com o repositório clonado e dentro de um terminal:

1. Entre na pasta do repositório:

```
cd project-trivia/
```

2. Instale as dependências:

```
npm install
```

## Como executar

Para iniciar a aplicação, execute no terminal:

```
npm start
```

---
