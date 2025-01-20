describe('API Tests', () => {
    const apiUrl = 'https://serverest.dev'; 
    let authToken;

    before(() => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/login`,
            body: {
                email: 'testeqa@qa.com.br',
                password: 'testeqa123'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            authToken = response.body.authorization;
        });
    });

    it('realizar login valido', () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/login`,
            body: {
                email: 'testeqa@qa.com.br',
                password: 'testeqa123'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'Login realizado com sucesso');
            expect(response.body).to.have.property('authorization');
        });
    });

    it('realizar login invalido', () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/login`,
            body: {
                email: 'invalid@qa.com.br',
                password: 'invalid123'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('message', 'Email e/ou senha inválidos');
        });
    });

    it('criar e deletar novo usuario', () => {
        // Criar novo usuario
        cy.request({
            method: 'POST',
            url: `${apiUrl}/usuarios`,
            body: {
                nome: "Test User",
                email: "testuser@qa.com.br",
                password: "TestUser123",
                administrador: "false"
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
            const userId = response.body._id;

            // Verificar usuario criado
            cy.request({
                method: 'GET',
                url: `${apiUrl}/usuarios/${userId}`,
                headers: {
                    Authorization: authToken
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('_id', userId);
                expect(response.body).to.have.property('nome', 'Test User');

                // Deletar usuario
                cy.request({
                    method: 'DELETE',
                    url: `${apiUrl}/usuarios/${userId}`,
                    headers: {
                        Authorization: authToken
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('message', 'Registro excluído com sucesso');

                    // Verificar usuario deletado
                    cy.request({
                        method: 'GET',
                        url: `${apiUrl}/usuarios/${userId}`,
                        failOnStatusCode: false,
                        headers: {
                            Authorization: authToken
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(400);
                    });
                });
            });
        });
    });

    it('criar e deletar produto', () => {
        // Criar novo produto
        cy.request({
            method: 'POST',
            url: `${apiUrl}/produtos`,
            body: {
                nome: 'Notebook AOC',
                descricao: 'Notebook AOC 256SSD 8GB RAM',
                preco: 5000,
                quantidade: 10
            },
            headers: {
                Authorization: authToken
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            const productId = response.body._id;

            // Verificar produto criado
            cy.request({
                method: 'GET',
                url: `${apiUrl}/produtos/${productId}`,
                headers: {
                    Authorization: authToken
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('_id', productId);
                expect(response.body).to.have.property('nome', 'Notebook AOC');

                // Deletar produto
                cy.request({
                    method: 'DELETE',
                    url: `${apiUrl}/produtos/${productId}`,
                    headers: {
                        Authorization: authToken
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('message', 'Registro excluído com sucesso');

                });
            });
        });
    });
})