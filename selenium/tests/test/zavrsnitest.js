const { expect } = require('chai');
const { Builder, By } = require('selenium-webdriver');
//const Driver = require('../drivers/driver');
const LoginPage = require('../pages/loginPage');
const ProductsPage = require('../pages/productsPage');

describe('Login Tests', function () {
    //let driver;
    let loginPage;
    let productsPage;
    //let cartPage;
    this.timeout(60000);

    beforeEach(async function () {
        driver = new Builder().forBrowser('chrome').build();
        //driver = new Driver().getDriver();
        loginPage = new LoginPage(driver);
        productsPage = new ProductsPage(driver);
        await loginPage.open();
    });

    afterEach(async function () {
        await driver.quit();
    });

    it('Prijava bez unosa kredencijala', async function () {
        await loginPage.login('', '');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).to.include('Epic sadface: Username is required');
        await loginPage.closeErrorMessage();
        const isErrorMessageGone = await loginPage.getErrorMessage();
        expect(isErrorMessageGone).to.not.include('Epic sadface');
    });

    it('Prijava s pogrešnom šifrom', async function () {
        await loginPage.login('standard_user', 'pogresnaSifra');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).to.include('Epic sadface: Username and password do not match');
        await loginPage.closeErrorMessage();
        const isErrorMessageGone = await loginPage.getErrorMessage();
        expect(isErrorMessageGone).to.not.include('Epic sadface');
    });

    it('Kupovina proizvoda', async function () {
        await loginPage.login('standard_user', 'secret_sauce');

        const pageTitle = await driver.getTitle();
        expect(pageTitle).to.include('Swag Labs');

        await productsPage.addToCart(0);
        await productsPage.addToCart(1);
        const cartBadge = await productsPage.getCartBadgeText();
        expect(cartBadge).to.equal('2');
        
     
        await productsPage.goToCart();
        await productsPage.checkout();

        await productsPage.fillCheckoutForm('Masa', 'Cengic', '71000');
        await productsPage.submitCheckout();
        
        //const title = await driver.getTitle();
        //expect(title).to.include('Overview');
        await productsPage.finishCheckout();

        const finishMessage = await driver.findElement(By.className('complete-header')).getText();
        expect(finishMessage).to.equal('Thank you for your order!');

       //await productsPage.finishBurger();
       //await productsPage.finishLogout();

        //await driver.findElement(By.id('react-burger-menu-btn')).click();
        //await driver.findElement(By.id('logout_sidebar_link')).click();
    
        // 15. Verify we are back on the login page
        //const loginPageTitle = await driver.getTitle();
       // expect(loginPageTitle).to.include('Swag Labs');
    
        
    });

});