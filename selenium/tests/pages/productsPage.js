import { By } from 'selenium-webdriver';

class ProductsPage {
    constructor(driver) {
        this.driver = driver;
        this.productItems = By.className('inventory_item');
        this.addToCartButtons = By.className('btn_inventory');
        this.cartBadge = By.className('shopping_cart_badge');
        this.cartIcon = By.className('shopping_cart_link');
        this.checkoutButton = By.id('checkout');
        this.firstNameField = By.id('first-name');
        this.lastNameField = By.id('last-name');
        this.zipCodeField = By.id('postal-code');
        this.continueButton = By.id('continue');
        this.finishButton = By.id('finish');
        this.burgerButton = By.id('react-burger-menu-btn');
        this.logoutButton = By.id('logout_sidebar_link');
    }

    async addToCart(productIndex) {
        const addToCartButtons = await this.driver.findElements(this.addToCartButtons);
        await addToCartButtons[productIndex].click();
    }

    async getCartBadgeText() {
        const badge = await this.driver.findElement(this.cartBadge);
        return await badge.getText();
    }

    async goToCart() {
        await this.driver.findElement(this.cartIcon).click();

    }

    async checkout() {
        await this.driver.findElement(this.checkoutButton).click();
    }

    async fillCheckoutForm(firstName, lastName, zipCode) {
        await this.driver.findElement(this.firstNameField).sendKeys(firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(lastName);
        await this.driver.findElement(this.zipCodeField).sendKeys(zipCode);
    }

    async submitCheckout() {
        await this.driver.findElement(this.continueButton).click();
    }

    async finishCheckout() {
        await this.driver.findElement(this.finishButton).click();
        
    }

    async finishBurger() {
        await this.driver.findElement(this.burgerButton).click();
        
    } 
    
    async finishLogout() {
        await this.driver.findElement(this.logoutButton).click();
        
    } 
}

module.exports=ProductsPage;