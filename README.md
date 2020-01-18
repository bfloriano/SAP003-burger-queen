# Burger Queen

## Índice

* [1. Preâmbulo](#1-preâmbulo)
* [2. Resumo do projeto](#2-resumo-do-projeto)
* [3. Considerações gerais](#3-considerações-gerais)

***

## 1. Preâmbulo

Este projeto foi iniciado com o [Create React App](https://github.com/facebook/create-react-app).

A aplicação simula o sistema de pedidos de um restaurante. A página da aplicação pode ser acessada atraves do Link: [Burger Queen](https://burger-queen-ca66c.firebaseapp.com/)

## 2. Resumo do projeto

Um pequeno restaurante de hambúrgueres, que está crescendo, necessita uma
interface em que se possa realizar pedidos utilizando um _tablet_, e enviá-los
para a cozinha para que sejam preparados de forma ordenada e eficiente.

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

***

#### [História de usuário 2] Chefe de cozinha deve ver os pedidos

Eu como chefe de cozinha quero ver os pedidos dos clientes em ordem, poder marcar que estão prontos e poder notificar os garçons/garçonetes que o pedido está pronto para ser entregue ao cliente.

##### Critérios de aceitação

* Ver os pedidos à medida em que são feitos.
* Marcar os pedidos que foram preparados e estão prontos para serem servidos.
* Ver o tempo que levou para preparar o pedido desde que chegou, até ser marcado como concluído.

***

#### [História de usuário 3] Garçom/Garçonete deve ver os pedidos prontos para servir

Eu como garçom/garçonete quero ver os pedidos que estão prontos para entregá-los rapidamente aos clientes.

##### Critérios de aceitação

* Ver a lista de pedidos prontos para servir.
* Marque os pedidos que foram entregues.
* Os dados devem ser mantidos intactos, mesmo depois que um pedido terminado. Tudo isso para poder ter estatísticas no futuro.

***

#### [História de usuário 4] Usuário deve ter seu perfil (login/senha) para acessar o sistema.

Eu como funcionário do restaurante quero entrar na plataforma e ver apenas a tela importante para o meu trabalho.

##### Critérios de aceitação

O que deve acontecer para satisfazer as necessidades do usuário?

* Criar login e senha.
* Criar tipo de usuário (cozinha / salão).
* Entrar na tela correta para cada usuário.

*** 

#### Definição de pronto

* Testes de usabilidade e incorporar o feedback do usuário.
* Deploy de seu aplicativo.

***

## 3. Considerações gerais

O principal objetivo de aprendizagem desse projeto foi aprender a construir uma interface web usando [React](https://reactjs.org/). Com esse framework foi possível [ manter a interface sincronizada com o estado](https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445). Portanto, foi possível que cada mudança no estado refletisse na interface (por exemplo, toda vez que adicionamos um _produto_ para um _pedido_, a interface atualiza a lista de pedidos e o total).

A lógica do projeto foi implementada em JavaScript (ES6 +).

O aplicativo é um _Single Page App_, com Web Design **responsivo**.

O UX foi pensado para aqueles que vão receber os pedidos, o tamanho e a aparência dos botões, a visibilidade do estado atual do pedido, etc.

Para rodar a aplicação, é necessário instalar o gerenciador de pacotes [NPM](https://www.npmjs.com/). 

O aplicativo utilizou `npm-scripts` e possui `start`, `build` e `deploy`, que são responsáveis por iniciar, empacotar e implantar o aplicativo, respectivamente.

Também é necessário instalar as dependências das ferramentas utilizadas: 

* [React Hooks](https://reactjs.org/docs/hooks-intro.html) para o desenvolvimento;
* [React-router-dom](https://reacttraining.com/react-router/web/guides/quick-start);
* [Aphrodite](https://github.com/Khan/aphrodite) como framework para o CSS;
* [Firebase](https://firebase.google.com/) Hosting e Firestore para hospedagem e banco de dados.
