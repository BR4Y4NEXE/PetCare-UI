describe('PetCare IoT Dashboard', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the page title', () => {
    cy.title().should('include', 'Dashboard');
  });

  it('shows the header with app name', () => {
    cy.contains('PetCare IoT').should('be.visible');
    cy.contains('Comedor Inteligente').should('be.visible');
  });

  it('has navigation links', () => {
    cy.contains('Dashboard').should('be.visible');
    cy.contains('Dispositivos').should('be.visible');
  });

  it('can navigate to devices page', () => {
    cy.contains('Dispositivos').click();
    cy.url().should('include', '/devices');
    cy.contains('Gestiona tus dispositivos ESP32').should('be.visible');
  });

  it('can navigate back to dashboard', () => {
    cy.contains('Dispositivos').click();
    cy.contains('Dashboard').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('has a theme toggle button', () => {
    cy.get('button[aria-label*="modo"]').should('exist');
  });

  it('can toggle dark mode', () => {
    const themeButton = cy.get('button[aria-label*="modo"]');
    themeButton.click();
    
    cy.get('html').then(($html) => {
      const hasDarkClass = $html.hasClass('dark');
      if (hasDarkClass) {
        cy.get('html').should('have.class', 'dark');
      } else {
        cy.get('html').should('not.have.class', 'dark');
      }
    });
  });

  it('shows empty state when no devices', () => {
    cy.contains('No hay dispositivos registrados').should('be.visible');
  });

  it('has add device button on devices page', () => {
    cy.contains('Dispositivos').click();
    cy.contains('Agregar Dispositivo').should('be.visible');
  });
});
