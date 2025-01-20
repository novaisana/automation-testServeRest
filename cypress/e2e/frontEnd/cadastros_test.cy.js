describe('Valida login e Cadastro', () => {
    const login = (email, senha) => {
        cy.visit('https://front.serverest.dev/login');
        cy.get('[data-testid="email"]').type(email);
        cy.get('[data-testid="senha"]').type(senha);
        cy.get('[data-testid="entrar"]').click();
        //test
    };

    beforeEach(() => {
        // Acessar site e realizar login com usuário padrão
        login('testeqa@qa.com.br', 'testeqa123');
    });

    it('Valida cadastro de um novo usuário', () => {
        // Acessar página de cadastro de usuários
        cy.get('[data-testid="cadastrarUsuarios').click();

        // Preencher formulário de cadastro

        let usuarioRadon = Math.floor(Math.random() * 1000); // gerar um valor aleatório para o nome do usuário
        let emailRandon = usuarioRadon+'@example.com'; // gerar um valor aleatório para o email do usuário

        cy.get('[data-testid="nome"]').type(usuarioRadon);
        cy.get('[data-testid="email"]').type(emailRandon);
        cy.get('[data-testid="password"]').type('senha123');
        cy.get('[data-testid="checkbox"]').click(); // cadastrar como administrador

        // Submeter formulário de cadastro
        cy.get('[data-testid="cadastrarUsuario"]').click();

        // Validar o cadastro
        cy.contains(emailRandon).should('be.visible');
    });

    it('Valida cadastro de um novo produto', () => {
        // Acessar página de cadastro de produtos
        cy.get('[data-testid="cadastrarProdutos"]').click();

        // Preencher formulário de cadastro de produto

        let produtoRandom = 'produto'+Math.floor(Math.random() * 1000); // gerar um valor aleatório para o nome do produto
        cy.get('[data-testid="nome"]').type(produtoRandom);
        cy.get('[data-testid="preco"]').type('100');
        cy.get('[data-testid="descricao"]').type('Descrição do Produto Teste '+produtoRandom);
        cy.get('[data-testid="quantity"]').type('10');

        //Anexar imagem
        cy.get('[data-testid="imagem"]').attachFile('teste.png');

        // Submeter formulário de cadastro de produto
        cy.get('[data-testid="cadastarProdutos"]').click();

        // Validar o cadastro do produto
        cy.contains('Lista dos Produtos').should('be.visible');
        cy.contains(produtoRandom).should('be.visible');
    });

});
describe('login invalido', () => {
      
    it('Valida erro para login inválido', () => {
        // Realizar login com credenciais inválidas
        cy.visit('https://front.serverest.dev/login');
        cy.get('[data-testid="email"]').type('emailinvalido@qa.com');
        cy.get('[data-testid="senha"]').type('senha');
        cy.get('[data-testid="entrar"]').click();
        cy.contains('Email e/ou senha inválidos').should('be.visible');
    });
});