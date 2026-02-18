import {test,expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';

test('E2E Purchase Flow', async({page}) => {

    await page.goto('https://www.demoblaze.com');

    // login to the application
    const loginPage = new LoginPage(page);
    await loginPage.login('pavanol', 'test@123');




    // Select a product and add it to the cart
    const homePage = new HomePage(page);
    await homePage.selectProductByName('Samsung galaxy s6');

    // Navigate to the cart page
    await homePage.navigateToCart();

    // Verify the product is in the cart
    const cartPage = new CartPage(page);
    const isProductInCart = await cartPage.checkProductInCart('Samsung galaxy s6');
    expect(isProductInCart).toBeTruthy();
});