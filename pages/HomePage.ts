import { Page, Locator } from '@playwright/test';

export class HomePage {

    // Page reference
    private readonly page: Page;

    // Locators
    private readonly productLink: Locator;
    private readonly addToCartButton: Locator;
    private readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Product link on home page
        this.productLink = page.locator('div.card h4.card-title a');

        // Add to cart button on product details page
        this.addToCartButton = page.locator('.btn.btn-success.btn-lg');

        // Cart link on navbar
        this.cartLink = page.locator('#cartur');
    }

    /**
     * Selects a product by name and adds it to cart
     * SPA-safe implementation for DemoBlaze
     */
    async selectProductByName(productName: string): Promise<void> {

        // Click product and WAIT for navigation to product page
        await Promise.all([
            this.page.waitForURL(/prod.html/),
            await this.productLink.filter({
                hasText: new RegExp(productName, 'i')
            }).click()
        ]);

        // Ensure Add to cart button is visible on product page
        await this.addToCartButton.waitFor({ state: 'visible' });

        // Handle alert BEFORE clicking
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });

        // Click Add to cart
        await this.addToCartButton.click();
    }

    /**
     * Navigate to Cart page
     */
    async navigateToCart(): Promise<void> {
        await this.cartLink.click();
    }
}
