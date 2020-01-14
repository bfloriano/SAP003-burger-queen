# Burger Queen

## Índice

* [1. Preâmbulo](#1-preâmbulo)
* [2. Resumo do projeto](#2-resumo-do-projeto)
* [3. Objetivos de aprendizagem](#3-objetivos-de-aprendizagem)
* [4. Considerações gerais](#4-considerações-gerais)
* [5. Critérios de aceitação mínimos do
  projeto](#5-critérios-de-aceitação-mínimos-do-projeto)
* [6. Hacker Edition](#6-hacker-edition)
* [7. Dicas e leituras complementares](#7-dicas-e-leituras-complementares)

***

## 1. Preâmbulo

[React](https://reactjs.org/), [Angular](https://angular.io/) e
[Vue](https://vuejs.org/) são alguns dos _frameworks_ e _bibliotecas_ de
JavaScript mais usados na área de desenvolvimento ao redor do mundo e existe uma
razão para isso. No contexto do navegador, [_manter a interface sincronizada com
o estado é difícil_](https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445).

Ao eleger um _framework_ ou _biblioteca_ para nossa interface, nos apoiamos em
uma série de convenções e implementações _testadas_ e _documentadas_ para
resolver um problema comum a toda interface web. Isto nos permite concentrar
melhor (dedicar mais tempo) nas características _específicas_ de nossa
aplicação.

Quando escolhemos uma destas tecnologias não só importamos um pedaço de código
para reusar (o qual já é um grande valor por si só), mas também adotamos uma
**arquitetura**, uma série de **princípios de design**, um paradigma, algumas
**abstrações**, um **vocabulário**, uma **comunidade**, etc...

Como desenvolvedora Front-end, estes kits de desenvolvimento podem resultar em
uma grande ajuda para implementar rapidamente _features_ dos projetos em que
você for trabalhar.

## 2. Resumo do projeto

Um pequeno restaurante de hambúrgueres, que está crescendo, necessita uma
interface em que se possa realizar pedidos utilizando um _tablet_, e enviá-los
para a cozinha para que sejam preparados de forma ordenada e eficiente.


## 3. Objetivos de aprendizagem

O objetivo principal é aprender a construir uma interface web usando React. Esse framework front-end ataca o seguinte problema: **como manter a interface e estado sincronizados**. Portanto, esta experiência espera familiarizá-la com o conceito de estado da tela, e como cada mudança no estado vai refletir na interface (por exemplo, toda vez que adicionamos um _produto_ para um _pedido_, a interface deve atualizar a lista de pedidos e o total).
 
## 4. Considerações gerais

A lógica do projeto deve ser totalmente implementada em JavaScript (ES6 +). Neste projeto você deve usar [React](https://reactjs.org/).

O aplicativo deve ser um _Single Page App_. Os pedidos serão enviados por meio de um _tablet_,mas **não queremos um aplicativo nativo**, mas sim um aplicativo Web que seja **responsivo**.

Precisamos pensar bem sobre o UX para aqueles que vão receber os pedidos, o tamanho e a aparência dos botões, a visibilidade do estado atual do pedido, etc.

O aplicativo deve usar scripts `npm-scripts` e ter `start`, `build` e `deploy`, que são responsáveis por iniciar, empacotar e implantar o aplicativo, respectivamente.

Você deve definir a estrutura das pastas e arquivos que considera necessários. Você pode estruturá-los de acordo com as convenções do React.

Para iniciar este projeto você terá que fazer um _fork_ e _clone_ deste repositório.

## 5. Critérios mínimos de aceitação do projeto

### Definição do produto

O [_Product Owner_](https://www.youtube.com/watch?v=7lhnYbmovb4) nos apresentou
este _backlog_ que é o resultado do seu trabalho com o cliente até hoje.

***

#### [História de usuário 1] Cliente deve poder anotar o seu pedido

Eu como cliente quero poder anotar o meu pedido saber o valor de cada 
produto e poder enviar o pedido para a cozinha para ser preparado.

##### Critérios de aceitação

O que deve acontecer para satisfazer as necessidades do usuário?

* Anotar o nome e mesa.
* Adicionar produtos aos pedidos.
* Excluir produtos.
* Ver resumo e o total da compra.
* Enviar o pedido para a cozinha (guardar em algum banco de dados).
* Funcionar bem e se adequar a um _tablet_.

##### Definição de pronto

O acordado abaixo deve acontecer para dizer que a história está terminada:

* Você fez _testes_ de usabilidade e incorporou o _feedback_ do usuário.
* Você deu deploy de seu aplicativo.

***

#### [História de usuário 2] Chefe de cozinha deve ver os pedidos

Eu como chefe de cozinha quero ver os pedidos dos clientes em ordem, poder marcar que estão prontos e poder notificar os garçons/garçonetes que o pedido está pronto para ser entregue ao cliente.

##### Critérios de aceitação

* Ver os pedidos à medida em que são feitos.
* Marcar os pedidos que foram preparados e estão prontos para serem servidos.
* Ver o tempo que levou para preparar o pedido desde que chegou, até ser marcado como concluído.

##### Definição de pronto

* Você fez _testes_ de usabilidade e incorporou o _feedback_ do usuário.
* Você deu deploy de seu aplicativo.

***

#### [História de usuário 3] Garçom/Garçonete deve ver os pedidos prontos para servir

Eu como garçom/garçonete quero ver os pedidos que estão prontos para entregá-los rapidamente aos clientes.

##### Critérios de aceitação

* Ver a lista de pedidos prontos para servir.
* Marque os pedidos que foram entregues.

##### Definição de pronto

* Você fez _testes_ de usabilidade e incorporou o _feedback_ do usuário.
* Você deu deploy de seu aplicativo.
* Os dados devem ser mantidos intactos, mesmo depois que um pedido terminado. Tudo isso para poder ter estatísticas no futuro.

***

## 6. Hacker Edition 

As seções chamadas Hacker Edition são opcionais. Se você terminou tudo e ainda sobrou tempo, faça essa parte. Assim você poderá aprofundar e exercitar mais sobre os objetivos de aprendizagem do projeto.

* Siga as recomendações para PWAs (Progressive Web Apps), para criar uma aplicação offline. Para orientá-las sobre este tema,recomendamos que você use Lighthouse, que é uma ferramenta do Google que nos ajuda a garantir que nossos aplicativos web sigam "boas práticas".

* Faça testes que cubram 100% de statements, functions, lines e branches.

* Implemente a seguinte história de usuário: 

#### [História de usuário 4] Usuário deve ter seu perfil (login/senha) para acessar o sistema.

Eu como funcionário do restaurante quero entrar na plataforma e ver apenas a tela importante para o meu trabalho.

##### Critérios de aceitação

O que deve acontecer para satisfazer as necessidades do usuário?

* Criar login e senha.
* Criar tipo de usuário (cozinha / salão).
* Entrar na tela correta para cada usuário.

##### Definição de pronto

O acordado abaixo deve acontecer para dizer que a história está terminada:

* Você fez testes de usabilidade e incorporou o feedback do usuário.
* Você deu deploy de seu aplicativo.

***

## 7. Dicas e leituras complementares

* [React Hooks](https://reactjs.org/docs/hooks-intro.html)
* [Aphrodite](https://github.com/Khan/aphrodite)
* [Firebase](https://firebase.google.com/)

 
## Checklist

### `README.md`

* [ ] Documentação do processo de design.
* [ ] Inclui informações para desenvolvedores (dependências, instalação, uso, testes...)

#### HU

#### HU 1: Anotar pedidos

* [ ] Digitar o nome do cliente.
* [ ] Filtrar _menu_ para _café da manhã_ e _almoço/jantar_.
* [ ] Adicionar item ao pedido.
* [ ] Excluir item do pedido.
* [ ] Mostrar _resumo_ do pedido com todos os itens e o total.
* [ ] Enviar para a cozinha (isso deve salvar o pedido).

#### HU 2: Ver pedidos na cozinha

* [ ] Visualizar pedidos pendentes para produção.
* [ ] Marcar pedido como pronto para entrega.
* [ ] Ver histórico dos pedidos.

#### HU 3: Entrega de pedidos

* [ ] Visualizar pedidos pendentes para entrega.
* [ ] Marcar pedido como entregue ao cliente.

### UX

* [ ] Funciona bem em tablets.
* [ ] Fácil utilização em telas sensíveis ao toque.
* [ ] Status atual do pedido sempre visível enquanto fazemos um pedido.

### Hacker Edition

* [ ] Segue as recomendações de PWAs.
* [ ] Funciona bem offline.

#### HU 4: Perfil do Usuário

* [ ] Criar login e senha.
* [ ] Criar tipo de usuário (cozinha / salão).
* [ ] Entrar na tela correta para cada usuário.

#### Testes

* [ ] 100% de cobertura de _statements_.
* [ ] 100% de cobertura de _functions_.
* [ ] 100% de cobertura de _lines_.
* [ ] 100% de cobertura de _branches_.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).