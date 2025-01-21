## Projeto de Automação
Este projeto utiliza Cypress para testes de automação de API e front-end. Abaixo estão as instruções para configurar e executar os testes.

## Pré-requisitos
Node.js instalado

NPM (Node Package Manager) instalado

## Instalação
Clone o repositório:

``` git clone https://github.com/novaisana/automation-testServeRest.git ```

``` cd automation-testServeRest ```

Instale as dependências:

``` npm install ```

## Configuração
Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

``` CYPRESS_USERNAME=testeqa@qa.com.br ```

``` CYPRESS_PASSWORD=testeqa123 ```

Certifique-se de que o arquivo ```cypress.config.js``` está configurado corretamente para o ambiente de testes.

## Executando os Testes 

(Antes de iniciar os testes executar o script ``` npm run clean:reports ```
1. Para executar os testes de API, use o seguinte comando:


``` npx cypress run --spec "cypress/e2e/api/api_tests.cy.js" ```


2. Para executar os testes de front-end, use o seguinte comando:

``` npx cypress run --spec "cypress/e2e/frontEnd/cadastros_test.cy.js" ```

3. Para executar todos os testes, use o comando:

``` npx cypress run ``` ou ``` npm test ```

## Relatórios
1. Os relatórios gerados podem ser encontrados no diretório mochareports. Abra o arquivo mochawesome.html em um navegador para visualizar o relatório.
