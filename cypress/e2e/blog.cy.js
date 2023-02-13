describe('Blog App', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    const user = {
      name: 'red',
      username: 'red',
      password: 'red',
    };
    cy.request('POST', 'http://localhost:3000/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  describe('Log In Page', () => {
    it('Renders the Login Page', () => {
      cy.contains('Login');
    });

    it('unregistered user fails to login', function () {
      cy.contains('Login').click();
      cy.get('#username').type('blue');
      cy.get('#password').type('blue');
      cy.get('button').click();
      cy.contains('invalid username or password');
    });
    it('registered user can login', function () {
      cy.contains('Login').click();
      cy.get('#username').type('red');
      cy.get('#password').type('red');
      cy.get('button').click();
      cy.contains('hello, red');
    });
  });

  describe('Succesful Login', () => {
    beforeEach(function () {
      cy.contains('Login').click();
      cy.get('#username').type('red');
      cy.get('#password').type('red');
      cy.get('button').click();
      cy.contains('hello, red');
      cy.contains('Create Blog').click();
      cy.get('#title').type('test title');
      cy.get('#author').type('test author');
      cy.get('#url').type('test url');
      cy.contains('Submit').click();
      cy.contains('test title');
    });

    it('logged user can create blogs', function () {
      cy.contains('Create Blog').click();
      cy.get('#title').type('another title');
      cy.get('#author').type('another author');
      cy.get('#url').type('another url');
      cy.contains('Submit').click();
      cy.contains('another title');
    });

    it('logged user can like created blogs', function () {
      cy.contains('View').click();
      cy.contains('like').click();
      cy.contains('1');
    });

    it('logged user can delete created blog only', function () {
      cy.contains('Create Blog').click();
      cy.get('#title').type('another title');
      cy.get('#author').type('another author');
      cy.get('#url').type('another url');
      cy.contains('Submit').click();
      cy.contains('View').click();
      cy.contains('delete').click();
    });
  });
});
